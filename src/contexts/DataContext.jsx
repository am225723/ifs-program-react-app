import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, supabaseHelpers } from '../lib/supabase';
import { clientAuth } from '../lib/supabasePersonalization';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      setLoading(true);
      const client = clientAuth.getCurrentClient();
      if (client?.id) {
        setUserId(client.id);
        await supabaseHelpers.saveUserData(client.id, {
          last_active: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error('Error initializing user:', err);
      const client = clientAuth.getCurrentClient();
      if (client?.id) setUserId(client.id);
    } finally {
      setLoading(false);
    }
  };

  const saveModuleProgress = useCallback(async (moduleId, progress) => {
    if (!userId) return;
    try {
      await supabaseHelpers.saveModuleProgress(userId, moduleId, progress);
    } catch (err) {
      console.error('Error saving module progress:', err);
    }
  }, [userId]);

  const getModuleProgress = useCallback(async (moduleId) => {
    if (!userId) return null;
    try {
      return await supabaseHelpers.getModuleProgress(userId, moduleId);
    } catch (err) {
      console.error('Error getting module progress:', err);
      return null;
    }
  }, [userId]);

  const getAllModuleProgress = useCallback(async () => {
    if (!userId) return [];
    try {
      return await supabaseHelpers.getAllModuleProgress(userId);
    } catch (err) {
      console.error('Error getting all progress:', err);
      return [];
    }
  }, [userId]);

  const saveInteractiveData = useCallback(async (moduleId, data) => {
    if (!userId) return;
    try {
      await supabaseHelpers.saveInteractiveData(userId, moduleId, data);
    } catch (err) {
      console.error('Error saving interactive data:', err);
    }
  }, [userId]);

  const getInteractiveData = useCallback(async (moduleId) => {
    if (!userId) return {};
    try {
      return await supabaseHelpers.getInteractiveData(userId, moduleId);
    } catch (err) {
      console.error('Error getting interactive data:', err);
      return {};
    }
  }, [userId]);

  const saveAssessment = useCallback(async (assessmentData) => {
    if (!userId) return null;
    try {
      return await supabaseHelpers.saveAssessment(userId, { ...assessmentData, user_id: userId });
    } catch (err) {
      console.error('Error saving assessment:', err);
      return null;
    }
  }, [userId]);

  const getAssessment = useCallback(async () => {
    if (!userId) return null;
    try {
      return await supabaseHelpers.getAssessment(userId);
    } catch (err) {
      console.error('Error getting assessment:', err);
      return null;
    }
  }, [userId]);

  const saveJournalEntry = useCallback(async (entry) => {
    if (!userId) return null;
    try {
      return await supabaseHelpers.saveJournalEntry(userId, entry);
    } catch (err) {
      console.error('Error saving journal entry:', err);
      return null;
    }
  }, [userId]);

  const getJournalEntries = useCallback(async () => {
    if (!userId) return [];
    try {
      return await supabaseHelpers.getJournalEntries(userId);
    } catch (err) {
      console.error('Error getting journal entries:', err);
      return [];
    }
  }, [userId]);

  const savePart = useCallback(async (partData) => {
    if (!userId) return null;
    try {
      return await supabaseHelpers.savePart(userId, partData);
    } catch (err) {
      console.error('Error saving part:', err);
      return null;
    }
  }, [userId]);

  const getParts = useCallback(async () => {
    if (!userId) return [];
    try {
      return await supabaseHelpers.getParts(userId);
    } catch (err) {
      console.error('Error getting parts:', err);
      return [];
    }
  }, []);

  const saveModuleAnswers = useCallback(async (moduleId, stepId, answers) => {
    if (!userId) return null;
    try {
      return await supabaseHelpers.saveModuleAnswers(userId, moduleId, stepId, {
        ...answers,
        savedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error saving module answers:', err);
      return null;
    }
  }, [userId]);

  const getModuleAnswers = useCallback(async (moduleId, stepId) => {
    if (!userId) return {};
    try {
      return await supabaseHelpers.getModuleAnswers(userId, moduleId, stepId);
    } catch (err) {
      console.error('Error getting module answers:', err);
      return {};
    }
  }, [userId]);

  const getAllModuleAnswers = useCallback(async (moduleId) => {
    if (!userId) return [];
    try {
      return await supabaseHelpers.getAllModuleAnswers(userId, moduleId);
    } catch (err) {
      console.error('Error getting all module answers:', err);
      return [];
    }
  }, [userId]);

  const saveExerciseProgress = useCallback(async (exerciseId, progress) => {
    if (!userId) return null;
    try {
      return await supabaseHelpers.saveExerciseProgress(userId, exerciseId, progress);
    } catch (err) {
      console.error('Error saving exercise progress:', err);
      return null;
    }
  }, [userId]);

  const getExerciseProgress = useCallback(async () => {
    if (!userId) return [];
    try {
      return await supabaseHelpers.getExerciseProgress(userId);
    } catch (err) {
      console.error('Error getting exercise progress:', err);
      return [];
    }
  }, [userId]);

  const clearAllData = useCallback(() => {
    setUserId(null);
    initializeUser();
  }, []);

  const value = {
    userId,
    loading,
    error,
    saveModuleProgress,
    getModuleProgress,
    getAllModuleProgress,
    saveInteractiveData,
    getInteractiveData,
    saveAssessment,
    getAssessment,
    saveJournalEntry,
    getJournalEntries,
    savePart,
    getParts,
    saveExerciseProgress,
    getExerciseProgress,
    saveModuleAnswers,
    getModuleAnswers,
    getAllModuleAnswers,
    clearAllData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
