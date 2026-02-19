import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Lock, 
  CheckCircle, 
  Circle, 
  Play, 
  Clock, 
  Award, 
  Target,
  Heart,
  Users,
  Lightbulb,
  Zap,
  ChevronRight,
  Star,
  TrendingUp,
  Brain,
  Sparkles
} from 'lucide-react';
import { 
  curriculumModules, 
  getModuleById, 
  checkPrerequisites, 
  getNextModule,
  getInnerChildModules,
  getTotalEstimatedTime
} from '../data/curriculumData';
import { aiCurriculumPersonalizer } from '../lib/aiCurriculumPersonalizer';
import { supabaseHelpers } from '../lib/supabase';
import { clientAuth } from '../lib/supabasePersonalization';

const CurriculumSystem = ({ onModuleSelect, userProgress = {}, clientId }) => {
  const [completedModules, setCompletedModules] = useState([]);
  const [currentModule, setCurrentModule] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set(['all']));
  const [personalizedCurriculum, setPersonalizedCurriculum] = useState(null);
  const [isPersonalized, setIsPersonalized] = useState(false);

  // Load user progress and personalized curriculum
  useEffect(() => {
    if (userProgress.completedModules) {
      setCompletedModules(userProgress.completedModules);
    }

    const loadCurriculum = async () => {
      const client = clientAuth.getCurrentClient();
      const id = client?.id;
      if (!id) return;
      
      try {
        const curriculum = await supabaseHelpers.getPersonalizedCurriculum(id);
        if (curriculum) {
          setPersonalizedCurriculum(curriculum);
          setIsPersonalized(true);
          console.log('✅ Loaded personalized curriculum:', curriculum.primaryWound);
        }
      } catch (error) {
        console.error('❌ Error loading personalized curriculum:', error);
      }
    };

    loadCurriculum();
  }, [userProgress]);

  // Get next recommended module
  const nextModule = getNextModule(completedModules);
  
  // Category configuration
  const categories = [
    { 
      id: 'introduction', 
      title: 'Foundation', 
      icon: BookOpen, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      id: 'parts_system', 
      title: 'Inner Child & Parts', 
      icon: Users, 
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    { 
      id: 'self_leadership', 
      title: 'Self Leadership', 
      icon: Heart, 
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    },
    { 
      id: 'protocols', 
      title: 'Healing Protocols', 
      icon: Target, 
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    { 
      id: 'unburdening', 
      title: 'Deep Healing', 
      icon: Lightbulb, 
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    { 
      id: 'integration', 
      title: 'Integration', 
      icon: Zap, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  // Module status determination
  const getModuleStatus = (module) => {
    const isCompleted = completedModules.includes(module.id);
    const hasPrerequisites = module.prerequisites && module.prerequisites.length > 0;
    const prerequisitesMet = checkPrerequisites(module.id, completedModules);

    if (isCompleted) return 'completed';
    if (hasPrerequisites && !prerequisitesMet) return 'locked';
    return 'available';
  };

  // Status icons
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'locked':
        return <Lock className="w-6 h-6 text-gray-400" />;
      default:
        return <Circle className="w-6 h-6 text-blue-500" />;
    }
  };

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleModuleSelect = (module) => {
    const status = getModuleStatus(module);
    if (status === 'available' || status === 'completed') {
      setCurrentModule(module);
      if (onModuleSelect) onModuleSelect(module);
    }
  };

  // Use personalized modules if available, otherwise use default modules
  // ALWAYS use default curriculum modules for display
  // Personalization is applied through the personalizedContent field
  const activeModules = curriculumModules;

  // Group modules by category
  const modulesByCategory = categories.map(category => ({
    ...category,
    modules: activeModules.filter(m => m.category === category.id)
  }));

  // Calculate progress statistics
  const totalModules = curriculumModules.length;
  const completedCount = completedModules.length;
  const progressPercentage = Math.round((completedCount / totalModules) * 100);
  const innerChildModules = getInnerChildModules();
  const innerChildCompleted = innerChildModules.filter(m => completedModules.includes(m.id)).length;
  const totalTime = getTotalEstimatedTime();
  const completedTime = completedModules.reduce((total, id) => {
    const module = getModuleById(id);
    return total + (module?.estimatedMinutes || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">
                Inner Child Healing Journey
              </h1>
              <p className="text-gray-600 mt-2">
                {isPersonalized ? (
                  <>
                    <span className="flex items-center">
                      <Sparkles className="w-4 h-4 mr-1 text-amber-600" />
                      Personalized curriculum for your {personalizedCurriculum?.primaryWound ? aiCurriculumPersonalizer.woundProfiles[personalizedCurriculum.primaryWound]?.name : 'specific wound pattern'}
                    </span>
                  </>
                ) : (
                  'A comprehensive IFS curriculum for healing your Inner Child wounds'
                )}
              </p>
            </div>
            {nextModule && (
              <Link
                to={`/curriculum/module/${nextModule.id}`}
                onClick={() => handleModuleSelect(nextModule)}
                className="bg-gradient-to-r from-amber-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2 shadow-lg"
              >
                <Play className="w-5 h-5" />
                <span>Continue Learning</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Personalization Banner */}
      {isPersonalized && personalizedCurriculum && (
        <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI-Personalized Curriculum</h3>
                  <p className="text-sm text-gray-600">
                    Based on your assessment: {personalizedCurriculum.primaryWound && aiCurriculumPersonalizer.woundProfiles[personalizedCurriculum.primaryWound]?.name}
                    {personalizedCurriculum.secondaryWound && ` + ${aiCurriculumPersonalizer.woundProfiles[personalizedCurriculum.secondaryWound]?.name}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-gray-600">
                  <span className="font-medium">Intensity:</span> {personalizedCurriculum.intensity}
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">Timeline:</span> {personalizedCurriculum.timeline?.totalWeeks} weeks
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Overall Progress</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{progressPercentage}%</div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-amber-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {completedCount} of {totalModules} modules
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Inner Child Focus</span>
              <Heart className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {innerChildCompleted}/{innerChildModules.length}
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-600 to-amber-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(innerChildCompleted / innerChildModules.length) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Child-focused modules
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Time Invested</span>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{completedTime}min</div>
            <div className="text-xs text-gray-500 mt-1">
              {totalTime - completedTime}min remaining
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Achievements</span>
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{completedCount}</div>
            <div className="text-xs text-gray-500 mt-1">
              Modules completed
            </div>
          </div>
        </div>

        {/* Next Module Recommendation */}
        {nextModule && (
          <div className="bg-gradient-to-r from-amber-600 to-emerald-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Next Recommended</h3>
                    <p className="text-amber-100">Continue your healing journey</p>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mt-3">{nextModule.title}</h4>
                <p className="text-amber-100 mt-1">{nextModule.description}</p>
                <div className="flex items-center space-x-4 mt-3 text-sm">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{nextModule.estimatedMinutes} minutes</span>
                  </span>
                  {nextModule.innerChildFocus && (
                    <span className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>Inner Child Focus</span>
                    </span>
                  )}
                </div>
              </div>
              <Link
                to={`/curriculum/module/${nextModule.id}`}
                onClick={() => handleModuleSelect(nextModule)}
                className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors flex items-center space-x-2"
              >
                <span>Start Module</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}

        {/* Curriculum Modules by Category */}
        <div className="space-y-6">
          {modulesByCategory.map(category => {
            const Icon = category.icon;
            const isExpanded = expandedCategories.has(category.id);
            const categoryCompleted = category.modules.filter(m => completedModules.includes(m.id)).length;
            const categoryTotal = category.modules.length;

            return (
              <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-600">
                        {categoryCompleted} of {categoryTotal} modules completed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-gray-600">
                      {categoryCompleted > 0 && `${Math.round((categoryCompleted / categoryTotal) * 100)}%`}
                    </div>
                    <ChevronRight 
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isExpanded ? 'transform rotate-90' : ''
                      }`} 
                    />
                  </div>
                </button>

                {/* Category Progress Bar */}
                <div className="px-6 pb-2">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(categoryCompleted / categoryTotal) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Module List */}
                {isExpanded && (
                  <div className="border-t border-gray-100">
                    {category.modules
                      .sort((a, b) => a.order - b.order)
                      .map(module => {
                        const status = getModuleStatus(module);
                        const Icon = category.icon;
                        
                        return (
                          <div
                            key={module.id}
                            className={`px-6 py-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors ${
                              status === 'locked' ? 'opacity-60' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 flex-1">
                                {getStatusIcon(status)}
                                <Link
                                  to={`/curriculum/module/${module.id}`}
                                  onClick={() => handleModuleSelect(module)}
                                  disabled={status === 'locked'}
                                  className={`text-left flex-1 ${
                                    status === 'available' || status === 'completed'
                                      ? 'hover:text-amber-600 transition-colors'
                                      : 'cursor-not-allowed'
                                  }`}
                                >
                                  <h4 className="font-semibold text-gray-900">{module.title}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                                  
                                  {/* Show personalized content if available */}
                                  {module.personalizedContent && (
                                    <div className="mt-2 p-2 bg-amber-50 rounded text-xs text-amber-700">
                                      <div className="flex items-center space-x-1 mb-1">
                                        <Sparkles className="w-3 h-3" />
                                        <span className="font-medium">Personalized for you:</span>
                                      </div>
                                      <p>{module.personalizedContent.message || 'Tailored to your specific wound pattern'}</p>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                    <span className="flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{module.estimatedMinutes} min</span>
                                    </span>
                                    {module.innerChildFocus && (
                                      <span className="flex items-center space-x-1">
                                        <Heart className="w-3 h-3" />
                                        <span>Inner Child</span>
                                      </span>
                                    )}
                                    {module.personalizedContent && (
                                      <span className="flex items-center space-x-1">
                                        <Brain className="w-3 h-3" />
                                        <span>AI-Personalized</span>
                                      </span>
                                    )}
                                    {module.prerequisites && module.prerequisites.length > 0 && (
                                      <span className="flex items-center space-x-1">
                                        <Lock className="w-3 h-3" />
                                        <span>Prerequisites</span>
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              </div>
                              {status === 'available' && (
                                <Link
                                  to={`/curriculum/module/${module.id}`}
                                  onClick={() => handleModuleSelect(module)}
                                  className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
                                >
                                  Start
                                </Link>
                              )}
                              {status === 'completed' && (
                                <div className="flex items-center space-x-2 text-green-600">
                                  <CheckCircle className="w-5 h-5" />
                                  <span className="text-sm font-medium">Completed</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Learning Journey Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Learning Journey Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Complete modules in order to build a strong foundation for Inner Child healing</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Take your time with each module - Inner Child work unfolds at its own pace</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Practice the exercises regularly to integrate the learning into your daily life</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Journal about your experiences to deepen your connection with your Inner Child</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Consider working with an IFS therapist for deeper unburdening work</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CurriculumSystem;