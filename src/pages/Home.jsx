import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Heart, 
  Map, 
  Lightbulb, 
  User, 
  ArrowRight, 
  Sparkles, 
  Play, 
  CheckCircle, 
  Book,
  TrendingUp,
  Clock,
  Award,
  Target,
  Brain,
  Users,
  Zap
} from 'lucide-react';
import { curriculumModules, getNextModule, getTotalEstimatedTime } from '../data/curriculumData';

const Home = () => {
  const [userProgress, setUserProgress] = useState({});
  const [completedModules, setCompletedModules] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    const completed = JSON.parse(localStorage.getItem('completedModules') || '[]');
    
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    setCompletedModules(completed);
    
    // Hide welcome after first visit
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setShowWelcome(false);
    } else {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  // Calculate progress metrics
  const nextModule = getNextModule(completedModules);
  const totalModules = curriculumModules.length;
  const progressPercentage = Math.round((completedModules.length / totalModules) * 100);
  const totalTime = getTotalEstimatedTime();
  const completedTime = completedModules.reduce((total, id) => {
    const module = curriculumModules.find(m => m.id === id);
    return total + (module?.estimatedMinutes || 0);
  }, 0);

  // Quick access tools for existing features
  const quickTools = [
    {
      icon: Map,
      title: 'Parts Mapping',
      description: 'Interactive tool to identify and understand your internal parts',
      link: '/parts-mapping',
      color: 'from-purple-400 to-purple-600',
      badge: completedModules.length > 0 ? 'Enhanced' : null
    },
    {
      icon: Play,
      title: 'Guided Exercises',
      description: 'Practice connecting with your parts through guided meditations',
      link: '/exercises',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: CheckCircle,
      title: 'Self-Assessment',
      description: 'Gain insights into your inner world through guided assessments',
      link: '/assessment',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      icon: User,
      title: 'Personal Journal',
      description: 'Track your healing journey and insights',
      link: '/journal',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  // Learning journey stages
  const journeyStages = [
    {
      title: 'Foundation',
      description: 'Understanding IFS & Your Inner Child',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      modules: curriculumModules.filter(m => m.category === 'introduction')
    },
    {
      title: 'Exploration',
      description: 'Discover Your Inner Family',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      modules: curriculumModules.filter(m => m.category === 'parts_system')
    },
    {
      title: 'Leadership',
      description: 'Develop Self-Energy & Confidence',
      icon: Heart,
      color: 'from-teal-500 to-teal-600',
      modules: curriculumModules.filter(m => m.category === 'self_leadership')
    },
    {
      title: 'Healing',
      description: 'Apply Protocols & Deep Work',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
      modules: curriculumModules.filter(m => m.category === 'protocols' || m.category === 'unburdening')
    },
    {
      title: 'Integration',
      description: 'Live with Wholeness & Joy',
      icon: Zap,
      color: 'from-green-500 to-green-600',
      modules: curriculumModules.filter(m => m.category === 'integration')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Welcome to Your Healing Journey
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The Luminous Self curriculum is here to guide you through Inner Child healing 
                using Internal Family Systems (IFS) therapy.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3">✨ What Awaits You:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>6 progressive learning modules focused on Inner Child healing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Interactive activities and guided exercises</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Self-paced learning with progress tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Practical tools for daily integration</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowWelcome(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The Luminous Self
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              A Curriculum for Healing Your Inner Child
            </p>
            <p className="text-lg mb-12 text-purple-200 max-w-3xl mx-auto">
              Discover the transformative power of Internal Family Systems (IFS) therapy through 
              a structured, self-paced learning journey designed to heal your Inner Child wounds 
              and restore your natural wholeness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                to="/curriculum" 
                className="inline-flex items-center px-8 py-4 bg-white text-purple-700 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Start Learning Journey
                <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
              <Link 
                to="/parts-mapping" 
                className="inline-flex items-center px-8 py-4 bg-purple-700 text-white rounded-full font-bold text-lg hover:bg-purple-800 transition-all duration-300"
              >
                Quick Start: Parts Mapping
                <Map className="ml-2 w-6 h-6" />
              </Link>
            </div>

            {/* Progress Summary */}
            {completedModules.length > 0 && (
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center justify-between text-sm">
                  <span>Your Progress</span>
                  <span>{progressPercentage}% Complete</span>
                </div>
                <div className="mt-2 bg-white bg-opacity-30 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-purple-100">
                  {completedModules.length} of {totalModules} modules completed
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Dashboard */}
      {completedModules.length > 0 && (
        <div className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Dashboard</h2>
              <p className="text-lg text-gray-600">Track your healing journey progress</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Progress</span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{progressPercentage}%</div>
                <div className="text-xs text-gray-500 mt-1">
                  {completedModules.length} modules
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Time Invested</span>
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{completedTime}min</div>
                <div className="text-xs text-gray-500 mt-1">
                  {totalTime - completedTime}min to go
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Achievements</span>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{completedModules.length}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Modules completed
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Inner Child</span>
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {curriculumModules.filter(m => m.innerChildFocus && completedModules.includes(m.id)).length}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Child modules done
                </div>
              </div>
            </div>

            {nextModule && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Continue Your Journey</h3>
                    <p className="text-purple-100 mb-3">{nextModule.title}</p>
                    <p className="text-sm text-purple-200">{nextModule.description}</p>
                  </div>
                  <Link
                    to={`/curriculum?module=${nextModule.id}`}
                    className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Continue</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Learning Journey */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Learning Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A progressive curriculum designed to take you from understanding to deep healing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
            {journeyStages.map((stage, index) => {
              const Icon = stage.icon;
              const stageCompleted = stage.modules.filter(m => completedModules.includes(m.id)).length;
              const stageTotal = stage.modules.length;
              const isCurrent = stage.modules.some(m => m.id === nextModule?.id);

              return (
                <div key={index} className="relative">
                  <div className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 ${
                    isCurrent ? 'border-purple-600 shadow-xl' : 'border-gray-200 hover:border-purple-300'
                  }`}>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stage.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{stage.title}</h3>
                    <p className="text-sm text-gray-600 text-center mb-4">{stage.description}</p>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{stageCompleted}/{stageTotal}</div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${stage.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${(stageCompleted / stageTotal) * 100}%` }}
                        />
                      </div>
                    </div>
                    {isCurrent && (
                      <div className="mt-3 text-center">
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                          Current Stage
                        </span>
                      </div>
                    )}
                  </div>
                  {index < journeyStages.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link 
              to="/curriculum" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
            >
              View Full Curriculum
              <BookOpen className="ml-2 w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Tools Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Quick Access Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive tools to support your daily practice and exploration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={index}
                  to={tool.link}
                  className="group block"
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 relative">
                    {tool.badge && (
                      <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        {tool.badge}
                      </div>
                    )}
                    <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex items-center text-purple-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Explore</span>
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Core Philosophy */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                No Bad Parts
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The fundamental insight of Internal Family Systems is that every part of you, 
                even the parts that cause problems, has a positive intention and is trying to help 
                you in the only way it knows how.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Your Inner Child parts developed their strategies to protect you from painful 
                experiences or emotions. When you understand their protective mission, you can 
                work with them rather than fighting against them.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  <span className="font-semibold text-gray-900">Compassion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <span className="font-semibold text-gray-900">Curiosity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-blue-500" />
                  <span className="font-semibold text-gray-900">Connection</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">🧠 Your Mind</h3>
                  <p className="text-gray-600">Contains multiple parts, each with valuable qualities</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">❤️ Your Self</h3>
                  <p className="text-gray-600">Core essence of calm, compassion, clarity, and confidence</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">🌱 Healing</h3>
                  <p className="text-gray-600">Comes from understanding and internal relationships</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Inner World?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Begin your journey of Inner Child healing and Self-leadership today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/curriculum" 
              className="inline-flex items-center px-8 py-4 bg-white text-purple-700 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 shadow-xl"
            >
              Start Learning Journey
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link 
              to="/exercises" 
              className="inline-flex items-center px-8 py-4 bg-purple-700 text-white rounded-full font-bold text-lg hover:bg-purple-800 transition-all duration-300"
            >
              Try Guided Exercises
              <Play className="ml-2 w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;