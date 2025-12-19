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
  Target,
  ArrowRight,
  Award
} from 'lucide-react';

const LearningModuleRenderer = ({ userProgress = {} }) => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  // Helper function to generate default steps for personalized modules
  const generateDefaultStepsForPersonalizedModule = (module) => {
    const baseSteps = [];

    // Add introduction step
    baseSteps.push({
      type: "learn",
      data: {
        title: module.title || "Welcome to Your Personalized Module",
        content: module.description || "This module has been personalized based on your assessment results.",
        keyPoints: module.personalizedContent?.healingGoals || ["Begin your healing journey"]
      }
    });

    // Add wound-specific content if available
    if (module.personalizedContent?.woundFocus) {
      baseSteps.push({
        type: "learn",
        data: {
          title: `Focus: ${module.personalizedContent.woundFocus}`,
          content: `This module is specifically designed to address ${module.personalizedContent.woundFocus} patterns.`,
          keyPoints: module.personalizedContent.healingGoals || []
        }
      });
    }

    // Add activity step
    baseSteps.push({
      type: "activity",
      data: {
        title: "Personalized Reflection Activity",
        instruction: "Take a moment to reflect on your personal healing journey.",
        prompts: module.personalizedContent?.activities || ["What are you noticing in your body right now?"]
      }
    });

    // Add completion step
    baseSteps.push({
      type: "result",
      data: {
        title: "Module Complete",
        completionMessage: `Congratulations! You have completed the personalized module for ${module.personalizedContent?.woundFocus || "your healing journey"}.`
      }
    });

    return baseSteps;
  };
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
      }
      
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
    return module?.steps?.length || module?.content?.length || 5; // Default to 5 steps
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
  // Use actual module steps if available, otherwise create default content
  const moduleSteps = module?.steps || [];
  
  // If we have actual steps from the curriculum, use them
  if (moduleSteps.length > 0 && step < moduleSteps.length) {
    const currentStep = moduleSteps[step];
    return renderActualStep(currentStep, personalizedContent);
  }
  
  // Fallback to default content structure
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

// New function to render actual module steps from curriculum data
const renderActualStep = (step, personalizedContent) => {
  if (!step) return <div>No content available for this step</div>;
  
  const stepType = step.type || 'learn';
  const stepData = step.data || {};
  
  switch (stepType) {
    case 'learn':
      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{stepData.title || 'Learning Content'}</h3>
          
          {stepData.content && (
            <div className="space-y-4">
              {stepData.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          
          {stepData.bullets && (
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Key Points</h4>
              <ul className="space-y-2 text-purple-800">
                {stepData.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {stepData.keyTakeaways && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Key Takeaways</h4>
              <ul className="space-y-2 text-blue-800">
                {stepData.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {stepData.reflectionPrompts && (
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Reflection Questions</h4>
              <ul className="space-y-2 text-yellow-800">
                {stepData.reflectionPrompts.map((prompt, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="font-medium text-yellow-700">{index + 1}.</span>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
      
    case 'activity':
      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{stepData.title || 'Activity'}</h3>
          
          {stepData.description && (
            <p className="text-gray-700 leading-relaxed mb-4">
              {stepData.description}
            </p>
          )}
          
          {stepData.prompt && (
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">Activity Instructions</h4>
              <p className="text-green-800 leading-relaxed">
                {stepData.prompt}
              </p>
            </div>
          )}
          
          {stepData.questions && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Reflection Questions</h4>
              {stepData.questions.map((question, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800">
                    <span className="font-medium text-purple-600">Question {index + 1}:</span> {question}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          {stepData.guidedSteps && (
            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-3">Guided Steps</h4>
              <ol className="space-y-3 text-purple-800">
                {stepData.guidedSteps.map((guidedStep, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="font-bold text-purple-600">{index + 1}.</span>
                    <span>{guidedStep}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      );
      
    case 'result':
      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{stepData.title || 'Module Complete'}</h3>
          
          {stepData.description && (
            <p className="text-gray-700 leading-relaxed mb-4">
              {stepData.description}
            </p>
          )}
          
          {stepData.completionMessage && (
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">Congratulations!</h4>
              <p className="text-green-800 leading-relaxed">
                {stepData.completionMessage}
              </p>
            </div>
          )}
          
          {stepData.nextSteps && (
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Next Steps</h4>
              <ul className="space-y-2 text-blue-800">
                {stepData.nextSteps.map((nextStep, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                    <span>{nextStep}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {stepData.achievement && (
            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-3">Achievement Unlocked</h4>
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-purple-600" />
                <span className="text-purple-800 font-medium">{stepData.achievement}</span>
              </div>
            </div>
          )}
        </div>
      );
      
    default:
      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Module Content</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700">
              Content for this step is being prepared. This module is part of your personalized healing journey.
            </p>
          </div>
        </div>
      );
  }
};

export default LearningModuleRenderer;
