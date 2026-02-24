import { useState, useEffect, useRef, useCallback } from 'react';
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
  Sun,
  Mic,
  MicOff
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { supabase, supabaseHelpers } from '../lib/supabase';
import { clientAuth } from '../lib/supabasePersonalization';
import { useTheme } from '../contexts/ThemeContext';

const CONCERNING_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die', 'better off dead',
  'self-harm', 'self harm', 'cutting', 'hurt myself', 'harming myself',
  'hopeless', 'no reason to live', 'can\'t go on', 'give up on life',
  'overdose', 'pills', 'jump off', 'hang myself',
  'abuse', 'abused', 'being hit', 'hitting me', 'hurting me',
  'dangerous', 'unsafe', 'scared for my life', 'threatening',
  'relapse', 'using again', 'drinking again', 'started using',
  'panic attack', 'can\'t breathe', 'dissociating', 'blacking out',
  'nobody cares', 'all alone', 'no one would notice', 'disappear'
];

function scanForConcerningContent(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  return CONCERNING_KEYWORDS.filter(kw => lower.includes(kw));
}

async function createTherapistAlert(clientId, clientName, journalTitle, matchedKeywords) {
  try {
    const { data: advisors } = await supabase
      .from('ifs_clients')
      .select('id')
      .eq('user_role', 'advisor')
      .eq('status', 'active');

    if (!advisors || advisors.length === 0) return;

    const alertMessage = `Journal entry from ${clientName} contains concerning language: "${matchedKeywords.slice(0, 3).join('", "')}"${matchedKeywords.length > 3 ? ` (+${matchedKeywords.length - 3} more)` : ''}. Entry title: "${journalTitle}"`;

    for (const therapist of therapists) {
      await supabase
        .from('ifs_messages')
        .insert({
          client_id: clientId,
          therapist_id: therapist.id,
          sender_role: 'system',
          content: alertMessage,
          created_at: new Date().toISOString(),
          read: false
        });
    }
  } catch (err) {
    console.error('Error creating advisor alert:', err);
  }
}

const calculateStreak = (entries) => {
  if (!entries || entries.length === 0) return 0;
  const uniqueDays = new Set(
    entries.map(e => {
      const d = new Date(e.date);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );
  let streak = 0;
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const check = new Date(now);
    check.setDate(check.getDate() - i);
    const key = `${check.getFullYear()}-${check.getMonth()}-${check.getDate()}`;
    if (uniqueDays.has(key)) {
      streak++;
    } else {
      if (i === 0) continue;
      break;
    }
  }
  return streak;
};

const moodValues = { amazing: 5, good: 4, neutral: 3, challenged: 2, difficult: 1 };
const moodEmojis = [
  { value: 'difficult', emoji: '😢', threshold: 1.5 },
  { value: 'challenged', emoji: '😔', threshold: 2.5 },
  { value: 'neutral', emoji: '😐', threshold: 3.5 },
  { value: 'good', emoji: '😊', threshold: 4.5 },
  { value: 'amazing', emoji: '😄', threshold: 5.1 },
];

const calculateAverageMood = (entries) => {
  if (!entries || entries.length === 0) return '😐';
  const total = entries.reduce((sum, e) => sum + (moodValues[e.mood] || 3), 0);
  const avg = total / entries.length;
  for (const m of moodEmojis) {
    if (avg < m.threshold) return m.emoji;
  }
  return '😄';
};

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
  const [isDictating, setIsDictating] = useState(false);
  const recognitionRef = useRef(null);
  const speechSupported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const stopDictation = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsDictating(false);
    }
  }, []);

  const dictationBaseRef = useRef('');
  const startDictation = useCallback(() => {
    if (!speechSupported) return;
    dictationBaseRef.current = entryContent;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    let committed = '';
    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          committed += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      const base = dictationBaseRef.current;
      const separator = base && !base.endsWith(' ') ? ' ' : '';
      setEntryContent(base + separator + committed + interim);
    };
    recognition.onerror = () => setIsDictating(false);
    recognition.onend = () => {
      setIsDictating(false);
      dictationBaseRef.current = '';
    };
    recognitionRef.current = recognition;
    recognition.start();
    setIsDictating(true);
  }, [speechSupported, entryContent]);
  const { theme } = useTheme();
  const { awardXP } = useData();

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
    const loadEntries = async () => {
      try {
        const client = clientAuth.getCurrentClientValidated();
        if (client) {
          const { data, error } = await supabase
            .from('ifs_journal_entries')
            .select('*')
            .eq('client_id', client.id)
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            const mapped = data.map(row => ({
              id: row.id,
              title: row.title,
              content: row.content,
              tags: row.tags || [],
              mood: row.mood || 'neutral',
              date: row.created_at,
              wordCount: row.content?.split(' ').length || 0
            }));
            setEntries(mapped);
            return;
          }
        }
      } catch (err) {
        console.error('Error loading entries from Supabase:', err);
      }
      setEntries([]);
    };
    loadEntries();
  }, []);

  useEffect(() => {
    if (savedMessage) {
      const timer = setTimeout(() => setSavedMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [savedMessage]);

  const handleSaveEntry = async () => {
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

    try {
      const client = clientAuth.getCurrentClientValidated();
      if (client) {
        const { data, error } = await supabase
          .from('ifs_journal_entries')
          .insert({
            client_id: client.id,
            title: entryTitle,
            content: entryContent,
            mood: entryMood,
            tags: entryTags,
            created_at: new Date().toISOString()
          })
          .select()
          .single();

        if (!error && data && data.id) {
          newEntry.id = data.id;
        }

        const concerningMatches = scanForConcerningContent(entryContent);
        if (concerningMatches.length > 0) {
          createTherapistAlert(client.id, client.name || 'Client', entryTitle, concerningMatches);
        }
      }
    } catch (err) {
      console.error('Error saving entry to Supabase:', err);
    }

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    
    if (awardXP) awardXP('journal_entry', 25);
    setSavedMessage('Entry saved successfully!');
    setEntryTitle('');
    setEntryContent('');
    setEntryTags([]);
    setEntryMood('neutral');
    setSelectedPrompt(null);
    setIsWriting(false);
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      const client = clientAuth.getCurrentClientValidated();
      if (client) {
        await supabase
          .from('ifs_journal_entries')
          .delete()
          .eq('id', entryId);
      }
    } catch (err) {
      console.error('Error deleting entry from Supabase:', err);
    }

    const updatedEntries = entries.filter(entry => entry.id !== entryId);
    setEntries(updatedEntries);
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

  const cardBg = theme.isDark ? 'bg-slate-800' : 'bg-white';
  const textPrimary = theme.isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = theme.isDark ? 'text-slate-300' : 'text-gray-600';
  const textTertiary = theme.isDark ? 'text-slate-400' : 'text-gray-500';
  const inputBg = theme.isDark ? 'bg-slate-700 text-white border-slate-600' : 'border-gray-300';
  const inputText = theme.isDark ? 'text-white placeholder-slate-400' : 'text-gray-900 placeholder-gray-400';
  const textareaText = theme.isDark ? 'text-slate-200 placeholder-slate-400' : 'text-gray-700 placeholder-gray-400';
  const subtleBg = theme.isDark ? 'bg-slate-700' : 'bg-gray-100';
  const subtleBgHover = theme.isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200';
  const modalBg = theme.isDark ? 'bg-slate-800' : 'bg-white';
  const promptBg = theme.isDark ? 'bg-slate-700' : 'bg-gray-50';
  const promptHover = theme.isDark ? 'hover:bg-slate-600' : 'hover:bg-amber-50';

  if (isWriting) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setIsWriting(false)}
              className={`flex items-center ${textSecondary} hover:${textPrimary} transition-colors`}
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
                className="bg-gradient-to-r from-amber-600 to-emerald-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-amber-700 hover:to-emerald-700 transition-all duration-300"
              >
                Save Entry
              </button>
            </div>
          </div>

          <div className={`${cardBg} rounded-3xl shadow-xl p-8`}>
            <div className="mb-6">
              <input
                type="text"
                value={entryTitle}
                onChange={(e) => setEntryTitle(e.target.value)}
                placeholder="Entry title..."
                className={`w-full text-3xl font-bold ${inputText} border-none outline-none mb-4 bg-transparent`}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${textSecondary}`}>Mood:</span>
                    <div className="flex space-x-2">
                      {moods.map((mood) => (
                        <button
                          key={mood.value}
                          onClick={() => setEntryMood(mood.value)}
                          className={`text-2xl p-2 rounded-lg transition-all ${
                            entryMood === mood.value 
                              ? `${subtleBg} ring-2 ring-amber-500` 
                              : `${subtleBgHover}`
                          }`}
                        >
                          {mood.emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`text-sm ${textTertiary}`}>
                    {getWordCount()} words
                  </div>
                </div>

                <button
                  onClick={() => setShowPrompts(!showPrompts)}
                  className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-sm">Get Prompts</span>
                </button>
              </div>
            </div>

            {speechSupported && (
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={isDictating ? stopDictation : startDictation}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isDictating
                      ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30'
                      : theme.isDark ? 'bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700' : 'bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {isDictating ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isDictating ? 'Stop Dictation' : 'Voice Dictation'}
                </button>
                {isDictating && (
                  <span className="flex items-center gap-1 text-xs text-red-500 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Listening — speak freely...
                  </span>
                )}
              </div>
            )}
            <textarea
              ref={textAreaRef}
              value={entryContent}
              onChange={(e) => { if (!isDictating) setEntryContent(e.target.value); }}
              readOnly={isDictating}
              placeholder={isDictating ? "Speak now — your words will appear here..." : "Start writing about your inner world..."}
              className={`w-full h-96 text-lg ${textareaText} border-none outline-none resize-none leading-relaxed bg-transparent ${isDictating ? 'opacity-80' : ''}`}
            />

            <div className={`flex items-center gap-2 mt-2 px-3 py-2 rounded-lg ${theme.isDark ? 'bg-slate-700/50' : 'bg-amber-50'}`}>
              <Eye className={`w-3.5 h-3.5 flex-shrink-0 ${theme.isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              <p className={`text-xs ${theme.isDark ? 'text-slate-400' : 'text-amber-700'}`}>
                Your advisor may review journal entries to better support your healing journey.
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-3">
                <Tag className={`w-4 h-4 ${textSecondary}`} />
                <span className={`text-sm ${textSecondary}`}>Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {entryTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      onClick={() => setEntryTags(entryTags.filter(t => t !== tag))}
                      className="ml-2 text-amber-500 hover:text-amber-700"
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
                    className={`${subtleBg} ${textSecondary} px-3 py-1 rounded-full text-sm ${subtleBgHover} transition-colors`}
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {showPrompts && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className={`${modalBg} rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-2xl font-bold ${textPrimary}`}>Journal Prompts</h3>
                  <button
                    onClick={() => setShowPrompts(false)}
                    className={`${textTertiary} hover:${textSecondary}`}
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
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-amber-600" />
                          </div>
                          <h4 className={`font-bold ${textPrimary}`}>{category.title}</h4>
                        </div>
                        <div className="space-y-2">
                          {category.prompts.map((prompt, index) => (
                            <button
                              key={index}
                              onClick={() => handlePromptSelect(prompt)}
                              className={`w-full text-left p-3 ${promptBg} rounded-lg ${promptHover} border border-transparent transition-all duration-200`}
                            >
                              <p className={`text-sm ${theme.isDark ? 'text-slate-200' : 'text-gray-700'}`}>{prompt}</p>
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
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedEntry(null)}
              className={`flex items-center ${textSecondary} hover:${textPrimary} transition-colors`}
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

          <div className={`${cardBg} rounded-3xl shadow-xl p-8`}>
            <div className="mb-6">
              <h1 className={`text-3xl font-bold ${textPrimary} mb-4`}>{selectedEntry.title}</h1>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{getMoodEmoji(selectedEntry.mood)}</span>
                  <div className={textSecondary}>
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
                <div className={`text-sm ${textTertiary}`}>
                  {selectedEntry.wordCount} words
                </div>
              </div>

              {selectedEntry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="prose prose-lg max-w-none">
              <div className={`${theme.isDark ? 'text-slate-200' : 'text-gray-700'} leading-relaxed whitespace-pre-wrap`}>
                {selectedEntry.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-amber-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Healing Journal
              </h1>
              <p className="text-xl text-amber-100">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`${cardBg} rounded-2xl shadow-lg p-6`}>
            <div className="flex items-center justify-between mb-2">
              <span className={textSecondary}>Total Entries</span>
              <BookOpen className="w-5 h-5 text-amber-600" />
            </div>
            <div className={`text-2xl font-bold ${textPrimary}`}>{entries.length}</div>
          </div>

          <div className={`${cardBg} rounded-2xl shadow-lg p-6`}>
            <div className="flex items-center justify-between mb-2">
              <span className={textSecondary}>Total Words</span>
              <PenTool className="w-5 h-5 text-blue-600" />
            </div>
            <div className={`text-2xl font-bold ${textPrimary}`}>
              {entries.reduce((total, entry) => total + (entry.wordCount || 0), 0).toLocaleString()}
            </div>
          </div>

          <div className={`${cardBg} rounded-2xl shadow-lg p-6`}>
            <div className="flex items-center justify-between mb-2">
              <span className={textSecondary}>Current Streak</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className={`text-2xl font-bold ${textPrimary}`}>{calculateStreak(entries)} days</div>
          </div>

          <div className={`${cardBg} rounded-2xl shadow-lg p-6`}>
            <div className="flex items-center justify-between mb-2">
              <span className={textSecondary}>Avg Mood</span>
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div className={`text-2xl font-bold ${textPrimary}`}>{calculateAverageMood(entries)}</div>
          </div>
        </div>

        <div className={`${cardBg} rounded-2xl shadow-lg p-6 mb-8`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textTertiary} w-5 h-5`} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search entries..."
                  className={`w-full pl-10 pr-4 py-2 border ${inputBg} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                />
              </div>
              
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className={`px-4 py-2 border ${inputBg} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
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
              className="bg-gradient-to-r from-amber-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Entry
            </button>
          </div>
        </div>

        <div>
          <h2 className={`text-2xl font-bold ${textPrimary} mb-6`}>Recent Entries</h2>
          
          {filteredEntries.length === 0 ? (
            <div className={`${cardBg} rounded-2xl shadow-lg p-12 text-center`}>
              <div className={`w-20 h-20 ${subtleBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <BookOpen className={`w-10 h-10 ${textTertiary}`} />
              </div>
              <h3 className={`text-xl font-semibold ${textPrimary} mb-2`}>
                {entries.length === 0 ? 'No journal entries yet' : 'No entries found'}
              </h3>
              <p className={`${textSecondary} mb-6`}>
                {entries.length === 0 
                  ? 'Start your healing journey by writing your first entry' 
                  : 'Try adjusting your search or filters'
                }
              </p>
              <button
                onClick={() => setIsWriting(true)}
                className="bg-gradient-to-r from-amber-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-emerald-700 transition-all duration-300"
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
                  className={`${cardBg} rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 group`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    <Eye className={`w-5 h-5 ${textTertiary} group-hover:text-amber-600 transition-colors`} />
                  </div>
                  
                  <h3 className={`text-lg font-bold ${textPrimary} mb-2 group-hover:text-amber-600 transition-colors`}>
                    {entry.title}
                  </h3>
                  
                  <p className={`${textSecondary} mb-4 line-clamp-3`}>
                    {entry.content.length > 150 
                      ? entry.content.substring(0, 150) + '...' 
                      : entry.content
                    }
                  </p>
                  
                  <div className={`flex items-center justify-between text-sm ${textTertiary}`}>
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
                          className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                      {entry.tags.length > 3 && (
                        <span className={`text-xs ${textTertiary}`}>+{entry.tags.length - 3}</span>
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
