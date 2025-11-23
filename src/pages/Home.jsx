import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Brain, 
  Sparkles, 
  Play, 
  ArrowRight, 
  Star,
  Shield,
  Users,
  Zap,
  Target,
  Award,
  Clock,
  BookOpen,
  Activity,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Compass,
  Moon,
  Sun,
  CloudRain,
  Flame,
  Wind,
  Mountain,
  Eye
} from 'lucide-react';

const Home = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    setAnimateHero(true);
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const childWoundQuestions = [
    {
      id: 1,
      question: "When you make a mistake, how do you typically feel?",
      options: [
        { text: "Deeply ashamed and worthless", wound: "abandonment", points: 3 },
        { text: "Anxious that people will reject me", wound: "rejection", points: 3 },
        { text: "Frustrated with my imperfection", wound: "perfectionism", points: 3 },
        { text: "Mildly disappointed but accepting", wound: "none", points: 1 }
      ]
    },
    {
      id: 2,
      question: "How do you respond when someone offers you genuine praise?",
      options: [
        { text: "Uncomfortable and suspicious", wound: "trust", points: 3 },
        { text: "I don't believe I deserve it", wound: "shame", points: 3 },
        { text: "I deflect or minimize it", wound: "neglect", points: 3 },
        { text: "I accept it graciously", wound: "none", points: 1 }
      ]
    },
    {
      id: 3,
      question: "In close relationships, what's your biggest fear?",
      options: [
        { text: "Being left alone", wound: "abandonment", points: 3 },
        { text: "Being betrayed or hurt", wound: "betrayal", points: 3 },
        { text: "Losing my independence", wound: "enmeshment", points: 3 },
        { text: "Not having deeper connection", wound: "none", points: 1 }
      ]
    },
    {
      id: 4,
      question: "How do you handle your emotions?",
      options: [
        { text: "I suppress or hide them", wound: "emotional_neglect", points: 3 },
        { text: "I feel overwhelmed by them", wound: "lack_of_control", points: 3 },
        { text: "I intellectualize instead of feeling", wound: "spiritual_bypass", points: 3 },
        { text: "I acknowledge and process them", wound: "none", points: 1 }
      ]
    },
    {
      id: 5,
      question: "What's your relationship with your inner child like?",
      options: [
        { text: "I don't connect with that part of me", wound: "disconnection", points: 3 },
        { text: "I'm often critical of my vulnerability", wound: "shame", points: 3 },
        { text: "I try to protect it from pain", wound: "overprotection", points: 3 },
        { text: "I nurture and listen to it", wound: "none", points: 1 }
      ]
    }
  ];

  const woundExplanations = {
    abandonment: {
      title: "Abandonment Wound",
      description: "Fear of being left alone or deserted",
      healing: "Learning that you are safe and will not be abandoned",
      color: "from-blue-400 to-blue-600",
      icon: CloudRain
    },
    rejection: {
      title: "Rejection Wound", 
      description: "Deep fear of being rejected or not accepted",
      healing: "Building self-worth that doesn't depend on others' approval",
      color: "from-purple-400 to-purple-600",
      icon: Shield
    },
    shame: {
      title: "Shame Wound",
      description: "Feeling fundamentally flawed or unworthy",
      healing: "Developing self-compassion and acceptance",
      color: "from-gray-400 to-gray-600",
      icon: Eye
    },
    betrayal: {
      title: "Betrayal Wound",
      description: "Difficulty trusting others after being let down",
      healing: "Learning to trust again while setting healthy boundaries",
      color: "from-red-400 to-red-600",
      icon: AlertCircle
    },
    perfectionism: {
      title: "Perfectionism Wound",
      description: "Believing you must be perfect to be worthy of love",
      healing: "Embracing your humanity and imperfections",
      color: "from-orange-400 to-orange-600",
      icon: Target
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < childWoundQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (allAnswers) => {
    const woundScores = {};
    
    allAnswers.forEach(answer => {
      if (answer.wound !== 'none') {
        woundScores[answer.wound] = (woundScores[answer.wound] || 0) + answer.points;
      }
    });

    const sortedWounds = Object.entries(woundScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    setAssessmentResults({
      primaryWound: sortedWounds[0] ? sortedWounds[0][0] : 'none',
      scores: Object.fromEntries(sortedWounds),
      totalQuestions: childWoundQuestions.length
    });
  };

  const resetAssessment = () => {
    setShowAssessment(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setAssessmentResults(null);
  };

  const healingModules = [
    {
      icon: Heart,
      title: "Inner Child Healing",
      description: "Connect with and heal your wounded inner child",
      duration: "6 weeks",
      level: "Foundation",
      color: "from-pink-400 to-pink-600",
      progress: 0
    },
    {
      icon: Brain,
      title: "Parts Understanding",
      description: "Learn to identify and communicate with your internal parts",
      duration: "4 weeks", 
      level: "Intermediate",
      color: "from-purple-400 to-purple-600",
      progress: 0
    },
    {
      icon: Shield,
      title: "Self-Leadership",
      description: "Develop your Self energy to lead your internal system",
      duration: "8 weeks",
      level: "Advanced", 
      color: "from-blue-400 to-blue-600",
      progress: 0
    },
    {
      icon: Sparkles,
      title: "Unburdening Practice",
      description: "Release the burdens your parts carry",
      duration: "5 weeks",
      level: "Advanced",
      color: "from-yellow-400 to-yellow-600",
      progress: 0
    }
  ];

  if (showAssessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} of {childWoundQuestions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / childWoundQuestions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / childWoundQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Assessment Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-white/20 backdrop-blur-lg">
              {!assessmentResults ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {childWoundQuestions[currentQuestion].question}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {childWoundQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full group-hover:border-purple-600 transition-colors"></div>
                          <span className="text-lg text-gray-700 group-hover:text-gray-900">{option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Assessment Results</h2>
                  
                  {assessmentResults.primaryWound !== 'none' && woundExplanations[assessmentResults.primaryWound] && (
                    <div className={`bg-gradient-to-r ${woundExplanations[assessmentResults.primaryWound].color} rounded-xl p-6 mb-6 text-white`}>
                      <h3 className="text-xl font-bold mb-2">
                        {woundExplanations[assessmentResults.primaryWound].title}
                      </h3>
                      <p className="mb-4">{woundExplanations[assessmentResults.primaryWound].description}</p>
                      <p className="text-sm opacity-90">
                        <strong>Healing Path:</strong> {woundExplanations[assessmentResults.primaryWound].healing}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {Object.entries(assessmentResults.scores).map(([wound, score]) => (
                      <div key={wound} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 capitalize">{wound.replace('_', ' ')}</h4>
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                              style={{ width: `${(score / 15) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{score}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/curriculum"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    >
                      Start Healing Journey
                    </Link>
                    <button
                      onClick={resetAssessment}
                      className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                    >
                      Retake Assessment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {!assessmentResults && (
              <button
                onClick={resetAssessment}
                className="mt-6 text-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                Exit Assessment
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Assessment */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center transition-all duration-1000 ${animateHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Heal Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Inner Child
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-purple-100 max-w-3xl mx-auto">
              Discover your inner wounds and begin your transformative healing journey with Internal Family Systems
            </p>
            
            {/* Main CTA - Assessment */}
            <button
              onClick={() => setShowAssessment(true)}
              className="group relative inline-flex items-center px-8 py-6 bg-white text-purple-700 rounded-2xl font-bold text-xl hover:bg-purple-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <Brain className="mr-3 w-8 h-8" />
                <span>Take Free Child Wound Assessment</span>
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Quick Start Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/curriculum" 
                className="inline-flex items-center px-6 py-3 bg-purple-700/50 backdrop-blur text-white rounded-full font-semibold hover:bg-purple-700/70 transition-all duration-300"
              >
                <BookOpen className="mr-2 w-5 h-5" />
                Browse Curriculum
              </Link>
              <Link 
                to="/exercises" 
                className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Try Exercises
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Healing Modules Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Healing Pathway</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step-by-step modules designed to guide you through complete Inner Child healing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {healingModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div key={index} className="group relative">
                  <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                    <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                        {module.level}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{module.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {module.duration}
                      </div>
                      {module.progress > 0 && (
                        <span className="text-sm font-medium text-purple-600">{module.progress}%</span>
                      )}
                    </div>

                    {module.progress > 0 && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    )}

                    <Link
                      to="/curriculum"
                      className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-center"
                    >
                      {module.progress > 0 ? 'Continue' : 'Start Module'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Features */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Healing Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engage with your inner world through guided exercises and activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/parts-mapping"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Parts Mapping</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Interactive tool to identify, understand, and connect with your internal family of parts
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <span>Explore Your Parts</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </Link>

            <Link
              to="/exercises"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Guided Exercises</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Meditations and practices to strengthen your Self energy and heal your parts
              </p>
              <div className="flex items-center text-green-600 font-semibold">
                <span>Start Practice</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </Link>

            <Link
              to="/journal"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Healing Journal</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Sacred space to document your journey and insights from your inner world
              </p>
              <div className="flex items-center text-pink-600 font-semibold">
                <span>Begin Journaling</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Healing Principles */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The IFS Healing Principles
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Bad Parts</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Every part of you has a positive intention and is trying to help in the only way it knows how.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Self-Leadership</h3>
                    <p className="text-gray-600 leading-relaxed">
                      You have a core Self that is calm, compassionate, and capable of leading your internal system.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Unburdening</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Parts can release the burdens they carry when they feel safe and connected to Self.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8">
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Moon className="w-5 h-5 mr-2 text-purple-600" />
                    Your Inner Child
                  </h3>
                  <p className="text-gray-600">The vulnerable, authentic part holding your core emotions and needs</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    Your Protectors
                  </h3>
                  <p className="text-gray-600">Parts that work to keep you safe from pain and overwhelming emotions</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Sun className="w-5 h-5 mr-2 text-green-600" />
                    Your Self
                  </h3>
                  <p className="text-gray-600">The calm, compassionate core that can heal and lead your internal system</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Inner World?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Take the first step toward healing and wholeness today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowAssessment(true)}
              className="inline-flex items-center px-8 py-4 bg-white text-purple-700 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 shadow-xl"
            >
              <Brain className="mr-2 w-6 h-6" />
              Take Assessment
            </button>
            <Link 
              to="/curriculum" 
              className="inline-flex items-center px-8 py-4 bg-purple-700 text-white rounded-full font-bold text-lg hover:bg-purple-800 transition-all duration-300"
            >
              <BookOpen className="mr-2 w-6 h-6" />
              View Curriculum
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;