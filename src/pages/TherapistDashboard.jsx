import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, User, TrendingUp, Calendar, FileText, MessageSquare, 
  Clock, CheckCircle, AlertTriangle, Activity, Heart, Shield,
  ChevronRight, Search, Filter, Plus, Eye, BarChart3, Sparkles,
  BookOpen, ChevronDown, ChevronUp, MessageCircle, Flag, Lightbulb
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { supabase, supabaseHelpers } from '../lib/supabase';
import { clientAuth } from '../lib/supabasePersonalization';

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

const sessionPrepByWound = {
  abandonment: [
    'Follow up on abandonment wound work from last session',
    'Check in on daily Self-energy practice adherence',
    'Explore people-pleaser protector\'s relationship with the exile',
    'Introduce unburdening concept if client seems ready',
    'Assess progress on recognizing abandonment triggers'
  ],
  shame: [
    'Approach shame work very gently — high activation risk',
    'Check in on inner critic patterns and frequency',
    'Explore the shame part\'s origins with compassion',
    'Focus on building Self-compassion practices',
    'Assess readiness for deeper exile work'
  ],
  betrayal: [
    'Address trust-building in the therapeutic relationship',
    'Validate anger as a protector response',
    'Explore the firefighter pattern of cutting people off',
    'Consider slower pacing for trust work',
    'Check for any external stressors contributing to hypervigilance'
  ],
  neglect: [
    'Use somatic approaches to help client connect with body',
    'Go slowly with parts identification — numbness is protective',
    'Validate the neglect experience without pushing',
    'Consider grounding exercises before parts work',
    'Build rapport before deeper wound exploration'
  ]
};

const TOTAL_MODULES = 12;

function calculateRiskLevel(lastActive) {
  if (!lastActive) return 'high';
  const diffMs = Date.now() - new Date(lastActive).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays > 14) return 'high';
  if (diffDays > 7) return 'medium';
  return 'low';
}

function generateAlertsFromClients(clients, recentAssessments, recentJournals) {
  const alerts = [];
  const now = new Date();

  clients.forEach(client => {
    if (!client.lastActive) return;
    const diffDays = Math.floor((now - new Date(client.lastActive)) / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
      alerts.push({
        id: `inactive-${client.id}`,
        type: 'warning',
        icon: AlertTriangle,
        message: `${client.name} hasn't logged in for ${diffDays} days`,
        client: client.name,
        time: `${diffDays} days inactive`
      });
    }
  });

  recentAssessments.forEach(a => {
    const client = clients.find(c => c.id === a.client_id);
    if (client) {
      const daysAgo = Math.floor((now - new Date(a.created_at || a.assessment_date)) / (1000 * 60 * 60 * 24));
      alerts.push({
        id: `assessment-${a.id}`,
        type: 'success',
        icon: CheckCircle,
        message: `${client.name} completed a new assessment`,
        client: client.name,
        time: daysAgo === 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
      });
    }
  });

  recentJournals.forEach(j => {
    const client = clients.find(c => c.id === j.client_id);
    if (client) {
      const daysAgo = Math.floor((now - new Date(j.created_at)) / (1000 * 60 * 60 * 24));
      alerts.push({
        id: `journal-${j.id}`,
        type: 'info',
        icon: FileText,
        message: `${client.name} wrote a new journal entry`,
        client: client.name,
        time: daysAgo === 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
      });
    }
  });

  return alerts;
}

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

  const [clients, setClients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clientInsights, setClientInsights] = useState(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [clientActivities, setClientActivities] = useState({});

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: clientRows, error: clientErr } = await supabase
        .from('ifs_clients')
        .select('id, name, pin, email, phone, status, last_active, created_at, user_role')
        .eq('user_role', 'client')
        .eq('status', 'active');

      if (clientErr) {
        console.error('Error loading clients:', clientErr);
        setLoading(false);
        return;
      }

      const clientList = clientRows || [];

      if (clientList.length === 0) {
        setClients([]);
        setAlerts([]);
        setLoading(false);
        return;
      }

      const clientIds = clientList.map(c => c.id);

      const [
        { data: assessments },
        { data: progressRows },
        { data: journalRows },
        { data: activityRows }
      ] = await Promise.all([
        supabase
          .from('ifs_assessment_results')
          .select('id, client_id, primary_wound, secondary_wound, assessment_date, created_at')
          .in('client_id', clientIds)
          .order('assessment_date', { ascending: false }),
        supabase
          .from('ifs_client_progress')
          .select('id, client_id, module_id, completed, is_completed')
          .in('client_id', clientIds),
        supabase
          .from('ifs_journal_entries')
          .select('id, client_id, created_at')
          .in('client_id', clientIds)
          .order('created_at', { ascending: false }),
        supabase
          .from('ifs_therapy_activity_progress')
          .select('id, client_id, activity_id, completed')
          .in('client_id', clientIds)
      ]);

      const assessmentsByClient = {};
      (assessments || []).forEach(a => {
        if (!assessmentsByClient[a.client_id]) assessmentsByClient[a.client_id] = [];
        assessmentsByClient[a.client_id].push(a);
      });

      const progressByClient = {};
      (progressRows || []).forEach(p => {
        if (!progressByClient[p.client_id]) progressByClient[p.client_id] = [];
        progressByClient[p.client_id].push(p);
      });

      const journalsByClient = {};
      (journalRows || []).forEach(j => {
        if (!journalsByClient[j.client_id]) journalsByClient[j.client_id] = [];
        journalsByClient[j.client_id].push(j);
      });

      const activitiesByClient = {};
      (activityRows || []).forEach(a => {
        if (!activitiesByClient[a.client_id]) activitiesByClient[a.client_id] = [];
        activitiesByClient[a.client_id].push(a);
      });
      setClientActivities(activitiesByClient);

      const enrichedClients = clientList.map(c => {
        const clientAssessments = assessmentsByClient[c.id] || [];
        const latestAssessment = clientAssessments[0];
        const clientProgress = progressByClient[c.id] || [];
        const clientJournals = journalsByClient[c.id] || [];

        const completedModules = new Set();
        clientProgress.forEach(p => {
          if (p.completed || p.is_completed) completedModules.add(p.module_id);
        });

        const modulesCompleted = completedModules.size;
        const progress = TOTAL_MODULES > 0 ? Math.round((modulesCompleted / TOTAL_MODULES) * 100) : 0;

        return {
          id: c.id,
          name: c.name,
          primaryWound: latestAssessment?.primary_wound || 'unknown',
          secondaryWound: latestAssessment?.secondary_wound || null,
          progress,
          lastActive: c.last_active,
          riskLevel: calculateRiskLevel(c.last_active),
          modulesCompleted,
          assessmentsTaken: clientAssessments.length,
          journalEntries: clientJournals.length,
          joinDate: c.created_at,
          therapyActivities: (activitiesByClient[c.id] || []).filter(a => a.completed).length,
          totalActivities: (activitiesByClient[c.id] || []).length
        };
      });

      setClients(enrichedClients);

      const recentAssessments = (assessments || [])
        .filter(a => {
          const d = new Date(a.created_at || a.assessment_date);
          return (Date.now() - d.getTime()) < 14 * 24 * 60 * 60 * 1000;
        })
        .slice(0, 10);

      const recentJournals = (journalRows || [])
        .filter(j => {
          const d = new Date(j.created_at);
          return (Date.now() - d.getTime()) < 14 * 24 * 60 * 60 * 1000;
        })
        .slice(0, 10);

      const generatedAlerts = generateAlertsFromClients(enrichedClients, recentAssessments, recentJournals);
      setAlerts(generatedAlerts);

    } catch (e) {
      console.error('Failed to load dashboard data:', e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      await loadDashboardData();
      const client = clientAuth.getCurrentClient();
      const therapistId = client?.id;
      if (!therapistId) return;
      try {
        const [notesData, feedbackData] = await Promise.all([
          supabaseHelpers.getTherapistNotes(therapistId),
          supabaseHelpers.getTherapistFeedback(therapistId)
        ]);
        if (notesData && notesData.length > 0) {
          const formattedNotes = notesData.map(n => {
            const noteClient = clients.length > 0
              ? clients.find(c => c.id === n.client_id)
              : null;
            return {
              id: n.id,
              clientId: n.client_id,
              clientName: noteClient?.name || n.client_id?.substring(0, 8) || 'Unknown',
              date: n.session_date || n.created_at,
              sessionType: n.note_type || 'Individual',
              notes: n.content,
              goals: '',
              createdAt: n.created_at
            };
          });
          setSessionNotes(formattedNotes);
        }
        if (feedbackData && feedbackData.length > 0) {
          const feedbackObj = {};
          feedbackData.forEach(fb => {
            if (fb.client_id) feedbackObj[fb.client_id] = fb.feedback;
          });
          setTherapistFeedback(feedbackObj);
        }
      } catch (e) {
        console.error('Failed to load therapist data:', e);
      }
    };
    loadInitialData();
  }, []);

  const loadClientInsights = useCallback(async (clientId) => {
    if (!clientId) {
      setClientInsights(null);
      return;
    }
    setInsightsLoading(true);
    try {
      const [
        { data: moduleAnswers },
        { data: activityProgress }
      ] = await Promise.all([
        supabase
          .from('ifs_module_answers')
          .select('*')
          .eq('client_id', clientId)
          .order('updated_at', { ascending: false })
          .limit(20),
        supabase
          .from('ifs_therapy_activity_progress')
          .select('*')
          .eq('client_id', clientId)
      ]);

      const recentAnswers = [];
      (moduleAnswers || []).forEach(ma => {
        const answers = ma.answers || {};
        Object.entries(answers).forEach(([question, answer]) => {
          if (typeof answer === 'string' && answer.trim().length > 0) {
            recentAnswers.push({
              question: question,
              answer: answer,
              module: ma.module_id || 'Unknown Module',
              stepId: ma.step_id
            });
          }
        });
      });

      const client = clients.find(c => c.id === clientId);
      const wound = client?.primaryWound || 'abandonment';
      const sessionPrep = sessionPrepByWound[wound] || sessionPrepByWound.abandonment;

      setClientInsights({
        recentAnswers: recentAnswers.slice(0, 10),
        activityProgress: activityProgress || [],
        sessionPrep
      });
    } catch (e) {
      console.error('Error loading client insights:', e);
      setClientInsights(null);
    }
    setInsightsLoading(false);
  }, [clients]);

  useEffect(() => {
    if (selectedInsightClient) {
      loadClientInsights(selectedInsightClient);
    }
  }, [selectedInsightClient, loadClientInsights]);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWound = filterWound === 'all' || client.primaryWound === filterWound;
    const matchesRisk = filterRisk === 'all' || client.riskLevel === filterRisk;
    return matchesSearch && matchesWound && matchesRisk;
  });

  const stats = {
    totalClients: clients.length,
    activeSessions: clients.filter(c => c.riskLevel === 'low').length,
    assessmentsCompleted: clients.reduce((sum, c) => sum + c.assessmentsTaken, 0),
    avgProgress: clients.length > 0 ? Math.round(clients.reduce((sum, c) => sum + c.progress, 0) / clients.length) : 0
  };

  const handleSaveNote = async () => {
    if (!noteForm.clientId || !noteForm.notes) return;
    const therapist = clientAuth.getCurrentClient();
    const therapistId = therapist?.id;
    const client = clients.find(c => c.id === noteForm.clientId);
    const newNote = {
      id: Date.now().toString(),
      clientId: noteForm.clientId,
      clientName: client?.name || 'Unknown',
      date: noteForm.date,
      sessionType: noteForm.sessionType,
      notes: noteForm.notes,
      goals: noteForm.goals,
      createdAt: new Date().toISOString()
    };
    if (therapistId) {
      try {
        const saved = await supabaseHelpers.saveTherapistNotes(therapistId, noteForm.clientId, {
          content: noteForm.notes,
          sessionDate: noteForm.date,
          noteType: noteForm.sessionType
        });
        if (saved) newNote.id = saved.id;
      } catch (err) {
        console.error('Error saving therapist note:', err);
      }
    }
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

  const handleFeedbackChange = async (clientId, value) => {
    const updated = { ...therapistFeedback, [clientId]: value };
    setTherapistFeedback(updated);
    const therapist = clientAuth.getCurrentClient();
    if (therapist?.id) {
      try {
        await supabaseHelpers.saveTherapistFeedback(therapist.id, clientId, {
          feedback: value
        });
      } catch (err) {
        console.error('Error saving therapist feedback:', err);
      }
    }
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

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const daysSince = (dateStr) => {
    if (!dateStr) return 999;
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={`${textSecondary}`}>Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

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
          { label: 'Active Clients', value: stats.activeSessions, icon: Calendar, color: 'from-emerald-500 to-emerald-600' },
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
              {tab.id === 'alerts' && alerts.filter(a => a.type === 'warning').length > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {alerts.filter(a => a.type === 'warning').length}
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
              const wound = woundColorMap[client.primaryWound] || woundColorMap.abandonment;
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
                            {inactive === 0 ? 'Active today' : inactive >= 999 ? 'Never active' : `${inactive}d ago`}
                          </span>
                          {client.therapyActivities > 0 && (
                            <span className={`text-xs ${textMuted} flex items-center gap-1`}>
                              <Activity className="w-3 h-3" />
                              {client.therapyActivities} activities done
                            </span>
                          )}
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
                        <button
                          onClick={() => { setSelectedInsightClient(client.id); setActiveTab('insights'); }}
                          className={`p-2 rounded-lg ${hoverBg} ${textSecondary} transition-colors`}
                          title="View Insights"
                        >
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
                  {clients.map(c => (
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
            {clients.map(client => {
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

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 ml-11">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${textSecondary}`}>Modules</span>
                        <span className={`text-xs font-medium ${textPrimary}`}>{client.modulesCompleted}/{TOTAL_MODULES}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${(client.modulesCompleted / TOTAL_MODULES) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${textSecondary}`}>Assessments</span>
                        <span className={`text-xs font-medium ${textPrimary}`}>{client.assessmentsTaken}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${Math.min((client.assessmentsTaken / 5) * 100, 100)}%` }} />
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
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${textSecondary}`}>Therapy Activities</span>
                        <span className={`text-xs font-medium ${textPrimary}`}>{client.therapyActivities}/{client.totalActivities || 0}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${client.totalActivities > 0 ? (client.therapyActivities / client.totalActivities) * 100 : 0}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {clients.length === 0 && (
              <div className="text-center py-8">
                <Users className={`w-10 h-10 mx-auto mb-3 ${textMuted}`} />
                <p className={`${textSecondary}`}>No client data available</p>
              </div>
            )}
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
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className={`w-10 h-10 mx-auto mb-3 ${textMuted}`} />
                <p className={`${textSecondary}`}>No alerts at this time</p>
                <p className={`text-sm mt-1 ${textMuted}`}>All clients are active and on track</p>
              </div>
            ) : (
              alerts.map(alert => {
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
              })
            )}
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
              {clients.map(c => (
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

          {selectedInsightClient && insightsLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {selectedInsightClient && !insightsLoading && clientInsights && (() => {
            const client = clients.find(c => c.id === selectedInsightClient);
            return (
              <div className="space-y-6">
                <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
                  <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                    <MessageCircle className="w-5 h-5 text-purple-500" />
                    Recent Module Answers
                  </h3>
                  {clientInsights.recentAnswers.length === 0 ? (
                    <div className="text-center py-6">
                      <MessageSquare className={`w-8 h-8 mx-auto mb-2 ${textMuted}`} />
                      <p className={`text-sm ${textSecondary}`}>No module answers recorded yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {clientInsights.recentAnswers.map((item, i) => (
                        <div key={i} className={`p-4 rounded-lg border ${cardBorder} ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{item.module}</span>
                          </div>
                          <p className={`text-sm font-medium ${textPrimary} mb-2`}>{item.question}</p>
                          <p className={`text-sm ${textSecondary} italic leading-relaxed`}>"{item.answer}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {clientInsights.activityProgress.length > 0 && (
                  <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
                    <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                      <Activity className="w-5 h-5 text-emerald-500" />
                      Therapy Activity Progress
                    </h3>
                    <div className="space-y-3">
                      {clientInsights.activityProgress.map((act, i) => (
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${cardBorder} ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                          {act.completed ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${textPrimary}`}>{act.activity_id}</p>
                            <p className={`text-xs ${textMuted}`}>{act.completed ? 'Completed' : 'In Progress'}</p>
                          </div>
                          {act.reflections && Object.keys(act.reflections).length > 0 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Has reflections</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
                  <h3 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Session Prep
                  </h3>
                  <p className={`text-sm ${textSecondary} mb-4`}>
                    Suggested talking points for your next session with {client?.name}:
                  </p>
                  <ul className="space-y-2.5">
                    {clientInsights.sessionPrep.map((point, i) => (
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
