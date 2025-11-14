import { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Calendar, Download, Upload } from 'lucide-react';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    mood: 'neutral',
    parts: ''
  });

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('ifsJournalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ifsJournalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = () => {
    if (currentEntry.title.trim() && currentEntry.content.trim()) {
      const newEntry = {
        ...currentEntry,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      setEntries([newEntry, ...entries]);
      setCurrentEntry({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        mood: 'neutral',
        parts: ''
      });
      setIsWriting(false);
    }
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ifs-journal-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedEntries = JSON.parse(e.target.result);
          setEntries([...importedEntries, ...entries]);
          alert('Journal entries imported successfully!');
        } catch (error) {
          alert('Error importing file. Please make sure it\'s a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const getMoodColor = (mood) => {
    const colors = {
      happy: 'from-green-400 to-green-600',
      calm: 'from-blue-400 to-blue-600',
      neutral: 'from-gray-400 to-gray-600',
      anxious: 'from-yellow-400 to-yellow-600',
      sad: 'from-purple-400 to-purple-600',
      angry: 'from-red-400 to-red-600'
    };
    return colors[mood] || colors.neutral;
  };

  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: '😊',
      calm: '😌',
      neutral: '😐',
      anxious: '😰',
      sad: '😢',
      angry: '😠'
    };
    return emojis[mood] || '😐';
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Personal Journal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your healing journey, document insights, and reflect on your work with your parts
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {!isWriting && (
            <button
              onClick={() => setIsWriting(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Entry</span>
            </button>
          )}
          <button
            onClick={handleExport}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Export Journal</span>
          </button>
          <label className="btn-secondary flex items-center space-x-2 cursor-pointer">
            <Upload className="w-5 h-5" />
            <span>Import Journal</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        {/* Writing Form */}
        {isWriting && (
          <div className="card mb-8 bg-gradient-to-br from-blue-50 to-purple-50">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">New Journal Entry</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={currentEntry.title}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                  placeholder="Give your entry a title..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={currentEntry.date}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mood</label>
                  <select
                    value={currentEntry.mood}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, mood: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="happy">😊 Happy</option>
                    <option value="calm">😌 Calm</option>
                    <option value="neutral">😐 Neutral</option>
                    <option value="anxious">😰 Anxious</option>
                    <option value="sad">😢 Sad</option>
                    <option value="angry">😠 Angry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Parts Involved</label>
                <input
                  type="text"
                  value={currentEntry.parts}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, parts: e.target.value })}
                  placeholder="Which parts showed up today? (e.g., Inner Critic, Anxious Part)"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Journal Entry</label>
                <textarea
                  value={currentEntry.content}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                  placeholder="Write about your experiences, insights, or reflections..."
                  rows="10"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleSaveEntry}
                  className="btn-primary"
                >
                  Save Entry
                </button>
                <button
                  onClick={() => {
                    setIsWriting(false);
                    setCurrentEntry({
                      title: '',
                      content: '',
                      date: new Date().toISOString().split('T')[0],
                      mood: 'neutral',
                      parts: ''
                    });
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Journal Prompts */}
        <div className="card mb-8 bg-gradient-to-br from-purple-50 to-pink-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Journal Prompts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-700">• What parts showed up for me today?</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-700">• What was each part trying to protect me from?</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-700">• How did I respond to my parts with Self-energy?</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-700">• What did I learn about my internal system today?</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-700">• Which of the 8 C's did I embody today?</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-700">• What burdens are my parts ready to release?</p>
            </div>
          </div>
        </div>

        {/* Entries List */}
        {entries.length === 0 ? (
          <div className="card text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">No journal entries yet</p>
            <p className="text-gray-500">Start documenting your healing journey by creating your first entry!</p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Your Entries ({entries.length})</h2>
            {entries.map((entry) => (
              <div key={entry.id} className="card hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{entry.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(entry.date).toLocaleDateString()}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getMoodColor(entry.mood)} text-white font-semibold`}>
                        {getMoodEmoji(entry.mood)} {entry.mood}
                      </div>
                      {entry.parts && (
                        <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold">
                          Parts: {entry.parts}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;