import { useState, useEffect } from 'react';
import { 
  Brain, 
  Heart, 
  Shield, 
  AlertTriangle, 
  Zap, 
  Cloud, 
  Star, 
  Plus, 
  X, 
  Edit3, 
  Save, 
  ArrowRight,
  MessageCircle,
  User,
  Lightbulb,
  Sparkles,
  Eye,
  Hand
} from 'lucide-react';

const PartsMapping = () => {
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [showAddPart, setShowAddPart] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [step, setStep] = useState(1);
  const [currentPartType, setCurrentPartType] = useState('');
  const [savedParts, setSavedParts] = useState([]);

  const partTypes = [
    {
      type: 'manager',
      title: 'Manager Parts',
      description: 'Parts that try to keep you safe and in control',
      color: 'from-blue-400 to-blue-600',
      icon: Shield,
      examples: ['Perfectionist', 'Planner', 'Caretaker', 'Achiever', 'Critic'],
      questions: [
        'What parts try to keep you organized and on track?',
        'Which parts are focused on preventing problems?',
        'What parts help you maintain control in situations?'
      ]
    },
    {
      type: 'firefighter',
      title: 'Firefighter Parts',
      description: 'Parts that react when emotions become overwhelming',
      color: 'from-red-400 to-red-600',
      icon: AlertTriangle,
      examples: ['Impulsive', 'Angry', 'Distractor', 'Numb', 'Rebellious'],
      questions: [
        'What parts emerge when you\'re feeling overwhelmed?',
        'Which parts try to distract you from painful feelings?',
        'What parts act quickly without thinking?'
      ]
    },
    {
      type: 'exile',
      title: 'Exile Parts',
      description: 'Young parts holding pain, fear, or shame',
      color: 'from-purple-400 to-purple-600',
      icon: Heart,
      examples: ['Abandoned Child', 'Scared Child', 'Ashamed Child', 'Lonely Child', 'Hurt Child'],
      questions: [
        'What young parts feel vulnerable or scared?',
        'Which parts hold memories of being hurt or abandoned?',
        'What parts feel they need to be hidden away?'
      ]
    }
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('mappedParts') || '[]');
    setSavedParts(saved);
  }, []);

  const handleAddPart = (partData) => {
    const newPart = {
      id: Date.now(),
      type: currentPartType,
      ...partData,
      createdAt: new Date().toISOString()
    };
    
    setParts([...parts, newPart]);
    setShowAddPart(false);
    setCurrentPartType('');
  };

  const handleSavePart = (updatedPart) => {
    const updatedParts = parts.map(p => 
      p.id === updatedPart.id ? updatedPart : p
    );
    setParts(updatedParts);
    setEditingPart(null);
  };

  const handleDeletePart = (partId) => {
    setParts(parts.filter(p => p.id !== partId));
    if (selectedPart?.id === partId) {
      setSelectedPart(null);
    }
  };

  const handleSaveToStorage = () => {
    localStorage.setItem('mappedParts', JSON.stringify(parts));
    setSavedParts(parts);
    alert('Parts map saved successfully!');
  };

  const getPartsByType = (type) => {
    return parts.filter(part => part.type === type);
  };

  const getTotalParts = () => {
    return savedParts.length + parts.length;
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Parts Mapping Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover and understand your internal family of parts through this interactive mapping experience
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Parts Mapping?</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Parts Mapping is the process of identifying, understanding, and getting to know the different parts 
                of your internal system. In Internal Family Systems (IFS), we recognize that your psyche is made up 
                of multiple parts, each with its own feelings, thoughts, and roles.
              </p>
              <p className="mb-4">
                Just like a family has different members with different personalities and roles, your inner world 
                has various parts that work to protect you, help you function, and carry your experiences. 
                The goal isn't to eliminate these parts, but to understand and appreciate them.
              </p>
              <p>
                Through this guided process, you'll learn to identify your parts, understand their intentions, 
                and develop a compassionate relationship with each one.
              </p>
            </div>
          </div>

          {/* Part Types Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {partTypes.map((partType, index) => {
              const Icon = partType.icon;
              return (
                <div
                  key={partType.type}
                  className={`bg-gradient-to-br ${partType.color} rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{partType.title}</h3>
                  <p className="text-white/90 mb-4">{partType.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-white/80">Examples:</div>
                    <div className="flex flex-wrap gap-2">
                      {partType.examples.slice(0, 3).map((example, i) => (
                        <span key={i} className="text-xs bg-white/20 backdrop-blur px-2 py-1 rounded-full">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          {getTotalParts() > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Previous Mapping</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{getTotalParts()}</div>
                  <div className="text-sm text-gray-600">Total Parts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {getPartsByType('manager').length}
                  </div>
                  <div className="text-sm text-gray-600">Managers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {getPartsByType('firefighter').length}
                  </div>
                  <div className="text-sm text-gray-600">Firefighters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {getPartsByType('exile').length}
                  </div>
                  <div className="text-sm text-gray-600">Exiles</div>
                </div>
              </div>
            </div>
          )}

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Begin Mapping
              <ArrowRight className="ml-2 w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setStep(1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Introduction
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Step 2 of 3</span>
              <button
                onClick={handleSaveToStorage}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Save Map
              </button>
            </div>
          </div>

          {/* Part Type Selection */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Which Type of Part Would You Like to Map?
            </h2>
            <p className="text-xl text-gray-600">
              Choose a category to start identifying your parts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {partTypes.map((partType) => {
              const Icon = partType.icon;
              const typeParts = getPartsByType(partType.type);
              const isSelected = currentPartType === partType.type;
              
              return (
                <div
                  key={partType.type}
                  onClick={() => setCurrentPartType(partType.type)}
                  className={`relative bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-4 ring-purple-600 shadow-xl' : 'hover:shadow-xl'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 bg-gradient-to-r ${partType.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{partType.title}</h3>
                  <p className="text-gray-600 mb-4">{partType.description}</p>
                  
                  {typeParts.length > 0 && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Mapped: {typeParts.length} parts
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {typeParts.slice(0, 3).map((part, i) => (
                          <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">
                            {part.name}
                          </span>
                        ))}
                        {typeParts.length > 3 && (
                          <span className="text-xs text-gray-500">+{typeParts.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-700">Guiding Questions:</div>
                    {partType.questions.map((question, i) => (
                      <div key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        {question}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            {currentPartType && (
              <button
                onClick={() => setShowAddPart(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                <Plus className="mr-2 w-5 h-5" />
                Add {partTypes.find(pt => pt.type === currentPartType)?.title.slice(0, -6)} Part
              </button>
            )}
            
            {parts.length > 0 && (
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors ml-4"
              >
                Review Parts Map
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            )}
          </div>

          {/* Parts List */}
          {parts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Mapped Parts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {parts.map((part) => (
                  <div
                    key={part.id}
                    onClick={() => setSelectedPart(part)}
                    className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-gray-900">{part.name}</h4>
                      <div className={`w-3 h-3 rounded-full ${
                        part.type === 'manager' ? 'bg-blue-500' :
                        part.type === 'firefighter' ? 'bg-red-500' :
                        'bg-purple-500'
                      }`}></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{part.role}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                        {part.type}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPart(part);
                        }}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add Part Modal */}
        {showAddPart && (
          <AddPartModal
            partType={partTypes.find(pt => pt.type === currentPartType)}
            onSave={handleAddPart}
            onClose={() => setShowAddPart(false)}
          />
        )}

        {/* Edit Part Modal */}
        {editingPart && (
          <EditPartModal
            part={editingPart}
            partType={partTypes.find(pt => pt.type === editingPart.type)}
            onSave={handleSavePart}
            onClose={() => setEditingPart(null)}
            onDelete={() => {
              handleDeletePart(editingPart.id);
              setEditingPart(null);
            }}
          />
        )}

        {/* Part Detail Modal */}
        {selectedPart && !editingPart && (
          <PartDetailModal
            part={selectedPart}
            partType={partTypes.find(pt => pt.type === selectedPart.type)}
            onClose={() => setSelectedPart(null)}
            onEdit={() => {
              setEditingPart(selectedPart);
              setSelectedPart(null);
            }}
          />
        )}
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setStep(2)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Mapping
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setStep(2)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Add More Parts
              </button>
              <button
                onClick={handleSaveToStorage}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Save Complete Map
              </button>
            </div>
          </div>

          {/* Map Overview */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Internal Family Map
            </h2>
            <p className="text-xl text-gray-600">
              A visual representation of your internal system
            </p>
          </div>

          {/* Parts Visualization */}
          <div className="bg-white rounded-3xl shadow-xl p-12 mb-8">
            <div className="relative min-h-[500px]">
              {/* Self at center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <Star className="w-12 h-12 text-white mx-auto mb-1" />
                    <span className="text-white font-bold">SELF</span>
                  </div>
                </div>
              </div>

              {/* Parts around Self */}
              {parts.map((part, index) => {
                const angle = (index / parts.length) * 2 * Math.PI;
                const x = Math.cos(angle) * 200;
                const y = Math.sin(angle) * 200;
                
                const colorClass = part.type === 'manager' ? 'from-blue-400 to-blue-600' :
                                 part.type === 'firefighter' ? 'from-red-400 to-red-600' :
                                 'from-purple-400 to-purple-600';
                
                return (
                  <div
                    key={part.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`
                    }}
                  >
                    <div className={`bg-gradient-to-r ${colorClass} rounded-full w-24 h-24 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                         onClick={() => setSelectedPart(part)}>
                      <div className="text-center text-white">
                        <div className="text-xs font-bold truncate max-w-[80px]">{part.name}</div>
                      </div>
                    </div>
                    {/* Connection line to Self */}
                    <svg
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ width: '400px', height: '400px', marginLeft: '-200px', marginTop: '-200px' }}
                    >
                      <line
                        x1="200"
                        y1="200"
                        x2={200 + x}
                        y2={200 + y}
                        stroke="#e5e7eb"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Parts Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {partTypes.map((partType) => {
              const Icon = partType.icon;
              const typeParts = getPartsByType(partType.type);
              
              return (
                <div key={partType.type} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${partType.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{partType.title}</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-4">{typeParts.length}</div>
                  
                  <div className="space-y-3">
                    {typeParts.map((part) => (
                      <div
                        key={part.id}
                        onClick={() => setSelectedPart(part)}
                        className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <h4 className="font-semibold text-gray-900">{part.name}</h4>
                        <p className="text-sm text-gray-600">{part.role}</p>
                      </div>
                    ))}
                    {typeParts.length === 0 && (
                      <p className="text-gray-500 italic">No parts mapped yet</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
            <p className="mb-6">Now that you've mapped your parts, you can begin building relationships with each one through our guided exercises and meditations.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/exercises"
                className="bg-white text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                Try Parts Exercises
              </a>
              <a
                href="/curriculum"
                className="bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 transition-colors"
              >
                Continue Learning
              </a>
            </div>
          </div>
        </div>

        {/* Part Detail Modal */}
        {selectedPart && (
          <PartDetailModal
            part={selectedPart}
            partType={partTypes.find(pt => pt.type === selectedPart.type)}
            onClose={() => setSelectedPart(null)}
            onEdit={() => {
              setEditingPart(selectedPart);
              setSelectedPart(null);
            }}
          />
        )}
      </div>
    );
  }
};

// Modal Components
const AddPartModal = ({ partType, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    feelings: '',
    positive_intention: '',
    when_appears: '',
    what_it_does: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Add {partType.title.slice(0, -6)} Part</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Part Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., The Critic, The Protector, The Scared Child"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role or Function</label>
            <textarea
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
              placeholder="What does this part do for you?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">When does this part appear?</label>
            <textarea
              value={formData.when_appears}
              onChange={(e) => setFormData({...formData, when_appears: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
              placeholder="In what situations do you notice this part showing up?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What does it do?</label>
            <textarea
              value={formData.what_it_does}
              onChange={(e) => setFormData({...formData, what_it_does: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
              placeholder="How does this part behave or what actions does it take?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Positive Intention</label>
            <textarea
              value={formData.positive_intention}
              onChange={(e) => setFormData({...formData, positive_intention: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
              placeholder="What positive role is this part trying to play?"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Save Part
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditPartModal = ({ part, partType, onSave, onClose, onDelete }) => {
  const [formData, setFormData] = useState(part);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Edit {part.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Part Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role or Function</label>
            <textarea
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Delete Part
            </button>
            <div className="space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const PartDetailModal = ({ part, partType, onClose, onEdit }) => {
  const Icon = partType.icon;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 bg-gradient-to-r ${partType.color} rounded-xl flex items-center justify-center`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{part.name}</h3>
              <span className="text-sm text-gray-600 capitalize">{part.type} Part</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Role</h4>
            <p className="text-gray-700">{part.role}</p>
          </div>

          {part.when_appears && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">When It Appears</h4>
              <p className="text-gray-700">{part.when_appears}</p>
            </div>
          )}

          {part.what_it_does && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What It Does</h4>
              <p className="text-gray-700">{part.what_it_does}</p>
            </div>
          )}

          {part.positive_intention && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Positive Intention</h4>
              <p className="text-gray-700">{part.positive_intention}</p>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200 flex justify-end space-x-4">
            <button
              onClick={onEdit}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Edit Part
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsMapping;