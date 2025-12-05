import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://froxodstewdswllgokmu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyb3hvZHN0ZXdkc3dsbGdva211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNjgyODUsImV4cCI6MjA3Njk0NDI4NV0.PUr1-cq71PZUFsudz7lzSs3IWMzSxomNqBwlxkCG02s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

// Helper functions for database operations
export const supabaseHelpers = {
  // Module Progress Functions
  async saveModuleProgress(userId, moduleId, progress) {
    const { data, error } = await supabase
      .from('module_progress')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        current_step: progress.currentStep || 0,
        responses: progress.responses || {},
        completed_steps: progress.completedSteps || [],
        interactive_data: progress.interactiveData || {},
        is_completed: progress.isCompleted || false,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,module_id'
      });
    
    if (error) console.error('Error saving module progress:', error);
    return data;
  },

  async getModuleProgress(userId, moduleId) {
    const { data, error } = await supabase
      .from('module_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .single();
    
    if (error && error.code !== 'PGRST116') console.error('Error fetching module progress:', error);
    return data;
  },

  async getAllModuleProgress(userId) {
    const { data, error } = await supabase
      .from('module_progress')
      .select('*')
      .eq('user_id', 'anonymous');
    
    if (error) console.error('Error fetching all progress:', error);
    return data || [];
  },

  // Interactive Data Functions
  async saveInteractiveData(userId, moduleId, data) {
    const { error } = await supabase
      .from('interactive_data')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        data: data,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,module_id'
      });
    
    if (error) console.error('Error saving interactive data:', error);
    return !error;
  },

  async getInteractiveData(userId, moduleId) {
    const { data, error } = await supabase
      .from('interactive_data')
      .select('data')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .single();
    
    if (error && error.code !== 'PGRST116') console.error('Error fetching interactive data:', error);
    return data?.data || {};
  },

  // Assessment Results Functions
  async saveAssessment(userId, assessmentData) {
    const { data, error } = await supabase
      .from('assessment_results')
      .upsert({
        user_id: userId,
        ...assessmentData,
        created_at: new Date().toISOString()
      });
    
    if (error) console.error('Error saving assessment:', error);
    return data;
  },

  async getAssessment(userId) {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') console.error('Error fetching assessment:', error);
    return data;
  },

  // Journal Functions
  async saveJournalEntry(userId, entry) {
    const { data, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: userId,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        parts_identified: entry.partsIdentified,
        created_at: new Date().toISOString()
      });
    
    if (error) console.error('Error saving journal entry:', error);
    return data;
  },

  async getJournalEntries(userId) {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching journal entries:', error);
    return data || [];
  },

  // Parts Mapping Functions
  async savePart(userId, partData) {
    const { data, error } = await supabase
      .from('parts')
      .upsert({
        user_id: userId,
        id: partData.id,
        name: partData.name,
        role: partData.role,
        description: partData.description,
        triggers: partData.triggers,
        positive_intentions: partData.positiveIntentions,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,id'
      });
    
    if (error) console.error('Error saving part:', error);
    return data;
  },

  async getParts(userId) {
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) console.error('Error fetching parts:', error);
    return data || [];
  },

  // Exercise Progress Functions
  async saveExerciseProgress(userId, exerciseId, progress) {
    const { data, error } = await supabase
      .from('exercise_progress')
      .upsert({
        user_id: userId,
        exercise_id: exerciseId,
        completed: progress.completed,
        notes: progress.notes,
        completion_time: progress.completionTime,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,exercise_id'
      });
    
    if (error) console.error('Error saving exercise progress:', error);
    return data;
  },

  async getExerciseProgress(userId) {
    const { data, error } = await supabase
      .from('exercise_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (error) console.error('Error fetching exercise progress:', error);
    return data || [];
  },

  // User Functions
  async getUserData(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') console.error('Error fetching user data:', error);
    return data;
  },

  async saveUserData(userId, userData) {
    const { data, error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        ...userData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      });
    
    if (error) console.error('Error saving user data:', error);
    return data;
  },

  // Generate a simple user ID for anonymous users
  generateUserId() {
    return 'anon_' + Math.random().toString(36).substr(2, 9);
  }
};

export default supabase;