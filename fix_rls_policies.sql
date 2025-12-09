-- Fix RLS policies for anonymous client creation and access
-- =====================================================

-- Drop existing policies that are too restrictive
DROP POLICY IF EXISTS "Clients can view own data" ON IFS_clients;
DROP POLICY IF EXISTS "Clients can update own data" ON IFS_clients;

-- Create new policies that allow anonymous access for PIN authentication
CREATE POLICY "Enable anonymous client creation" ON IFS_clients
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable anonymous client authentication" ON IFS_clients
    FOR SELECT USING (true);

CREATE POLICY "Enable anonymous client updates" ON IFS_clients
    FOR UPDATE USING (true);

-- Also fix other tables that might need anonymous access
DROP POLICY IF EXISTS "Clients can view own assessment" ON IFS_assessment_results;
CREATE POLICY "Enable anonymous assessment access" ON IFS_assessment_results
    FOR ALL USING (true);

DROP POLICY IF EXISTS "Clients can view own curriculum" ON IFS_personalized_curriculum;
CREATE POLICY "Enable anonymous curriculum access" ON IFS_personalized_curriculum
    FOR ALL USING (true);

DROP POLICY IF EXISTS "Clients can manage own progress" ON IFS_client_progress;
CREATE POLICY "Enable anonymous progress access" ON IFS_client_progress
    FOR ALL USING (true);

DROP POLICY IF EXISTS "Clients can manage own journal" ON IFS_journal_entries;
CREATE POLICY "Enable anonymous journal access" ON IFS_journal_entries
    FOR ALL USING (true);

DROP POLICY IF EXISTS "Clients can manage own parts" ON IFS_parts;
CREATE POLICY "Enable anonymous parts access" ON IFS_parts
    FOR ALL USING (true);

DROP POLICY IF EXISTS "Clients can manage own exercise progress" ON IFS_exercise_progress;
CREATE POLICY "Enable anonymous exercise progress access" ON IFS_exercise_progress
    FOR ALL USING (true);

DROP POLICY IF EXISTS "Clients can view own milestones" ON IFS_milestones;
CREATE POLICY "Enable anonymous milestones access" ON IFS_milestones
    FOR ALL USING (true);

-- Grant necessary permissions to anonymous role
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;