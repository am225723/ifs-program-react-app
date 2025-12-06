import { supabase } from './supabase';
import { generatePersonalizedCurriculum, rankWounds } from '../utils/curriculumPersonalizer';

/**
 * Client Authentication & Management
 */
export const clientAuth = {
  /**
   * Authenticate client with PIN
   */
  async authenticateWithPIN(pin) {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('pin', pin)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error('PIN authentication error:', error);
        return { success: false, error: 'Invalid PIN' };
      }

      if (!data) {
        return { success: false, error: 'Invalid PIN' };
      }

      // Update last active
      await supabase
        .from('clients')
        .update({ last_active: new Date().toISOString() })
        .eq('id', data.id);

      // Store client session
      localStorage.setItem('client_id', data.id);
      localStorage.setItem('client_pin', pin);
      localStorage.setItem('client_name', data.name);

      return { success: true, client: data };
    } catch (error) {
      console.error('Authentication error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  },

  /**
   * Get current client from session
   */
  getCurrentClient() {
    const clientId = localStorage.getItem('client_id');
    const clientName = localStorage.getItem('client_name');
    const clientPin = localStorage.getItem('client_pin');

    if (!clientId) return null;

    return {
      id: clientId,
      name: clientName,
      pin: clientPin
    };
  },

  /**
   * Logout client
   */
  logout() {
    localStorage.removeItem('client_id');
    localStorage.removeItem('client_pin');
    localStorage.removeItem('client_name');
  },

  /**
   * Create new client (admin function)
   */
  async createClient(clientData) {
    try {
      // Generate unique 6-digit PIN
      const pin = Math.floor(100000 + Math.random() * 900000).toString();

      const { data, error } = await supabase
        .from('clients')
        .insert({
          pin,
          name: clientData.name,
          email: clientData.email,
          phone: clientData.phone,
          therapist_notes: clientData.notes,
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, client: data, pin };
    } catch (error) {
      console.error('Error creating client:', error);
      return { success: false, error: error.message };
    }
  }
};

/**
 * Assessment Management
 */
export const assessmentManager = {
  /**
   * Save assessment results
   */
  async saveAssessmentResults(clientId, assessmentData) {
    try {
      // Calculate wound rankings
      const rankedWounds = rankWounds(assessmentData);

      const { data, error } = await supabase
        .from('assessment_results')
        .insert({
          client_id: clientId,
          abandonment_score: assessmentData.abandonment_score,
          shame_score: assessmentData.shame_score,
          neglect_score: assessmentData.neglect_score,
          betrayal_score: assessmentData.betrayal_score,
          primary_wound: rankedWounds[0].type,
          secondary_wound: rankedWounds[1].type,
          tertiary_wounds: [rankedWounds[2].type, rankedWounds[3].type],
          responses: assessmentData.responses,
          protector_types: assessmentData.protector_types || [],
          assessment_date: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, assessment: data };
    } catch (error) {
      console.error('Error saving assessment:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get latest assessment for client
   */
  async getLatestAssessment(clientId) {
    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('client_id', clientId)
        .order('assessment_date', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return { success: true, assessment: data };
    } catch (error) {
      console.error('Error fetching assessment:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get all assessments for client (track progress over time)
   */
  async getAllAssessments(clientId) {
    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('client_id', clientId)
        .order('assessment_date', { ascending: false });

      if (error) throw error;

      return { success: true, assessments: data || [] };
    } catch (error) {
      console.error('Error fetching assessments:', error);
      return { success: false, error: error.message };
    }
  }
};

/**
 * Personalized Curriculum Management
 */
export const curriculumManager = {
  /**
   * Generate and save personalized curriculum
   */
  async generateAndSaveCurriculum(clientId, assessmentResults, baseModules) {
    try {
      // Generate personalized curriculum
      const personalizedCurriculum = generatePersonalizedCurriculum(
        assessmentResults,
        baseModules
      );

      // Save each module to database
      const modulePromises = personalizedCurriculum.modules.map((module, index) => {
        return supabase
          .from('personalized_curriculum')
          .upsert({
            client_id: clientId,
            assessment_id: assessmentResults.id,
            module_id: module.id,
            module_order: index + 1,
            module_title: module.title,
            module_description: module.description,
            customized_content: module,
            original_module_id: module.id.replace('personalized-', ''),
            primary_wound_focus: module.primaryWoundFocus,
            customization_notes: `Customized for ${personalizedCurriculum.woundProfile.primary.customization.title}`,
            estimated_minutes: module.estimatedMinutes || 30,
            difficulty_level: index < 2 ? 'beginner' : index < 4 ? 'intermediate' : 'advanced',
            prerequisite_modules: index > 0 ? [personalizedCurriculum.modules[index - 1].id] : []
          }, {
            onConflict: 'client_id,module_id'
          });
      });

      await Promise.all(modulePromises);

      return { success: true, curriculum: personalizedCurriculum };
    } catch (error) {
      console.error('Error generating curriculum:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get personalized curriculum for client
   */
  async getPersonalizedCurriculum(clientId) {
    try {
      const { data, error } = await supabase
        .from('personalized_curriculum')
        .select('*')
        .eq('client_id', clientId)
        .order('module_order', { ascending: true });

      if (error) throw error;

      return { success: true, modules: data || [] };
    } catch (error) {
      console.error('Error fetching curriculum:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get specific module
   */
  async getModule(clientId, moduleId) {
    try {
      const { data, error } = await supabase
        .from('personalized_curriculum')
        .select('*')
        .eq('client_id', clientId)
        .eq('module_id', moduleId)
        .single();

      if (error) throw error;

      return { success: true, module: data };
    } catch (error) {
      console.error('Error fetching module:', error);
      return { success: false, error: error.message };
    }
  }
};

/**
 * Progress Tracking
 */
export const progressTracker = {
  /**
   * Save module progress
   */
  async saveModuleProgress(clientId, moduleId, progressData) {
    try {
      const { data, error } = await supabase
        .from('client_progress')
        .upsert({
          client_id: clientId,
          module_id: moduleId,
          activity_id: progressData.activityId,
          activity_type: progressData.activityType,
          current_step: progressData.currentStep,
          total_steps: progressData.totalSteps,
          completed_steps: progressData.completedSteps || [],
          completed: progressData.completed || false,
          responses: progressData.responses || {},
          client_notes: progressData.notes,
          insights: progressData.insights,
          started_at: progressData.startedAt || new Date().toISOString(),
          completed_at: progressData.completed ? new Date().toISOString() : null,
          time_spent_minutes: progressData.timeSpent,
          last_accessed: new Date().toISOString()
        }, {
          onConflict: 'client_id,module_id,activity_id'
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, progress: data };
    } catch (error) {
      console.error('Error saving progress:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get module progress
   */
  async getModuleProgress(clientId, moduleId) {
    try {
      const { data, error } = await supabase
        .from('client_progress')
        .select('*')
        .eq('client_id', clientId)
        .eq('module_id', moduleId);

      if (error) throw error;

      return { success: true, progress: data || [] };
    } catch (error) {
      console.error('Error fetching progress:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get all progress for client
   */
  async getAllProgress(clientId) {
    try {
      const { data, error } = await supabase
        .from('client_progress')
        .select('*')
        .eq('client_id', clientId)
        .order('last_accessed', { ascending: false });

      if (error) throw error;

      return { success: true, progress: data || [] };
    } catch (error) {
      console.error('Error fetching all progress:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get completion statistics
   */
  async getCompletionStats(clientId) {
    try {
      // Get all progress
      const { data: progressData, error: progressError } = await supabase
        .from('client_progress')
        .select('module_id, completed')
        .eq('client_id', clientId);

      if (progressError) throw progressError;

      // Get all modules
      const { data: modulesData, error: modulesError } = await supabase
        .from('personalized_curriculum')
        .select('module_id')
        .eq('client_id', clientId);

      if (modulesError) throw modulesError;

      const totalModules = modulesData?.length || 0;
      const completedActivities = progressData?.filter(p => p.completed).length || 0;
      const uniqueModulesStarted = new Set(progressData?.map(p => p.module_id)).size;
      const completedModules = progressData?.filter(p => p.completed)
        .map(p => p.module_id)
        .filter((v, i, a) => a.indexOf(v) === i).length || 0;

      return {
        success: true,
        stats: {
          totalModules,
          completedModules,
          modulesStarted: uniqueModulesStarted,
          completedActivities,
          overallProgress: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0
        }
      };
    } catch (error) {
      console.error('Error fetching completion stats:', error);
      return { success: false, error: error.message };
    }
  }
};

/**
 * Parts Management
 */
export const partsManager = {
  /**
   * Save identified part
   */
  async savePart(clientId, partData) {
    try {
      const { data, error } = await supabase
        .from('parts')
        .upsert({
          client_id: clientId,
          part_name: partData.name,
          part_type: partData.type,
          role: partData.role,
          description: partData.description,
          age_of_part: partData.age,
          visual_representation: partData.visualization,
          triggers: partData.triggers || [],
          behaviors: partData.behaviors || [],
          positive_intentions: partData.positiveIntentions || [],
          burdens: partData.burdens || [],
          origin_story: partData.originStory,
          trust_level: partData.trustLevel || 5,
          willingness_to_unblend: partData.willingnessToUnblend || 5,
          unburdening_status: partData.unburdeningStatus || 'not_started',
          related_wound: partData.relatedWound,
          discovered_in_module: partData.discoveredInModule,
          is_active: true
        }, {
          onConflict: 'client_id,part_name'
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, part: data };
    } catch (error) {
      console.error('Error saving part:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get all parts for client
   */
  async getAllParts(clientId) {
    try {
      const { data, error } = await supabase
        .from('parts')
        .select('*')
        .eq('client_id', clientId)
        .eq('is_active', true)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      return { success: true, parts: data || [] };
    } catch (error) {
      console.error('Error fetching parts:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Update part unburdening status
   */
  async updateUnburdeningStatus(clientId, partName, status, notes) {
    try {
      const { data, error } = await supabase
        .from('parts')
        .update({
          unburdening_status: status,
          unburdening_date: status === 'completed' ? new Date().toISOString() : null,
          transformation_notes: notes
        })
        .eq('client_id', clientId)
        .eq('part_name', partName)
        .select()
        .single();

      if (error) throw error;

      return { success: true, part: data };
    } catch (error) {
      console.error('Error updating unburdening status:', error);
      return { success: false, error: error.message };
    }
  }
};

/**
 * Journal Management
 */
export const journalManager = {
  /**
   * Save journal entry
   */
  async saveEntry(clientId, entryData) {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          client_id: clientId,
          title: entryData.title,
          content: entryData.content,
          mood: entryData.mood,
          mood_intensity: entryData.moodIntensity,
          emotions: entryData.emotions || [],
          parts_identified: entryData.partsIdentified || [],
          parts_dialogue: entryData.partsDialogue || {},
          related_wound: entryData.relatedWound,
          related_module: entryData.relatedModule,
          tags: entryData.tags || [],
          is_breakthrough: entryData.isBreakthrough || false,
          is_private: entryData.isPrivate !== false,
          shared_with_therapist: entryData.sharedWithTherapist || false
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, entry: data };
    } catch (error) {
      console.error('Error saving journal entry:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get all journal entries
   */
  async getAllEntries(clientId) {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { success: true, entries: data || [] };
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get entries by wound type
   */
  async getEntriesByWound(clientId, woundType) {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('client_id', clientId)
        .eq('related_wound', woundType)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { success: true, entries: data || [] };
    } catch (error) {
      console.error('Error fetching wound-specific entries:', error);
      return { success: false, error: error.message };
    }
  }
};

/**
 * Milestones Management
 */
export const milestonesManager = {
  /**
   * Record milestone achievement
   */
  async recordMilestone(clientId, milestoneData) {
    try {
      const { data, error } = await supabase
        .from('milestones')
        .insert({
          client_id: clientId,
          milestone_type: milestoneData.type,
          title: milestoneData.title,
          description: milestoneData.description,
          related_module: milestoneData.relatedModule,
          related_wound: milestoneData.relatedWound,
          related_part: milestoneData.relatedPart,
          celebration_message: milestoneData.celebrationMessage,
          badge_earned: milestoneData.badge,
          points_earned: milestoneData.points || 0
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, milestone: data };
    } catch (error) {
      console.error('Error recording milestone:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get all milestones
   */
  async getAllMilestones(clientId) {
    try {
      const { data, error } = await supabase
        .from('milestones')
        .select('*')
        .eq('client_id', clientId)
        .order('achieved_at', { ascending: false });

      if (error) throw error;

      return { success: true, milestones: data || [] };
    } catch (error) {
      console.error('Error fetching milestones:', error);
      return { success: false, error: error.message };
    }
  }
};

export default {
  clientAuth,
  assessmentManager,
  curriculumManager,
  progressTracker,
  partsManager,
  journalManager,
  milestonesManager
};