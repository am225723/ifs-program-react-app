-- Temporarily disable RLS to test the functionality
-- =====================================================

ALTER TABLE ifs_clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE ifs_assessment_results DISABLE ROW LEVEL SECURITY;
ALTER TABLE ifs_personalized_curriculum DISABLE ROW LEVEL SECURITY;
ALTER TABLE ifs_client_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE ifs_journal_entries DISABLE ROW LEVEL SECURITY;
ALTER TABLE ifs_parts DISABLE ROW LEVEL SECURITY;
ALTER TABLE ifs_exercise_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE ifs_therapist_notes DISABLE ROW LEVEL SECURITY;
ALTER TABLE ifs_milestones DISABLE ROW LEVEL SECURITY;

-- Ensure anonymous access
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;