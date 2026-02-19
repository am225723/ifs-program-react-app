import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import LearningModuleEnhanced from './LearningModuleEnhanced';
import { useData } from '../contexts/DataContext';
import { supabaseHelpers } from '../lib/supabase';
import { clientAuth } from '../lib/supabasePersonalization';

const LearningModuleRenderer = ({ userProgress = {} }) => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const generateDefaultStepsForPersonalizedModule = (mod) => {
    const baseSteps = [];
    baseSteps.push({
      type: "learn",
      data: {
        id: `learn-intro-${mod.id}`,
        title: mod.title || "Welcome to Your Personalized Module",
        content: [mod.description || "This module has been personalized based on your assessment results."],
        keyTakeaways: mod.personalizedContent?.healingGoals || ["Begin your healing journey"]
      }
    });
    if (mod.personalizedContent?.woundFocus) {
      baseSteps.push({
        type: "learn",
        data: {
          id: `learn-focus-${mod.id}`,
          title: `Focus: ${mod.personalizedContent.woundFocus}`,
          content: [`This module is specifically designed to address ${mod.personalizedContent.woundFocus} patterns.`],
          keyTakeaways: mod.personalizedContent.healingGoals || []
        }
      });
    }
    baseSteps.push({
      type: "activity",
      data: {
        id: `activity-reflection-${mod.id}`,
        title: "Personalized Reflection Activity",
        description: "Take a moment to reflect on your personal healing journey.",
        type: 'reflection',
        prompt: "Take a moment to reflect on your personal healing journey.",
        questions: mod.personalizedContent?.activities || ["What are you noticing in your body right now?"],
        interactiveElements: []
      }
    });
    baseSteps.push({
      type: "result",
      data: {
        id: `result-${mod.id}`,
        title: "Module Complete",
        completionMessage: `Congratulations! You have completed the personalized module for ${mod.personalizedContent?.woundFocus || "your healing journey"}.`
      }
    });
    return baseSteps;
  };

  useEffect(() => {
    loadModule();
  }, [moduleId]);

  const loadModule = async () => {
    try {
      setIsLoading(true);
      const client = clientAuth.getCurrentClient();
      const clientId = client?.id;
      let personalizedCurriculum = null;
      let targetModule = null;

      if (clientId) {
        try {
          personalizedCurriculum = await supabaseHelpers.getPersonalizedCurriculum(clientId);
        } catch (err) {
          console.error('Error loading personalized curriculum:', err);
        }
      }

      if (personalizedCurriculum) {
        targetModule = personalizedCurriculum.personalizedModules?.find(m => m.id === moduleId);
      }

      if (!targetModule) {
        const { curriculumModules } = await import("../data/curriculumData.js");
        targetModule = curriculumModules.find(m => m.id === moduleId);
      }

      if (targetModule && !targetModule.steps && personalizedCurriculum) {
        targetModule.steps = generateDefaultStepsForPersonalizedModule(targetModule);
        targetModule.estimatedTime = targetModule.estimatedTime || `${targetModule.estimatedMinutes || 30} minutes`;
      }

      if (targetModule) {
        setModule(targetModule);
      } else {
        console.error('Module not found:', moduleId);
        navigate('/curriculum');
      }
    } catch (error) {
      console.error('Error loading module:', error);
      navigate('/curriculum');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    navigate('/curriculum');
  };

  const handleBack = () => {
    navigate('/curriculum');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your learning module...</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h2>
          <Link to="/curriculum" className="text-amber-600 hover:text-amber-700">
            <ChevronLeft className="w-4 h-4 inline" /> Back to Curriculum
          </Link>
        </div>
      </div>
    );
  }

  return (
    <LearningModuleEnhanced
      module={module}
      onComplete={handleComplete}
      onBack={handleBack}
      userProgress={userProgress}
    />
  );
};

export default LearningModuleRenderer;
