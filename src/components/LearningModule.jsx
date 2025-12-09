import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Heart, 
  Target,
  Lightbulb,
  Award,
  Pause,
  Play,
  RotateCcw,
  Save,
  Share,
  Download
} from 'lucide-react';

const LearningModule = ({ module, onComplete, onBack, userProgress = {} }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activityResponses, setActivityResponses] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const steps = module.steps || [];
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  // Load saved progress
  useEffect(() => {
    if (userProgress[module.id]) {
      const savedStep = userProgress[module.id].currentStep || 0;
      const savedResponses = userProgress[module.id].responses || {};
      const savedCompletedSteps = userProgress[module.id].completedSteps || [];
      
      setCurrentStepIndex(savedStep);
      setActivityResponses(savedResponses);
      setCompletedSteps(savedCompletedSteps);
    }
  }, [module.id, userProgress]);

  // Save progress
  const saveProgress = () => {
    const progress = {
      currentStep: currentStepIndex,
      responses: activityResponses,
      completedSteps: completedSteps,
      lastAccessed: new Date().toISOString()
    };
    
    localStorage.setItem(`module-progress-${module.id}`, JSON.stringify(progress));
    
    // Notify parent component
    if (typeof window !== 'undefined' && window.onModuleProgress) {
      window.onModuleProgress(module.id, progress);
    }
  };

  // Auto-save progress
  useEffect(() => {
    const timer = setTimeout(saveProgress, 1000);
    return () => clearTimeout(timer);
  }, [currentStepIndex, activityResponses, completedSteps]);

  // Handle step completion
  const completeStep = () => {
    if (!completedSteps.includes(currentStepIndex)) {
      const newCompleted = [...completedSteps, currentStepIndex];
      setCompletedSteps(newCompleted);
    }
  };

  // Handle activity response
  const handleActivityResponse = (questionId, response) => {
    setActivityResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  // Navigate to next step
  const nextStep = () => {
    completeStep();
    if (isLastStep) {
      completeModule();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  // Navigate to previous step
  const previousStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // Complete module
  const completeModule = () => {
    setIsCompleted(true);
    completeStep();
    
    // Save completion
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    if (!completedModules.includes(module.id)) {
      completedModules.push(module.id);
      localStorage.setItem('completedModules', JSON.stringify(completedModules));
    }
    
    if (onComplete) {
      onComplete(module);
    }
  };

  // Reset module
  const resetModule = () => {
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    setActivityResponses({});
    setIsCompleted(false);
    setShowCertificate(false);
    localStorage.removeItem(`module-progress-${module.id}`);
  };

  // Render Learn section
  const renderLearnSection = (step) => {
    const data = step.data;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
            <p className="text-gray-600">Educational Content</p>
          </div>
        </div>

        <div className="prose max-w-none">
          {data.content.map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {data.bullets && data.bullets.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Points:</h3>
            <ul className="space-y-2">
              {data.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.keyTakeaways && data.keyTakeaways.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Key Takeaways:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.keyTakeaways.map((takeaway, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.reflectionPrompts && data.reflectionPrompts.length > 0 && (
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🤔 Reflection Prompts:</h3>
            <div className="space-y-3">
              {data.reflectionPrompts.map((prompt, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-yellow-600 font-bold mt-1">Q{index + 1}.</span>
                  <p className="text-gray-700 italic">{prompt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Activity section
  const renderActivitySection = (step) => {
    const data = step.data;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
            <p className="text-gray-600">Interactive Activity</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-6 border border-teal-100">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{data.prompt}</p>
        </div>

        {data.questions && data.questions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Reflection Questions:</h3>
            {data.questions.map((question, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question {index + 1}
                </label>
                <p className="text-gray-900 mb-3">{question}</p>
                <textarea
                  value={activityResponses[`question-${index}`] || ''}
                  onChange={(e) => handleActivityResponse(`question-${index}`, e.target.value)}
                  placeholder="Share your thoughts and reflections here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  rows={4}
                />
              </div>
            ))}
          </div>
        )}

        {data.guidedSteps && data.guidedSteps.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Guided Steps:</h3>
            <div className="space-y-3">
              {data.guidedSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.interactiveElements && data.interactiveElements.includes('guided-meditation') && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🧘‍♀️ Guided Meditation</h3>
            <div className="flex items-center space-x-4">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Start Meditation</span>
              </button>
              <span className="text-sm text-gray-600">10-15 minutes</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Result section
  const renderResultSection = (step) => {
    const data = step.data;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
            <p className="text-gray-600">Module Completion</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-8 border border-yellow-100 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Congratulations! 🎉</h3>
          <p className="text-lg text-gray-700 mb-6">{data.completionMessage}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowCertificate(true)}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Certificate</span>
            </button>
            <button
              onClick={() => window.print()}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-medium border border-orange-300 hover:bg-orange-50 transition-colors flex items-center space-x-2"
            >
              <Share className="w-5 h-5" />
              <span>Share Progress</span>
            </button>
          </div>
        </div>

        {data.nextSteps && data.nextSteps.length > 0 && (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Next Steps:</h3>
            <div className="space-y-3">
              {data.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.achievement && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">Achievement Unlocked!</h4>
            <p className="text-lg">{data.achievement}</p>
          </div>
        )}
      </div>
    );
  };

  // Render current step content
  const renderStepContent = () => {
    if (!currentStep) return null;

    switch (currentStep.type) {
      case 'learn':
        return renderLearnSection(currentStep);
      case 'activity':
        return renderActivitySection(currentStep);
      case 'result':
        return renderResultSection(currentStep);
      default:
        return <div>Unknown step type</div>;
    }
  };

  // Render certificate modal
  const renderCertificate = () => {
    if (!showCertificate) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Certificate of Completion</h2>
              <p className="text-lg text-gray-600">Inner Child Healing Journey</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{module.title}</h3>
              <p className="text-gray-700 mb-4">{module.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Completed: {new Date().toLocaleDateString()}</span>
                <span>Duration: {module.estimatedMinutes} minutes</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowCertificate(false)}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  setShowCertificate(false);
                }}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Print Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!currentStep) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading module...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{module.title}</h1>
                <p className="text-sm text-gray-600">
                  Step {currentStepIndex + 1} of {steps.length} • {currentStep.type}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={saveProgress}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Save Progress"
              >
                <Save className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={resetModule}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Reset Module"
              >
                <RotateCcw className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{module.estimatedMinutes} min</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={previousStep}
            disabled={isFirstStep}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              isFirstStep
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-4">
            {completedSteps.includes(currentStepIndex) && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Step Completed</span>
              </div>
            )}
          </div>

          <button
            onClick={nextStep}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center space-x-2 shadow-lg"
          >
            <span>{isLastStep ? 'Complete Module' : 'Next Step'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Certificate Modal */}
      {renderCertificate()}
    </div>
  );
};

export default LearningModule;