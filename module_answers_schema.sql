-- SQL Schema for IFS Module Answers Table
-- Run this in your Supabase SQL Editor to create the table for storing client module question answers

-- Create the module answers table
CREATE TABLE IF NOT EXISTS ifs_module_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cliesnt_id VARCHAR(255) NOT NULL,
    module_id VARCHAR(255) NOT NULL,
    step_id VARCHAR(255) NOT NULL,
    answers JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Create a unique constraint for upsert operations
    CONSTRAINT unique_client_module_step UNIQUE (client_id, module_id, step_id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_module_answers_client_id ON ifs_module_answers(client_id);
CREATE INDEX IF NOT EXISTS idx_module_answers_module_id ON ifs_module_answers(module_id);
CREATE INDEX IF NOT EXISTS idx_module_answers_client_module ON ifs_module_answers(client_id, module_id);

-- Enable Row Level Security
ALTER TABLE ifs_module_answers ENABLE ROW LEVEL SECURITY;

-- Create RLS policy that restricts access to user's own data only
-- Users can only read/write their own answers based on client_id
CREATE POLICY "Users can access only their own answers" ON ifs_module_answers
    FOR ALL
    USING (client_id = current_setting('request.jwt.claims', true)::json->>'sub' 
           OR client_id = current_setting('request.headers', true)::json->>'x-client-id')
    WITH CHECK (client_id = current_setting('request.jwt.claims', true)::json->>'sub'
                OR client_id = current_setting('request.headers', true)::json->>'x-client-id');

-- Alternative simpler policy for anonymous access with client_id matching
-- Uncomment this and comment above if using simple client_id matching
-- CREATE POLICY "Users can manage their own answers" ON ifs_module_answers
--     FOR ALL
--     USING (true)  -- For SELECT: allow reading own data (client validates in app)
--     WITH CHECK (true);  -- For INSERT/UPDATE: app-level validation required

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_module_answers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on row updates
DROP TRIGGER IF EXISTS trigger_update_module_answers_updated_at ON ifs_module_answers;
CREATE TRIGGER trigger_update_module_answers_updated_at
    BEFORE UPDATE ON ifs_module_answers
    FOR EACH ROW
    EXECUTE FUNCTION update_module_answers_updated_at();

-- Example of how answers are stored in JSONB format:
-- {
--   "question_0": "My answer to the first question...",
--   "question_1": "My answer to the second question...",
--   "reflection_notes": "Additional notes...",
--   "completed_at": "2024-01-15T10:30:00Z"
-- }

-- Grant minimal necessary permissions
-- Note: Adjust these based on your authentication setup
GRANT SELECT, INSERT, UPDATE ON ifs_module_answers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON ifs_module_answers TO authenticated;

-- Optional: Create a view for easy access to client progress
CREATE OR REPLACE VIEW client_module_progress AS
SELECT 
    client_id,
    module_id,
    COUNT(DISTINCT step_id) as completed_steps,
    MAX(updated_at) as last_activity,
    jsonb_agg(
        jsonb_build_object(
            'step_id', step_id,
            'answers', answers,
            'updated_at', updated_at
        )
    ) as all_responses
FROM ifs_module_answers
GROUP BY client_id, module_id;
