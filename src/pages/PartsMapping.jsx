import { useState } from 'react';
import { partsCategories, sixFs, unburdeningSteps } from '../data/ifsData';
import { Map, Plus, Trash2, Edit2, Save, X } from 'lucide-react';

const PartsMapping = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [myParts, setMyParts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newPart, setNewPart] = useState({
    name: '',
    category: 'Managers',
    description: '',
    triggers: '',
    intention: ''
  });

  const handleAddPart = () => {
    if (newPart.name.trim()) {
      setMyParts([...myParts, { ...newPart, id: Date.now() }]);
      setNewPart({ name: '', category: 'Managers', description: '', triggers: '', intention: '' });
      setIsAdding(false);
    }
  };

  const handleDeletePart = (id) => {
    setMyParts(myParts.filter(part => part.id !== id));
  };

  const handleEditPart = (part) => {
    setEditingId(part.id);
    setNewPart(part);
  };

  const handleSaveEdit = () => {
    setMyParts(myParts.map(part => part.id === editingId ? { ...newPart, id: editingId } : part));
    setNewPart({ name: '', category: 'Managers', description: '', triggers: '', intention: '' });
    setEditingId(null);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Self': 'from-yellow-200 to-yellow-400',
      'Managers': 'from-blue-200 to-blue-400',
      'Firefighters': 'from-red-200 to-red-400',
      'Exiles': 'from-purple-200 to-purple-400'
    };
    return colors[category] || 'from-gray-200 to-gray-400';
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
              <Map className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Parts Mapping
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Identify and understand your internal parts through interactive mapping and the 6 F's approach
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['overview', '6fs', 'unburdening', 'myparts'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeSection === section
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-purple-50 shadow-md'
              }`}
            >
              {section === 'overview' && 'Parts Overview'}
              {section === '6fs' && '6 F\'s Approach'}
              {section === 'unburdening' && 'Unburdening Process'}
              {section === 'myparts' && 'My Parts Map'}
            </button>
          ))}
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Understanding Parts Mapping</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Parts mapping is a gentle way to notice and work with different aspects of your inner world. 
                Each step helps you connect with your parts in a safe, compassionate, and structured way.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The process involves identifying your parts, understanding their roles, and building a 
                relationship with them from your Self-energy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partsCategories.map((category, index) => (
                <div key={index} className={`card ${category.color}`}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{category.name}</h3>
                  <p className="text-gray-700 text-lg">{category.description}</p>
                </div>
              ))}
            </div>

            <div className="card bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <h3 className="text-2xl font-bold mb-4">The Parts Mapping Process</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white bg-opacity-30 backdrop-blur-lg rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Identify (Find)</h4>
                    <p className="text-blue-100">
                      The first step is to notice and name the part that is showing up. Recognize how it makes 
                      itself known in your inner world—through thoughts, feelings, sensations, or patterns of behavior.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white bg-opacity-30 backdrop-blur-lg rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Explore (Focus)</h4>
                    <p className="text-blue-100">
                      Once a part is identified, gently turn your attention toward it. Allow space for it to be 
                      seen without judgment, and begin forming a clearer sense of its voice and experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white bg-opacity-30 backdrop-blur-lg rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Understand (Flesh Out)</h4>
                    <p className="text-blue-100">
                      This step deepens your awareness of the part's story. Discover its history, the role it 
                      played in your life, and the burdens it carried to protect you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white bg-opacity-30 backdrop-blur-lg rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Relating (Feel Toward + Befriend)</h4>
                    <p className="text-blue-100">
                      Here, you begin shifting your relationship with the part. Cultivate warmth, kindness, and 
                      respect. Offer curiosity and compassion so the part feels supported by your Self.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white bg-opacity-30 backdrop-blur-lg rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Unburden (Fear/Unburden)</h4>
                    <p className="text-blue-100">
                      The final step is helping the part release the fears, or burdens it carried. By gently 
                      supporting this process, you invite healing, relief, and freedom.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6 F's Section */}
        {activeSection === '6fs' && (
          <div className="space-y-8">
            <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">The 6 F's Approach</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                The 6 F's Approach entails finding a part within, focusing on it, fleshing out its details and 
                emotions, feeling and accepting its impact, befriending it to understand its intentions, and 
                addressing its fears about role changes, facilitating a deep engagement with your inner self.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sixFs.map((step, index) => {
                const colors = [
                  'from-red-400 to-red-600',
                  'from-orange-400 to-orange-600',
                  'from-yellow-400 to-yellow-600',
                  'from-green-400 to-green-600',
                  'from-blue-400 to-blue-600',
                  'from-purple-400 to-purple-600'
                ];
                return (
                  <div key={index} className={`part-card bg-gradient-to-br ${colors[index]} text-white`}>
                    <div className="text-4xl font-bold mb-4">{index + 1}</div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-white text-opacity-95">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Unburdening Section */}
        {activeSection === 'unburdening' && (
          <div className="space-y-8">
            <div className="card bg-gradient-to-br from-pink-50 to-red-50">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">The Unburdening Process</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Unburdening is the process of helping a part release the painful emotions and limiting beliefs 
                it has been carrying. This is a gentle, compassionate process that happens when the part feels 
                safe and ready.
              </p>
            </div>

            <div className="space-y-6">
              {unburdeningSteps.map((step, index) => (
                <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <h3 className="text-2xl font-bold mb-4">Important Notes on Unburdening</h3>
              <ul className="space-y-3 text-purple-100">
                <li className="flex items-start">
                  <span className="mr-3 text-xl">•</span>
                  <span>Never force unburdening. The part must feel safe and ready.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-xl">•</span>
                  <span>Protectors may need permission before you work with Exiles.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-xl">•</span>
                  <span>The process should feel gentle and natural, not forced or rushed.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-xl">•</span>
                  <span>Trust your Self-energy to guide the process with compassion.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* My Parts Map Section */}
        {activeSection === 'myparts' && (
          <div className="space-y-8">
            <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">My Parts Map</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Create your personal parts map by identifying and documenting the different parts of your internal 
                system. This helps you understand their roles, triggers, and protective intentions.
              </p>
            </div>

            {/* Add Part Button */}
            {!isAdding && !editingId && (
              <button
                onClick={() => setIsAdding(true)}
                className="btn-primary w-full md:w-auto flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add a New Part</span>
              </button>
            )}

            {/* Add/Edit Part Form */}
            {(isAdding || editingId) && (
              <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {editingId ? 'Edit Part' : 'Add New Part'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Part Name</label>
                    <input
                      type="text"
                      value={newPart.name}
                      onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                      placeholder="e.g., Inner Critic, Anxious Part, Perfectionist"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      value={newPart.category}
                      onChange={(e) => setNewPart({ ...newPart, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="Managers">Manager</option>
                      <option value="Firefighters">Firefighter</option>
                      <option value="Exiles">Exile</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={newPart.description}
                      onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
                      placeholder="How does this part show up? What does it do?"
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Triggers</label>
                    <textarea
                      value={newPart.triggers}
                      onChange={(e) => setNewPart({ ...newPart, triggers: e.target.value })}
                      placeholder="What situations activate this part?"
                      rows="2"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Protective Intention</label>
                    <textarea
                      value={newPart.intention}
                      onChange={(e) => setNewPart({ ...newPart, intention: e.target.value })}
                      placeholder="What is this part trying to protect you from?"
                      rows="2"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={editingId ? handleSaveEdit : handleAddPart}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Save className="w-5 h-5" />
                      <span>{editingId ? 'Save Changes' : 'Add Part'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsAdding(false);
                        setEditingId(null);
                        setNewPart({ name: '', category: 'Managers', description: '', triggers: '', intention: '' });
                      }}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <X className="w-5 h-5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Parts List */}
            {myParts.length === 0 ? (
              <div className="card text-center py-12">
                <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No parts mapped yet. Start by adding your first part!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myParts.map((part) => (
                  <div
                    key={part.id}
                    className={`card bg-gradient-to-br ${getCategoryColor(part.category)}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">{part.name}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditPart(part)}
                          className="p-2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-lg transition-all"
                        >
                          <Edit2 className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleDeletePart(part.id)}
                          className="p-2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="inline-block px-3 py-1 bg-white bg-opacity-50 rounded-full text-sm font-semibold text-gray-700">
                          {part.category}
                        </span>
                      </div>
                      {part.description && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Description:</p>
                          <p className="text-gray-700">{part.description}</p>
                        </div>
                      )}
                      {part.triggers && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Triggers:</p>
                          <p className="text-gray-700">{part.triggers}</p>
                        </div>
                      )}
                      {part.intention && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Protective Intention:</p>
                          <p className="text-gray-700">{part.intention}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartsMapping;