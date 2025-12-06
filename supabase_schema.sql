-- =====================================================
-- IFS Personalized Curriculum Database Schema
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CLIENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pin VARCHAR(6) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  therapist_notes TEXT,
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster PIN lookups
CREATE INDEX idx_clients_pin ON clients(pin);
CREATE INDEX idx_clients_status ON clients(status);

-- =====================================================
-- 2. ASSESSMENT RESULTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS assessment_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Wound scores (0-24 each)
  abandonment_score INTEGER CHECK (abandonment_score >= 0 AND abandonment_score <= 24),
  shame_score INTEGER CHECK (shame_score >= 0 AND shame_score <= 24),
  neglect_score INTEGER CHECK (neglect_score >= 0 AND neglect_score <= 24),
  betrayal_score INTEGER CHECK (betrayal_score >= 0 AND betrayal_score <= 24),
  
  -- Calculated wound priorities
  primary_wound VARCHAR(50),
  secondary_wound VARCHAR(50),
  tertiary_wounds TEXT[], -- Array of remaining wounds
  
  -- Detailed responses
  responses JSONB, -- Store all question responses
  
  -- Protector identification
  protector_types TEXT[], -- Array of identified protector types
  
  -- Assessment metadata
  assessment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  assessment_version VARCHAR(10) DEFAULT '1.0',
  
  -- Therapist notes
  therapist_interpretation TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_assessment_client ON assessment_results(client_id);
CREATE INDEX idx_assessment_primary_wound ON assessment_results(primary_wound);
CREATE INDEX idx_assessment_date ON assessment_results(assessment_date DESC);

-- =====================================================
-- 3. PERSONALIZED CURRICULUM TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS personalized_curriculum (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessment_results(id) ON DELETE CASCADE,
  
  -- Module information
  module_id VARCHAR(100) NOT NULL,
  module_order INTEGER NOT NULL,
  module_title TEXT NOT NULL,
  module_description TEXT,
  
  -- Customized content
  customized_content JSONB NOT NULL, -- Full module content customized for client
  original_module_id VARCHAR(100), -- Reference to base module
  
  -- Wound-specific customizations
  primary_wound_focus VARCHAR(50),
  customization_notes TEXT,
  
  -- Estimated completion
  estimated_minutes INTEGER,
  difficulty_level VARCHAR(20), -- beginner, intermediate, advanced
  
  -- Prerequisites
  prerequisite_modules TEXT[], -- Array of module IDs that should be completed first
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(client_id, module_id)
);

-- Indexes
CREATE INDEX idx_curriculum_client ON personalized_curriculum(client_id);
CREATE INDEX idx_curriculum_module ON personalized_curriculum(module_id);
CREATE INDEX idx_curriculum_order ON personalized_curriculum(client_id, module_order);

-- =====================================================
-- 4. CLIENT PROGRESS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS client_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  module_id VARCHAR(100) NOT NULL,
  
  -- Progress tracking
  current_step INTEGER DEFAULT 0,
  total_steps INTEGER,
  completed_steps INTEGER[] DEFAULT '{}', -- Array of completed step indices
  
  -- Activity completion
  activity_id VARCHAR(100),
  activity_type VARCHAR(50), -- reflection, journaling, parts_work, exercise, meditation
  completed BOOLEAN DEFAULT FALSE,
  
  -- Responses and notes
  responses JSONB, -- Store activity responses
  client_notes TEXT,
  insights TEXT, -- Key insights from the activity
  
  -- Timing
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  time_spent_minutes INTEGER,
  
  -- Engagement metrics
  revisit_count INTEGER DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_progress_client ON client_progress(client_id);
CREATE INDEX idx_progress_module ON client_progress(client_id, module_id);
CREATE INDEX idx_progress_completed ON client_progress(completed);
CREATE INDEX idx_progress_activity ON client_progress(activity_id);

-- =====================================================
-- 5. JOURNAL ENTRIES TABLE (Enhanced)
-- =====================================================
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Entry content
  title VARCHAR(255),
  content TEXT NOT NULL,
  
  -- Emotional tracking
  mood VARCHAR(50), -- happy, sad, anxious, angry, peaceful, etc.
  mood_intensity INTEGER CHECK (mood_intensity >= 1 AND mood_intensity <= 10),
  emotions TEXT[], -- Array of emotions identified
  
  -- Parts identification
  parts_identified TEXT[], -- Array of part names/types identified
  parts_dialogue JSONB, -- Structured dialogue with parts
  
  -- Wound connection
  related_wound VARCHAR(50), -- Which wound this entry relates to
  related_module VARCHAR(100), -- Which module prompted this entry
  
  -- Tags and categories
  tags TEXT[],
  is_breakthrough BOOLEAN DEFAULT FALSE, -- Mark significant insights
  
  -- Privacy
  is_private BOOLEAN DEFAULT TRUE,
  shared_with_therapist BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_journal_client ON journal_entries(client_id);
CREATE INDEX idx_journal_date ON journal_entries(created_at DESC);
CREATE INDEX idx_journal_wound ON journal_entries(related_wound);
CREATE INDEX idx_journal_breakthrough ON journal_entries(is_breakthrough);

-- =====================================================
-- 6. PARTS MAPPING TABLE (Enhanced)
-- =====================================================
CREATE TABLE IF NOT EXISTS parts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Part identification
  part_name VARCHAR(255) NOT NULL,
  part_type VARCHAR(50), -- manager, firefighter, exile
  role VARCHAR(100), -- protector, critic, caretaker, etc.
  
  -- Part characteristics
  description TEXT,
  age_of_part INTEGER, -- How old this part feels
  visual_representation TEXT, -- How client visualizes this part
  
  -- Behavioral patterns
  triggers TEXT[], -- What activates this part
  behaviors TEXT[], -- What this part does
  positive_intentions TEXT[], -- What this part is trying to protect
  
  -- Burdens
  burdens TEXT[], -- Beliefs/emotions this part carries
  origin_story TEXT, -- When/how this part developed
  
  -- Relationship with Self
  trust_level INTEGER CHECK (trust_level >= 1 AND trust_level <= 10),
  willingness_to_unblend INTEGER CHECK (willingness_to_unblend >= 1 AND willingness_to_unblend <= 10),
  
  -- Healing progress
  unburdening_status VARCHAR(50), -- not_started, in_progress, completed
  unburdening_date TIMESTAMP WITH TIME ZONE,
  transformation_notes TEXT,
  
  -- Related wound
  related_wound VARCHAR(50),
  
  -- Metadata
  discovered_in_module VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_parts_client ON parts(client_id);
CREATE INDEX idx_parts_type ON parts(part_type);
CREATE INDEX idx_parts_wound ON parts(related_wound);
CREATE INDEX idx_parts_unburdening ON parts(unburdening_status);

-- =====================================================
-- 7. EXERCISE PROGRESS TABLE (Enhanced)
-- =====================================================
CREATE TABLE IF NOT EXISTS exercise_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Exercise identification
  exercise_id VARCHAR(100) NOT NULL,
  exercise_title VARCHAR(255),
  exercise_type VARCHAR(50), -- meditation, visualization, somatic, dialogue, etc.
  
  -- Completion tracking
  completed BOOLEAN DEFAULT FALSE,
  completion_date TIMESTAMP WITH TIME ZONE,
  completion_time_minutes INTEGER,
  
  -- Experience tracking
  difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
  helpfulness_rating INTEGER CHECK (helpfulness_rating >= 1 AND helpfulness_rating <= 5),
  emotional_intensity INTEGER CHECK (emotional_intensity >= 1 AND emotional_intensity <= 10),
  
  -- Detailed feedback
  notes TEXT,
  insights TEXT,
  challenges TEXT,
  breakthroughs TEXT,
  
  -- Parts work specific
  parts_accessed TEXT[], -- Which parts were accessed during exercise
  self_energy_level INTEGER CHECK (self_energy_level >= 1 AND self_energy_level <= 10),
  
  -- Follow-up
  wants_to_revisit BOOLEAN DEFAULT FALSE,
  revisit_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(client_id, exercise_id)
);

-- Indexes
CREATE INDEX idx_exercise_client ON exercise_progress(client_id);
CREATE INDEX idx_exercise_completed ON exercise_progress(completed);
CREATE INDEX idx_exercise_type ON exercise_progress(exercise_type);

-- =====================================================
-- 8. THERAPIST NOTES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS therapist_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Note content
  note_type VARCHAR(50), -- session_note, observation, recommendation, milestone
  title VARCHAR(255),
  content TEXT NOT NULL,
  
  -- Context
  related_module VARCHAR(100),
  related_wound VARCHAR(50),
  
  -- Follow-up
  requires_follow_up BOOLEAN DEFAULT FALSE,
  follow_up_date DATE,
  follow_up_completed BOOLEAN DEFAULT FALSE,
  
  -- Privacy
  visible_to_client BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(255), -- Therapist name/ID
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_therapist_notes_client ON therapist_notes(client_id);
CREATE INDEX idx_therapist_notes_type ON therapist_notes(note_type);
CREATE INDEX idx_therapist_notes_follow_up ON therapist_notes(requires_follow_up, follow_up_completed);

-- =====================================================
-- 9. MILESTONES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Milestone details
  milestone_type VARCHAR(50), -- module_completion, breakthrough, unburdening, integration
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Context
  related_module VARCHAR(100),
  related_wound VARCHAR(50),
  related_part VARCHAR(255),
  
  -- Achievement
  achieved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  celebration_message TEXT,
  
  -- Badges/rewards
  badge_earned VARCHAR(100),
  points_earned INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_milestones_client ON milestones(client_id);
CREATE INDEX idx_milestones_type ON milestones(milestone_type);
CREATE INDEX idx_milestones_date ON milestones(achieved_at DESC);

-- =====================================================
-- 10. CONTENT LIBRARY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS content_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Content identification
  content_type VARCHAR(50), -- article, video, audio, exercise, worksheet
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Content
  content JSONB, -- Structured content
  url TEXT, -- External resource URL
  file_path TEXT, -- Internal file path
  
  -- Categorization
  wound_types TEXT[], -- Which wounds this content addresses
  module_ids TEXT[], -- Which modules this belongs to
  tags TEXT[],
  difficulty_level VARCHAR(20),
  
  -- Metadata
  author VARCHAR(255),
  source VARCHAR(255),
  evidence_based BOOLEAN DEFAULT FALSE,
  research_citations TEXT[],
  
  -- Usage tracking
  view_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2),
  
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_content_type ON content_library(content_type);
CREATE INDEX idx_content_wounds ON content_library USING GIN(wound_types);
CREATE INDEX idx_content_modules ON content_library USING GIN(module_ids);
CREATE INDEX idx_content_active ON content_library(is_active);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_personalized_curriculum_updated_at BEFORE UPDATE ON personalized_curriculum
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_progress_updated_at BEFORE UPDATE ON client_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_parts_updated_at BEFORE UPDATE ON parts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercise_progress_updated_at BEFORE UPDATE ON exercise_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_therapist_notes_updated_at BEFORE UPDATE ON therapist_notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_library_updated_at BEFORE UPDATE ON content_library
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update client last_active
CREATE OR REPLACE FUNCTION update_client_last_active()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE clients 
    SET last_active = NOW() 
    WHERE id = NEW.client_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply last_active trigger
CREATE TRIGGER update_last_active_on_progress AFTER INSERT OR UPDATE ON client_progress
    FOR EACH ROW EXECUTE FUNCTION update_client_last_active();

CREATE TRIGGER update_last_active_on_journal AFTER INSERT ON journal_entries
    FOR EACH ROW EXECUTE FUNCTION update_client_last_active();

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- Client dashboard view
CREATE OR REPLACE VIEW client_dashboard AS
SELECT 
    c.id as client_id,
    c.name,
    c.pin,
    c.status,
    c.last_active,
    ar.primary_wound,
    ar.secondary_wound,
    ar.assessment_date,
    COUNT(DISTINCT cp.module_id) as modules_started,
    COUNT(DISTINCT CASE WHEN cp.completed THEN cp.module_id END) as modules_completed,
    COUNT(DISTINCT je.id) as journal_entries_count,
    COUNT(DISTINCT p.id) as parts_identified,
    MAX(cp.last_accessed) as last_module_access
FROM clients c
LEFT JOIN assessment_results ar ON c.id = ar.client_id
LEFT JOIN client_progress cp ON c.id = cp.client_id
LEFT JOIN journal_entries je ON c.id = je.client_id
LEFT JOIN parts p ON c.id = p.client_id
GROUP BY c.id, c.name, c.pin, c.status, c.last_active, 
         ar.primary_wound, ar.secondary_wound, ar.assessment_date;

-- Module progress view
CREATE OR REPLACE VIEW module_progress_summary AS
SELECT 
    cp.client_id,
    cp.module_id,
    pc.module_title,
    pc.primary_wound_focus,
    COUNT(*) as total_activities,
    COUNT(CASE WHEN cp.completed THEN 1 END) as completed_activities,
    ROUND(COUNT(CASE WHEN cp.completed THEN 1 END)::NUMERIC / COUNT(*)::NUMERIC * 100, 2) as completion_percentage,
    MIN(cp.started_at) as module_started,
    MAX(cp.completed_at) as last_activity_completed,
    SUM(cp.time_spent_minutes) as total_time_spent
FROM client_progress cp
JOIN personalized_curriculum pc ON cp.client_id = pc.client_id AND cp.module_id = pc.module_id
GROUP BY cp.client_id, cp.module_id, pc.module_title, pc.primary_wound_focus;

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Insert sample client
INSERT INTO clients (pin, name, email, status) VALUES
('123456', 'Test Client', 'test@example.com', 'active');

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE personalized_curriculum ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- Policies for clients (clients can only see their own data)
CREATE POLICY "Clients can view own data" ON clients
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Clients can update own data" ON clients
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Similar policies for other tables
CREATE POLICY "Clients can view own assessment" ON assessment_results
    FOR SELECT USING (auth.uid()::text = client_id::text);

CREATE POLICY "Clients can view own curriculum" ON personalized_curriculum
    FOR SELECT USING (auth.uid()::text = client_id::text);

CREATE POLICY "Clients can manage own progress" ON client_progress
    FOR ALL USING (auth.uid()::text = client_id::text);

CREATE POLICY "Clients can manage own journal" ON journal_entries
    FOR ALL USING (auth.uid()::text = client_id::text);

CREATE POLICY "Clients can manage own parts" ON parts
    FOR ALL USING (auth.uid()::text = client_id::text);

CREATE POLICY "Clients can manage own exercise progress" ON exercise_progress
    FOR ALL USING (auth.uid()::text = client_id::text);

CREATE POLICY "Clients can view own milestones" ON milestones
    FOR SELECT USING (auth.uid()::text = client_id::text);

-- Content library is public (read-only for clients)
CREATE POLICY "Anyone can view active content" ON content_library
    FOR SELECT USING (is_active = true);

-- =====================================================
-- GRANTS
-- =====================================================

-- Grant appropriate permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- =====================================================
-- END OF SCHEMA
-- =====================================================