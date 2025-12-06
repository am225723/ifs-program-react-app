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
  Download,
  User,
  MapPin,
  Brain,
  Activity,
  TrendingUp,
  Star
} from 'lucide-react';
import { useData } from '../contexts/DataContext';

const LearningModuleEnhanced = ({ module, onComplete, onBack, userProgress = {} }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activityResponses, setActivityResponses] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [interactiveData, setInteractiveData] = useState({});
  const [meditationActive, setMeditationActive] = useState(false);
  const [meditationTimer, setMeditationTimer] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const { 
    userId, 
    saveModuleProgress, 
    getModuleProgress, 
    saveInteractiveData, 
    getInteractiveData 
  } = useData();

  const steps = module.steps || [];
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  import { progressTracker } from '../lib/supabasePersonalization';

// When activity is completed:
const handleActivityComplete = async (activityId, responses) => {
  const progressData = {
    activityId,
    activityType: 'reflection',
    currentStep: currentStep,
    totalSteps: module.steps.length,
    completedSteps: [...completedSteps, currentStep],
    completed: true,
    responses,
    notes: userNotes,
    insights: userInsights,
    timeSpent: calculateTimeSpent()
  };

  await progressTracker.saveModuleProgress(
    clientId,
    module.id,
    progressData
  );
};

  // Load saved progress from Supabase
  useEffect(() => {
    const loadProgress = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        const progress = await getModuleProgress(module.id);
        const interactiveDataSaved = await getInteractiveData(module.id);
        
        if (progress) {
          setCurrentStepIndex(progress.current_step || 0);
          setActivityResponses(progress.responses || {});
          setCompletedSteps(progress.completed_steps || []);
          setIsCompleted(progress.is_completed || false);
        }
        
        if (interactiveDataSaved) {
          setInteractiveData(interactiveDataSaved);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        // Fallback to userProgress prop
        if (userProgress[module.id]) {
          const savedStep = userProgress[module.id].currentStep || 0;
          const savedResponses = userProgress[module.id].responses || {};
          const savedCompletedSteps = userProgress[module.id].completedSteps || [];
          
          setCurrentStepIndex(savedStep);
          setActivityResponses(savedResponses);
          setCompletedSteps(savedCompletedSteps);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadProgress();
  }, [module.id, userProgress, userId, getModuleProgress, getInteractiveData]);

  // Save progress
  const saveProgress = async () => {
    if (!userId) return;
    
    const progress = {
      current_step: currentStepIndex,
      responses: activityResponses,
      completed_steps: completedSteps,
      is_completed: isCompleted,
      lastAccessed: new Date().toISOString()
    };
    
    try {
      await saveModuleProgress(module.id, progress);
      await saveInteractiveData(module.id, interactiveData);
      
      // Notify parent component
      if (typeof window !== 'undefined' && window.onModuleProgress) {
        window.onModuleProgress(module.id, progress);
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      // Fallback to localStorage
      localStorage.setItem(`module-progress-${module.id}`, JSON.stringify(progress));
      localStorage.setItem(`interactive-data-${module.id}`, JSON.stringify(interactiveData));
    }
  };

  // Auto-save progress
  useEffect(() => {
    const timer = setTimeout(saveProgress, 1000);
    return () => clearTimeout(timer);
  }, [currentStepIndex, activityResponses, completedSteps, interactiveData]);

  // Meditation timer
  useEffect(() => {
    let interval;
    if (meditationActive) {
      interval = setInterval(() => {
        setMeditationTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meditationActive]);

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

  // Handle interactive data changes
  const handleInteractiveChange = (elementId, value) => {
    setInteractiveData(prev => ({
      ...prev,
      [elementId]: value
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
  const resetModule = async () => {
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    setActivityResponses({});
    setInteractiveData({});
    setIsCompleted(false);
    setShowCertificate(false);
    setMeditationActive(false);
    setMeditationTimer(0);
    
    if (userId) {
      try {
        // Clear from Supabase by resetting progress to empty
        await saveModuleProgress(module.id, {
          current_step: 0,
          responses: {},
          completed_steps: [],
          is_completed: false
        });
        await saveInteractiveData(module.id, {});
      } catch (error) {
        console.error('Error resetting module:', error);
      }
    }
    
    // Clear from localStorage as well
    localStorage.removeItem(`module-progress-${module.id}`);
    localStorage.removeItem(`interactive-data-${module.id}`);
  };

  // Format meditation time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🧠 Key Takeaways:</h3>
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

        {/* Interactive Elements */}
        {renderInteractiveElements(data)}

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
      </div>
    );
  };

  // Render interactive elements
  const renderInteractiveElements = (data) => {
    if (!data.interactiveElements) return null;

    return (
      <div className="space-y-6">
        {data.interactiveElements.includes('wound-selector') && renderWoundSelector()}
        {data.interactiveElements.includes('belief-mapper') && renderBeliefMapper()}
        {data.interactiveElements.includes('manager-identifier') && renderManagerIdentifier()}
        {data.interactiveElements.includes('six-fs-wizard') && renderSixFsWizard()}
        {data.interactiveElements.includes('readiness-assessment') && renderReadinessAssessment()}
        {data.interactiveElements.includes('guided-meditation') && renderGuidedMeditation()}
        {data.interactiveElements.includes('emotion-spectrum') && renderEmotionSpectrum()}
        {data.interactiveElements.includes('age-identification') && renderAgeIdentification()}
        {data.interactiveElements.includes('self-energy-meter') && renderSelfEnergyMeter()}
        {data.interactiveElements.includes('pattern-identifier') && renderPatternIdentifier()}
        {data.interactiveElements.includes('body-scan-mapper') && renderBodyScanMapper()}
        {data.interactiveElements.includes('wound-healing-planner') && renderWoundHealingPlanner()}
      </div>
    );
  };

  // Wound Selector Component
  const renderWoundSelector = () => {
    const wounds = [
      'Rejection', 'Abandonment', 'Neglect', 'Criticism/Shame', 
      'Betrayal', 'Humiliation', 'Injustice', 'Loss/Grief', 
      'Emotional Invalidation', 'Trauma'
    ];

    return (
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🩹 Wound Identification</h3>
        <p className="text-gray-700 mb-4">Select the wounds that resonate with your experience (0-5 intensity):</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wounds.map(wound => (
            <div key={wound} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-purple-600"
                    checked={interactiveData[`wound-${wound}`]?.selected || false}
                    onChange={(e) => handleInteractiveChange(`wound-${wound}`, {
                      ...interactiveData[`wound-${wound}`],
                      selected: e.target.checked
                    })}
                  />
                  <span className="text-sm font-medium text-gray-700">{wound}</span>
                </label>
              </div>
              {interactiveData[`wound-${wound}`]?.selected && (
                <div className="mt-2">
                  <label className="text-xs text-gray-600">Intensity:</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    value={interactiveData[`wound-${wound}`]?.intensity || 0}
                    onChange={(e) => handleInteractiveChange(`wound-${wound}`, {
                      ...interactiveData[`wound-${wound}`],
                      intensity: parseInt(e.target.value)
                    })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>{interactiveData[`wound-${wound}`]?.intensity || 0}</span>
                    <span>5</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Belief Mapper Component
  const renderBeliefMapper = () => {
    return (
      <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg p-6 border border-pink-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🧠 Belief Mapping</h3>
        <p className="text-gray-700 mb-4">What beliefs did you form from these experiences?</p>
        <div className="space-y-3">
          <textarea 
            value={interactiveData['beliefs'] || ''}
            onChange={(e) => handleInteractiveChange('beliefs', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Examples: 'I'm unlovable,' 'I'm not good enough,' 'I must be perfect,' 'I can't trust anyone'..."
            rows={4}
          />
          <div className="text-sm text-gray-600">
            <p>Common limiting beliefs:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {["I'm unlovable", "I'm not enough", "I must be perfect", "I can't trust anyone", "I'm too much", "I'm invisible"].map(belief => (
                <button
                  key={belief}
                  onClick={() => {
                    const current = interactiveData['beliefs'] || '';
                    handleInteractiveChange('beliefs', current + (current ? ', ' : '') + belief);
                  }}
                  className="text-xs bg-white px-2 py-1 rounded border border-gray-300 hover:bg-pink-50"
                >
                  + {belief}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Manager Identifier Component
  const renderManagerIdentifier = () => {
    const managers = [
      'The Perfectionist', 'The People-Pleaser', 'The Planner', 
      'The Critic', 'The Caretaker', 'The Controller', 
      'The Achiever', 'The Protector'
    ];

    return (
      <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🛡️ Meet Your Managers</h3>
        <p className="text-gray-700 mb-4">Identify your protective Manager parts:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {managers.map(manager => (
            <label key={manager} className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600"
                checked={interactiveData['managers']?.includes(manager) || false}
                onChange={(e) => {
                  const current = interactiveData['managers'] || [];
                  if (e.target.checked) {
                    handleInteractiveChange('managers', [...current, manager]);
                  } else {
                    handleInteractiveChange('managers', current.filter(m => m !== manager));
                  }
                }}
              />
              <span className="text-sm text-gray-700">{manager}</span>
            </label>
          ))}
        </div>
        {interactiveData['managers'] && interactiveData['managers'].length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Selected Managers:</strong> {interactiveData['managers'].join(', ')}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Six F's Wizard Component
  const renderSixFsWizard = () => {
    const steps = [
      { name: 'Find', description: 'Notice when a part is active in your system' },
      { name: 'Focus', description: 'Direct your compassionate attention to the part' },
      { name: 'Flesh Out', description: 'Explore the part\'s role and perspective' },
      { name: 'Feel Toward', description: 'Notice your emotional response to the part' },
      { name: 'Befriend', description: 'Build trust and understanding with the part' },
      { name: 'Fear', description: 'Ask what the part fears would happen if it stopped' }
    ];

    return (
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔮 6 F's Protocol Guide</h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.name} className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{step.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                <textarea
                  value={interactiveData[`6fs-${step.name.toLowerCase()}`] || ''}
                  onChange={(e) => handleInteractiveChange(`6fs-${step.name.toLowerCase()}`, e.target.value)}
                  placeholder={`Notes for ${step.name} step...`}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Readiness Assessment Component
  const renderReadinessAssessment = () => {
    return (
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Readiness Assessment</h3>
        <div className="space-y-4">
          {[
            {
              question: "Can you reliably access Self-energy when parts are active?",
              name: "self-energy"
            },
            {
              question: "Do you have support available if intense emotions arise?",
              name: "support"
            },
            {
              question: "Are you prepared to be with overwhelming emotions without immediately trying to fix them?",
              name: "overwhelm"
            }
          ].map((item, index) => (
            <div key={item.name} className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-3">{item.question}</p>
              <div className="flex flex-wrap gap-3">
                {['Yes, consistently', 'Sometimes', 'Rarely', 'Not sure'].map(option => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={item.name}
                      value={option}
                      checked={interactiveData[`readiness-${item.name}`] === option}
                      onChange={(e) => handleInteractiveChange(`readiness-${item.name}`, e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Guided Meditation Component
  const renderGuidedMeditation = () => {
    return (
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🧘‍♀️ Guided Meditation</h3>
        <div className="text-center">
          <div className="mb-4">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              {meditationActive ? (
                <Pause className="w-12 h-12 text-white" />
              ) : (
                <Play className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {meditationActive ? formatTime(meditationTimer) : 'Ready to begin'}
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setMeditationActive(!meditationActive)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              {meditationActive ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Start Meditation</span>
                </>
              )}
            </button>
            {meditationActive && (
              <button
                onClick={() => {
                  setMeditationActive(false);
                  setMeditationTimer(0);
                }}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-4">10-15 minutes • Find a quiet, comfortable space</p>
        </div>
      </div>
    );
  };

  // Emotion Spectrum Component
  const renderEmotionSpectrum = () => {
    const emotions = [
      { name: 'Joy', color: 'bg-yellow-400' },
      { name: 'Sadness', color: 'bg-blue-400' },
      { name: 'Anger', color: 'bg-red-400' },
      { name: 'Fear', color: 'bg-purple-400' },
      { name: 'Shame', color: 'bg-pink-400' },
      { name: 'Love', color: 'bg-green-400' }
    ];

    return (
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🌈 Emotion Spectrum</h3>
        <p className="text-gray-700 mb-4">What emotions are present right now?</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {emotions.map(emotion => (
            <label key={emotion.name} className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:shadow-sm">
              <input 
                type="checkbox" 
                className="w-4 h-4"
                checked={interactiveData['emotions']?.includes(emotion.name) || false}
                onChange={(e) => {
                  const current = interactiveData['emotions'] || [];
                  if (e.target.checked) {
                    handleInteractiveChange('emotions', [...current, emotion.name]);
                  } else {
                    handleInteractiveChange('emotions', current.filter(e => e !== emotion.name));
                  }
                }}
              />
              <div className={`w-4 h-4 rounded-full ${emotion.color}`} />
              <span className="text-sm text-gray-700">{emotion.name}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  // Age Identification Component
  const renderAgeIdentification = () => {
    return (
      <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">👶 Age Identification</h3>
        <p className="text-gray-700 mb-4">What age does this part feel?</p>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="18"
            value={interactiveData['part-age'] || 5}
            onChange={(e) => handleInteractiveChange('part-age', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-900">{interactiveData['part-age'] || 5} years old</span>
          </div>
          <textarea
            value={interactiveData['age-description'] || ''}
            onChange={(e) => handleInteractiveChange('age-description', e.target.value)}
            placeholder="Describe this part at this age..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>
    );
  };

  // Self Energy Meter Component
  const renderSelfEnergyMeter = () => {
    const selfCs = ['Curiosity', 'Compassion', 'Calm', 'Clarity', 'Confidence', 'Courage', 'Creativity', 'Connectedness'];
    
    return (
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">✨ Self Energy Meter</h3>
        <p className="text-gray-700 mb-4">How present are these qualities right now?</p>
        <div className="space-y-3">
          {selfCs.map(c => (
            <div key={c} className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700 w-24">{c}</span>
              <input
                type="range"
                min="0"
                max="10"
                value={interactiveData[`self-${c.toLowerCase()}`] || 5}
                onChange={(e) => handleInteractiveChange(`self-${c.toLowerCase()}`, parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-8">{interactiveData[`self-${c.toLowerCase()}`] || 5}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Pattern Identifier Component
  const renderPatternIdentifier = () => {
    const patterns = [
      'Perfectionism', 'People-pleasing', 'Control issues', 'Avoidance',
      'Self-criticism', 'Isolation', 'Overworking', 'Compulsive behaviors'
    ];

    return (
      <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-lg p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔄 Pattern Identifier</h3>
        <p className="text-gray-700 mb-4">Which protective patterns do you notice?</p>
        <div className="grid grid-cols-2 gap-3">
          {patterns.map(pattern => (
            <label key={pattern} className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-red-600"
                checked={interactiveData['patterns']?.includes(pattern) || false}
                onChange={(e) => {
                  const current = interactiveData['patterns'] || [];
                  if (e.target.checked) {
                    handleInteractiveChange('patterns', [...current, pattern]);
                  } else {
                    handleInteractiveChange('patterns', current.filter(p => p !== pattern));
                  }
                }}
              />
              <span className="text-sm text-gray-700">{pattern}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  // Body Scan Mapper Component
  const renderBodyScanMapper = () => {
    const bodyAreas = [
      'Head/Forehead', 'Throat/Neck', 'Shoulders', 'Chest/Heart',
      'Stomach/Gut', 'Lower Back', 'Hips/Pelvis', 'Hands/Arms', 'Legs/Feet'
    ];

    return (
      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🧍 Body Scan Mapper</h3>
        <p className="text-gray-700 mb-4">Where do you hold these feelings in your body?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {bodyAreas.map(area => (
            <label key={area} className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600"
                checked={interactiveData['body-areas']?.includes(area) || false}
                onChange={(e) => {
                  const current = interactiveData['body-areas'] || [];
                  if (e.target.checked) {
                    handleInteractiveChange('body-areas', [...current, area]);
                  } else {
                    handleInteractiveChange('body-areas', current.filter(a => a !== area));
                  }
                }}
              />
              <span className="text-sm text-gray-700">{area}</span>
            </label>
          ))}
        </div>
        <textarea
          value={interactiveData['body-sensations'] || ''}
          onChange={(e) => handleInteractiveChange('body-sensations', e.target.value)}
          placeholder="Describe the physical sensations..."
          className="mt-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>
    );
  };

  // Wound Healing Planner Component
  const renderWoundHealingPlanner = () => {
    return (
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Wound Healing Planner</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority Wounds to Heal:</label>
            <textarea
              value={interactiveData['priority-wounds'] || ''}
              onChange={(e) => handleInteractiveChange('priority-wounds', e.target.value)}
              placeholder="List your top 2-3 priority wounds..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Healing Actions (This Week):</label>
            <textarea
              value={interactiveData['healing-actions'] || ''}
              onChange={(e) => handleInteractiveChange('healing-actions', e.target.value)}
              placeholder="What specific actions will you take this week?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Support Needed:</label>
            <textarea
              value={interactiveData['support-needed'] || ''}
              onChange={(e) => handleInteractiveChange('support-needed', e.target.value)}
              placeholder="What support do you need for this healing?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={2}
            />
          </div>
        </div>
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
    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      );
    }

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
              {completedSteps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <p className="text-sm text-purple-700">
                    <strong>Progress:</strong> {completedSteps.length} of {steps.length} steps completed
                  </p>
                </div>
              )}
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading from database...</p>
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

export default LearningModuleEnhanced;
