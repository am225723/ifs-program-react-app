-- =====================================================
-- Migration 020: Link ifs_clients to auth.users + secure RLS
-- =====================================================

-- 1) Auth linkage on app profile table
ALTER TABLE public.ifs_clients
  ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_ifs_clients_auth_user_id
  ON public.ifs_clients(auth_user_id)
  WHERE auth_user_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_ifs_clients_email_ci
  ON public.ifs_clients((lower(email)))
  WHERE email IS NOT NULL;

-- 2) Helpers used by policies
CREATE OR REPLACE FUNCTION public.current_client_id()
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id
  FROM public.ifs_clients
  WHERE auth_user_id = auth.uid()
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_therapist()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.ifs_clients
    WHERE auth_user_id = auth.uid()
      AND COALESCE(status, 'active') = 'active'
      AND COALESCE(user_role, 'client') IN ('therapist', 'admin')
  );
$$;

REVOKE ALL ON FUNCTION public.current_client_id() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_therapist() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.current_client_id() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_therapist() TO authenticated;

-- 3) Drop legacy permissive policies and ensure RLS is enabled.
DO $$
DECLARE
  t TEXT;
  p RECORD;
BEGIN
  FOR t IN
    SELECT unnest(ARRAY[
      'ifs_clients',
      'ifs_assessment_results',
      'ifs_personalized_curriculum',
      'ifs_client_progress',
      'ifs_journal_entries',
      'ifs_parts',
      'ifs_exercise_progress',
      'ifs_therapist_notes',
      'ifs_milestones',
      'ifs_module_answers',
      'ifs_interactive_data',
      'ifs_mood_entries',
      'ifs_therapy_sessions',
      'ifs_therapy_homework',
      'ifs_messages',
      'ifs_parts_dialogue',
      'ifs_gamification',
      'ifs_client_preferences',
      'ifs_therapist_feedback',
      'ifs_therapy_activity_progress',
      'ifs_content_library'
    ])
  LOOP
    IF to_regclass('public.' || t) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);

      FOR p IN
        SELECT policyname
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = t
      LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p.policyname, t);
      END LOOP;
    END IF;
  END LOOP;
END $$;

-- 4) ifs_clients policies
CREATE POLICY ifs_clients_select_self_or_therapist
  ON public.ifs_clients
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND (
      auth_user_id = auth.uid()
      OR public.is_therapist()
    )
  );

CREATE POLICY ifs_clients_claim_by_email
  ON public.ifs_clients
  FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND auth_user_id IS NULL
    AND lower(COALESCE(email, '')) = lower(COALESCE(auth.jwt() ->> 'email', ''))
  )
  WITH CHECK (
    auth_user_id = auth.uid()
    AND lower(COALESCE(email, '')) = lower(COALESCE(auth.jwt() ->> 'email', ''))
  );

CREATE POLICY ifs_clients_update_self_or_therapist
  ON public.ifs_clients
  FOR UPDATE
  USING (
    auth.uid() IS NOT NULL
    AND (
      auth_user_id = auth.uid()
      OR public.is_therapist()
    )
  )
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND (
      auth_user_id = auth.uid()
      OR public.is_therapist()
    )
  );

CREATE POLICY ifs_clients_insert_therapist
  ON public.ifs_clients
  FOR INSERT
  WITH CHECK (public.is_therapist());

-- 5) Generic own-or-therapist policies for tables with client_id
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN
    SELECT unnest(ARRAY[
      'ifs_assessment_results',
      'ifs_personalized_curriculum',
      'ifs_client_progress',
      'ifs_journal_entries',
      'ifs_parts',
      'ifs_exercise_progress',
      'ifs_milestones',
      'ifs_module_answers',
      'ifs_interactive_data',
      'ifs_mood_entries',
      'ifs_therapy_sessions',
      'ifs_therapy_homework',
      'ifs_parts_dialogue',
      'ifs_gamification',
      'ifs_client_preferences',
      'ifs_therapist_feedback',
      'ifs_therapy_activity_progress'
    ])
  LOOP
    IF to_regclass('public.' || t) IS NOT NULL THEN
      EXECUTE format(
        'CREATE POLICY %I ON public.%I FOR SELECT USING (client_id = public.current_client_id() OR public.is_therapist())',
        t || '_select',
        t
      );

      EXECUTE format(
        'CREATE POLICY %I ON public.%I FOR INSERT WITH CHECK (client_id = public.current_client_id() OR public.is_therapist())',
        t || '_insert',
        t
      );

      EXECUTE format(
        'CREATE POLICY %I ON public.%I FOR UPDATE USING (client_id = public.current_client_id() OR public.is_therapist()) WITH CHECK (client_id = public.current_client_id() OR public.is_therapist())',
        t || '_update',
        t
      );

      EXECUTE format(
        'CREATE POLICY %I ON public.%I FOR DELETE USING (client_id = public.current_client_id() OR public.is_therapist())',
        t || '_delete',
        t
      );
    END IF;
  END LOOP;
END $$;

-- 6) Messaging + therapist notes policies
DO $$
BEGIN
  IF to_regclass('public.ifs_messages') IS NOT NULL THEN
    CREATE POLICY ifs_messages_select_participant
      ON public.ifs_messages
      FOR SELECT
      USING (
        client_id = public.current_client_id()
        OR therapist_id = public.current_client_id()
        OR public.is_therapist()
      );

    CREATE POLICY ifs_messages_insert_participant
      ON public.ifs_messages
      FOR INSERT
      WITH CHECK (
        client_id = public.current_client_id()
        OR therapist_id = public.current_client_id()
        OR public.is_therapist()
      );

    CREATE POLICY ifs_messages_update_participant
      ON public.ifs_messages
      FOR UPDATE
      USING (
        client_id = public.current_client_id()
        OR therapist_id = public.current_client_id()
        OR public.is_therapist()
      )
      WITH CHECK (
        client_id = public.current_client_id()
        OR therapist_id = public.current_client_id()
        OR public.is_therapist()
      );
  END IF;

  IF to_regclass('public.ifs_therapist_notes') IS NOT NULL THEN
    CREATE POLICY ifs_therapist_notes_select_participant
      ON public.ifs_therapist_notes
      FOR SELECT
      USING (
        client_id = public.current_client_id()
        OR therapist_id = public.current_client_id()
        OR public.is_therapist()
      );

    CREATE POLICY ifs_therapist_notes_mutate_therapist
      ON public.ifs_therapist_notes
      FOR ALL
      USING (public.is_therapist())
      WITH CHECK (public.is_therapist());
  END IF;
END $$;

-- 7) Content library: anyone authenticated can see active content; therapists can see all.
DO $$
BEGIN
  IF to_regclass('public.ifs_content_library') IS NOT NULL THEN
    CREATE POLICY ifs_content_library_read
      ON public.ifs_content_library
      FOR SELECT
      USING (
        is_active = true
        OR public.is_therapist()
      );
  END IF;
END $$;
