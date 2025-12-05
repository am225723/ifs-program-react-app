import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, supabaseHelpers } from '../lib/supabase';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize user on app start
  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      setLoading(true);
      
      // Check for existing user ID in localStorage
      let existingUserId = localStorage.getItem('ifs-user-id');
      
      if (!existingUserId) {
        // Generate new anonymous user ID
        existingUserId = supabaseHelpers.generateUserId();
        localStorage.setItem('ifs-user-id', existingUserId);
      }
      
      setUserId(existingUserId);
      
      // Create or update user in database
      await supabaseHelpers.saveUserData(existingUserId, {
        last_active: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error initializing user:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Module progress functions
  const saveModuleProgress = useCallback(async (moduleId, progress) => {
    if (!userId) return;
    
    try {
      // Save to Supabase
      await supabaseHelpers.saveModuleProgress(userId, moduleId, progress);
      
      // Also save to localStorage as backup
      localStorage.setItem(`module-progress-${moduleId}`, JSON.stringify({
        ...progress,
        lastSaved: new Date().toISOString()
      }));
      
    } catch (error) {
      console.error('Error saving module progress:', error);
      // Fallback to localStorage only
      localStorage.setItem(`module-progress-${moduleId}`, JSON.stringify({
        ...progress,
        lastSaved: new Date().toISOString()
      }));
    }
  }, [userId]);

  const getModuleProgress = useCallback(async (moduleId) => {
    if (!userId) return null;
    
    try {
      // Try to get from Supabase first
      let data = await supabaseHelpers.getModuleProgress(userId, moduleId);
      
      // If no data from Supabase, try localStorage
      if (!data) {
        const localData = localStorage.getItem(`module-progress-${moduleId}`);
        if (localData) {
          data = JSON.parse(localData);
          // Sync with Supabase in background
          supabaseHelpers.saveModuleProgress(userId, moduleId, data);
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error getting module progress:', error);
      // Fallback to localStorage
      const localData = localStorage.getItem(`module-progress-${moduleId}`);
      return localData ? JSON.parse(localData) : null;
    }
  }, [userId]);

  const getAllModuleProgress = useCallback(async () => {
    if (!userId) return [];
    
    try {
      const data = await supabaseHelpers.getAllModuleProgress(userId);
      
      // Merge with localStorage data
      const mergedData = {};
      
      // Process Supabase data
      data.forEach(progress => {
        mergedData[progress.module_id] = progress;
      });
      
      // Add any localStorage data not in Supabase
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('module-progress-')) {
          const moduleId = key.replace('module-progress-', '');
          const localData = localStorage.getItem(key);
          if (localData && !mergedData[moduleId]) {
            try {
              const parsed = JSON.parse(localData);
              mergedData[moduleId] = parsed;
              // Sync to Supabase in background
              supabaseHelpers.saveModuleProgress(userId, moduleId, parsed);
            } catch (e) {
              console.warn('Error parsing local data:', e);
            }
          }
        }
      }
      
      return Object.values(mergedData);
    } catch (error) {
      console.error('Error getting all progress:', error);
      return [];
    }
  }, [userId]);

  // Interactive data functions
  const saveInteractiveData = useCallback(async (moduleId, data) => {
    if (!userId) return;
    
    try {
      // Save to Supabase
      await supabaseHelpers.saveInteractiveData(userId, moduleId, data);
      
      // Backup to localStorage
      localStorage.setItem(`interactive-data-${moduleId}`, JSON.stringify(data));
      
    } catch (error) {
      console.error('Error saving interactive data:', error);
      // Fallback to localStorage
      localStorage.setItem(`interactive-data-${moduleId}`, JSON.stringify(data));
    }
  }, [userId]);

  const getInteractiveData = useCallback(async (moduleId) => {
    if (!userId) return {};
    
    try {
      // Try Supabase first
      let data = await supabaseHelpers.getInteractiveData(userId, moduleId);
      
      // Fallback to localStorage
      if (!data) {
        const localData = localStorage.getItem(`interactive-data-${moduleId}`);
        if (localData) {
          try {
            data = JSON.parse(localData);
            // Sync to Supabase in background
            supabaseHelpers.saveInteractiveData(userId, moduleId, data);
          } catch (e) {
            console.warn('Error parsing local interactive data:', e);
            data = {};
          }
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error getting interactive data:', error);
      // Fallback to localStorage
      const localData = localStorage.getItem(`interactive-data-${moduleId}`);
      return localData ? JSON.parse(localData) : {};
    }
  }, [userId]);

  // Assessment functions
  const saveAssessment = useCallback(async (assessmentData) => {
    if (!userId) return null;
    
    try {
      const data = await supabaseHelpers.saveAssessment(userId, {
        ...assessmentData,
        user_id: userId
      });
      
      // Backup to localStorage
      localStorage.setItem('assessment-data', JSON.stringify(assessmentData));
      
      return data;
    } catch (error) {
      console.error('Error saving assessment:', error);
      // Fallback to localStorage
      localStorage.setItem('assessment-data', JSON.stringify(assessmentData));
      return null;
    }
  }, [userId]);

  const getAssessment = useCallback(async () => {
    if (!userId) return null;
    
    try {
      let data = await supabaseHelpers.getAssessment(userId);
      
      // Fallback to localStorage
      if (!data) {
        const localData = localStorage.getItem('assessment-data');
        if (localData) {
          try {
            data = JSON.parse(localData);
            // Sync to Supabase in background
            supabaseHelpers.saveAssessment(userId, data);
          } catch (e) {
            console.warn('Error parsing local assessment data:', e);
            data = null;
          }
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error getting assessment:', error);
      // Fallback to localStorage
      const localData = localStorage.getItem('assessment-data');
      return localData ? JSON.parse(localData) : null;
    }
  }, [userId]);

  // Journal functions
  const saveJournalEntry = useCallback(async (entry) => {
    if (!userId) return null;
    
    try {
      const data = await supabaseHelpers.saveJournalEntry(userId, entry);
      
      // Sync with localStorage (keep recent entries)
      const localEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]');
      localEntries.unshift(data);
      // Keep only last 10 entries in localStorage
      localStorage.setItem('journal-entries', JSON.stringify(localEntries.slice(0, 10)));
      
      return data;
    } catch (error) {
      console.error('Error saving journal entry:', error);
      // Fallback to localStorage only
      const localEntry = {
        ...entry,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      const localEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]');
      localEntries.unshift(localEntry);
      localStorage.setItem('journal-entries', JSON.stringify(localEntries.slice(0, 10)));
      return localEntry;
    }
  }, [userId]);

  const getJournalEntries = useCallback(async () => {
    if (!userId) return [];
    
    try {
      let data = await supabaseHelpers.getJournalEntries(userId);
      
      // If Supabase data is empty, try localStorage
      if (!data || data.length === 0) {
        const localData = localStorage.getItem('journal-entries');
        if (localData) {
          try {
            data = JSON.parse(localData);
            // Sync to Supabase in background
            data.forEach(entry => {
              if (!entry.synced) {
                supabaseHelpers.saveJournalEntry(userId, entry);
                entry.synced = true;
              }
            });
          } catch (e) {
            console.warn('Error parsing local journal data:', e);
            data = [];
          }
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error getting journal entries:', error);
      // Fallback to localStorage
      const localData = localStorage.getItem('journal-entries');
      return localData ? JSON.parse(localData) : [];
    }
  }, [userId]);

  // Parts functions
  const savePart = useCallback(async (partData) => {
    if (!userId) return null;
    
    try {
      const data = await supabaseHelpers.savePart(userId, partData);
      
      // Sync with localStorage
      const localParts = JSON.parse(localStorage.getItem('parts') || '{}');
      localParts[partData.id] = { ...partData, synced: true };
      localStorage.setItem('parts', JSON.stringify(localParts));
      
      return data;
    } catch (error) {
      console.error('Error saving part:', error);
      // Fallback to localStorage only
      const localParts = JSON.parse(localStorage.getItem('parts') || '{}');
      const localPart = { ...partData, id: Date.now().toString() };
      localParts[partData.id || localPart.id] = localPart;
      localStorage.setItem('parts', JSON.stringify(localParts));
      return localPart;
    }
  }, [userId]);

  const getParts = useCallback(async () => {
    if (!userId) return [];
    
    try {
      let data = await supabaseHelpers.getParts(userId);
      
      // If Supabase data is empty, try localStorage
      if (!data || data.length === 0) {
        const localData = localStorage.getItem('parts');
        if (localData) {
          try {
            const partsObj = JSON.parse(localData);
            data = Object.values(partsObj);
            // Sync to Supabase in background
            data.forEach(part => {
              if (!part.synced) {
                supabaseHelpers.savePart(userId, part);
                part.synced = true;
              }
            });
          } catch (e) {
            console.warn('Error parsing local parts data:', e);
            data = [];
          }
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error getting parts:', error);
      // Fallback to localStorage
      const localData = localStorage.getItem('parts');
      if (localData) {
        try {
          return Object.values(JSON.parse(localData));
        } catch (e) {
          console.warn('Error parsing local parts data:', e);
          return [];
        }
      }
      return [];
    }
  }, []);

  // Exercise progress functions
  const saveExerciseProgress = useCallback(async (exerciseId, progress) => {
    if (!userId) return null;
    
    try {
      const data = await supabaseHelpers.saveExerciseProgress(userId, exerciseId, progress);
      
      // Sync with localStorage
      const localProgress = JSON.parse(localStorage.getItem('exercise-progress') || '{}');
      localProgress[exerciseId] = { ...progress, synced: true };
      localStorage.setItem('exercise-progress', JSON.stringify(localProgress));
      
      return data;
    } catch (error) {
      console.error('Error saving exercise progress:', error);
      // Fallback to localStorage
      const localProgress = JSON.parse(localStorage.getItem('exercise-progress') || '{}');
      const newProgress = { ...progress, synced: false };
      localProgress[exerciseId] = newProgress;
      localStorage.setItem('exercise-progress', JSON.stringify(localProgress));
      return newProgress;
    }
  }, [userId]);

  const getExerciseProgress = useCallback(async () => {
    if (!userId) return [];
    
    try {
      let data = await supabaseHelpers.getExerciseProgress(userId);
      
      // If Supabase data is empty, try localStorage
      if (!data || data.length === 0) {
        const localData = localStorage.getItem('exercise-progress');
        if (localData) {
          try {
            const progressObj = JSON.parse(localData);
            data = Object.entries(progressObj).map(([exerciseId, progress]) => ({
              exercise_id: exerciseId,
              ...progress
            }));
            // Sync to Supabase in background
            data.forEach(progress => {
              if (!progress.synced) {
                supabaseHelpers.saveExerciseProgress(userId, progress.exercise_id, progress);
                progress.synced = true;
              }
            });
          } (e) {
            console.warn('Error parsing local exercise progress:', e);
            data = [];
          }
        }
      }
      
      return data;
    } catch (error) {
      console('Error getting exercise progress:', error);
      // Fallback to localStorage
      const localData = localStorage.getItem('exercise-progress');
      if (localData) {
        try {
          const progressObj = JSON.parse(localData);
          return Object.entries(progressObj).map(([exerciseId, progress]) => ({
            exercise_id: exerciseId,
            ...progress
          }));
        } catch (e) {
          console.warn('Error parsing local exercise progress:', e);
          return [];
        }
      }
      return [];
    }
  }, [userId]);

  // Clear all data
  const clearAllData = useCallback(() => {
    localStorage.clear();
    setUserId(null);
    // Reinitialize user
    initializeUser();
  }, []);

  const value = {
    // State
    userId,
    loading,
    error,
    
    // Module progress
    saveModuleProgress,
    getModuleProgress,
    getAllModuleProgress,
    
    // Interactive data
    saveInteractiveData,
    getInteractiveData,
    
    // Assessment
    saveAssessment,
    getAssessment,
    
    // Journal
    saveJournalEntry,
    getJournalEntries,
    
    // Parts
    savePart,
    getParts,
    
    // Exercise progress
    saveExerciseProgress,
    getExerciseProgress,
    
    // Utility
    clearAllData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;