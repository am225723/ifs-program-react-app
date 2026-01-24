import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://froxodstewdswllgokmu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyb3hvZHN0ZXdkc3dsbGdva211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNjgyODUsImV4cCI6MjA3Njk0NDI4NX0.PUr1-cq71PZUFsudz7lzSs3IWMzSxomNqBwlxkCG02s';

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
      .from('ifs_client_progress')
      .upsert({
        client_id: userId,
        module_id: moduleId,
        current_step: progress.currentStep || 0,
        responses: progress.responses || {},
        completed_steps: progress.completedSteps || [],
        interactive_data: progress.interactiveData || {},
        is_completed: progress.isCompleted || false,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'client_id,module_id'
      });
    
    if (error) console.error('Error saving module progress:', error);
    return data;
  },

  async getModuleProgress(userId, moduleId) {
    const { data, error } = await supabase
      .from('ifs_client_progress')
      .select('*')
      .eq('client_id', userId)
      .eq('module_id', moduleId)
      .single();
    
    if (error && error.code !== 'PGRST116') console.error('Error fetching module progress:', error);
    return data;
  },

  async getAllModuleProgress(userId) {
    const { data, error } = await supabase
      .from('ifs_client_progress')
      .select('*')
      .eq('client_id', 'anonymous');
    
    if (error) console.error('Error fetching all progress:', error);
    return data || [];
  },

  // Interactive Data Functions
  async saveInteractiveData(userId, moduleId, data) {
    const { error } = await supabase
      .from('ifs_interactive_data')
      .upsert({
        client_id: userId,
        module_id: moduleId,
        data: data,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'client_id,module_id'
      });
    
    if (error) console.error('Error saving interactive data:', error);
    return !error;
  },

  async getInteractiveData(userId, moduleId) {
    const { data, error } = await supabase
      .from('ifs_interactive_data')
      .select('data')
      .eq('client_id', userId)
      .eq('module_id', moduleId)
      .single();
    
    if (error && error.code !== 'PGRST116') console.error('Error fetching interactive data:', error);
    return data?.data || {};
  },

  // Assessment Results Functions
  async saveAssessment(userId, assessmentData) {
    const { data, error } = await supabase
      .from('ifs_assessment_results')
      .upsert({
        client_id: userId,
        ...assessmentData,
        created_at: new Date().toISOString()
      });
    
    if (error) console.error('Error saving assessment:', error);
    return data;
  },

  async getAssessment(userId) {
    const { data, error } = await supabase
      .from('ifs_assessment_results')
      .select('*')
      .eq('client_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') console.error('Error fetching assessment:', error);
    return data;
  },

  // Journal Functions
  async saveJournalEntry(userId, entry) {
    const { data, error } = await supabase
      .from('ifs_journal_entries')
      .insert({
        client_id: userId,
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
      .from('ifs_journal_entries')
      .select('*')
      .eq('client_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching journal entries:', error);
    return data || [];
  },

  // Parts Mapping Functions
  async savePart(userId, partData) {
    const { data, error } = await supabase
      .from('ifs_parts')
      .upsert({
        client_id: userId,
        id: partData.id,
        name: partData.name,
        role: partData.role,
        description: partData.description,
        triggers: partData.triggers,
        positive_intentions: partData.positiveIntentions,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'client_id,id'
      });
    
    if (error) console.error('Error saving part:', error);
    return data;
  },

  async getParts(userId) {
    const { data, error } = await supabase
      .from('ifs_parts')
      .select('*')
      .eq('client_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) console.error('Error fetching parts:', error);
    return data || [];
  },

  // Exercise Progress Functions
  async saveExerciseProgress(userId, exerciseId, progress) {
    const { data, error } = await supabase
      .from('ifs_exercise_progress')
      .upsert({
        client_id: userId,
        exercise_id: exerciseId,
        completed: progress.completed,
        notes: progress.notes,
        completion_time: progress.completionTime,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'client_id,exercise_id'
      });
    
    if (error) console.error('Error saving exercise progress:', error);
    return data;
  },

  async getExerciseProgress(userId) {
    const { data, error } = await supabase
      .from('ifs_exercise_progress')
      .select('*')
      .eq('client_id', userId);
    
    if (error) console.error('Error fetching exercise progress:', error);
    return data || [];
  },

  // Client Functions
  async getClientData(userId) {
    const { data, error } = await supabase
      .from('ifs_clients')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') console.error('Error fetching client data:', error);
    return data;
  },

  async saveClientData(userId, userData) {
    const { data, error } = await supabase
      .from('ifs_clients')
      .upsert({
        id: userId,
        ...userData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      });
    
    if (error) console.error('Error saving client data:', error);
    return data;
  },

  // Alias for saveClientData to maintain backward compatibility
  async saveUserData(userId, userData) {
    return this.saveClientData(userId, userData);
  },

  // Save module question answers
  async saveModuleAnswers(userId, moduleId, stepId, answers) {
    const { data, error } = await supabase
      .from('ifs_module_answers')
      .upsert({
        client_id: userId,
        module_id: moduleId,
        step_id: stepId,
        answers: answers,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'client_id,module_id,step_id'
      });
    
    if (error) console.error('Error saving module answers:', error);
    return data;
  },

  async getModuleAnswers(userId, moduleId, stepId) {
    const { data, error } = await supabase
      .from('ifs_module_answers')
      .select('*')
      .eq('client_id', userId)
      .eq('module_id', moduleId)
      .eq('step_id', stepId)
      .single();
    
    if (error && error.code !== 'PGRST116') console.error('Error fetching module answers:', error);
    return data?.answers || {};
  },

  async getAllModuleAnswers(userId, moduleId) {
    const { data, error } = await supabase
      .from('ifs_module_answers')
      .select('*')
      .eq('client_id', userId)
      .eq('module_id', moduleId);
    
    if (error) console.error('Error fetching all module answers:', error);
    return data || [];
  },

  // Generate a proper UUID for users (compatible with Supabase UUID columns)
  generateUserId() {
    // Generate a UUID v4 format
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
};

export default supabase;