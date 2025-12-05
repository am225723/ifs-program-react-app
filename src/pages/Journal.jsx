import { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Brain, 
  Shield, 
  Sparkles, 
  Calendar,
  Tag,
  Search,
  Plus,
  Save,
  BookOpen,
  MessageCircle,
  Lightbulb,
  Star,
  Clock,
  TrendingUp,
  Filter,
  Eye,
  Edit3,
  Trash2,
  ArrowRight,
  PenTool,
  Coffee,
  Moon,
  Sun
} from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [entryContent, setEntryContent] = useState('');
  const [entryTitle, setEntryTitle] = useState('');
  const [entryTags, setEntryTags] = useState([]);
  const [entryMood, setEntryMood] = useState('neutral');
  const [showPrompts, setShowPrompts] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const textAreaRef = useRef(null);

  const journalPrompts = [
    {
      category: 'inner-child',
      icon: Heart,
      title: 'Inner Child Connection',
      prompts: [
        'What did your inner child need today that you can give them?',
        'When did you feel most like your authentic self today?',
        'What fears came up for you today, and what do they need?',
        'How can you parent yourself with more compassion?',
        'What joy did you experience that your inner child celebrated?',
        'When did you feel small or vulnerable today?',
        'What part of you needs healing attention right now?'
      ]
    },
    {
      category: 'parts-work',
      icon: Brain,
      title: 'Parts Work',
      prompts: [
        'Which part of you was most active today?',
        'What did you learn about your internal system?',
        'When did you feel blended with a part, and when did you feel in Self?',
        'What conflicts arose between different parts of you?',
        'How did you show up as a leader for your parts?',
        'What protective part showed up today and why?',
        'What exile part needs your attention and care?'
      ]
    },
    {
      category: 'gratitude',
      icon: Star,
      title: 'Gratitude & Appreciation',
      prompts: [
        'What are three things you\'re grateful for today?',
        'Which part of yourself do you appreciate most right now?',
        'What moment brought you unexpected joy?',
        'Who supported you today, and how?',
        'What strength did you discover in yourself?',
        'What beauty did you notice in the world around you?',
        'How did you show yourself love today?'
      ]
    },
    {
      category: 'self-reflection',
      icon: Lightbulb,
      title: 'Self-Reflection',
      prompts: [
        'What triggered you today, and what did it teach you?',
        'When did you act from Self energy versus from a part?',
        'What pattern did you notice in your reactions?',
        'What boundary do you need to set for yourself?',
        'What truth are you ready to acknowledge?',
        'How did you grow or change this week?',
        'What old story are you ready to release?'
      ]
    }
  ];

  const moods = [
    { value: 'amazing', emoji: '😄', color: 'from-green-400 to-green-600', label: 'Amazing' },
    { value: 'good', emoji: '😊', color: 'from-blue-400 to-blue-600', label: 'Good' },
    { value: 'neutral', emoji: '😐', color: 'from-gray-400 to-gray-600', label: 'Neutral' },
    { value: 'challenged', emoji: '😔', color: 'from-yellow-400 to-yellow-600', label: 'Challenged' },
    { value: 'difficult', emoji: '😢', color: 'from-red-400 to-red-600', label: 'Difficult' }
  ];

  const tagOptions = [
    'inner-child', 'parts-work', 'self-leadership', 'healing', 'breakthrough',
    'challenge', 'gratitude', 'meditation', 'therapy', 'growth', 'insight',
    'emotional', 'relationship', 'work', 'family', 'self-care'
  ];

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    setEntries(savedEntries);
  }, []);

  useEffect(() => {
    if (savedMessage) {
      const timer = setTimeout(() => setSavedMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [savedMessage]);

  const handleSaveEntry = () => {
    if (!entryTitle.trim() || !entryContent.trim()) {
      alert('Please add both a title and content to your entry.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      title: entryTitle,
      content: entryContent,
      tags: entryTags,
      mood: entryMood,
      date: new Date().toISOString(),
      wordCount: entryContent.split(' ').length
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    setSavedMessage('Entry saved successfully!');
    setEntryTitle('');
    setEntryContent('');
    setEntryTags([]);
    setEntryMood('neutral');
    setSelectedPrompt(null);
    setIsWriting(false);
  };

  const handleDeleteEntry = (entryId) => {
    const updatedEntries = entries.filter(entry => entry.id !== entryId);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setSelectedEntry(null);
  };

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
    setEntryContent(prompt);
    setShowPrompts(false);
    textAreaRef.current?.focus();
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = selectedMood === 'all' || entry.mood === selectedMood;
    return matchesSearch && matchesMood;
  });

  const getMoodEmoji = (mood) => {
    return moods.find(m => m.value === mood)?.emoji || '😐';
  };

  const getMoodColor = (mood) => {
    return moods.find(m => m.value === mood)?.color || 'from-gray-400 to-gray-600';
  };

  const getWordCount = () => {
    return entryContent.split(' ').filter(word => word.length > 0).length;
  };

  if (isWriting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setIsWriting(false)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Journal
            </button>
            <div className="flex items-center space-x-4">
              {savedMessage && (
                <div className="text-green-600 font-medium animate-pulse">
                  {savedMessage}
                </div>
              )}
              <button
                onClick={handleSaveEntry}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Save Entry
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Entry Header */}
            <div className="mb-6">
              <input
                type="text"
                value={entryTitle}
                onChange={(e) => setEntryTitle(e.target.value)}
                placeholder="Entry title..."
                className="w-full text-3xl font-bold text-gray-900 placeholder-gray-400 border-none outline-none mb-4"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Mood Selector */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Mood:</span>
                    <div className="flex space-x-2">
                      {moods.map((mood) => (
                        <button
                          key={mood.value}
                          onClick={() => setEntryMood(mood.value)}
                          className={`text-2xl p-2 rounded-lg transition-all ${
                            entryMood === mood.value 
                              ? 'bg-gray-100 ring-2 ring-purple-500' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {mood.emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Word Count */}
                  <div className="text-sm text-gray-500">
                    {getWordCount()} words
                  </div>
                </div>

                <button
                  onClick={() => setShowPrompts(!showPrompts)}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-sm">Get Prompts</span>
                </button>
              </div>
            </div>

            {/* Writing Area */}
            <textarea
              ref={textAreaRef}
              value={entryContent}
              onChange={(e) => setEntryContent(e.target.value)}
              placeholder="Start writing about your inner world..."
              className="w-full h-96 text-lg text-gray-700 placeholder-gray-400 border-none outline-none resize-none leading-relaxed"
            />

            {/* Tags */}
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {entryTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      onClick={() => setEntryTags(entryTags.filter(t => t !== tag))}
                      className="ml-2 text-purple-500 hover:text-purple-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {tagOptions.filter(tag => !entryTags.includes(tag)).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setEntryTags([...entryTags, tag])}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Prompts Modal */}
          {showPrompts && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Journal Prompts</h3>
                  <button
                    onClick={() => setShowPrompts(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {journalPrompts.map((category) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.category} className="mb-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-purple-600" />
                          </div>
                          <h4 className="font-bold text-gray-900">{category.title}</h4>
                        </div>
                        <div className="space-y-2">
                          {category.prompts.map((prompt, index) => (
                            <button
                              key={index}
                              onClick={() => handlePromptSelect(prompt)}
                              className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all duration-200"
                            >
                              <p className="text-sm text-gray-700">{prompt}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedEntry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedEntry(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Entries
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleDeleteEntry(selectedEntry.id)}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Entry Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedEntry.title}</h1>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{getMoodEmoji(selectedEntry.mood)}</span>
                  <div className="text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(selectedEntry.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(selectedEntry.date).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {selectedEntry.wordCount} words
                </div>
              </div>

              {selectedEntry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Entry Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedEntry.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Healing Journal
              </h1>
              <p className="text-xl text-purple-100">
                A sacred space to document your inner journey and insights
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Entries</span>
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{entries.length}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Words</span>
              <PenTool className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {entries.reduce((total, entry) => total + (entry.wordCount || 0), 0).toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Current Streak</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">7 days</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Avg Mood</span>
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">😊</div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search entries..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Moods</option>
                {moods.map((mood) => (
                  <option key={mood.value} value={mood.value}>
                    {mood.emoji} {mood.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsWriting(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Entry
            </button>
          </div>
        </div>

        {/* Recent Entries */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Entries</h2>
          
          {filteredEntries.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {entries.length === 0 ? 'No journal entries yet' : 'No entries found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {entries.length === 0 
                  ? 'Start your healing journey by writing your first entry' 
                  : 'Try adjusting your search or filters'
                }
              </p>
              <button
                onClick={() => setIsWriting(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Write First Entry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    <Eye className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {entry.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {entry.content.length > 150 
                      ? entry.content.substring(0, 150) + '...' 
                      : entry.content
                    }
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div>{entry.wordCount} words</div>
                  </div>

                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {entry.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                      {entry.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{entry.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;