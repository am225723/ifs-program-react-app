import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock,
  Heart,
  Brain,
  Sparkles,
  BookOpen,
  Users,
  Target
} from 'lucide-react';

const LearningModuleRenderer = ({ userProgress = {} }) => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  // Helper function to generate default steps for personalized modules\n  const generateDefaultStepsForPersonalizedModule = (module) => {\n    const baseSteps = [];\n    \n    // Add introduction step\n    baseSteps.push({\n      type: "learn",\n      data: {\n        title: module.title || "Welcome to Your Personalized Module",\n        content: module.description || "This module has been personalized based on your assessment results.",\n        keyPoints: module.personalizedContent?.healingGoals || ["Begin your healing journey"]\n      }\n    });\n    \n    // Add wound-specific content if available\n    if (module.personalizedContent?.woundFocus) {\n      baseSteps.push({\n        type: "learn",\n        data: {\n          title: `Focus: ${module.personalizedContent.woundFocus}`,\n          content: `This module is specifically designed to address ${module.personalizedContent.woundFocus} patterns.`,\n          keyPoints: module.personalizedContent.healingGoals || []\n        }\n      });\n    }\n    \n    // Add activity step\n    baseSteps.push({\n      type: "activity",\n      data: {\n        title: "Personalized Reflection Activity",\n        instruction: "Take a moment to reflect on your personal healing journey.",\n        prompts: module.personalizedContent?.activities || ["What are you noticing in your body right now?"]\n      }\n    });\n    \n    // Add completion step\n    baseSteps.push({\n      type: "result",\n      data: {\n        title: "Module Complete",\n        completionMessage: `Congratulations! You have completed the personalized module for ${module.personalizedContent?.woundFocus || "your healing journey"}.`\n      }\n    });\n    \n    return baseSteps;\n  };
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    loadModule();
  }, [moduleId]);

  const loadModule = async () => {
    try {
      setIsLoading(true);
      
      // Try to load from personalized curriculum first
      const personalizedCurriculum = localStorage.getItem('personalizedCurriculum');
      let targetModule = null;

      if (personalizedCurriculum) {
        const curriculum = JSON.parse(personalizedCurriculum);
        targetModule = curriculum.personalizedModules?.find(m => m.id === moduleId);
      // If not found in personalized curriculum, load from default modules
      if (!targetModule) {
        const { curriculumModules } = await import("../data/curriculumData.js");
        targetModule = curriculumModules.find(m => m.id === moduleId);
      }

      // If found in personalized curriculum but missing steps, add them
      if (targetModule && !targetModule.steps && personalizedCurriculum) {
        targetModule.steps = generateDefaultStepsForPersonalizedModule(targetModule);
        targetModule.estimatedTime = targetModule.estimatedTime || `${targetModule.estimatedMinutes || 30} minutes`;
      }
        targetModule = curriculumModules.find(m => m.id === moduleId);
      }

      if (targetModule) {
        setModule(targetModule);
        
        // Load progress
        const savedProgress = userProgress[moduleId] || {};
        setProgress(savedProgress);
        setCurrentStep(savedProgress.currentStep || 0);
        setIsCompleted(savedProgress.isCompleted || false);
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

  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    
    // Save progress
    const updatedProgress = {
      ...progress,
      currentStep: nextStep,
      completedSteps: [...(progress.completedSteps || []), currentStep],
      lastAccessed: new Date().toISOString()
    };
    setProgress(updatedProgress);
    saveProgress(updatedProgress);

    // Check if module is completed
    if (nextStep >= getTotalSteps()) {
      completeModule();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTotalSteps = () => {
    return module?.content?.length || 5; // Default to 5 steps
  };

  const completeModule = () => {
    setIsCompleted(true);
    
    const completedProgress = {
      ...progress,
      isCompleted: true,
      completedAt: new Date().toISOString(),
      completedSteps: Array.from({ length: getTotalSteps() }, (_, i) => i)
    };
    setProgress(completedProgress);
    saveProgress(completedProgress);

    // Save to user progress
    const userModules = userProgress.completedModules || [];
    if (!userModules.includes(moduleId)) {
      userModules.push(moduleId);
      // Here you would also save to backend/localStorage
    }
  };

  const saveProgress = (progressData) => {
    // Save to localStorage for now - in production, save to backend
    const allProgress = JSON.parse(localStorage.getItem('moduleProgress') || '{}');
    allProgress[moduleId] = progressData;
    localStorage.setItem('moduleProgress', JSON.stringify(allProgress));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your learning module...</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h2>
          <Link to="/curriculum" className="text-purple-600 hover:text-purple-700">
            ← Back to Curriculum
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = Math.round(((currentStep + 1) / getTotalSteps()) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/curriculum"
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Curriculum</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{module.title}</h1>
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
            </div>
            {module.personalizedContent && (
              <div className="flex items-center space-x-2 text-purple-600">
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Personalized</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {getTotalSteps()}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {progressPercentage}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Module Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isCompleted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Module Completed!</h2>
            <p className="text-gray-600 mb-8">
              Congratulations! You've successfully completed "{module.title}"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/curriculum"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Continue Your Journey
              </Link>
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setIsCompleted(false);
                }}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Review Module
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Personalized Content Banner */}
            {module.personalizedContent && currentStep === 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized for Your Healing Journey</h3>
                    <p className="text-gray-700">
                      {module.personalizedContent.message || 'This module has been tailored to your specific wound pattern and healing needs.'}
                    </p>
                    {module.personalizedContent.woundFocus && (
                      <div className="mt-2 text-sm text-purple-700">
                        <strong>Focus:</strong> {module.personalizedContent.woundFocus}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Module Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {renderModuleContent(module, currentStep, module.personalizedContent)}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{module.estimatedMinutes} min total</span>
              </div>

              <button
                onClick={handleNextStep}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                {currentStep === getTotalSteps() - 1 ? 'Complete Module' : 'Next Step'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to render module content based on step
const renderModuleContent = (module, step, personalizedContent) => {
  // This would normally load dynamic content based on the module and step
  // For now, we'll create placeholder content
  
  const contentSteps = [
    {
      title: "Introduction",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to {module.title}</h3>
            <p className="text-gray-700 leading-relaxed">
              {module.description}
            </p>
          </div>
          
          {personalizedContent && (
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Your Personalized Focus</h4>
              <ul className="space-y-2 text-purple-800">
                {personalizedContent.healingGoals?.slice(0, 3).map((goal, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What You'll Learn</h4>
            <p className="text-blue-800">
              In this module, you'll gain practical tools and insights to support your healing journey.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Core Concepts",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Understanding the Concepts</h3>
          <p className="text-gray-700">
            Let's explore the key concepts that will support your healing process.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Concept 1</h4>
              <p className="text-gray-700">Explanation of the first key concept</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Concept 2</h4>
              <p className="text-gray-700">Explanation of the second key concept</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Practice Exercise",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Guided Practice</h3>
          <p className="text-gray-700">
            Time to put these concepts into practice with a guided exercise.
          </p>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-900">Exercise Instructions</h4>
            </div>
            <p className="text-green-800">
              Follow these step-by-step instructions for your practice exercise...
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Reflection",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Reflection & Integration</h3>
          <p className="text-gray-700">
            Take time to reflect on your experience and integrate what you've learned.
          </p>
          <div className="bg-yellow-50 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-900 mb-2">Journal Prompts</h4>
            <ul className="space-y-2 text-yellow-800">
              <li>• What did you notice during this exercise?</li>
              <li>• How does this relate to your healing journey?</li>
              <li>• What insights emerged for you?</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Next Steps",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Continuing Your Journey</h3>
          <p className="text-gray-700">
            Here's how to continue applying what you've learned in your daily life.
          </p>
          <div className="bg-purple-50 rounded-lg p-6">
            <h4 className="font-semibold text-purple-900 mb-2">Daily Practice</h4>
            <p className="text-purple-800">
              Incorporate these practices into your daily routine to continue your healing progress.
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentContent = contentSteps[step] || contentSteps[0];
  
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">{currentContent.title}</h2>
      {currentContent.content}
    </div>
  );
};

export default LearningModuleRenderer;