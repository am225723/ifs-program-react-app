import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, User, TrendingUp, Calendar, FileText, MessageSquare, 
  Clock, CheckCircle, AlertTriangle, Activity, Heart, Shield,
  ChevronRight, Search, Filter, Plus, Eye, BarChart3, Sparkles,
  BookOpen, ChevronDown, ChevronUp, MessageCircle, Flag, Lightbulb
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';

const mockClients = [
  {
    id: 'c1',
    name: 'Sarah Mitchell',
    primaryWound: 'abandonment',
    secondaryWound: 'shame',
    progress: 72,
    lastActive: '2026-02-07',
    riskLevel: 'low',
    modulesCompleted: 8,
    assessmentsTaken: 3,
    journalEntries: 15,
    weeklyProgress: [40, 48, 55, 60, 65, 68, 72],
    sessionCount: 12,
    joinDate: '2025-11-15'
  },
  {
    id: 'c2',
    name: 'James Cooper',
    primaryWound: 'betrayal',
    secondaryWound: 'neglect',
    progress: 45,
    lastActive: '2026-01-28',
    riskLevel: 'high',
    modulesCompleted: 4,
    assessmentsTaken: 2,
    journalEntries: 6,
    weeklyProgress: [20, 25, 30, 35, 40, 42, 45],
    sessionCount: 8,
    joinDate: '2025-12-01'
  },
  {
    id: 'c3',
    name: 'Emily Chen',
    primaryWound: 'shame',
    secondaryWound: 'abandonment',
    progress: 88,
    lastActive: '2026-02-08',
    riskLevel: 'low',
    modulesCompleted: 11,
    assessmentsTaken: 4,
    journalEntries: 28,
    weeklyProgress: [50, 58, 65, 72, 78, 84, 88],
    sessionCount: 16,
    joinDate: '2025-09-20'
  },
  {
    id: 'c4',
    name: 'Marcus Johnson',
    primaryWound: 'neglect',
    secondaryWound: 'betrayal',
    progress: 33,
    lastActive: '2026-02-05',
    riskLevel: 'medium',
    modulesCompleted: 3,
    assessmentsTaken: 1,
    journalEntries: 4,
    weeklyProgress: [10, 15, 18, 22, 26, 30, 33],
    sessionCount: 5,
    joinDate: '2026-01-10'
  },
  {
    id: 'c5',
    name: 'Rachel Torres',
    primaryWound: 'abandonment',
    secondaryWound: 'neglect',
    progress: 61,
    lastActive: '2026-02-06',
    riskLevel: 'low',
    modulesCompleted: 6,
    assessmentsTaken: 2,
    journalEntries: 12,
    weeklyProgress: [30, 36, 42, 48, 53, 58, 61],
    sessionCount: 10,
    joinDate: '2025-10-05'
  },
  {
    id: 'c6',
    name: 'David Okafor',
    primaryWound: 'shame',
    secondaryWound: 'betrayal',
    progress: 19,
    lastActive: '2026-01-20',
    riskLevel: 'high',
    modulesCompleted: 2,
    assessmentsTaken: 1,
    journalEntries: 2,
    weeklyProgress: [5, 8, 10, 12, 14, 17, 19],
    sessionCount: 3,
    joinDate: '2026-01-05'
  }
];

const mockAlerts = [
  { id: 'a1', type: 'warning', icon: AlertTriangle, message: 'James Cooper hasn\'t logged in for 11 days', client: 'James Cooper', time: '2 hours ago' },
  { id: 'a2', type: 'warning', icon: AlertTriangle, message: 'David Okafor hasn\'t logged in for 19 days', client: 'David Okafor', time: '5 hours ago' },
  { id: 'a3', type: 'success', icon: CheckCircle, message: 'Emily Chen completed a new assessment', client: 'Emily Chen', time: '1 day ago' },
  { id: 'a4', type: 'info', icon: FileText, message: 'Rachel Torres wrote a journal entry flagged for review', client: 'Rachel Torres', time: '2 days ago' },
  { id: 'a5', type: 'success', icon: Sparkles, message: 'Sarah Mitchell reached 72% overall progress', client: 'Sarah Mitchell', time: '3 days ago' },
  { id: 'a6', type: 'info', icon: Activity, message: 'Marcus Johnson started Module 4: Parts Dialogue', client: 'Marcus Johnson', time: '3 days ago' }
];

const woundColorMap = {
  abandonment: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  shame: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  neglect: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  betrayal: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' }
};

const riskColors = {
  low: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', label: 'Low Risk' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500', label: 'Medium Risk' },
  high: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', label: 'High Risk' }
};

const TherapistDashboard = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterWound, setFilterWound] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [activeTab, setActiveTab] = useState('clients');
  const [expandedModules, setExpandedModules] = useState({});
  const [selectedInsightClient, setSelectedInsightClient] = useState('');
  const [therapistFeedback, setTherapistFeedback] = useState({});
  const [sessionNotes, setSessionNotes] = useState([]);
  const [noteForm, setNoteForm] = useState({
    clientId: '',
    date: new Date().toISOString().split('T')[0],
    sessionType: 'Individual',
    notes: '',
    goals: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('therapist_session_notes');
    if (saved) {
      try {
        setSessionNotes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load session notes:', e);
      }
    }
    const savedFeedback = localStorage.getItem('therapist_client_feedback');
    if (savedFeedback) {
      try {
        setTherapistFeedback(JSON.parse(savedFeedback));
      } catch (e) {
        console.error('Failed to load therapist feedback:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (sessionNotes.length > 0) {
      localStorage.setItem('therapist_session_notes', JSON.stringify(sessionNotes));
    }
  }, [sessionNotes]);

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWound = filterWound === 'all' || client.primaryWound === filterWound;
    const matchesRisk = filterRisk === 'all' || client.riskLevel === filterRisk;
    return matchesSearch && matchesWound && matchesRisk;
  });

  const stats = {
    totalClients: mockClients.length,
    activeSessions: 4,
    assessmentsCompleted: mockClients.reduce((sum, c) => sum + c.assessmentsTaken, 0),
    avgProgress: Math.round(mockClients.reduce((sum, c) => sum + c.progress, 0) / mockClients.length)
  };

  const handleSaveNote = () => {
    if (!noteForm.clientId || !noteForm.notes) return;
    const client = mockClients.find(c => c.id === noteForm.clientId);
    const newNote = {
      id: Date.now().toString(),
      ...noteForm,
      clientName: client?.name || 'Unknown',
      createdAt: new Date().toISOString()
    };
    setSessionNotes(prev => [newNote, ...prev]);
    setNoteForm({
      clientId: '',
      date: new Date().toISOString().split('T')[0],
      sessionType: 'Individual',
      notes: '',
      goals: ''
    });
  };

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleFeedbackChange = (clientId, value) => {
    const updated = { ...therapistFeedback, [clientId]: value };
    setTherapistFeedback(updated);
    localStorage.setItem('therapist_client_feedback', JSON.stringify(updated));
  };

  const lessonPlans = [
    {
      id: 'm1',
      title: 'Module 1: Foundations of IFS & Your Inner Child',
      goals: 'Help client understand IFS model, identify their parts, experience Self energy',
      topics: [
        'What does your inner world feel like?',
        'When do you notice different parts of yourself?',
        'What does your inner critic sound like?'
      ],
      activities: ['Parts mapping exercise', 'Self-energy check-in', 'Identifying 3 main protector parts'],
      watchFor: ['Client resistance to multiplicity concept', 'Strong critic parts', 'Difficulty accessing Self'],
      duration: '60 min suggested',
      homework: 'Daily Self-energy check-in, notice 3 parts during the week'
    },
    {
      id: 'm2',
      title: 'Module 2: Deep Dive into Inner Child Wounds',
      goals: 'Identify primary wounds, understand wound-behavior connections, begin building compassion for wounded parts',
      topics: [
        'What childhood experiences still affect you?',
        'When do you feel youngest/most vulnerable?',
        'What beliefs about yourself formed in childhood?'
      ],
      activities: ['Wound identification exercise', 'Timeline of key childhood moments', 'Connecting current triggers to old wounds'],
      watchFor: ['Flooding/overwhelm', 'Dissociation', 'Strong protector activation', 'Grief responses'],
      duration: '90 min (allow extra time for emotional processing)',
      homework: 'Journal about one wound pattern noticed during the week'
    },
    {
      id: 'm3',
      title: 'Module 3: The Protective System',
      goals: 'Map the protective system, appreciate protector roles, understand manager vs firefighter dynamics',
      topics: [
        'What do your protectors do to keep you safe?',
        'What would happen if they stopped?',
        'How do they feel about therapy?'
      ],
      activities: ['Protector appreciation exercise', 'Role-play conversation with a protector', 'Mapping protector-exile relationships'],
      watchFor: ['Client identifying with protectors', 'Shame about firefighter behaviors', 'Resistance to exploring what protectors guard'],
      duration: '60 min',
      homework: 'Thank a protector part daily, notice firefighter activation'
    },
    {
      id: 'm4',
      title: 'Module 4: Healing Protocols & Integration',
      goals: 'Practice unburdening protocol, integrate healed parts, celebrate transformation',
      topics: [
        'What would your inner child need to hear?',
        'What burden is this part ready to release?',
        'Where would it like to put this burden?'
      ],
      activities: ['Guided unburdening ceremony', 'Reparenting visualization', 'Integration meditation'],
      watchFor: ['Parts that aren\'t ready', 'Incomplete unburdening', 'Need for multiple sessions', 'New protectors arising'],
      duration: '90 min',
      homework: 'Daily reparenting check-in with inner child'
    },
    {
      id: 'm5',
      title: 'Module 5: Advanced Healing & Daily Practices',
      goals: 'Establish sustainable daily practice, address remaining wounds, build long-term resilience',
      topics: [
        'How has your relationship with your parts changed?',
        'What practices feel most helpful?',
        'What still needs attention?'
      ],
      activities: ['Create personalized daily IFS practice plan', 'Address secondary wounds', 'Practice Self-led living'],
      watchFor: ['Premature termination desire', 'New wounds surfacing', 'Maintaining gains', 'Relapse patterns'],
      duration: '60 min',
      homework: 'Full daily practice routine for 2 weeks'
    }
  ];

  const mockClientInsights = {
    c1: {
      recentAnswers: [
        { question: 'How do you feel when your inner critic speaks?', answer: 'I notice tension in my chest and a voice saying I\'m not good enough. I tried to breathe through it.', module: 'Module 1' },
        { question: 'What childhood memory comes up most often?', answer: 'When my parents would leave for work trips. I felt so alone and scared.', module: 'Module 2' },
        { question: 'Describe your protector parts.', answer: 'My perfectionist part works overtime. It believes if I\'m perfect, nobody will leave me.', module: 'Module 3' }
      ],
      flaggedResponses: [
        { question: 'How do you cope when overwhelmed?', answer: 'Sometimes I feel like shutting down completely and not talking to anyone for days.', severity: 'orange', reason: 'Isolation pattern detected' },
        { question: 'What happens when your wound is triggered?', answer: 'I feel worthless and like nothing will ever change.', severity: 'red', reason: 'Hopelessness language detected' }
      ],
      sessionPrep: [
        'Follow up on abandonment wound work from last session',
        'Check in on daily Self-energy practice adherence',
        'Explore perfectionist protector\'s relationship with the exile',
        'Introduce unburdening concept if client seems ready',
        'Assess progress on recognizing inner critic patterns'
      ]
    },
    c2: {
      recentAnswers: [
        { question: 'What does trust feel like in your body?', answer: 'I don\'t really know. My body tenses up when I think about trusting someone.', module: 'Module 1' },
        { question: 'When was trust first broken for you?', answer: 'My best friend in middle school told everyone my secrets. I never trusted anyone the same way.', module: 'Module 2' }
      ],
      flaggedResponses: [
        { question: 'How are you feeling about the therapy process?', answer: 'I\'m not sure this is working. I feel angry most of the time and I don\'t know why I bother.', severity: 'red', reason: 'Disengagement risk and persistent anger' },
        { question: 'What do you do when you feel betrayed?', answer: 'I cut people off completely. I\'d rather be alone than hurt again.', severity: 'orange', reason: 'Extreme avoidance pattern' },
        { question: 'How often do you feel safe?', answer: 'Almost never. I\'m always waiting for the other shoe to drop.', severity: 'orange', reason: 'Chronic hypervigilance' }
      ],
      sessionPrep: [
        'Address therapy engagement concerns directly',
        'Validate anger as a protector response',
        'Explore the firefighter pattern of cutting people off',
        'Consider slower pacing for trust-building',
        'Check for any external stressors contributing to disengagement'
      ]
    },
    c3: {
      recentAnswers: [
        { question: 'How has your relationship with your parts changed?', answer: 'I can now notice my shame part without being consumed by it. I feel more compassion for her.', module: 'Module 4' },
        { question: 'What unburdening experience was most meaningful?', answer: 'Releasing the belief that I\'m fundamentally broken. I visualized putting it into a river.', module: 'Module 4' },
        { question: 'What daily practice works best for you?', answer: 'Morning check-ins with my parts. I ask each one how they\'re doing before starting my day.', module: 'Module 5' }
      ],
      flaggedResponses: [
        { question: 'Are there any parts that still feel burdened?', answer: 'My younger self still carries some sadness about never feeling seen by my father.', severity: 'orange', reason: 'Unresolved paternal wound' }
      ],
      sessionPrep: [
        'Celebrate significant progress in parts work',
        'Explore remaining paternal wound with care',
        'Discuss long-term maintenance strategies',
        'Consider reducing session frequency as client stabilizes',
        'Review and refine daily IFS practice routine'
      ]
    },
    c4: {
      recentAnswers: [
        { question: 'What does your inner world feel like?', answer: 'Empty, mostly. Like a dark room with no one in it.', module: 'Module 1' },
        { question: 'When do you notice different parts of yourself?', answer: 'I don\'t really. I just feel numb most of the time.', module: 'Module 1' }
      ],
      flaggedResponses: [
        { question: 'How do you feel about starting this process?', answer: 'I don\'t feel much of anything. Everyone says I should care more but I can\'t.', severity: 'red', reason: 'Emotional numbness / possible dissociation' },
        { question: 'What do you need most right now?', answer: 'I honestly don\'t know. I\'ve never been asked that before.', severity: 'orange', reason: 'Neglect wound activation' }
      ],
      sessionPrep: [
        'Use somatic approaches to help client connect with body',
        'Go slowly with parts identification — numbness is protective',
        'Validate the neglect experience without pushing',
        'Consider grounding exercises before parts work',
        'Build rapport before deeper wound exploration'
      ]
    },
    c5: {
      recentAnswers: [
        { question: 'What do your protectors do to keep you safe?', answer: 'My people-pleaser part works really hard. She makes sure everyone else is happy so they won\'t leave.', module: 'Module 3' },
        { question: 'What would happen if your protectors stopped?', answer: 'I think I\'d be completely alone. That terrifies me.', module: 'Module 3' },
        { question: 'How do your protectors feel about therapy?', answer: 'They\'re cautious but willing. My anxious part keeps checking if you\'re going to judge me.', module: 'Module 3' }
      ],
      flaggedResponses: [
        { question: 'What happens when someone important pulls away?', answer: 'I panic and do anything to get them back, even things that hurt me.', severity: 'orange', reason: 'Self-sacrificing pattern linked to abandonment' }
      ],
      sessionPrep: [
        'Appreciate the people-pleaser protector before exploring deeper',
        'Address abandonment fears showing up in session',
        'Begin mapping exile-protector relationships',
        'Introduce concept of Self-led relationships',
        'Check homework on protector appreciation practice'
      ]
    },
    c6: {
      recentAnswers: [
        { question: 'What does your inner world feel like?', answer: 'Chaotic. Like everyone\'s yelling and I can\'t make them stop.', module: 'Module 1' }
      ],
      flaggedResponses: [
        { question: 'How do you cope when shame is activated?', answer: 'I drink. Or I lash out at people I care about. Then I feel more shame.', severity: 'red', reason: 'Substance use and harmful coping behaviors' },
        { question: 'What does your inner critic say?', answer: 'That I\'m disgusting and don\'t deserve love. That everyone can see how broken I am.', severity: 'red', reason: 'Severe self-criticism and worthlessness' }
      ],
      sessionPrep: [
        'Priority: Assess safety and substance use frequency',
        'Approach shame work very gently — high activation risk',
        'Focus on stabilization before deep parts work',
        'Build alliance with protector parts first',
        'Consider more frequent sessions given risk level'
      ]
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const daysSince = (dateStr) => {
    const diff = new Date() - new Date(dateStr);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const isDark = theme.isDark;
  const cardBg = isDark ? 'bg-slate-800/90' : 'bg-white';
  const cardBorder = isDark ? 'border-slate-700' : 'border-gray-200';
  const textPrimary = isDark ? 'text-slate-100' : 'text-gray-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-gray-500';
  const textMuted = isDark ? 'text-slate-500' : 'text-gray-400';
  const inputBg = isDark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-gray-300 text-gray-900';
  const hoverBg = isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${textPrimary}`}>Therapist Dashboard</h1>
            <p className={`mt-1 ${textSecondary}`}>Monitor client progress and manage sessions</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${textMuted}`}>Last updated: {formatDate(new Date().toISOString())}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Clients', value: stats.totalClients, icon: Users, color: 'from-blue-500 to-blue-600' },
          { label: 'Active Sessions', value: stats.activeSessions, icon: Calendar, color: 'from-emerald-500 to-emerald-600' },
          { label: 'Assessments Done', value: stats.assessmentsCompleted, icon: CheckCircle, color: 'from-purple-500 to-purple-600' },
          { label: 'Avg Progress', value: `${stats.avgProgress}%`, icon: TrendingUp, color: 'from-amber-500 to-amber-600' }
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${cardBg} rounded-xl border ${cardBorder} p-4 sm:p-5`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className={`text-xs sm:text-sm ${textSecondary} truncate`}>{stat.label}</p>
                  <p className={`text-xl sm:text-2xl font-bold ${textPrimary}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'clients', label: 'Clients', icon: Users },
          { id: 'notes', label: 'Session Notes', icon: FileText },
          { id: 'progress', label: 'Progress', icon: BarChart3 },
          { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
          { id: 'actions', label: 'Quick Actions', icon: Sparkles },
          { id: 'lessons', label: 'Lesson Plans', icon: BookOpen },
          { id: 'insights', label: 'Client Insights', icon: Eye }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : `${cardBg} ${textSecondary} border ${cardBorder} ${hoverBg}`
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.id === 'alerts' && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {mockAlerts.filter(a => a.type === 'warning').length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab === 'clients' && (
        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textMuted}`} />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none`}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterWound}
                onChange={(e) => setFilterWound(e.target.value)}
                className={`px-3 py-2.5 rounded-lg border ${inputBg} text-sm focus:ring-2 focus:ring-purple-500 outline-none`}
              >
                <option value="all">All Wounds</option>
                <option value="abandonment">Abandonment</option>
                <option value="shame">Shame</option>
                <option value="neglect">Neglect</option>
                <option value="betrayal">Betrayal</option>
              </select>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className={`px-3 py-2.5 rounded-lg border ${inputBg} text-sm focus:ring-2 focus:ring-purple-500 outline-none`}
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredClients.map(client => {
              const wound = woundColorMap[client.primaryWound];
              const risk = riskColors[client.riskLevel];
              const inactive = daysSince(client.lastActive);
              return (
                <div key={client.id} className={`${cardBg} rounded-xl border ${cardBorder} p-4 sm:p-5 transition-all hover:shadow-lg`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {client.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-semibold ${textPrimary}`}>{client.name}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${risk.bg} ${risk.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`}></span>
                            {risk.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${wound.bg} ${wound.text}`}>
                            <Heart className="w-3 h-3" />
                            {client.primaryWound}
                          </span>
                          <span className={`text-xs ${textMuted} flex items-center gap-1`}>
                            <Clock className="w-3 h-3" />
                            {inactive === 0 ? 'Active today' : `${inactive}d ago`}
                          </span>
                          <span className={`text-xs ${textMuted}`}>
                            {client.sessionCount} sessions
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-24 sm:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              client.progress >= 70 ? 'bg-green-500' : client.progress >= 40 ? 'bg-amber-500' : 'bg-red-400'
                            }`}
                            style={{ width: `${client.progress}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold ${textPrimary} w-10 text-right`}>{client.progress}%</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button className={`p-2 rounded-lg ${hoverBg} ${textSecondary} transition-colors`} title="View Profile">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setActiveTab('notes'); setNoteForm(f => ({ ...f, clientId: client.id })); }}
                          className={`p-2 rounded-lg ${hoverBg} ${textSecondary} transition-colors`}
                          title="Add Note"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className={`p-2 rounded-lg ${hoverBg} ${textSecondary} transition-colors`} title="Schedule">
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredClients.length === 0 && (
              <div className={`${cardBg} rounded-xl border ${cardBorder} p-12 text-center`}>
                <Users className={`w-12 h-12 mx-auto mb-3 ${textMuted}`} />
                <p className={`font-medium ${textSecondary}`}>No clients match your filters</p>
                <p className={`text-sm mt-1 ${textMuted}`}>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
            <h2 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
              <FileText className="w-5 h-5 text-purple-500" />
              New Session Note
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-1`}>Client</label>
                <select
                  value={noteForm.clientId}
                  onChange={(e) => setNoteForm(f => ({ ...f, clientId: e.target.value }))}
                  className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-purple-500 outline-none`}
                >
                  <option value="">Select a client...</option>
                  {mockClients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-1`}>Date</label>
                  <input
                    type="date"
                    value={noteForm.date}
                    onChange={(e) => setNoteForm(f => ({ ...f, date: e.target.value }))}
                    className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-purple-500 outline-none`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-1`}>Session Type</label>
                  <select
                    value={noteForm.sessionType}
                    onChange={(e) => setNoteForm(f => ({ ...f, sessionType: e.target.value }))}
                    className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-purple-500 outline-none`}
                  >
                    <option value="Individual">Individual</option>
                    <option value="Group">Group</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-1`}>Session Notes</label>
                <textarea
                  value={noteForm.notes}
                  onChange={(e) => setNoteForm(f => ({ ...f, notes: e.target.value }))}
                  rows={4}
                  placeholder="Document session observations, client responses, techniques used..."
                  className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-purple-500 outline-none resize-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-1`}>Goals for Next Session</label>
                <textarea
                  value={noteForm.goals}
                  onChange={(e) => setNoteForm(f => ({ ...f, goals: e.target.value }))}
                  rows={3}
                  placeholder="Outline focus areas and objectives for the next meeting..."
                  className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-purple-500 outline-none resize-none`}
                />
              </div>
              <button
                onClick={handleSaveNote}
                disabled={!noteForm.clientId || !noteForm.notes}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Save Session Note
              </button>
            </div>
          </div>

          <div>
            <h2 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
              <Clock className="w-5 h-5 text-purple-500" />
              Previous Notes
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {sessionNotes.length === 0 ? (
                <div className={`${cardBg} rounded-xl border ${cardBorder} p-8 text-center`}>
                  <MessageSquare className={`w-10 h-10 mx-auto mb-3 ${textMuted}`} />
                  <p className={`${textSecondary}`}>No session notes yet</p>
                  <p className={`text-sm mt-1 ${textMuted}`}>Notes you save will appear here</p>
                </div>
              ) : (
                sessionNotes.map(note => (
                  <div key={note.id} className={`${cardBg} rounded-xl border ${cardBorder} p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${textPrimary}`}>{note.clientName}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{note.sessionType}</span>
                        <span className={`text-xs ${textMuted}`}>{formatDate(note.date)}</span>
                      </div>
                    </div>
                    <p className={`text-sm ${textSecondary} mb-2`}>{note.notes}</p>
                    {note.goals && (
                      <div className={`text-sm ${textMuted} border-t ${isDark ? 'border-slate-700' : 'border-gray-100'} pt-2 mt-2`}>
                        <span className="font-medium">Next Goals:</span> {note.goals}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
          <h2 className={`text-lg font-semibold ${textPrimary} mb-6 flex items-center gap-2`}>
            <BarChart3 className="w-5 h-5 text-purple-500" />
            Client Progress Overview
          </h2>

          <div className="space-y-8">
            {mockClients.map(client => {
              const maxVal = Math.max(client.modulesCompleted, client.assessmentsTaken, client.journalEntries);
              return (
                <div key={client.id}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className={`font-medium ${textPrimary}`}>{client.name}</h3>
                      <p className={`text-xs ${textMuted}`}>Joined {formatDate(client.joinDate)}</p>
                    </div>
                    <span className={`ml-auto text-sm font-semibold ${textPrimary}`}>{client.progress}%</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ml-11">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${textSecondary}`}>Modules</span>
                        <span className={`text-xs font-medium ${textPrimary}`}>{client.modulesCompleted}/12</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${(client.modulesCompleted / 12) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${textSecondary}`}>Assessments</span>
                        <span className={`text-xs font-medium ${textPrimary}`}>{client.assessmentsTaken}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${(client.assessmentsTaken / 5) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${textSecondary}`}>Journal Entries</span>
                        <span className={`text-xs font-medium ${textPrimary}`}>{client.journalEntries}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${Math.min((client.journalEntries / 30) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="ml-11 mt-3">
                    <p className={`text-xs ${textMuted} mb-1`}>Weekly Progress Trend</p>
                    <div className="flex items-end gap-1 h-10">
                      {client.weeklyProgress.map((val, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t transition-all ${
                            i === client.weeklyProgress.length - 1 ? 'bg-purple-500' : isDark ? 'bg-slate-600' : 'bg-purple-200'
                          }`}
                          style={{ height: `${(val / 100) * 40}px` }}
                          title={`Week ${i + 1}: ${val}%`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
          <h2 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Alerts & Notifications
          </h2>
          <div className="space-y-3">
            {mockAlerts.map(alert => {
              const Icon = alert.icon;
              const alertStyles = {
                warning: { bg: isDark ? 'bg-red-900/30 border-red-800' : 'bg-red-50 border-red-200', icon: 'text-red-500' },
                success: { bg: isDark ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-200', icon: 'text-green-500' },
                info: { bg: isDark ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200', icon: 'text-blue-500' }
              };
              const style = alertStyles[alert.type];
              return (
                <div key={alert.id} className={`flex items-start gap-3 p-4 rounded-lg border ${style.bg}`}>
                  <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${style.icon}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${textPrimary}`}>{alert.message}</p>
                    <p className={`text-xs mt-1 ${textMuted}`}>{alert.time}</p>
                  </div>
                  <button className={`text-xs px-3 py-1 rounded-lg ${hoverBg} ${textSecondary} border ${cardBorder} flex-shrink-0`}>
                    View
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'actions' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Create New Client PIN', icon: Plus, color: 'from-blue-500 to-blue-600', desc: 'Generate a secure access PIN for a new client' },
            { label: 'Send Reminder', icon: MessageSquare, color: 'from-emerald-500 to-emerald-600', desc: 'Send session or activity reminders to clients' },
            { label: 'Export All Reports', icon: FileText, color: 'from-purple-500 to-purple-600', desc: 'Download comprehensive progress reports' },
            { label: 'View Group Analytics', icon: BarChart3, color: 'from-amber-500 to-amber-600', desc: 'Analyze trends across all clients' }
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className={`${cardBg} rounded-xl border ${cardBorder} p-5 text-left transition-all hover:shadow-lg group`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`font-semibold ${textPrimary} mb-1`}>{action.label}</h3>
                <p className={`text-sm ${textMuted}`}>{action.desc}</p>
              </button>
            );
          })}
        </div>
      )}

      {activeTab === 'lessons' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${textPrimary}`}>IFS Session Lesson Plans</h2>
              <p className={`text-sm ${textSecondary}`}>Detailed guides for each module session</p>
            </div>
          </div>
          <div className="space-y-4">
            {lessonPlans.map((module, index) => (
              <div key={module.id} className={`${cardBg} rounded-xl border ${cardBorder} overflow-hidden transition-all`}>
                <button
                  onClick={() => toggleModule(module.id)}
                  className={`w-full flex items-center justify-between p-5 text-left ${hoverBg} transition-colors`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${textPrimary}`}>{module.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs ${textMuted} flex items-center gap-1`}>
                          <Clock className="w-3 h-3" />
                          {module.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedModules[module.id] ? (
                    <ChevronUp className={`w-5 h-5 ${textMuted} flex-shrink-0`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${textMuted} flex-shrink-0`} />
                  )}
                </button>

                {expandedModules[module.id] && (
                  <div className={`px-5 pb-5 border-t ${cardBorder}`}>
                    <div className="grid md:grid-cols-2 gap-5 mt-5">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="w-4 h-4 text-purple-500" />
                          <h4 className={`font-medium ${textPrimary} text-sm`}>Session Goals</h4>
                        </div>
                        <p className={`text-sm ${textSecondary} leading-relaxed`}>{module.goals}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <MessageCircle className="w-4 h-4 text-indigo-500" />
                          <h4 className={`font-medium ${textPrimary} text-sm`}>Discussion Topics</h4>
                        </div>
                        <ul className="space-y-2">
                          {module.topics.map((topic, i) => (
                            <li key={i} className={`text-sm ${textSecondary} flex items-start gap-2`}>
                              <span className="text-purple-400 mt-0.5 flex-shrink-0">&ldquo;</span>
                              <span className="italic">{topic}</span>
                              <span className="text-purple-400 mt-0.5 flex-shrink-0">&rdquo;</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Activity className="w-4 h-4 text-emerald-500" />
                          <h4 className={`font-medium ${textPrimary} text-sm`}>Activities to Do Together</h4>
                        </div>
                        <ul className="space-y-1.5">
                          {module.activities.map((activity, i) => (
                            <li key={i} className={`text-sm ${textSecondary} flex items-center gap-2`}>
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          <h4 className={`font-medium ${textPrimary} text-sm`}>What to Watch For</h4>
                        </div>
                        <ul className="space-y-1.5">
                          {module.watchFor.map((item, i) => (
                            <li key={i} className={`text-sm ${textSecondary} flex items-center gap-2`}>
                              <Flag className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={`mt-5 p-4 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-purple-50'} border ${isDark ? 'border-slate-600' : 'border-purple-100'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-purple-500" />
                        <h4 className={`font-medium ${textPrimary} text-sm`}>Homework Assignment</h4>
                      </div>
                      <p className={`text-sm ${textSecondary}`}>{module.homework}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${textPrimary}`}>Client Insights</h2>
              <p className={`text-sm ${textSecondary}`}>Review client responses and prepare for sessions</p>
            </div>
          </div>

          <div className="mb-6">
            <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Select a Client</label>
            <select
              value={selectedInsightClient}
              onChange={(e) => setSelectedInsightClient(e.target.value)}
              className={`w-full sm:w-80 px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-purple-500 outline-none`}
            >
              <option value="">Choose a client...</option>
              {mockClients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {!selectedInsightClient && (
            <div className={`${cardBg} rounded-xl border ${cardBorder} p-12 text-center`}>
              <Eye className={`w-12 h-12 mx-auto mb-3 ${textMuted}`} />
              <p className={`font-medium ${textSecondary}`}>Select a client to view insights</p>
              <p className={`text-sm mt-1 ${textMuted}`}>Choose from the dropdown above to see their responses and session prep</p>
            </div>
          )}

          {selectedInsightClient && mockClientInsights[selectedInsightClient] && (() => {
            const insights = mockClientInsights[selectedInsightClient];
            const client = mockClients.find(c => c.id === selectedInsightClient);
            return (
              <div className="space-y-6">
                <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
                  <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                    <MessageCircle className="w-5 h-5 text-purple-500" />
                    Recent Answers
                  </h3>
                  <div className="space-y-4">
                    {insights.recentAnswers.map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg border ${cardBorder} ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{item.module}</span>
                        </div>
                        <p className={`text-sm font-medium ${textPrimary} mb-2`}>{item.question}</p>
                        <p className={`text-sm ${textSecondary} italic leading-relaxed`}>"{item.answer}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
                  <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                    <Flag className="w-5 h-5 text-red-500" />
                    Flagged Responses
                  </h3>
                  <div className="space-y-4">
                    {insights.flaggedResponses.map((item, i) => {
                      const isRed = item.severity === 'red';
                      const flagBg = isRed
                        ? (isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200')
                        : (isDark ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200');
                      const flagColor = isRed ? 'text-red-500' : 'text-orange-500';
                      const badgeBg = isRed ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700';
                      return (
                        <div key={i} className={`p-4 rounded-lg border ${flagBg}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Flag className={`w-4 h-4 ${flagColor}`} />
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeBg}`}>
                              {item.reason}
                            </span>
                          </div>
                          <p className={`text-sm font-medium ${textPrimary} mb-2`}>{item.question}</p>
                          <p className={`text-sm ${textSecondary} italic leading-relaxed`}>"{item.answer}"</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
                  <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Session Prep
                  </h3>
                  <p className={`text-sm ${textSecondary} mb-4`}>
                    Suggested talking points for your next session with {client?.name}:
                  </p>
                  <ul className="space-y-2.5">
                    {insights.sessionPrep.map((point, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm ${textSecondary}`}>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
                  <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                    <FileText className="w-5 h-5 text-purple-500" />
                    Therapist Feedback
                  </h3>
                  <p className={`text-sm ${textSecondary} mb-3`}>
                    Write your feedback or comments on {client?.name}'s responses:
                  </p>
                  <textarea
                    value={therapistFeedback[selectedInsightClient] || ''}
                    onChange={(e) => handleFeedbackChange(selectedInsightClient, e.target.value)}
                    rows={5}
                    placeholder={`Add your notes and feedback for ${client?.name}...`}
                    className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-purple-500 outline-none resize-none`}
                  />
                  <p className={`text-xs ${textMuted} mt-2 flex items-center gap-1`}>
                    <CheckCircle className="w-3 h-3" />
                    Feedback is automatically saved
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default TherapistDashboard;
