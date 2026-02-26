import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, User, TrendingUp, Calendar, FileText, MessageSquare, 
  Clock, CheckCircle, AlertTriangle, Activity, Heart, Shield,
  ChevronRight, Search, Filter, Plus, Eye, BarChart3, Sparkles,
  BookOpen, ChevronDown, ChevronUp, MessageCircle, Flag, Lightbulb,
  Play, Target, X, Copy, Download, ArrowLeft, RefreshCw,
  Award, Flame, Star, Zap, Trophy, Crown, Gem, Edit2, Save
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { supabase, supabaseHelpers } from '../lib/supabase';
import { clientAuth } from '../lib/supabasePersonalization';
import { aiCurriculumPersonalizer } from '../lib/aiCurriculumPersonalizer';
import { WOUND_LESSON_PLANS, WOUND_DISPLAY } from '../lib/woundLessonPlans';
import { curriculumModules } from '../data/curriculumData';

const woundColorMap = {
  abandonment: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  shame: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  neglect: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  betrayal: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  helplessness: { bg: 'bg-rose-100', text: 'text-rose-700', dot: 'bg-rose-500' }
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
  ],
  helplessness: [
    'Validate agency — helplessness wounds create deep "I can\'t change anything" beliefs',
    'Watch for freeze/collapse protectors that shut down under stress',
    'Explore learned helplessness patterns from childhood gently',
    'Address the exile that believes they are powerless and trapped',
    'Build sense of personal agency and empowerment through small choices'
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
        time: `${diffDays} days inactive`,
        clientId: client.id,
        action: 'view_progress'
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
        time: daysAgo === 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`,
        clientId: client.id,
        action: 'view_assessment'
      });
    }
  });

  const concerningKeywords = [
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

  recentJournals.forEach(j => {
    const client = clients.find(c => c.id === j.client_id);
    if (client) {
      const daysAgo = Math.floor((now - new Date(j.created_at)) / (1000 * 60 * 60 * 24));
      const content = (j.content || '').toLowerCase();
      const matched = concerningKeywords.filter(kw => content.includes(kw));

      if (matched.length > 0) {
        alerts.push({
          id: `concern-${j.id}`,
          type: 'danger',
          icon: AlertTriangle,
          message: `${client.name}'s journal contains concerning language: "${matched.slice(0, 2).join('", "')}"`,
          client: client.name,
          time: daysAgo === 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`,
          clientId: client.id,
          action: 'view_journal'
        });
      }

      alerts.push({
        id: `journal-${j.id}`,
        type: 'info',
        icon: FileText,
        message: `${client.name} wrote a new journal entry`,
        client: client.name,
        time: daysAgo === 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`,
        clientId: client.id,
        action: 'view_journal'
      });
    }
  });

  return alerts;
}

const TherapistDashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterWound, setFilterWound] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [activeTab, setActiveTab] = useState('clients');
  const [expandedModules, setExpandedModules] = useState({});
  const [expandedResponseModules, setExpandedResponseModules] = useState({});
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
  const [clientGamification, setClientGamification] = useState({});

  const [activeAction, setActiveAction] = useState(null);
  const [newClientForm, setNewClientForm] = useState({ name: '', email: '', phone: '', pin: '', role: 'client' });
  const [newClientResult, setNewClientResult] = useState(null);
  const [newClientLoading, setNewClientLoading] = useState(false);
  const [reminderForm, setReminderForm] = useState({ clientId: '', type: 'session', message: '' });
  const [reminderSaved, setReminderSaved] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [expandedJournals, setExpandedJournals] = useState({});
  const [selectedLessonClient, setSelectedLessonClient] = useState('');
  const [clientCurriculum, setClientCurriculum] = useState(null);
  const [editingModule, setEditingModule] = useState(null);
  const [editModuleForm, setEditModuleForm] = useState({ title: '', description: '', estimatedMinutes: 30 });
  const [genPrimaryWound, setGenPrimaryWound] = useState('abandonment');
  const [genSecondaryWound, setGenSecondaryWound] = useState('shame');
  const [generatingCurriculum, setGeneratingCurriculum] = useState(false);
  const [genResult, setGenResult] = useState(null);
  const [showAddModule, setShowAddModule] = useState(false);
  const [addModuleWound, setAddModuleWound] = useState('abandonment');
  const [addingModuleId, setAddingModuleId] = useState(null);
  const [addModuleResult, setAddModuleResult] = useState(null);

  const WOUND_TYPES = ['abandonment', 'shame', 'neglect', 'betrayal', 'helplessness'];

  const handleGenerateCurriculum = async (clientId) => {
    if (!clientId || generatingCurriculum) return;
    setGeneratingCurriculum(true);
    setGenResult(null);
    try {
      const scores = WOUND_TYPES.map(w => ({
        id: w,
        score: w === genPrimaryWound ? 20 : w === genSecondaryWound ? 12 : 2
      }));
      const curriculum = aiCurriculumPersonalizer.analyzeAndPersonalize(scores);
      if (!curriculum || !curriculum.personalizedModules?.length) {
        setGenResult({ error: 'Could not generate curriculum. Please try different wound types.' });
        return;
      }
      await supabaseHelpers.savePersonalizedCurriculum(clientId, curriculum);

      // Always insert a fresh assessment record so the client's curriculum page
      // picks up the latest wound type (most recent assessment_date wins).
      const scoreForWound = (w) => genPrimaryWound === w ? 20 : genSecondaryWound === w ? 12 : 2;
      const { error: assessErr } = await supabase.from('ifs_assessment_results').insert({
        client_id: clientId,
        primary_wound: genPrimaryWound,
        secondary_wound: genSecondaryWound,
        abandonment_score: scoreForWound('abandonment'),
        shame_score: scoreForWound('shame'),
        neglect_score: scoreForWound('neglect'),
        betrayal_score: scoreForWound('betrayal'),
        helplessness_score: scoreForWound('helplessness'),
        tertiary_wounds: WOUND_TYPES.filter(w => w !== genPrimaryWound && w !== genSecondaryWound),
        assessment_date: new Date().toISOString(),
        assessment_version: '1.0'
      });
      if (assessErr) console.warn('Assessment record write failed (non-critical):', assessErr.message);
      await loadClientCurriculum(clientId);
      await loadDashboardData();
      setGenResult({ success: `Personalized curriculum generated for ${clients.find(c => c.id === clientId)?.name || 'client'} (${genPrimaryWound} primary).` });
    } catch (e) {
      console.error('Error generating curriculum:', e);
      setGenResult({ error: 'Failed to generate curriculum: ' + e.message });
    }
    setGeneratingCurriculum(false);
  };

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
        { data: activityRows },
        { data: gamificationRows },
        { data: interactiveWoundData },
        { data: moodEntries }
      ] = await Promise.all([
        supabase
          .from('ifs_assessment_results')
          .select('id, client_id, primary_wound, secondary_wound, abandonment_score, shame_score, neglect_score, betrayal_score, helplessness_score, created_at')
          .in('client_id', clientIds)
          .order('created_at', { ascending: false }),
        supabase
          .from('ifs_client_progress')
          .select('id, client_id, module_id, completed, updated_at')
          .in('client_id', clientIds),
        supabase
          .from('ifs_journal_entries')
          .select('id, client_id, created_at')
          .in('client_id', clientIds)
          .order('created_at', { ascending: false }),
        supabase
          .from('ifs_therapy_activity_progress')
          .select('id, client_id, activity_id, completed')
          .in('client_id', clientIds),
        supabase
          .from('ifs_gamification')
          .select('client_id, xp, level, badges, streak_current, streak_longest, last_login_date')
          .in('client_id', clientIds),
        supabase
          .from('ifs_interactive_data')
          .select('client_id, data, updated_at')
          .in('client_id', clientIds)
          .eq('module_id', 'assessment_wounds'),
        supabase
          .from('ifs_mood_entries')
          .select('client_id, mood, energy, date')
          .in('client_id', clientIds)
          .order('date', { ascending: false })
          .limit(500)
      ]);

      const interactiveWoundsByClient = {};
      (interactiveWoundData || []).forEach(d => {
        interactiveWoundsByClient[d.client_id] = d.data;
      });

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

      const gamificationByClient = {};
      (gamificationRows || []).forEach(g => {
        gamificationByClient[g.client_id] = g;
      });
      setClientGamification(gamificationByClient);

      const moodsByClient = {};
      (moodEntries || []).forEach(m => {
        if (!moodsByClient[m.client_id]) moodsByClient[m.client_id] = [];
        if (moodsByClient[m.client_id].length < 5) {
          moodsByClient[m.client_id].push(m);
        }
      });

      const enrichedClients = clientList.map(c => {
        const clientAssessments = assessmentsByClient[c.id] || [];
        const latestAssessment = clientAssessments[0];
        const clientProgress = progressByClient[c.id] || [];
        const clientJournals = journalsByClient[c.id] || [];

        const completedModules = new Set();
        clientProgress.forEach(p => {
          if (p.completed) completedModules.add(p.module_id);
        });

        const modulesCompleted = completedModules.size;
        const progress = TOTAL_MODULES > 0 ? Math.round((modulesCompleted / TOTAL_MODULES) * 100) : 0;

        const interactiveWound = interactiveWoundsByClient[c.id];
        let primaryWound = latestAssessment?.primary_wound || null;
        let secondaryWound = latestAssessment?.secondary_wound || null;
        if (!primaryWound && interactiveWound) {
          primaryWound = interactiveWound.primary || null;
          secondaryWound = interactiveWound.secondary || null;
        }

        const gamData = gamificationByClient[c.id];

        const incompleteModules = clientProgress
          .filter(p => !p.completed)
          .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
        const currentModuleId = incompleteModules.length > 0 ? incompleteModules[0].module_id : null;

        const recentMoods = (moodsByClient[c.id] || []).slice(0, 5);

        return {
          id: c.id,
          name: c.name,
          primaryWound: primaryWound || 'unknown',
          secondaryWound: secondaryWound || null,
          progress,
          lastActive: c.last_active,
          riskLevel: calculateRiskLevel(c.last_active),
          modulesCompleted,
          assessmentsTaken: clientAssessments.length,
          journalEntries: clientJournals.length,
          joinDate: c.created_at,
          therapyActivities: (activitiesByClient[c.id] || []).filter(a => a.completed).length,
          totalActivities: (activitiesByClient[c.id] || []).length,
          xp: gamData?.xp || 0,
          level: gamData?.level || 1,
          streak: gamData?.streak_current || 0,
          streakLongest: gamData?.streak_longest || 0,
          badges: gamData?.badges || {},
          currentModuleId,
          recentMoods
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
        console.error('Failed to load advisor data:', e);
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
        { data: activityProgress },
        assessmentData,
        personalizedCurriculum,
        { data: interactiveData },
        { data: journalEntries },
        { data: progressData },
        { data: checkinRaw },
        { data: moodRaw }
      ] = await Promise.all([
        supabase
          .from('ifs_module_answers')
          .select('*')
          .eq('client_id', clientId)
          .order('updated_at', { ascending: false }),
        supabase
          .from('ifs_therapy_activity_progress')
          .select('*')
          .eq('client_id', clientId),
        supabaseHelpers.getAssessment(clientId),
        supabaseHelpers.getPersonalizedCurriculum(clientId),
        supabase
          .from('ifs_interactive_data')
          .select('*')
          .eq('client_id', clientId)
          .in('module_id', ['assessment_wounds', 'assessment_parts', 'assessment_self-energy']),
        supabase
          .from('ifs_journal_entries')
          .select('*')
          .eq('client_id', clientId)
          .order('created_at', { ascending: false })
          .limit(10),
        supabase
          .from('ifs_client_progress')
          .select('*')
          .eq('client_id', clientId),
        supabase
          .from('ifs_interactive_data')
          .select('data, module_id, updated_at')
          .eq('client_id', clientId)
          .like('module_id', 'daily_checkin_%')
          .order('updated_at', { ascending: false })
          .limit(14),
        supabase
          .from('ifs_mood_entries')
          .select('mood, energy, date, emotions')
          .eq('client_id', clientId)
          .order('date', { ascending: false })
          .limit(14)
      ]);

      const recentAnswers = [];
      const moduleResponses = {};
      (moduleAnswers || []).forEach(ma => {
        const answers = ma.answers || {};
        const modId = ma.module_id || 'unknown';
        if (!moduleResponses[modId]) moduleResponses[modId] = [];
        moduleResponses[modId].push({ step_id: ma.step_id, answers });
        Object.entries(answers).forEach(([question, answer]) => {
          if (typeof answer === 'string' && answer.trim().length > 0) {
            recentAnswers.push({
              question: question,
              answer: answer,
              module: modId,
              stepId: ma.step_id
            });
          }
        });
      });

      const woundsEntry = (interactiveData || []).find(d => d.module_id === 'assessment_wounds');
      const partsEntry = (interactiveData || []).find(d => d.module_id === 'assessment_parts');
      const selfEnergyEntry = (interactiveData || []).find(d => d.module_id === 'assessment_self-energy');

      let finalAssessment = assessmentData || null;
      if (!finalAssessment && woundsEntry?.data) {
        const wd = woundsEntry.data;
        finalAssessment = {
          primary_wound: wd.primary,
          secondary_wound: wd.secondary,
          abandonment_score: wd.scores?.abandonment?.total || 0,
          shame_score: wd.scores?.shame?.total || 0,
          neglect_score: wd.scores?.neglect?.total || 0,
          betrayal_score: wd.scores?.betrayal?.total || 0,
          helplessness_score: wd.scores?.helplessness?.total || 0,
          assessment_date: wd.completedAt || woundsEntry.updated_at,
          created_at: woundsEntry.updated_at
        };
      }

      let customAssessmentResults = [];
      try {
        const { data: customData } = await supabase
          .from('ifs_interactive_data')
          .select('*')
          .eq('client_id', clientId)
          .like('module_id', 'custom_assessment_response_%');
        if (customData && customData.length > 0) {
          customAssessmentResults = customData.map(d => ({ ...d.data, moduleId: d.module_id, updatedAt: d.updated_at }));
        }
      } catch (e) { console.error('Error loading custom assessments:', e); }

      const client = clients.find(c => c.id === clientId);
      const wound = finalAssessment?.primary_wound || client?.primaryWound || 'abandonment';
      const sessionPrep = sessionPrepByWound[wound] || sessionPrepByWound.abandonment;

      const recentCheckins = (checkinRaw || []).map(r => ({
        ...r.data,
        date: r.module_id.replace('daily_checkin_', ''),
        updatedAt: r.updated_at
      }));

      const avgSelfEnergy = recentCheckins.length
        ? (recentCheckins.map(c => c.selfEnergy || 0).reduce((s, v) => s + v, 0) / recentCheckins.length).toFixed(1)
        : null;
      const avgMood = (moodRaw || []).length
        ? ((moodRaw || []).map(e => e.mood || 0).reduce((s, v) => s + v, 0) / (moodRaw || []).length).toFixed(1)
        : null;

      setClientInsights({
        recentAnswers: recentAnswers.slice(0, 10),
        moduleResponses,
        activityProgress: activityProgress || [],
        sessionPrep,
        assessment: finalAssessment,
        personalization: personalizedCurriculum || null,
        partsAssessment: partsEntry?.data || null,
        selfEnergyAssessment: selfEnergyEntry?.data || null,
        customAssessments: customAssessmentResults,
        journalEntries: journalEntries || [],
        moduleProgress: progressData || [],
        recentCheckins,
        recentMoods: moodRaw || [],
        avgSelfEnergy,
        avgMood
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
        console.error('Error saving advisor note:', err);
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

  const loadClientCurriculum = async (clientId) => {
    if (!clientId) { setClientCurriculum(null); return; }
    const { data } = await supabase
      .from('ifs_personalized_curriculum')
      .select('*')
      .eq('client_id', clientId)
      .order('module_order');
    setClientCurriculum(data || []);
  };

  const [moduleSaveError, setModuleSaveError] = useState('');
  const handleSaveModuleEdit = async () => {
    if (!editingModule) return;
    setModuleSaveError('');
    const { error } = await supabase
      .from('ifs_personalized_curriculum')
      .update({
        module_title: editModuleForm.title,
        module_description: editModuleForm.description,
        estimated_minutes: editModuleForm.estimatedMinutes,
        updated_at: new Date().toISOString()
      })
      .eq('id', editingModule.id);
    if (error) {
      console.error('Error saving module:', error);
      setModuleSaveError('Failed to save changes. Please try again.');
    } else {
      loadClientCurriculum(selectedLessonClient);
      setEditingModule(null);
    }
  };

  const handleAddWoundModule = async (template) => {
    if (!selectedLessonClient || addingModuleId) return;
    setAddingModuleId(template.id);
    setAddModuleResult(null);
    try {
      const nextOrder = (clientCurriculum || []).length + 1;
      const moduleId = `wound-${template.id}-${Date.now()}`;
      const truncate = (val, max) => (val && val.length > max ? val.substring(0, max) : val);
      const { error } = await supabase
        .from('ifs_personalized_curriculum')
        .insert({
          client_id: selectedLessonClient,
          module_id: moduleId,
          module_order: nextOrder,
          module_title: template.title,
          module_description: template.description,
          customized_content: {
            goals: template.goals,
            topics: template.topics,
            activities: template.activities,
            watchFor: template.watchFor,
            homework: template.homework || '',
            woundFocus: addModuleWound
          },
          primary_wound_focus: truncate(addModuleWound, 50),
          estimated_minutes: template.estimatedMinutes || 60,
          difficulty_level: template.difficulty || 'beginner',
          updated_at: new Date().toISOString()
        });
      if (error) throw error;
      setAddModuleResult({ success: `"${template.title}" added as Module ${nextOrder}` });
      await loadClientCurriculum(selectedLessonClient);
    } catch (err) {
      console.error('Error adding module:', err);
      setAddModuleResult({ error: 'Failed to add module: ' + err.message });
    }
    setAddingModuleId(null);
  };

  const handleRemoveModule = async (mod) => {
    if (!selectedLessonClient) return;
    const confirmed = window.confirm(`Remove "${mod.module_title}" from this client's curriculum?`);
    if (!confirmed) return;
    try {
      const { error } = await supabase
        .from('ifs_personalized_curriculum')
        .delete()
        .eq('id', mod.id);
      if (error) throw error;
      const remaining = (clientCurriculum || []).filter(m => m.id !== mod.id);
      for (let i = 0; i < remaining.length; i++) {
        await supabase
          .from('ifs_personalized_curriculum')
          .update({ module_order: i + 1, updated_at: new Date().toISOString() })
          .eq('id', remaining[i].id);
      }
      await loadClientCurriculum(selectedLessonClient);
    } catch (err) {
      console.error('Error removing module:', err);
    }
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
        console.error('Error saving advisor feedback:', err);
      }
    }
  };

  const generateUniquePIN = async () => {
    const maxAttempts = 20;
    for (let i = 0; i < maxAttempts; i++) {
      const pin = String(Math.floor(100000 + Math.random() * 900000));
      const { data } = await supabase
        .from('ifs_clients')
        .select('id')
        .eq('pin', pin)
        .limit(1);
      if (!data || data.length === 0) return pin;
    }
    return null;
  };

  const handleCreateClient = async () => {
    if (!newClientForm.name.trim()) return;
    setNewClientLoading(true);
    try {
      let pin;
      if (newClientForm.pin.trim()) {
        const customPin = newClientForm.pin.trim();
        if (!/^\d{6}$/.test(customPin)) {
          setNewClientResult({ error: 'PIN must be exactly 6 digits.' });
          setNewClientLoading(false);
          return;
        }
        const { data: existing } = await supabase
          .from('ifs_clients')
          .select('id')
          .eq('pin', customPin)
          .limit(1);
        if (existing && existing.length > 0) {
          setNewClientResult({ error: 'That PIN is already in use. Please choose a different one.' });
          setNewClientLoading(false);
          return;
        }
        pin = customPin;
      } else {
        pin = await generateUniquePIN();
        if (!pin) {
          setNewClientResult({ error: 'Could not generate a unique PIN. Please try again.' });
          setNewClientLoading(false);
          return;
        }
      }
      const { data, error } = await supabase
        .from('ifs_clients')
        .insert({
          name: newClientForm.name.trim(),
          email: newClientForm.email.trim() || null,
          phone: newClientForm.phone.trim() || null,
          pin,
          user_role: newClientForm.role || 'client',
          status: 'active',
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      if (error) {
        setNewClientResult({ error: error.message });
      } else {
        setNewClientResult({ success: true, name: data.name, pin, role: data.user_role });
        await loadDashboardData();
      }
    } catch (e) {
      setNewClientResult({ error: e.message });
    }
    setNewClientLoading(false);
  };

  const reminderTemplates = {
    session: 'Hi {name}, this is a friendly reminder about your upcoming IFS therapy session. Please review your journal entries and any homework from last session before we meet.',
    activity: 'Hi {name}, you have some pending activities in your IFS healing program. Taking a few minutes to complete them will help reinforce what you\'ve learned.',
    checkin: 'Hi {name}, just checking in on you. How are you doing with your IFS practice? Remember, even a brief moment of Self-energy connection counts.',
    assessment: 'Hi {name}, it\'s been a while since your last assessment. Retaking the IFS Wound Assessment can help us track your healing progress together.'
  };

  const handleSendReminder = async () => {
    if (!reminderForm.clientId || !reminderForm.message.trim()) return;
    const therapist = clientAuth.getCurrentClient();
    try {
      await supabase.from('ifs_therapist_notes').insert({
        therapist_id: therapist?.id,
        client_id: reminderForm.clientId,
        content: `[REMINDER - ${reminderForm.type.toUpperCase()}] ${reminderForm.message}`,
        note_type: 'reminder',
        session_date: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString()
      });
      setReminderSaved(true);
      setTimeout(() => setReminderSaved(false), 3000);
    } catch (e) {
      console.error('Error saving reminder:', e);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
  };

  const handleExportReports = async () => {
    setExportLoading(true);
    try {
      const clientIds = clients.map(c => c.id);
      const [
        { data: assessments },
        { data: progressRows },
        { data: journalRows },
        { data: moodRows },
        { data: activityRows }
      ] = await Promise.all([
        supabase.from('ifs_assessment_results').select('*').in('client_id', clientIds),
        supabase.from('ifs_client_progress').select('*').in('client_id', clientIds),
        supabase.from('ifs_journal_entries').select('id, client_id, created_at, mood, content, title').in('client_id', clientIds),
        supabase.from('ifs_mood_entries').select('client_id, mood, energy, date').in('client_id', clientIds),
        supabase.from('ifs_therapy_activity_progress').select('client_id, activity_id, completed').in('client_id', clientIds)
      ]);

      let csv = 'Client Name,Primary Wound,Secondary Wound,Modules Completed,Progress %,Journal Entries,Avg Mood,Activities Completed,Risk Level,Join Date,Last Active\n';
      clients.forEach(c => {
        const clientAssess = (assessments || []).filter(a => a.client_id === c.id);
        const latestA = clientAssess.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
        const journals = (journalRows || []).filter(j => j.client_id === c.id);
        const moods = (moodRows || []).filter(m => m.client_id === c.id);
        const avgMood = moods.length > 0 ? (moods.reduce((s, m) => s + (m.mood || 0), 0) / moods.length).toFixed(1) : 'N/A';
        const activities = (activityRows || []).filter(a => a.client_id === c.id);
        const completedActs = activities.filter(a => a.completed).length;
        const exportPrimary = latestA?.primary_wound || c.primaryWound || 'N/A';
        const exportSecondary = latestA?.secondary_wound || c.secondaryWound || 'N/A';
        csv += `"${c.name}",${exportPrimary},${exportSecondary},${c.modulesCompleted},${c.progress}%,${journals.length},${avgMood},${completedActs}/${activities.length},${c.riskLevel},${formatDate(c.joinDate)},${formatDate(c.lastActive)}\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ifs_client_reports_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export error:', e);
    }
    setExportLoading(false);
  };

  const getGroupAnalytics = () => {
    if (clients.length === 0) return null;
    const woundCounts = { abandonment: 0, shame: 0, neglect: 0, betrayal: 0, helplessness: 0, unknown: 0 };
    const riskCounts = { low: 0, medium: 0, high: 0 };
    let totalProgress = 0;
    let totalModules = 0;
    let totalJournals = 0;
    let totalAssessments = 0;
    let totalActivities = 0;
    let completedActivities = 0;

    clients.forEach(c => {
      woundCounts[c.primaryWound] = (woundCounts[c.primaryWound] || 0) + 1;
      riskCounts[c.riskLevel] = (riskCounts[c.riskLevel] || 0) + 1;
      totalProgress += c.progress;
      totalModules += c.modulesCompleted;
      totalJournals += c.journalEntries;
      totalAssessments += c.assessmentsTaken;
      totalActivities += c.totalActivities || 0;
      completedActivities += c.therapyActivities || 0;
    });

    const avgProgress = Math.round(totalProgress / clients.length);
    const avgModules = (totalModules / clients.length).toFixed(1);
    const activeRate = Math.round((riskCounts.low / clients.length) * 100);
    const activityCompletionRate = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

    return {
      woundCounts, riskCounts, avgProgress, avgModules,
      totalJournals, totalAssessments, activeRate,
      totalActivities, completedActivities, activityCompletionRate
    };
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
  const cardBg = isDark ? 'bg-slate-800/90' : 'bg-white/80 backdrop-blur-sm';
  const cardBorder = isDark ? 'border-slate-700/50' : 'border-gray-200/60';
  const textPrimary = isDark ? 'text-slate-100' : 'text-gray-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-gray-600';
  const textMuted = isDark ? 'text-slate-500' : 'text-gray-400';
  const inputBg = isDark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-gray-300 text-gray-900';
  const hoverBg = isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-50';

  const glowStyles = {
    blue: isDark ? 'shadow-[0_0_15px_rgba(59,130,246,0.15)] border-blue-500/30' : 'shadow-[0_0_20px_rgba(59,130,246,0.1)] border-blue-200',
    emerald: isDark ? 'shadow-[0_0_15px_rgba(16,185,129,0.15)] border-emerald-500/30' : 'shadow-[0_0_20px_rgba(16,185,129,0.1)] border-emerald-200',
    amber: isDark ? 'shadow-[0_0_15px_rgba(245,158,11,0.15)] border-amber-500/30' : 'shadow-[0_0_20px_rgba(245,158,11,0.1)] border-amber-200',
    purple: isDark ? 'shadow-[0_0_15px_rgba(139,92,246,0.15)] border-purple-500/30' : 'shadow-[0_0_20px_rgba(139,92,246,0.1)] border-purple-200',
    rose: isDark ? 'shadow-[0_0_15px_rgba(244,63,94,0.15)] border-rose-500/30' : 'shadow-[0_0_20px_rgba(244,63,94,0.1)] border-rose-200',
  };

  const getWoundGlow = (wound) => {
    const map = { abandonment: 'blue', shame: 'purple', neglect: 'amber', betrayal: 'rose', helplessness: 'rose' };
    return glowStyles[map[wound] || 'amber'];
  };

  const getBadgeCount = (badges) => {
    if (!badges || typeof badges !== 'object') return 0;
    return Object.values(badges).filter(b => b && (b.unlocked || b.earned)).length;
  };

  const getModuleName = (moduleId) => {
    if (!moduleId) return null;
    const mod = curriculumModules.find(m => m.id === moduleId);
    if (mod) return mod.title;
    const cleanId = moduleId.replace(/-/g, ' ').replace(/module \d+/i, '').trim();
    return cleanId.charAt(0).toUpperCase() + cleanId.slice(1) || moduleId;
  };

  const mapResponseKey = (key, moduleData, woundType) => {
    const secondaryWoundMatch = key.match(/^secondary-wound-reflection-(\d+)$/);
    if (secondaryWoundMatch) {
      const idx = parseInt(secondaryWoundMatch[1]);
      return `Secondary Wound Reflection ${idx + 1}`;
    }
    const woundMatch = key.match(/^wound-reflection-(\d+)$/);
    if (woundMatch) {
      const idx = parseInt(woundMatch[1]);
      const wp = moduleData?.woundPersonalization?.[woundType];
      return wp?.reflectionPrompts?.[idx] || `Wound Reflection ${idx + 1}`;
    }
    const reflectionMatch = key.match(/^reflection-(\d+)$/);
    if (reflectionMatch) {
      const idx = parseInt(reflectionMatch[1]);
      const learnStep = moduleData?.steps?.find(s => s.type === 'learn');
      return learnStep?.data?.reflectionPrompts?.[idx] || `Reflection ${idx + 1}`;
    }
    const questionMatch = key.match(/^question-(\d+)$/);
    if (questionMatch) {
      const idx = parseInt(questionMatch[1]);
      const activityStep = moduleData?.steps?.find(s => s.type === 'activity');
      return activityStep?.data?.questions?.[idx] || `Activity Question ${idx + 1}`;
    }
    return key;
  };

  const getResponseBadge = (key) => {
    if (key.startsWith('secondary-wound-reflection-')) return { label: 'Secondary Wound', color: 'bg-purple-100 text-purple-700' };
    if (key.startsWith('wound-reflection-')) return { label: 'Wound', color: 'bg-amber-100 text-amber-700' };
    if (key.startsWith('reflection-')) return { label: 'Reflection', color: 'bg-blue-100 text-blue-700' };
    if (key.startsWith('question-')) return { label: 'Activity', color: 'bg-emerald-100 text-emerald-700' };
    return { label: 'Response', color: 'bg-gray-100 text-gray-700' };
  };

  const getMoodColor = (mood) => {
    if (mood >= 4) return 'bg-emerald-400';
    if (mood >= 3) return 'bg-yellow-400';
    if (mood >= 2) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const getRelativeTime = (dateStr) => {
    if (!dateStr) return 'Never';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
            <h1 className={`text-3xl sm:text-4xl font-extrabold ${textPrimary} tracking-tight`}>Advisor Dashboard</h1>
            <p className={`mt-1.5 text-sm ${textSecondary}`}>Monitor client progress, review responses, and manage sessions</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${cardBorder} ${cardBg} ${textSecondary} text-sm font-medium hover:border-amber-300 transition-all`}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <span className={`text-xs ${textMuted}`}>{formatDate(new Date().toISOString())}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Clients', value: stats.totalClients, icon: Users, color: 'from-blue-500 to-blue-600', glow: 'blue' },
          { label: 'Active Clients', value: stats.activeSessions, icon: Activity, color: 'from-emerald-500 to-emerald-600', glow: 'emerald' },
          { label: 'Assessments Done', value: stats.assessmentsCompleted, icon: Target, color: 'from-amber-500 to-amber-600', glow: 'amber' },
          { label: 'Avg Progress', value: `${stats.avgProgress}%`, icon: TrendingUp, color: 'from-purple-500 to-purple-600', glow: 'purple' }
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${cardBg} rounded-2xl border ${glowStyles[stat.glow]} p-5 transition-all duration-300 hover:scale-[1.02]`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className={`text-xs font-medium uppercase tracking-wider ${textMuted}`}>{stat.label}</p>
                  <p className={`text-2xl sm:text-3xl font-extrabold ${textPrimary} tracking-tight`}>{stat.value}</p>
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
          { id: 'insights', label: 'Client Insights', icon: Eye },
          { id: 'co-therapy', label: 'Co-Therapy', icon: Heart },
          { id: 'roadmap', label: 'Future Features', icon: Gem }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : `${cardBg} ${textSecondary} border ${cardBorder} ${hoverBg}`
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.id === 'alerts' && alerts.filter(a => a.type === 'warning' || a.type === 'danger').length > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {alerts.filter(a => a.type === 'warning' || a.type === 'danger').length}
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
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none`}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterWound}
                onChange={(e) => setFilterWound(e.target.value)}
                className={`px-3 py-2.5 rounded-lg border ${inputBg} text-sm focus:ring-2 focus:ring-amber-500 outline-none`}
              >
                <option value="all">All Wounds</option>
                <option value="abandonment">Abandonment</option>
                <option value="shame">Shame</option>
                <option value="neglect">Neglect</option>
                <option value="betrayal">Betrayal</option>
                <option value="helplessness">Helplessness</option>
              </select>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className={`px-3 py-2.5 rounded-lg border ${inputBg} text-sm focus:ring-2 focus:ring-amber-500 outline-none`}
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredClients.map(client => {
              const wound = woundColorMap[client.primaryWound] || woundColorMap.abandonment;
              const secondaryWoundColors = client.secondaryWound ? (woundColorMap[client.secondaryWound] || null) : null;
              const risk = riskColors[client.riskLevel];
              const earnedBadges = getBadgeCount(client.badges);
              const currentModuleName = getModuleName(client.currentModuleId);
              const moduleProgressPct = TOTAL_MODULES > 0 ? Math.round((client.modulesCompleted / TOTAL_MODULES) * 100) : 0;
              return (
                <div key={client.id} className={`${cardBg} rounded-2xl border ${getWoundGlow(client.primaryWound)} p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                        {client.name.charAt(0)}
                      </div>
                      {client.level > 1 && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-[9px] font-bold border-2 border-white shadow">
                          {client.level}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`font-bold text-base ${textPrimary} tracking-tight truncate`}>{client.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${risk.bg} ${risk.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`}></span>
                          {risk.label}
                        </span>
                      </div>
                      <div className={`text-xs ${textMuted} flex items-center gap-1 mt-0.5`}>
                        <Clock className="w-3 h-3" />
                        {getRelativeTime(client.lastActive)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold ${wound.bg} ${wound.text}`}>
                      <Heart className="w-3 h-3" />
                      {client.primaryWound}
                    </span>
                    {client.secondaryWound && secondaryWoundColors && (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold ${secondaryWoundColors.bg} ${secondaryWoundColors.text}`}>
                        <Shield className="w-3 h-3" />
                        {client.secondaryWound}
                      </span>
                    )}
                  </div>

                  {currentModuleName && (
                    <div className={`mb-3 p-2 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <BookOpen className="w-3 h-3 text-blue-500 flex-shrink-0" />
                        <span className={`text-[11px] font-medium ${textSecondary} truncate`}>{currentModuleName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              moduleProgressPct >= 70 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : moduleProgressPct >= 40 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-blue-400 to-blue-500'
                            }`}
                            style={{ width: `${moduleProgressPct}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-bold ${textPrimary}`}>{client.modulesCompleted}/{TOTAL_MODULES}</span>
                      </div>
                    </div>
                  )}
                  {!currentModuleName && (
                    <div className={`mb-3 p-2 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              client.progress >= 70 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : client.progress >= 40 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-blue-400 to-blue-500'
                            }`}
                            style={{ width: `${client.progress}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-bold ${textPrimary}`}>{client.progress}%</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <div className="flex items-center gap-1" title={`${client.xp.toLocaleString()} XP`}>
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span className={`text-[11px] font-semibold ${textPrimary}`}>{client.xp >= 1000 ? `${(client.xp / 1000).toFixed(1)}k` : client.xp}</span>
                    </div>
                    <div className="flex items-center gap-1" title={`Level ${client.level}`}>
                      <Crown className="w-3.5 h-3.5 text-purple-500" />
                      <span className={`text-[11px] font-semibold ${textPrimary}`}>Lv.{client.level}</span>
                    </div>
                    {client.streak > 0 && (
                      <div className="flex items-center gap-1" title={`${client.streak} day streak`}>
                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                        <span className={`text-[11px] font-semibold ${textPrimary}`}>{client.streak}d</span>
                      </div>
                    )}
                    {earnedBadges > 0 && (
                      <div className="flex items-center gap-1" title={`${earnedBadges} badges earned`}>
                        <Award className="w-3.5 h-3.5 text-emerald-500" />
                        <span className={`text-[11px] font-semibold ${textPrimary}`}>{earnedBadges}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-blue-500" />
                      <span className={`text-[11px] ${textSecondary}`}>
                        {client.therapyActivities}/{client.totalActivities} activities
                      </span>
                    </div>
                    {client.recentMoods && client.recentMoods.length > 0 && (
                      <div className="flex items-center gap-1" title="Recent mood trend">
                        <span className={`text-[10px] ${textMuted} mr-0.5`}>Mood</span>
                        {client.recentMoods.slice().reverse().map((m, i) => (
                          <div
                            key={i}
                            className={`w-2.5 h-2.5 rounded-full ${getMoodColor(m.mood)} transition-all`}
                            title={`${m.date}: mood ${m.mood}/5${m.energy ? `, energy ${m.energy}/5` : ''}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mt-auto pt-2 border-t border-gray-100 dark:border-slate-700">
                    <button
                      onClick={() => { setSelectedInsightClient(client.id); setActiveTab('insights'); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium ${hoverBg} ${textSecondary} transition-all hover:text-amber-500`}
                      title="View Insights"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Insights
                    </button>
                    <button
                      onClick={() => { setActiveTab('notes'); setNoteForm(f => ({ ...f, clientId: client.id })); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium ${hoverBg} ${textSecondary} transition-all hover:text-blue-500`}
                      title="Session Note"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Note
                    </button>
                    <button
                      onClick={() => navigate('/therapist/messages')}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium ${hoverBg} ${textSecondary} transition-all hover:text-emerald-500`}
                      title="Message"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Message
                    </button>
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
              <FileText className="w-5 h-5 text-amber-500" />
              New Session Note
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-1`}>Client</label>
                <select
                  value={noteForm.clientId}
                  onChange={(e) => setNoteForm(f => ({ ...f, clientId: e.target.value }))}
                  className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
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
                    className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-1`}>Session Type</label>
                  <select
                    value={noteForm.sessionType}
                    onChange={(e) => setNoteForm(f => ({ ...f, sessionType: e.target.value }))}
                    className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
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
                  className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none resize-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-1`}>Goals for Next Session</label>
                <textarea
                  value={noteForm.goals}
                  onChange={(e) => setNoteForm(f => ({ ...f, goals: e.target.value }))}
                  rows={3}
                  placeholder="Outline focus areas and objectives for the next meeting..."
                  className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none resize-none`}
                />
              </div>
              <button
                onClick={handleSaveNote}
                disabled={!noteForm.clientId || !noteForm.notes}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Save Session Note
              </button>
            </div>
          </div>

          <div>
            <h2 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
              <Clock className="w-5 h-5 text-amber-500" />
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
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{note.sessionType}</span>
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
        <div className={`${cardBg} rounded-2xl border ${glowStyles.blue} p-6`}>
          <h2 className={`text-lg font-bold ${textPrimary} mb-6 flex items-center gap-2 tracking-tight`}>
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Client Progress Overview
          </h2>

          <div className="space-y-8">
            {clients.map(client => {
              return (
                <div key={client.id}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-emerald-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className={`font-medium ${textPrimary}`}>{client.name}</h3>
                      <p className={`text-xs ${textMuted}`}>Joined {formatDate(client.joinDate)}</p>
                    </div>
                    <span className={`ml-auto text-sm font-semibold ${textPrimary}`}>{client.progress}%</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 ml-11">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${textSecondary}`}>Modules</span>
                        <span className={`text-xs font-medium ${textPrimary}`}>{client.modulesCompleted}/{TOTAL_MODULES}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all" style={{ width: `${(client.modulesCompleted / TOTAL_MODULES) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${textSecondary}`}>Assessments</span>
                        <span className={`text-xs font-medium ${textPrimary}`}>{client.assessmentsTaken}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all" style={{ width: `${Math.min((client.assessmentsTaken / 5) * 100, 100)}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${textSecondary}`}>Journals</span>
                        <span className={`text-xs font-medium ${textPrimary}`}>{client.journalEntries}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all" style={{ width: `${Math.min((client.journalEntries / 30) * 100, 100)}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${textSecondary}`}>Activities</span>
                        <span className={`text-xs font-medium ${textPrimary}`}>{client.therapyActivities}/{client.totalActivities || 0}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all" style={{ width: `${client.totalActivities > 0 ? (client.therapyActivities / client.totalActivities) * 100 : 0}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${textSecondary} flex items-center gap-1`}><Zap className="w-3 h-3 text-amber-500" />XP</span>
                        <span className={`text-xs font-medium ${textPrimary}`}>{client.xp.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-xs ${textMuted} flex items-center gap-0.5`}><Crown className="w-3 h-3 text-purple-500" />Lv.{client.level}</span>
                        {client.streak > 0 && <span className={`text-xs ${textMuted} flex items-center gap-0.5`}><Flame className="w-3 h-3 text-orange-500" />{client.streak}d</span>}
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
                  danger: { bg: isDark ? 'bg-red-900/50 border-red-700 ring-1 ring-red-500/30' : 'bg-red-100 border-red-300 ring-1 ring-red-200', icon: 'text-red-600 animate-pulse' },
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
                    <button 
                      onClick={() => {
                        if (alert.clientId) {
                          setSelectedInsightClient(alert.clientId);
                          setActiveTab('insights');
                        }
                      }}
                      className={`text-xs px-3 py-1 rounded-lg ${hoverBg} ${textSecondary} border ${cardBorder} flex-shrink-0`}
                    >
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
        <div>
          {!activeAction && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'create-client', label: 'Create New Client PIN', icon: Plus, color: 'from-blue-500 to-blue-600', desc: 'Generate a secure access PIN for a new client' },
                { id: 'send-reminder', label: 'Send Reminder', icon: MessageSquare, color: 'from-emerald-500 to-emerald-600', desc: 'Send session or activity reminders to clients' },
                { id: 'link:/advisor-messages', label: 'Client Messages', icon: MessageCircle, color: 'from-blue-500 to-indigo-600', desc: 'Send and receive secure messages with clients' },
                { id: 'link:/advisor-homework', label: 'Homework Manager', icon: Target, color: 'from-amber-500 to-amber-600', desc: 'Create, assign, and track client homework' },
                { id: 'link:/advisor-reports', label: 'Progress Reports', icon: Download, color: 'from-emerald-500 to-teal-600', desc: 'Generate and export client progress reports' },
                { id: 'link:/assessment-builder', label: 'Assessment Builder', icon: FileText, color: 'from-purple-500 to-purple-600', desc: 'Create custom assessments for clients' },
                { id: 'link:/mood-analytics', label: 'Mood & Parts Analytics', icon: TrendingUp, color: 'from-indigo-500 to-purple-600', desc: 'View mood trends, parts patterns, and self-energy over time' },
                { id: 'export-reports', label: 'Export All Reports', icon: Download, color: 'from-amber-500 to-amber-600', desc: 'Download comprehensive progress reports' },
                { id: 'group-analytics', label: 'View Group Analytics', icon: BarChart3, color: 'from-amber-500 to-amber-600', desc: 'Analyze trends across all clients' }
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => {
                      if (action.id.startsWith('link:')) {
                        navigate(action.id.replace('link:', ''));
                        return;
                      }
                      setActiveAction(action.id);
                      if (action.id === 'create-client') {
                        setNewClientForm({ name: '', email: '', phone: '', pin: '', role: 'client' });
                        setNewClientResult(null);
                      }
                      if (action.id === 'send-reminder') {
                        setReminderForm({ clientId: '', type: 'session', message: '' });
                        setReminderSaved(false);
                      }
                    }}
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

          {activeAction && (
            <div>
              <button
                onClick={() => { setActiveAction(null); setNewClientResult(null); setReminderSaved(false); }}
                className={`flex items-center gap-2 mb-4 text-sm ${textSecondary} hover:${textPrimary} transition-colors`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Quick Actions
              </button>

              {activeAction === 'create-client' && (
                <div className={`${cardBg} rounded-xl border ${cardBorder} p-6 max-w-lg`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-lg font-semibold ${textPrimary}`}>Create New User</h2>
                      <p className={`text-sm ${textSecondary}`}>Set a PIN and role, or leave PIN blank to auto-generate</p>
                    </div>
                  </div>

                  {newClientResult?.success ? (
                    <div className="space-y-4">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center">
                        <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-emerald-800 mb-1">{newClientResult.role === 'therapist' ? 'Advisor' : 'Client'} Created</h3>
                        <p className="text-sm text-emerald-600 mb-2">{newClientResult.name} is ready to log in</p>
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${newClientResult.role === 'therapist' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          Role: {newClientResult.role === 'therapist' ? 'Advisor' : 'Client'}
                        </span>
                        <div className="bg-white rounded-lg p-4 border border-emerald-200 inline-block">
                          <p className="text-xs text-gray-500 mb-1">Access PIN</p>
                          <p className="text-3xl font-mono font-bold text-gray-900 tracking-widest">{newClientResult.pin}</p>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() => { copyToClipboard(newClientResult.pin); }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                            Copy PIN
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => { setNewClientResult(null); setNewClientForm({ name: '', email: '', phone: '', pin: '', role: 'client' }); }}
                        className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Create Another Client
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Client Name *</label>
                        <input
                          type="text"
                          value={newClientForm.name}
                          onChange={e => setNewClientForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter client's full name"
                          className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-blue-500 outline-none`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>PIN Number *</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={newClientForm.pin}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setNewClientForm(prev => ({ ...prev, pin: val }));
                          }}
                          placeholder="Enter 6-digit PIN"
                          className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-blue-500 outline-none font-mono text-lg tracking-widest`}
                        />
                        <p className={`text-xs ${textMuted} mt-1`}>Choose a 6-digit PIN for this client to use when logging in. Leave blank to auto-generate one.</p>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>User Role *</label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { value: 'client', label: 'Client', desc: 'Access to curriculum, assessments, and exercises', icon: '👤' },
                            { value: 'therapist', label: 'Advisor', desc: 'Full admin dashboard and client management', icon: '🛡️' }
                          ].map(role => (
                            <button
                              key={role.value}
                              type="button"
                              onClick={() => setNewClientForm(prev => ({ ...prev, role: role.value }))}
                              className={`p-3 rounded-lg border-2 text-left transition-all ${
                                newClientForm.role === role.value
                                  ? role.value === 'therapist'
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-400'
                                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                                  : `${cardBorder} hover:border-gray-400`
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">{role.icon}</span>
                                <span className={`text-sm font-semibold ${newClientForm.role === role.value ? (role.value === 'therapist' ? 'text-purple-700 dark:text-purple-300' : 'text-blue-700 dark:text-blue-300') : textPrimary}`}>
                                  {role.label}
                                </span>
                              </div>
                              <p className={`text-xs ${textMuted}`}>{role.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Email (optional)</label>
                        <input
                          type="email"
                          value={newClientForm.email}
                          onChange={e => setNewClientForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="client@email.com"
                          className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-blue-500 outline-none`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Phone (optional)</label>
                        <input
                          type="tel"
                          value={newClientForm.phone}
                          onChange={e => setNewClientForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="(555) 123-4567"
                          className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-blue-500 outline-none`}
                        />
                      </div>
                      {newClientResult?.error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                          {newClientResult.error}
                        </div>
                      )}
                      <button
                        onClick={handleCreateClient}
                        disabled={newClientLoading || !newClientForm.name.trim()}
                        className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {newClientLoading ? (
                          <><RefreshCw className="w-4 h-4 animate-spin" /> Creating Client...</>
                        ) : (
                          <><Plus className="w-4 h-4" /> Create Client</>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeAction === 'send-reminder' && (
                <div className={`${cardBg} rounded-xl border ${cardBorder} p-6 max-w-lg`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-lg font-semibold ${textPrimary}`}>Send Reminder</h2>
                      <p className={`text-sm ${textSecondary}`}>Compose a reminder and copy it to send via your preferred method</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Select Client</label>
                      <select
                        value={reminderForm.clientId}
                        onChange={e => {
                          setReminderForm(prev => ({ ...prev, clientId: e.target.value }));
                          setReminderSaved(false);
                        }}
                        className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-emerald-500 outline-none`}
                      >
                        <option value="">Choose a client...</option>
                        {clients.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Reminder Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'session', label: 'Session' },
                          { id: 'activity', label: 'Activity' },
                          { id: 'checkin', label: 'Check-in' },
                          { id: 'assessment', label: 'Assessment' }
                        ].map(t => (
                          <button
                            key={t.id}
                            onClick={() => {
                              const client = clients.find(c => c.id === reminderForm.clientId);
                              const msg = reminderTemplates[t.id].replace('{name}', client?.name || '[Client]');
                              setReminderForm(prev => ({ ...prev, type: t.id, message: msg }));
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                              reminderForm.type === t.id
                                ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                                : `${cardBg} ${cardBorder} ${textSecondary} hover:border-emerald-300`
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Message</label>
                      <textarea
                        value={reminderForm.message}
                        onChange={e => setReminderForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={4}
                        placeholder="Type your reminder message..."
                        className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-emerald-500 outline-none resize-none`}
                      />
                    </div>
                    {reminderSaved && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-2 text-sm text-emerald-700">
                        <CheckCircle className="w-4 h-4" />
                        Reminder saved and ready to send
                      </div>
                    )}
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          copyToClipboard(reminderForm.message);
                          handleSendReminder();
                        }}
                        disabled={!reminderForm.clientId || !reminderForm.message.trim()}
                        className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Copy & Save Reminder
                      </button>
                    </div>
                    <p className={`text-xs ${textMuted}`}>
                      The message will be copied to your clipboard so you can paste it in your preferred messaging app. A log of the reminder is saved in your session notes.
                    </p>
                  </div>
                </div>
              )}

              {activeAction === 'export-reports' && (
                <div className={`${cardBg} rounded-xl border ${cardBorder} p-6 max-w-lg`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-lg font-semibold ${textPrimary}`}>Export All Reports</h2>
                      <p className={`text-sm ${textSecondary}`}>Download a comprehensive CSV report of all client data</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className={`rounded-lg border ${cardBorder} p-4`}>
                      <h3 className={`text-sm font-medium ${textPrimary} mb-3`}>Report includes:</h3>
                      <ul className={`text-sm ${textSecondary} space-y-2`}>
                        {['Client names and wound profiles', 'Module completion progress', 'Journal entry counts', 'Average mood scores', 'Activity completion rates', 'Risk levels and engagement status', 'Join dates and last activity'].map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`rounded-lg border ${cardBorder} p-4 bg-amber-50/50`}>
                      <p className={`text-sm ${textSecondary}`}>
                        <span className="font-medium">{clients.length} clients</span> will be included in this report
                      </p>
                    </div>
                    <button
                      onClick={handleExportReports}
                      disabled={exportLoading || clients.length === 0}
                      className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {exportLoading ? (
                        <><RefreshCw className="w-4 h-4 animate-spin" /> Generating Report...</>
                      ) : (
                        <><Download className="w-4 h-4" /> Download CSV Report</>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {activeAction === 'group-analytics' && (() => {
                const analytics = getGroupAnalytics();
                if (!analytics) {
                  return (
                    <div className={`${cardBg} rounded-xl border ${cardBorder} p-6 text-center`}>
                      <p className={textSecondary}>No client data available for analytics.</p>
                    </div>
                  );
                }
                const maxWound = Math.max(...Object.values(analytics.woundCounts));
                return (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-lg font-semibold ${textPrimary}`}>Group Analytics</h2>
                        <p className={`text-sm ${textSecondary}`}>Trends across all {clients.length} clients</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: 'Avg Progress', value: `${analytics.avgProgress}%`, sub: `${analytics.avgModules} modules avg`, color: 'from-blue-500 to-blue-600' },
                        { label: 'Active Rate', value: `${analytics.activeRate}%`, sub: `${analytics.riskCounts.low} of ${clients.length} active`, color: 'from-emerald-500 to-emerald-600' },
                        { label: 'Total Journals', value: analytics.totalJournals, sub: `${(analytics.totalJournals / clients.length).toFixed(1)} per client`, color: 'from-amber-500 to-amber-600' },
                        { label: 'Activity Rate', value: `${analytics.activityCompletionRate}%`, sub: `${analytics.completedActivities}/${analytics.totalActivities} done`, color: 'from-amber-500 to-amber-600' }
                      ].map(stat => (
                        <div key={stat.label} className={`${cardBg} rounded-xl border ${cardBorder} p-4`}>
                          <p className={`text-xs ${textMuted} mb-1`}>{stat.label}</p>
                          <p className={`text-2xl font-bold ${textPrimary}`}>{stat.value}</p>
                          <p className={`text-xs ${textSecondary} mt-1`}>{stat.sub}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
                        <h3 className={`text-sm font-semibold ${textPrimary} mb-4`}>Wound Distribution</h3>
                        <div className="space-y-3">
                          {Object.entries(analytics.woundCounts).filter(([k]) => k !== 'unknown').map(([wound, count]) => {
                            const colors = woundColorMap[wound] || { bg: 'bg-gray-100', text: 'text-gray-700' };
                            const pct = maxWound > 0 ? Math.round((count / clients.length) * 100) : 0;
                            return (
                              <div key={wound}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-sm capitalize ${textSecondary}`}>{wound}</span>
                                  <span className={`text-sm font-medium ${textPrimary}`}>{count} ({pct}%)</span>
                                </div>
                                <div className={`h-2.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                                  <div
                                    className={`h-full rounded-full`}
                                    style={{ width: `${pct}%`, backgroundColor: wound === 'abandonment' ? '#3b82f6' : wound === 'shame' ? '#8b5cf6' : wound === 'neglect' ? '#f59e0b' : wound === 'helplessness' ? '#f43f5e' : '#ef4444' }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                          {analytics.woundCounts.unknown > 0 && (
                            <p className={`text-xs ${textMuted} mt-2`}>{analytics.woundCounts.unknown} client(s) have not completed an assessment yet</p>
                          )}
                        </div>
                      </div>

                      <div className={`${cardBg} rounded-xl border ${cardBorder} p-5`}>
                        <h3 className={`text-sm font-semibold ${textPrimary} mb-4`}>Engagement Status</h3>
                        <div className="space-y-3">
                          {[
                            { key: 'low', label: 'Active (< 7 days)', color: '#10b981' },
                            { key: 'medium', label: 'At Risk (7-14 days)', color: '#f59e0b' },
                            { key: 'high', label: 'Inactive (> 14 days)', color: '#ef4444' }
                          ].map(status => {
                            const count = analytics.riskCounts[status.key];
                            const pct = Math.round((count / clients.length) * 100);
                            return (
                              <div key={status.key}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-sm ${textSecondary}`}>{status.label}</span>
                                  <span className={`text-sm font-medium ${textPrimary}`}>{count} ({pct}%)</span>
                                </div>
                                <div className={`h-2.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                                  <div
                                    className="h-full rounded-full"
                                    style={{ width: `${pct}%`, backgroundColor: status.color }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-5 pt-4 border-t border-gray-200">
                          <h4 className={`text-xs font-medium ${textMuted} uppercase tracking-wider mb-3`}>Summary</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className={`text-xs ${textMuted}`}>Assessments</p>
                              <p className={`text-lg font-semibold ${textPrimary}`}>{analytics.totalAssessments}</p>
                            </div>
                            <div>
                              <p className={`text-xs ${textMuted}`}>Avg Modules</p>
                              <p className={`text-lg font-semibold ${textPrimary}`}>{analytics.avgModules}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {activeTab === 'lessons' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${textPrimary}`}>IFS Session Lesson Plans</h2>
              <p className={`text-sm ${textSecondary}`}>Detailed guides for each module session</p>
            </div>
          </div>

          <div className="mb-6">
            <label className={`block text-sm font-medium ${textSecondary} mb-2`}>View Client's Personalized Curriculum</label>
            <select
              value={selectedLessonClient}
              onChange={(e) => {
                setSelectedLessonClient(e.target.value);
                if (e.target.value) loadClientCurriculum(e.target.value);
                else setClientCurriculum(null);
              }}
              className={`w-full sm:w-80 px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
            >
              <option value="">Standard Lesson Plans</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {selectedLessonClient && clientCurriculum ? (
            <div className="space-y-4">
              {clientCurriculum.length === 0 ? (
                <div className={`${cardBg} rounded-xl border ${cardBorder} p-6`}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className={`font-semibold ${textPrimary}`}>No personalized curriculum yet</p>
                      <p className={`text-sm ${textMuted} mt-0.5`}>
                        This client hasn't completed the wound assessment. You can generate a personalized curriculum for them now by selecting their wound profile below.
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={`block text-sm font-semibold mb-1.5 ${textSecondary}`}>Primary Wound</label>
                      <select
                        value={genPrimaryWound}
                        onChange={e => { setGenPrimaryWound(e.target.value); setGenResult(null); if (e.target.value === genSecondaryWound) setGenSecondaryWound(WOUND_TYPES.find(w => w !== e.target.value)); }}
                        className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none text-sm`}
                      >
                        {WOUND_TYPES.map(w => <option key={w} value={w}>{w.charAt(0).toUpperCase() + w.slice(1)}</option>)}
                      </select>
                      <p className={`text-xs mt-1 ${textMuted}`}>60% of curriculum focus</p>
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-1.5 ${textSecondary}`}>Secondary Wound</label>
                      <select
                        value={genSecondaryWound}
                        onChange={e => { setGenSecondaryWound(e.target.value); setGenResult(null); }}
                        className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none text-sm`}
                      >
                        {WOUND_TYPES.filter(w => w !== genPrimaryWound).map(w => <option key={w} value={w}>{w.charAt(0).toUpperCase() + w.slice(1)}</option>)}
                      </select>
                      <p className={`text-xs mt-1 ${textMuted}`}>30% of curriculum focus</p>
                    </div>
                  </div>
                  {genResult?.error && (
                    <div className="mb-3 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">{genResult.error}</div>
                  )}
                  {genResult?.success && (
                    <div className="mb-3 px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-700">✓ {genResult.success}</div>
                  )}
                  <button
                    onClick={() => handleGenerateCurriculum(selectedLessonClient)}
                    disabled={generatingCurriculum}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-60"
                  >
                    {generatingCurriculum
                      ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Generating...</>
                      : <><Sparkles className="w-4 h-4" /> Generate Personalized Curriculum</>
                    }
                  </button>
                  <p className={`text-xs mt-3 ${textMuted}`}>
                    This will create a full 6-module personalized curriculum and save an advisor-assigned wound profile for this client. The client can still complete the formal assessment later to refine it.
                  </p>
                </div>
              ) : (
                <>
                <div className={`${cardBg} rounded-xl border ${cardBorder} p-4 mb-1`}>
                  <details className="group">
                    <summary className={`cursor-pointer text-sm font-semibold flex items-center gap-2 ${textSecondary} list-none`}>
                      <RefreshCw className="w-4 h-4 text-amber-500" />
                      Regenerate Curriculum with Different Wound Profile
                      <ChevronDown className="w-3.5 h-3.5 ml-auto group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="mt-3 grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-semibold mb-1 ${textMuted}`}>Primary Wound</label>
                        <select value={genPrimaryWound} onChange={e => { setGenPrimaryWound(e.target.value); setGenResult(null); if (e.target.value === genSecondaryWound) setGenSecondaryWound(WOUND_TYPES.find(w => w !== e.target.value)); }} className={`w-full px-2.5 py-2 rounded-lg border ${inputBg} outline-none text-sm`}>
                          {WOUND_TYPES.map(w => <option key={w} value={w}>{w.charAt(0).toUpperCase() + w.slice(1)}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={`block text-xs font-semibold mb-1 ${textMuted}`}>Secondary Wound</label>
                        <select value={genSecondaryWound} onChange={e => { setGenSecondaryWound(e.target.value); setGenResult(null); }} className={`w-full px-2.5 py-2 rounded-lg border ${inputBg} outline-none text-sm`}>
                          {WOUND_TYPES.filter(w => w !== genPrimaryWound).map(w => <option key={w} value={w}>{w.charAt(0).toUpperCase() + w.slice(1)}</option>)}
                        </select>
                      </div>
                    </div>
                    {genResult?.error && <p className="mt-2 text-xs text-red-600">{genResult.error}</p>}
                    {genResult?.success && <p className="mt-2 text-xs text-emerald-600">✓ {genResult.success}</p>}
                    <button onClick={() => handleGenerateCurriculum(selectedLessonClient)} disabled={generatingCurriculum} className="mt-3 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-60">
                      {generatingCurriculum ? <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Regenerating...</> : <><RefreshCw className="w-3.5 h-3.5" /> Regenerate</>}
                    </button>
                    <p className={`text-xs mt-1.5 ${textMuted}`}>This will replace the existing curriculum with a new personalized version.</p>
                  </details>
                </div>
                {clientCurriculum.map((mod, index) => {
                  const customContent = mod.customized_content || {};
                  const woundColors = woundColorMap[mod.primary_wound_focus] || { bg: 'bg-gray-100', text: 'text-gray-700' };
                  const difficultyColors = {
                    beginner: 'bg-green-100 text-green-700',
                    intermediate: 'bg-yellow-100 text-yellow-700',
                    advanced: 'bg-red-100 text-red-700'
                  };

                  return (
                    <div key={mod.id} className={`${cardBg} rounded-xl border ${cardBorder} overflow-hidden transition-all`}>
                      {editingModule?.id === mod.id ? (
                        <div className="p-5 space-y-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-semibold ${textPrimary}`}>Edit Module {mod.module_order || index + 1}</h3>
                            <button
                              onClick={() => setEditingModule(null)}
                              className={`p-1.5 rounded-lg ${hoverBg} ${textMuted}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div>
                            <label className={`block text-sm font-medium ${textSecondary} mb-1`}>Title</label>
                            <input
                              type="text"
                              value={editModuleForm.title}
                              onChange={(e) => setEditModuleForm(prev => ({ ...prev, title: e.target.value }))}
                              className={`w-full px-3 py-2 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium ${textSecondary} mb-1`}>Description</label>
                            <textarea
                              value={editModuleForm.description}
                              onChange={(e) => setEditModuleForm(prev => ({ ...prev, description: e.target.value }))}
                              rows={3}
                              className={`w-full px-3 py-2 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none resize-none`}
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium ${textSecondary} mb-1`}>Estimated Minutes</label>
                            <input
                              type="number"
                              value={editModuleForm.estimatedMinutes}
                              onChange={(e) => setEditModuleForm(prev => ({ ...prev, estimatedMinutes: parseInt(e.target.value) || 0 }))}
                              className={`w-32 px-3 py-2 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
                            />
                          </div>
                          {moduleSaveError && (
                            <p className="text-xs text-red-500 font-medium">{moduleSaveError}</p>
                          )}
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={handleSaveModuleEdit}
                              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                            >
                              <Save className="w-4 h-4" />
                              Save Changes
                            </button>
                            <button
                              onClick={() => { setEditingModule(null); setModuleSaveError(''); }}
                              className={`px-4 py-2 rounded-lg text-sm font-medium ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors`}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {mod.module_order || index + 1}
                              </div>
                              <div className="flex-1">
                                <h3 className={`font-semibold ${textPrimary}`}>{mod.module_title}</h3>
                                <p className={`text-sm ${textSecondary} mt-1 leading-relaxed`}>{mod.module_description}</p>

                                <div className="flex flex-wrap items-center gap-2 mt-3">
                                  {mod.primary_wound_focus && (
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${woundColors.bg} ${woundColors.text}`}>
                                      {mod.primary_wound_focus}
                                    </span>
                                  )}
                                  {mod.difficulty_level && (
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[mod.difficulty_level] || 'bg-gray-100 text-gray-700'}`}>
                                      {mod.difficulty_level}
                                    </span>
                                  )}
                                  <span className={`inline-flex items-center gap-1 text-xs ${textMuted}`}>
                                    <Clock className="w-3 h-3" />
                                    {mod.estimated_minutes || 30} min
                                  </span>
                                </div>

                                {(customContent.specificChanges || customContent.woundFocus) && (
                                  <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-amber-50'} border ${isDark ? 'border-slate-600' : 'border-amber-100'}`}>
                                    <p className={`text-xs font-medium ${textMuted} uppercase tracking-wider mb-1`}>Personalization</p>
                                    <p className={`text-sm ${textSecondary}`}>
                                      {customContent.specificChanges || customContent.woundFocus}
                                    </p>
                                  </div>
                                )}

                                {customContent.goals && (
                                  <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'} border ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
                                    <p className={`text-xs font-medium ${textMuted} uppercase tracking-wider mb-1`}>Session Goals</p>
                                    <p className={`text-sm ${textSecondary}`}>{customContent.goals}</p>
                                    {customContent.topics?.length > 0 && (
                                      <div className="mt-2">
                                        <p className={`text-xs font-medium ${textMuted} uppercase tracking-wider mb-1`}>Discussion Topics</p>
                                        <ul className="space-y-0.5">
                                          {customContent.topics.map((t, i) => (
                                            <li key={i} className={`text-sm ${textSecondary} italic`}>&ldquo;{t}&rdquo;</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {customContent.activities?.length > 0 && (
                                      <div className="mt-2">
                                        <p className={`text-xs font-medium ${textMuted} uppercase tracking-wider mb-1`}>Activities</p>
                                        <ul className="space-y-0.5">
                                          {customContent.activities.map((a, i) => (
                                            <li key={i} className={`text-sm ${textSecondary} flex items-center gap-1.5`}>
                                              <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />{a}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {customContent.watchFor?.length > 0 && (
                                      <div className="mt-2">
                                        <p className={`text-xs font-medium ${textMuted} uppercase tracking-wider mb-1`}>Watch For</p>
                                        <ul className="space-y-0.5">
                                          {customContent.watchFor.map((w, i) => (
                                            <li key={i} className={`text-sm ${textSecondary} flex items-center gap-1.5`}>
                                              <AlertTriangle className="w-3 h-3 text-amber-500 flex-shrink-0" />{w}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 flex-shrink-0">
                              <button
                                onClick={() => {
                                  setEditingModule(mod);
                                  setEditModuleForm({
                                    title: mod.module_title || '',
                                    description: mod.module_description || '',
                                    estimatedMinutes: mod.estimated_minutes || 30
                                  });
                                }}
                                className={`p-2 rounded-lg ${hoverBg} ${textMuted} hover:text-amber-500 transition-colors`}
                                title="Edit module"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveModule(mod)}
                                className={`p-2 rounded-lg ${hoverBg} ${textMuted} hover:text-red-500 transition-colors`}
                                title="Remove module"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className={`${cardBg} rounded-xl border-2 border-dashed ${isDark ? 'border-slate-600' : 'border-gray-300'} overflow-hidden transition-all`}>
                  {!showAddModule ? (
                    <button
                      onClick={() => { setShowAddModule(true); setAddModuleResult(null); }}
                      className={`w-full p-5 flex items-center justify-center gap-3 ${hoverBg} transition-colors`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                        <Plus className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className={`font-semibold ${textPrimary}`}>Add Wound-Specific Lesson Plan</p>
                        <p className={`text-sm ${textMuted}`}>Browse and add targeted healing modules by child wound type</p>
                      </div>
                    </button>
                  ) : (
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`font-semibold ${textPrimary} flex items-center gap-2`}>
                          <Heart className="w-4 h-4 text-rose-500" />
                          Add Wound-Specific Lesson Plan
                        </h3>
                        <button onClick={() => { setShowAddModule(false); setAddModuleResult(null); }} className={`p-1.5 rounded-lg ${hoverBg} ${textMuted}`}>
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {WOUND_TYPES.map(w => {
                          const wd = WOUND_DISPLAY[w];
                          const isActive = addModuleWound === w;
                          return (
                            <button
                              key={w}
                              onClick={() => { setAddModuleWound(w); setAddModuleResult(null); }}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                isActive
                                  ? `bg-gradient-to-r ${wd.gradient} text-white shadow-lg`
                                  : `${isDark ? wd.darkBg + ' ' + wd.darkBorder + ' ' + wd.darkText : wd.bg + ' ' + wd.border + ' ' + wd.text} border`
                              }`}
                            >
                              {wd.label} ({wd.childName})
                            </button>
                          );
                        })}
                      </div>

                      {addModuleResult?.success && (
                        <div className="mb-3 px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" /> {addModuleResult.success}
                        </div>
                      )}
                      {addModuleResult?.error && (
                        <div className="mb-3 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">{addModuleResult.error}</div>
                      )}

                      <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-1">
                        {(WOUND_LESSON_PLANS[addModuleWound] || []).map(template => {
                          const wd = WOUND_DISPLAY[addModuleWound];
                          const diffColors = { beginner: 'bg-green-100 text-green-700', intermediate: 'bg-yellow-100 text-yellow-700', advanced: 'bg-red-100 text-red-700' };
                          const alreadyAdded = (clientCurriculum || []).some(m => m.module_title === template.title);
                          return (
                            <div key={template.id} className={`rounded-lg border ${isDark ? 'border-slate-600 bg-slate-700/50' : 'border-gray-200 bg-white'} p-4`}>
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <h4 className={`font-medium ${textPrimary} text-sm`}>{template.title}</h4>
                                  <p className={`text-xs ${textSecondary} mt-1 leading-relaxed`}>{template.description}</p>
                                  <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isDark ? wd.darkBg + ' ' + wd.darkText : wd.bg + ' ' + wd.text}`}>
                                      {wd.childName}
                                    </span>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${diffColors[template.difficulty] || diffColors.beginner}`}>
                                      {template.difficulty}
                                    </span>
                                    <span className={`inline-flex items-center gap-1 text-xs ${textMuted}`}>
                                      <Clock className="w-3 h-3" /> {template.estimatedMinutes} min
                                    </span>
                                  </div>
                                  <details className="mt-2 group">
                                    <summary className={`text-xs font-medium ${textMuted} cursor-pointer select-none`}>
                                      View details
                                    </summary>
                                    <div className={`mt-2 text-xs ${textSecondary} space-y-2`}>
                                      <div><span className={`font-medium ${textMuted}`}>Goals:</span> {template.goals}</div>
                                      <div>
                                        <span className={`font-medium ${textMuted}`}>Topics:</span>
                                        <ul className="ml-3 mt-0.5 space-y-0.5">{template.topics.map((t, i) => <li key={i} className="italic">&ldquo;{t}&rdquo;</li>)}</ul>
                                      </div>
                                      <div>
                                        <span className={`font-medium ${textMuted}`}>Activities:</span>
                                        <ul className="ml-3 mt-0.5 space-y-0.5">{template.activities.map((a, i) => <li key={i}>{a}</li>)}</ul>
                                      </div>
                                      <div>
                                        <span className={`font-medium ${textMuted}`}>Watch For:</span>
                                        <ul className="ml-3 mt-0.5 space-y-0.5">{template.watchFor.map((w, i) => <li key={i}>{w}</li>)}</ul>
                                      </div>
                                    </div>
                                  </details>
                                </div>
                                <button
                                  onClick={() => handleAddWoundModule(template)}
                                  disabled={addingModuleId === template.id || alreadyAdded}
                                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                                    alreadyAdded
                                      ? `${isDark ? 'bg-slate-600 text-slate-400' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                                      : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-md'
                                  } disabled:opacity-60`}
                                >
                                  {addingModuleId === template.id ? (
                                    <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Adding...</>
                                  ) : alreadyAdded ? (
                                    <><CheckCircle className="w-3.5 h-3.5" /> Added</>
                                  ) : (
                                    <><Plus className="w-3.5 h-3.5" /> Add</>
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {lessonPlans.map((module, index) => (
                <div key={module.id} className={`${cardBg} rounded-xl border ${cardBorder} overflow-hidden transition-all`}>
                  <button
                    onClick={() => toggleModule(module.id)}
                    className={`w-full flex items-center justify-between p-5 text-left ${hoverBg} transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
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
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <h4 className={`font-medium ${textPrimary} text-sm`}>Session Goals</h4>
                          </div>
                          <p className={`text-sm ${textSecondary} leading-relaxed`}>{module.goals}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <MessageCircle className="w-4 h-4 text-stone-500" />
                            <h4 className={`font-medium ${textPrimary} text-sm`}>Discussion Topics</h4>
                          </div>
                          <ul className="space-y-2">
                            {module.topics.map((topic, i) => (
                              <li key={i} className={`text-sm ${textSecondary} flex items-start gap-2`}>
                                <span className="text-amber-400 mt-0.5 flex-shrink-0">&ldquo;</span>
                                <span className="italic">{topic}</span>
                                <span className="text-amber-400 mt-0.5 flex-shrink-0">&rdquo;</span>
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

                      <div className={`mt-5 p-4 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-amber-50'} border ${isDark ? 'border-slate-600' : 'border-amber-100'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-amber-500" />
                          <h4 className={`font-medium ${textPrimary} text-sm`}>Homework Assignment</h4>
                        </div>
                        <p className={`text-sm ${textSecondary}`}>{module.homework}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'insights' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
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
              className={`w-full sm:w-80 px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
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
              <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {selectedInsightClient && !insightsLoading && clientInsights && (() => {
            const client = clients.find(c => c.id === selectedInsightClient);
            const assessment = clientInsights.assessment;
            const personalization = clientInsights.personalization;
            const normalizeScore = (s) => {
              if (s === null || s === undefined) return 0;
              const num = Number(s);
              if (isNaN(num)) return 0;
              return num <= 5 ? Math.round(num * 5) : Math.round(num);
            };
            const woundScores = assessment ? [
              { type: 'Abandonment', score: normalizeScore(assessment.abandonment_score), color: 'blue' },
              { type: 'Shame', score: normalizeScore(assessment.shame_score), color: 'purple' },
              { type: 'Neglect', score: normalizeScore(assessment.neglect_score), color: 'amber' },
              { type: 'Betrayal', score: normalizeScore(assessment.betrayal_score), color: 'red' },
              { type: 'Helplessness', score: normalizeScore(assessment.helplessness_score || 0), color: 'rose' }
            ].sort((a, b) => b.score - a.score) : [];
            const maxScore = 25;
            const clientGam = clientGamification[selectedInsightClient];

            return (
              <div className="space-y-6">
                {!assessment && !personalization && (
                  <div className={`${cardBg} rounded-2xl border ${isDark ? 'border-amber-700/40' : 'border-amber-200'} ${isDark ? 'bg-amber-900/10' : 'bg-amber-50'} p-6`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold mb-1 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                          No wound assessment data for {client?.name}
                        </p>
                        <p className={`text-sm mb-3 ${isDark ? 'text-amber-200/80' : 'text-amber-700'}`}>
                          This client hasn't completed the IFS wound assessment, so their curriculum cannot be personalized and most insights panels will be empty.
                          You can generate a personalized curriculum for them right now from the <strong>Lesson Plans</strong> tab.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => { setActiveTab('lessons'); setSelectedLessonClient(selectedInsightClient); loadClientCurriculum(selectedInsightClient); }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-semibold hover:from-amber-600 hover:to-orange-600 transition-all"
                          >
                            <BookOpen className="w-4 h-4" /> Go to Lesson Plans → Generate Curriculum
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {(assessment || personalization) && (
                  <div className={`${cardBg} rounded-2xl border ${glowStyles.purple} p-5`}>
                    <h3 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2 tracking-tight`}>
                      <Sparkles className="w-5 h-5 text-purple-500" />
                      Curriculum Personalization for {client?.name}
                    </h3>

                    {assessment && (
                      <div className="mb-6">
                        <h4 className={`text-sm font-semibold ${textPrimary} mb-3 flex items-center gap-2`}>
                          <Target className="w-4 h-4 text-stone-500" />
                          Wound Assessment Scores
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                          {woundScores.map(w => (
                            <div key={w.type} className={`p-3 rounded-lg border ${cardBorder} ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs font-medium ${textSecondary}`}>{w.type}</span>
                                <span className={`text-sm font-bold ${textPrimary}`}>{w.score}/{maxScore}</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    w.color === 'blue' ? 'bg-blue-500' :
                                    w.color === 'purple' ? 'bg-purple-500' :
                                    w.color === 'amber' ? 'bg-amber-500' :
                                    w.color === 'rose' ? 'bg-rose-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${(w.score / maxScore) * 100}%` }}
                                />
                              </div>
                              <p className={`text-xs mt-1 ${textMuted}`}>
                                {w.score >= 17 ? 'High priority' : w.score >= 9 ? 'Moderate' : 'Low'}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-indigo-900/20 border-indigo-800' : 'bg-stone-50 border-stone-100'} border`}>
                          <p className={`text-sm ${textSecondary}`}>
                            <span className="font-medium">Primary wound:</span>{' '}
                            <span className={`font-semibold ${textPrimary}`}>{assessment.primary_wound || woundScores[0]?.type || 'Not assessed'}</span>
                            {assessment.secondary_wound && (
                              <> | <span className="font-medium">Secondary:</span>{' '}
                              <span className={textPrimary}>{assessment.secondary_wound}</span></>
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    {clientInsights.partsAssessment && (
                      <div className="mb-6">
                        <h4 className={`text-sm font-semibold ${textPrimary} mb-3 flex items-center gap-2`}>
                          <Shield className="w-4 h-4 text-purple-500" />
                          Protective Parts Assessment
                        </h4>
                        {(() => {
                          const partsData = clientInsights.partsAssessment;
                          const partsDefinitions = {
                            manager: [
                              { name: 'The Inner Critic', trigger: [3], threshold: 4, role: 'Drives perfectionism through self-criticism', need: 'Needs to know you are already worthy without being perfect' },
                              { name: 'The Planner', trigger: [1], threshold: 4, role: 'Prevents surprises through hyper-organization', need: 'Needs to trust that you can handle uncertainty safely' },
                              { name: 'The Perfectionist', trigger: [7], threshold: 4, role: 'Prevents exposure of perceived flaws', need: 'Needs to learn that imperfection does not mean rejection' },
                              { name: 'The People Pleaser', trigger: [9], threshold: 4, role: 'Keeps relationships safe through compliance', need: 'Needs to know your true self is lovable without performing' },
                              { name: 'The Controller', trigger: [5], threshold: 4, role: 'Manages situations to prevent vulnerability', need: 'Needs to feel safe enough to release control and trust the process' },
                              { name: 'The Worrier', trigger: [14], threshold: 4, role: 'Anticipates danger through hypervigilance', need: 'Needs reassurance that you are safe in the present moment' }
                            ],
                            firefighter: [
                              { name: 'The Distractor', trigger: [2], threshold: 4, role: 'Prevents feeling overwhelming pain', need: 'Needs permission to feel emotions safely without being overwhelmed' },
                              { name: 'The Numbing Part', trigger: [6], threshold: 4, role: 'Creates emotional distance from pain', need: 'Needs to know that feeling pain will not destroy you' },
                              { name: 'The Impulse Part', trigger: [4], threshold: 4, role: 'Releases emotional pressure through action', need: 'Needs healthier outlets and the ability to pause before acting' },
                              { name: 'The Shutdown Part', trigger: [8], threshold: 4, role: 'Protects from emotional overwhelm through withdrawal', need: 'Needs a sense of safety to slowly reconnect with feelings' },
                              { name: 'The Self-Destructive Part', trigger: [10], threshold: 3, role: 'Redirects unbearable emotional pain', need: 'Needs compassion, not punishment — pain turned inward needs to be witnessed' }
                            ],
                            exile: [
                              { name: 'The Scared Child', trigger: [11], threshold: 4, role: 'Holds the original feelings of being small and helpless', need: 'Needs safety, comfort, and reassurance from Self' },
                              { name: 'The Lonely Child', trigger: [12], threshold: 4, role: 'Holds unmet needs for belonging and attachment', need: 'Needs to feel seen, held, and never alone again' },
                              { name: 'The Grieving Child', trigger: [13], threshold: 4, role: 'Holds unprocessed loss and sorrow', need: 'Needs to be witnessed, validated, and allowed to mourn' },
                              { name: 'The Shamed Child', trigger: [15], threshold: 4, role: 'Holds beliefs of being fundamentally flawed or broken', need: 'Needs to be told "you are enough" and "nothing is wrong with you"' }
                            ]
                          };
                          const rawAnswers = partsData.answers || {};
                          const identifiedParts = [];
                          Object.entries(partsDefinitions).forEach(([type, partsList]) => {
                            partsList.forEach(partDef => {
                              const triggerScores = partDef.trigger.map(qId => rawAnswers[qId] || rawAnswers[String(qId)] || 0);
                              const maxScore = Math.max(...triggerScores);
                              if (maxScore >= partDef.threshold) {
                                identifiedParts.push({ ...partDef, type, intensity: maxScore, intensityLabel: maxScore >= 5 ? 'Very Active' : 'Active' });
                              }
                            });
                          });
                          identifiedParts.sort((a, b) => b.intensity - a.intensity);

                          const typeCounts = { manager: 0, firefighter: 0, exile: 0 };
                          identifiedParts.forEach(p => { typeCounts[p.type] = (typeCounts[p.type] || 0) + 1; });
                          const typeLabels = { manager: 'Managers', firefighter: 'Firefighters', exile: 'Exiles' };
                          const typeColors = { manager: { bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50', text: isDark ? 'text-blue-300' : 'text-blue-700', border: isDark ? 'border-blue-800' : 'border-blue-200', bar: 'bg-blue-500' }, firefighter: { bg: isDark ? 'bg-amber-900/30' : 'bg-amber-50', text: isDark ? 'text-amber-300' : 'text-amber-700', border: isDark ? 'border-amber-800' : 'border-amber-200', bar: 'bg-amber-500' }, exile: { bg: isDark ? 'bg-pink-900/30' : 'bg-pink-50', text: isDark ? 'text-pink-300' : 'text-pink-700', border: isDark ? 'border-pink-800' : 'border-pink-200', bar: 'bg-pink-500' } };

                          return (
                            <div>
                              <div className="grid grid-cols-3 gap-3 mb-4">
                                {Object.entries(typeCounts).map(([type, count]) => (
                                  <div key={type} className={`p-3 rounded-lg border ${typeColors[type].border} ${typeColors[type].bg} text-center`}>
                                    <p className={`text-2xl font-extrabold ${typeColors[type].text}`}>{count}</p>
                                    <p className={`text-xs font-medium ${typeColors[type].text}`}>{typeLabels[type]}</p>
                                  </div>
                                ))}
                              </div>

                              {identifiedParts.length > 0 ? (
                                <div className="space-y-3">
                                  {identifiedParts.map((part, idx) => (
                                    <div key={idx} className={`p-4 rounded-lg border ${typeColors[part.type].border} ${typeColors[part.type].bg}`}>
                                      <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          <span className={`text-sm font-bold ${textPrimary}`}>{part.name}</span>
                                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${typeColors[part.type].text} ${isDark ? 'bg-slate-700/50' : 'bg-white/70'}`}>{part.type}</span>
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${part.intensity >= 5 ? (isDark ? 'bg-red-900/40 text-red-300' : 'bg-red-100 text-red-700') : (isDark ? 'bg-yellow-900/40 text-yellow-300' : 'bg-yellow-100 text-yellow-700')}`}>
                                          {part.intensityLabel} ({part.intensity}/5)
                                        </span>
                                      </div>
                                      <div className="space-y-1.5">
                                        <p className={`text-xs ${textSecondary}`}>
                                          <span className="font-semibold">Role:</span> {part.role}
                                        </p>
                                        <p className={`text-xs ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                                          <span className="font-semibold">What it needs to step back:</span> {part.need}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className={`p-4 rounded-lg border ${cardBorder} ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'} text-center`}>
                                  <Shield className={`w-8 h-8 mx-auto mb-2 ${textMuted}`} />
                                  <p className={`text-sm ${textSecondary}`}>No strongly active protective parts identified</p>
                                  <p className={`text-xs ${textMuted} mt-1`}>All parts scored below threshold — this may indicate balanced inner system or low assessment engagement</p>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {clientInsights.selfEnergyAssessment && (
                      <div className="mb-6">
                        <h4 className={`text-sm font-semibold ${textPrimary} mb-3 flex items-center gap-2`}>
                          <Heart className="w-4 h-4 text-emerald-500" />
                          Self-Energy Assessment — The 8 C's
                        </h4>
                        {(() => {
                          const seData = clientInsights.selfEnergyAssessment;
                          const scores = seData.scores || seData.qualities || {};
                          const cDescriptions = {
                            calmness: 'Ability to remain centered and peaceful even under stress',
                            curiosity: 'Genuine interest in understanding inner experiences without judgment',
                            compassion: 'Warmth and kindness toward yourself and your parts in pain',
                            confidence: 'Trust in your ability to handle whatever arises',
                            courage: 'Willingness to face fears and take steps toward healing',
                            clarity: 'Seeing situations clearly without parts clouding perception',
                            creativity: 'Capacity to think flexibly and find new solutions',
                            connectedness: 'Feeling of connection to others and something larger'
                          };
                          const cColors = {
                            calmness: { ring: 'text-cyan-500', bg: isDark ? 'bg-cyan-900/20' : 'bg-cyan-50', border: isDark ? 'border-cyan-800' : 'border-cyan-200' },
                            curiosity: { ring: 'text-violet-500', bg: isDark ? 'bg-violet-900/20' : 'bg-violet-50', border: isDark ? 'border-violet-800' : 'border-violet-200' },
                            compassion: { ring: 'text-pink-500', bg: isDark ? 'bg-pink-900/20' : 'bg-pink-50', border: isDark ? 'border-pink-800' : 'border-pink-200' },
                            confidence: { ring: 'text-amber-500', bg: isDark ? 'bg-amber-900/20' : 'bg-amber-50', border: isDark ? 'border-amber-800' : 'border-amber-200' },
                            courage: { ring: 'text-red-500', bg: isDark ? 'bg-red-900/20' : 'bg-red-50', border: isDark ? 'border-red-800' : 'border-red-200' },
                            clarity: { ring: 'text-blue-500', bg: isDark ? 'bg-blue-900/20' : 'bg-blue-50', border: isDark ? 'border-blue-800' : 'border-blue-200' },
                            creativity: { ring: 'text-emerald-500', bg: isDark ? 'bg-emerald-900/20' : 'bg-emerald-50', border: isDark ? 'border-emerald-800' : 'border-emerald-200' },
                            connectedness: { ring: 'text-indigo-500', bg: isDark ? 'bg-indigo-900/20' : 'bg-indigo-50', border: isDark ? 'border-indigo-800' : 'border-indigo-200' }
                          };
                          const cQualities = Object.entries(scores).map(([key, val]) => {
                            const avg = typeof val === 'number' ? val : (val?.average || val?.score || 0);
                            const pct = Math.round((avg / 5) * 100);
                            return { key, label: key.charAt(0).toUpperCase() + key.slice(1), avg, pct, desc: cDescriptions[key] || '', colors: cColors[key] || cColors.calmness };
                          }).sort((a, b) => b.pct - a.pct);

                          const overallAvg = cQualities.length > 0 ? Math.round(cQualities.reduce((s, q) => s + q.pct, 0) / cQualities.length) : 0;

                          return (
                            <div>
                              <div className={`p-4 rounded-lg border ${isDark ? 'border-emerald-800 bg-emerald-900/20' : 'border-emerald-200 bg-emerald-50'} mb-4 text-center`}>
                                <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mb-1`}>Overall Self-Energy</p>
                                <p className={`text-4xl font-extrabold ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{overallAvg}%</p>
                                <p className={`text-xs ${textMuted} mt-1`}>
                                  {overallAvg >= 80 ? 'Strong Self-energy connection — excellent foundation for parts work' :
                                   overallAvg >= 60 ? 'Moderate Self-energy — good base with room for growth' :
                                   overallAvg >= 40 ? 'Developing Self-energy — protectors may still be blending frequently' :
                                   'Low Self-energy access — focus on building Self-connection before deep parts work'}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {cQualities.map(q => (
                                  <div key={q.key} className={`p-3 rounded-lg border ${q.colors.border} ${q.colors.bg}`}>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className={`text-xs font-bold ${q.colors.ring}`}>{q.label}</span>
                                      <span className={`text-lg font-extrabold ${textPrimary}`}>{q.pct}%</span>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden mb-2">
                                      <div
                                        className={`h-full rounded-full transition-all duration-500 ${
                                          q.pct >= 80 ? 'bg-emerald-500' :
                                          q.pct >= 60 ? 'bg-teal-500' :
                                          q.pct >= 40 ? 'bg-amber-500' :
                                          'bg-red-400'
                                        }`}
                                        style={{ width: `${q.pct}%` }}
                                      />
                                    </div>
                                    <p className={`text-[10px] leading-tight ${textMuted}`}>{q.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {clientInsights.customAssessments && clientInsights.customAssessments.length > 0 && (
                      <div className="mb-6">
                        <h4 className={`text-sm font-semibold ${textPrimary} mb-3 flex items-center gap-2`}>
                          <FileText className="w-4 h-4 text-amber-500" />
                          Custom Assessment Results
                        </h4>
                        <div className="space-y-4">
                          {clientInsights.customAssessments.map((ca, caIdx) => (
                            <div key={ca.moduleId || caIdx} className={`p-4 rounded-lg border ${cardBorder} ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                              <div className="flex items-center justify-between mb-3">
                                <span className={`font-medium text-sm ${textPrimary}`}>{ca.assessmentTitle || 'Custom Assessment'}</span>
                                {(ca.completedAt || ca.updatedAt) && (
                                  <span className={`text-xs ${textMuted}`}>{new Date(ca.completedAt || ca.updatedAt).toLocaleDateString()}</span>
                                )}
                              </div>
                              {ca.ranked && ca.ranked.length > 0 && (
                                <div className="space-y-2">
                                  {ca.ranked.map(([category, data]) => {
                                    const percentage = data.percentage || ((data.average / (data.maxScale || 5)) * 100);
                                    return (
                                      <div key={category}>
                                        <div className="flex items-center justify-between mb-1">
                                          <span className={`text-xs font-medium capitalize ${textSecondary}`}>{category}</span>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                                              data.label === 'High' ? (isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700') :
                                              data.label === 'Moderate' ? (isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700') :
                                              (isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700')
                                            }`}>{data.label || 'N/A'}</span>
                                            <span className={`text-xs font-semibold ${textSecondary}`}>{data.average?.toFixed(1)}/{data.maxScale || 5}</span>
                                          </div>
                                        </div>
                                        <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-600' : 'bg-gray-200'}`}>
                                          <div className={`h-full rounded-full transition-all duration-500 ${
                                            percentage >= 66 ? 'bg-red-500' : percentage >= 33 ? 'bg-amber-500' : 'bg-emerald-500'
                                          }`} style={{ width: `${Math.min(percentage, 100)}%` }} />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {personalization && (
                      <div>
                        <h4 className={`text-sm font-semibold ${textPrimary} mb-3 flex items-center gap-2`}>
                          <BookOpen className="w-4 h-4 text-emerald-500" />
                          Module Personalizations
                        </h4>
                        {personalization.personalizedModules && personalization.personalizedModules.length > 0 ? (
                          <div className="space-y-3">
                            {personalization.personalizedModules.map((mod, idx) => (
                              <div key={mod.id || idx} className={`p-4 rounded-lg border ${cardBorder} ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                    {idx + 1}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className={`font-medium ${textPrimary} text-sm`}>{mod.title || `Module ${idx + 1}`}</h5>
                                    {mod.personalizedContent?.woundFocus && (
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                          mod.personalizedContent.woundFocus.toLowerCase().includes('abandon') ? 'bg-blue-100 text-blue-700' :
                                          mod.personalizedContent.woundFocus.toLowerCase().includes('shame') ? 'bg-purple-100 text-purple-700' :
                                          mod.personalizedContent.woundFocus.toLowerCase().includes('neglect') ? 'bg-amber-100 text-amber-700' :
                                          mod.personalizedContent.woundFocus.toLowerCase().includes('helpless') ? 'bg-rose-100 text-rose-700' :
                                          'bg-red-100 text-red-700'
                                        }`}>
                                          <span className="flex items-center gap-1"><Target className="w-3 h-3" /> Focus: {mod.personalizedContent.woundFocus}</span>
                                        </span>
                                      </div>
                                    )}
                                    {mod.personalizedContent?.specificChanges && (
                                      <div className={`mt-2 p-2 rounded-lg ${isDark ? 'bg-purple-900/20 border-purple-800/30' : 'bg-purple-50 border-purple-100'} border`}>
                                        <p className={`text-xs font-semibold ${isDark ? 'text-purple-300' : 'text-purple-700'} mb-1`}>What Changed:</p>
                                        <p className={`text-xs ${isDark ? 'text-purple-200' : 'text-purple-600'} leading-relaxed`}>{mod.personalizedContent.specificChanges}</p>
                                      </div>
                                    )}
                                    {mod.personalizedContent?.healingGoals && mod.personalizedContent.healingGoals.length > 0 && (
                                      <div className="mt-2">
                                        <p className={`text-xs font-medium ${textSecondary} mb-1`}>Healing Goals:</p>
                                        <ul className="space-y-1">
                                          {mod.personalizedContent.healingGoals.map((goal, gi) => (
                                            <li key={gi} className={`text-xs ${textMuted} flex items-start gap-1.5`}>
                                              <Target className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                                              {goal}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {mod.personalizedContent?.activities && mod.personalizedContent.activities.length > 0 && (
                                      <div className="mt-2">
                                        <p className={`text-xs font-medium ${textSecondary} mb-1`}>Tailored Activities:</p>
                                        <ul className="space-y-1">
                                          {mod.personalizedContent.activities.map((act, ai) => (
                                            <li key={ai} className={`text-xs ${textMuted} flex items-start gap-1.5`}>
                                              <Activity className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                                              {act}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {mod.description && (
                                      <p className={`text-xs ${textMuted} mt-2 leading-relaxed`}>{mod.description}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : personalization.primaryWound ? (
                          <div className={`p-4 rounded-xl border ${isDark ? 'border-purple-800/40 bg-purple-900/15' : 'border-purple-200 bg-purple-50/50'}`}>
                            <div className="flex items-start gap-3">
                              <Gem className={`w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5`} />
                              <div className="flex-1">
                                <p className={`text-sm font-semibold ${textPrimary}`}>
                                  Curriculum adapted for <span className="text-purple-600 dark:text-purple-400 capitalize">{personalization.primaryWound}</span> wound pattern
                                </p>
                                {personalization.woundRanking && (
                                  <div className="mt-2 flex flex-wrap gap-1.5">
                                    {personalization.woundRanking.map((wr, i) => (
                                      <span key={i} className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                                        i === 0 ? 'bg-amber-100 text-amber-700' :
                                        i === 1 ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-600'
                                      }`}>
                                        #{i + 1} {wr.type} ({wr.score})
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {personalization.focusAreas && (
                                  <div className="mt-3">
                                    <p className={`text-xs font-semibold ${textSecondary} mb-1.5`}>Focus Areas:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {personalization.focusAreas.map((area, i) => (
                                        <span key={i} className={`text-xs px-2.5 py-1 rounded-lg ${isDark ? 'bg-slate-600 text-slate-300' : 'bg-white border border-gray-200 text-gray-700'}`}>
                                          {area}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {assessment?.primary_wound && (() => {
                      const wound = assessment.primary_wound;
                      const woundChanges = {
                        abandonment: [
                          { mod: 'Module 1: IFS Foundations', standard: 'General parts introduction with broad examples of protectors and exiles', changed: 'Opens with attachment-focused check-in. Parts identification prioritizes people-pleaser and caretaker protectors. Added "safe base" grounding exercise before parts work.' },
                          { mod: 'Module 2: Inner Child Discovery', standard: 'Neutral wound exploration across all wound types equally', changed: 'Guided visualization starts with "finding the child who was left" imagery. Reflection prompts explore fears of being forgotten, moments of feeling alone, and beliefs like "people always leave." Added journaling on earliest abandonment memory.' },
                          { mod: 'Module 3: Protective Parts Mapping', standard: 'Generic protector identification using standard categories', changed: 'Protector map highlights clinging/anxious attachment managers and numbing firefighters. Added specific prompts: "Which part monitors whether people will stay?" and "Which part pushes people away before they can leave?"' },
                          { mod: 'Module 4: Healing & Unburdening', standard: 'Standard unburdening protocol with general reparenting', changed: 'Unburdening focuses on releasing "I will be abandoned" burden. Reparenting visualization emphasizes consistent presence: "I will never leave you." Added secure attachment meditation with internal safe figure who stays.' },
                          { mod: 'Module 5: Integration & Daily Practice', standard: 'General maintenance exercises and trigger management', changed: 'Daily practice includes attachment check-in ritual and self-soothing sequence for abandonment triggers. Maintenance plan focuses on building internal secure base. Added "emergency protocol" for when abandonment panic activates.' }
                        ],
                        shame: [
                          { mod: 'Module 1: IFS Foundations', standard: 'General parts introduction with broad examples of protectors and exiles', changed: 'Opens with self-compassion warm-up before any parts work. Parts identification focuses on Inner Critic and Perfectionist managers. Added explicit permission: "There is nothing wrong with you" framing throughout.' },
                          { mod: 'Module 2: Inner Child Discovery', standard: 'Neutral wound exploration across all wound types equally', changed: 'Guided visualization gently approaches "the child who believes they are broken." Reflection prompts explore core defectiveness beliefs, moments of being told "something is wrong with you," and hiding behaviors. Includes compassion letter to younger self.' },
                          { mod: 'Module 3: Protective Parts Mapping', standard: 'Generic protector identification using standard categories', changed: 'Protector map centers on Perfectionist managers, people-pleasers hiding flaws, and shame-avoidance firefighters. Added prompts: "Which part tries to be perfect so no one sees your flaws?" and "Which part attacks you before others can?"' },
                          { mod: 'Module 4: Healing & Unburdening', standard: 'Standard unburdening protocol with general reparenting', changed: 'Unburdening releases "I am fundamentally broken" burden. Reparenting visualization emphasizes unconditional acceptance: "You are enough exactly as you are." Added worthiness meditation and inner critic transformation dialogue.' },
                          { mod: 'Module 5: Integration & Daily Practice', standard: 'General maintenance exercises and trigger management', changed: 'Daily practice includes self-compassion check-in and inner critic dialogue. Maintenance plan builds "worthiness evidence" log. Added "shame resilience" protocol for when shame spirals activate.' }
                        ],
                        neglect: [
                          { mod: 'Module 1: IFS Foundations', standard: 'General parts introduction with broad examples of protectors and exiles', changed: 'Opens with needs identification exercise — "What do I need right now?" Parts identification focuses on withdrawal/numbing protectors and the "invisible child" exile. Added validation: "Your needs matter" framing.' },
                          { mod: 'Module 2: Inner Child Discovery', standard: 'Neutral wound exploration across all wound types equally', changed: 'Guided visualization seeks "the child who became invisible." Reflection prompts explore emotional unavailability, learning to not need anything, and disconnection from own desires. Includes needs inventory exercise.' },
                          { mod: 'Module 3: Protective Parts Mapping', standard: 'Generic protector identification using standard categories', changed: 'Protector map highlights self-reliance managers, dissociation firefighters, and emotional numbness parts. Added prompts: "Which part learned to stop asking?" and "Which part makes you invisible so you won\'t be a burden?"' },
                          { mod: 'Module 4: Healing & Unburdening', standard: 'Standard unburdening protocol with general reparenting', changed: 'Unburdening releases "My needs don\'t matter" burden. Reparenting visualization emphasizes attentive care: "I see you. I hear you. You matter." Added nurturing self-care ritual and needs-honoring practice.' },
                          { mod: 'Module 5: Integration & Daily Practice', standard: 'General maintenance exercises and trigger management', changed: 'Daily practice includes needs check-in and self-advocacy micro-exercise. Maintenance plan builds consistent self-care routine. Added "visibility practice" — asking for one thing you need each day.' }
                        ],
                        betrayal: [
                          { mod: 'Module 1: IFS Foundations', standard: 'General parts introduction with broad examples of protectors and exiles', changed: 'Opens with safety assessment and grounding. Parts identification focuses on hypervigilant controllers and suspicious managers. Added explicit safety protocols before any vulnerability work.' },
                          { mod: 'Module 2: Inner Child Discovery', standard: 'Neutral wound exploration across all wound types equally', changed: 'Guided visualization approaches "the child whose trust was shattered" with extra safety layers. Reflection prompts explore broken promises, violated boundaries, and "the other shoe dropping" beliefs. Includes trust inventory.' },
                          { mod: 'Module 3: Protective Parts Mapping', standard: 'Generic protector identification using standard categories', changed: 'Protector map centers on controller/hypervigilant managers and aggressive boundary-enforcement firefighters. Added prompts: "Which part scans for danger constantly?" and "Which part never lets your guard down?"' },
                          { mod: 'Module 4: Healing & Unburdening', standard: 'Standard unburdening protocol with general reparenting', changed: 'Unburdening releases "I can never trust anyone" burden. Reparenting visualization emphasizes reliable protection: "I will keep you safe. I will not betray you." Added gradual trust-rebuilding exercises with internal parts first.' },
                          { mod: 'Module 5: Integration & Daily Practice', standard: 'General maintenance exercises and trigger management', changed: 'Daily practice includes safety check-in and fear regulation exercise. Maintenance plan focuses on discernment skills — learning to assess trustworthiness. Added "trust thermometer" tracking for gradual re-engagement.' }
                        ],
                        helplessness: [
                          { mod: 'Module 1: IFS Foundations', standard: 'General parts introduction with broad examples of protectors and exiles', changed: 'Opens with small-choice empowerment exercise — "Choose one thing right now." Parts identification focuses on freeze/collapse protectors and the "trapped child" exile. Added framing: "You have more power than you know."' },
                          { mod: 'Module 2: Inner Child Discovery', standard: 'Neutral wound exploration across all wound types equally', changed: 'Guided visualization approaches "the child who learned nothing would change." Reflection prompts explore moments of powerlessness, giving up, and beliefs like "why bother trying." Includes agency inventory — times you did create change.' },
                          { mod: 'Module 3: Protective Parts Mapping', standard: 'Generic protector identification using standard categories', changed: 'Protector map centers on freeze/shutdown managers and collapse/give-up firefighters. Added prompts: "Which part stops you from even trying?" and "Which part believes the outcome is already decided?"' },
                          { mod: 'Module 4: Healing & Unburdening', standard: 'Standard unburdening protocol with general reparenting', changed: 'Unburdening releases "Nothing I do matters" burden. Reparenting visualization emphasizes empowerment: "You have choices now. Your voice matters." Added incremental agency exercises — celebrating small wins and successful decisions.' },
                          { mod: 'Module 5: Integration & Daily Practice', standard: 'General maintenance exercises and trigger management', changed: 'Daily practice includes "one empowered choice" exercise and agency affirmation. Maintenance plan builds confidence through progressively bigger decisions. Added "power log" — tracking moments you successfully influenced an outcome.' }
                        ]
                      };
                      const changes = woundChanges[wound] || woundChanges.abandonment;
                      return (
                        <div className={`${cardBg} rounded-2xl border ${glowStyles.emerald} p-5 mt-4`}>
                          <h4 className={`text-sm font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                            <BookOpen className="w-4 h-4 text-amber-500" />
                            Specific Curriculum Changes Applied
                          </h4>
                          <div className="space-y-4">
                            {changes.map((item, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5">
                                  {i + 1}
                                </div>
                                <div className="flex-1">
                                  <p className={`text-xs font-bold ${textPrimary}`}>{item.mod}</p>
                                  <div className={`mt-1.5 p-2.5 rounded-lg ${isDark ? 'bg-slate-600/40' : 'bg-gray-50'} border ${cardBorder}`}>
                                    <p className={`text-[10px] uppercase tracking-wider font-semibold ${textMuted} mb-1`}>Standard Version</p>
                                    <p className={`text-xs ${textMuted} leading-relaxed`}>{item.standard}</p>
                                  </div>
                                  <div className={`mt-1.5 p-2.5 rounded-lg ${isDark ? 'bg-emerald-900/20 border-emerald-800/30' : 'bg-emerald-50/70 border-emerald-100'} border`}>
                                    <p className={`text-[10px] uppercase tracking-wider font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mb-1`}>Personalized for {wound}</p>
                                    <p className={`text-xs ${isDark ? 'text-emerald-200' : 'text-emerald-700'} leading-relaxed`}>{item.changed}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {!assessment && !personalization && (
                      <div className="text-center py-6">
                        <Sparkles className={`w-8 h-8 mx-auto mb-2 ${textMuted}`} />
                        <p className={`text-sm ${textSecondary}`}>{client?.name} hasn't completed the wound assessment yet</p>
                        <p className={`text-xs ${textMuted} mt-1`}>Modules will be personalized after they complete the assessment</p>
                      </div>
                    )}
                  </div>
                )}

                {clientGam && (
                  <div className={`${cardBg} rounded-2xl border ${glowStyles.amber} p-5`}>
                    <h3 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2 tracking-tight`}>
                      <Trophy className="w-5 h-5 text-amber-500" />
                      Gamification Progress
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      {[
                        { label: 'Total XP', value: (clientGam.xp || 0).toLocaleString(), icon: Zap, color: 'text-amber-500' },
                        { label: 'Level', value: clientGam.level || 1, icon: Crown, color: 'text-purple-500' },
                        { label: 'Current Streak', value: `${clientGam.streak_current || 0}d`, icon: Flame, color: 'text-orange-500' },
                        { label: 'Best Streak', value: `${clientGam.streak_longest || 0}d`, icon: Star, color: 'text-yellow-500' }
                      ].map(stat => {
                        const SIcon = stat.icon;
                        return (
                          <div key={stat.label} className={`p-3 rounded-xl border ${cardBorder} ${isDark ? 'bg-slate-700/30' : 'bg-gradient-to-br from-amber-50/50 to-white'}`}>
                            <SIcon className={`w-5 h-5 ${stat.color} mb-1`} />
                            <p className={`text-lg font-extrabold ${textPrimary}`}>{stat.value}</p>
                            <p className={`text-xs ${textMuted}`}>{stat.label}</p>
                          </div>
                        );
                      })}
                    </div>
                    {clientGam.badges && typeof clientGam.badges === 'object' && Object.keys(clientGam.badges).length > 0 && (
                      <div>
                        <p className={`text-sm font-semibold ${textSecondary} mb-2 flex items-center gap-1.5`}>
                          <Award className="w-4 h-4 text-emerald-500" />
                          Badges
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(clientGam.badges).map(([key, badge]) => (
                            <div
                              key={key}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border ${
                                (badge?.unlocked || badge?.earned)
                                  ? (isDark ? 'bg-emerald-900/30 border-emerald-700 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700')
                                  : (isDark ? 'bg-slate-700/50 border-slate-600 text-slate-400' : 'bg-gray-100 border-gray-200 text-gray-400')
                              }`}
                            >
                              {(badge?.unlocked || badge?.earned) ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              {badge?.name || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              {badge?.progress !== undefined && !(badge?.unlocked || badge?.earned) && (
                                <span className="opacity-70">({badge.progress}/{badge.target || '?'})</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {(clientInsights.recentCheckins?.length > 0 || clientInsights.avgMood || clientInsights.avgSelfEnergy) && (
                  <div className={`${cardBg} rounded-2xl border ${glowStyles.amber} p-5`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-lg font-bold ${textPrimary} flex items-center gap-2 tracking-tight`}>
                        <Activity className="w-5 h-5 text-amber-500" />
                        Daily Check-Ins & Mood
                      </h3>
                      <button
                        onClick={() => navigate(`/mood-analytics`)}
                        className="text-xs text-amber-500 hover:text-amber-600 font-medium underline"
                      >
                        Full Analytics →
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {clientInsights.avgSelfEnergy && (
                        <div className={`rounded-xl p-3 text-center ${isDark ? 'bg-slate-700/50' : 'bg-amber-50'}`}>
                          <p className={`text-xl font-bold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>{clientInsights.avgSelfEnergy}<span className="text-sm font-normal">/10</span></p>
                          <p className={`text-xs mt-0.5 ${textMuted}`}>Avg Self-Energy</p>
                        </div>
                      )}
                      {clientInsights.avgMood && (
                        <div className={`rounded-xl p-3 text-center ${isDark ? 'bg-slate-700/50' : 'bg-rose-50'}`}>
                          <p className={`text-xl font-bold ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>{clientInsights.avgMood}<span className="text-sm font-normal">/5</span></p>
                          <p className={`text-xs mt-0.5 ${textMuted}`}>Avg Mood</p>
                        </div>
                      )}
                      {clientInsights.recentCheckins?.length > 0 && (
                        <div className={`rounded-xl p-3 text-center ${isDark ? 'bg-slate-700/50' : 'bg-emerald-50'}`}>
                          <p className={`text-xl font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{clientInsights.recentCheckins.length}</p>
                          <p className={`text-xs mt-0.5 ${textMuted}`}>Recent Check-Ins</p>
                        </div>
                      )}
                    </div>
                    {clientInsights.recentCheckins?.length > 0 && (
                      <div className="space-y-2">
                        {clientInsights.recentCheckins.slice(0, 5).map((c, i) => (
                          <div key={i} className={`flex items-center gap-3 py-2 border-b last:border-0 ${isDark ? 'border-slate-700' : 'border-gray-100'}`}>
                            <span className={`text-xs font-semibold ${textSecondary} w-24`}>{c.date}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-700'}`}>
                              Self: {c.selfEnergy || '—'}/10
                            </span>
                            {c.mood && <span className={`text-xs ${textMuted}`}>{['','Struggling','Low','Okay','Good','Great'][c.mood] || ''}</span>}
                            {(c.activeParts || []).length > 0 && (
                              <span className={`text-xs ${textMuted} truncate`}>{(c.activeParts || []).length} part{c.activeParts.length !== 1 ? 's' : ''} active</span>
                            )}
                            {c.intention && <span className={`text-xs italic ${textMuted} truncate flex-1`}>"{c.intention}"</span>}
                          </div>
                        ))}
                      </div>
                    )}
                    {(parseFloat(clientInsights.avgSelfEnergy) <= 3 || parseFloat(clientInsights.avgMood) <= 2) && (
                      <div className={`mt-3 p-3 rounded-xl ${isDark ? 'bg-amber-900/20 border border-amber-700/40' : 'bg-amber-50 border border-amber-200'}`}>
                        <p className={`text-xs font-semibold ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                          ⚠️ Low self-energy or mood detected — consider adjusting session focus or reaching out.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {clientInsights.journalEntries && clientInsights.journalEntries.length > 0 && (
                  <div className={`${cardBg} rounded-2xl border ${glowStyles.purple} p-5`}>
                    <h3 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2 tracking-tight`}>
                      <FileText className="w-5 h-5 text-purple-500" />
                      Journal Entries
                      <span className={`text-xs font-normal ${textMuted} ml-1`}>({clientInsights.journalEntries.length})</span>
                    </h3>
                    <div className="space-y-3">
                      {clientInsights.journalEntries.map((entry, i) => {
                        const isExpanded = expandedJournals[entry.id];
                        const content = entry.content || '';
                        const needsTruncate = content.length > 200;
                        return (
                          <div key={entry.id || i} className={`p-4 rounded-lg border ${cardBorder} ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className={`text-sm font-medium ${textPrimary}`}>{entry.title || 'Untitled Entry'}</p>
                                {entry.mood && (
                                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                    entry.mood === 'great' || entry.mood === 'happy' ? 'bg-emerald-100 text-emerald-700' :
                                    entry.mood === 'good' || entry.mood === 'calm' ? 'bg-blue-100 text-blue-700' :
                                    entry.mood === 'okay' || entry.mood === 'neutral' ? 'bg-amber-100 text-amber-700' :
                                    entry.mood === 'bad' || entry.mood === 'sad' ? 'bg-orange-100 text-orange-700' :
                                    entry.mood === 'terrible' || entry.mood === 'angry' ? 'bg-red-100 text-red-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>{entry.mood}</span>
                                )}
                              </div>
                              <span className={`text-xs ${textMuted} whitespace-nowrap`}>
                                {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : ''}
                              </span>
                            </div>
                            <p className={`text-sm ${textSecondary} leading-relaxed`}>
                              {isExpanded || !needsTruncate ? content : `${content.substring(0, 200)}...`}
                            </p>
                            {needsTruncate && (
                              <button
                                onClick={() => setExpandedJournals(prev => ({ ...prev, [entry.id]: !prev[entry.id] }))}
                                className={`text-xs font-medium mt-2 ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
                              >
                                {isExpanded ? 'Show less' : 'Read more'}
                              </button>
                            )}
                            {entry.tags && entry.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {entry.tags.map((tag, ti) => (
                                  <span key={ti} className={`text-[10px] px-1.5 py-0.5 rounded ${isDark ? 'bg-slate-600 text-slate-300' : 'bg-gray-200 text-gray-600'}`}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {clientInsights.moduleProgress && clientInsights.moduleProgress.length > 0 && (
                  <div className={`${cardBg} rounded-2xl border ${glowStyles.blue} p-5`}>
                    <h3 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2 tracking-tight`}>
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      Module Progress
                    </h3>
                    <div className="space-y-3">
                      {clientInsights.moduleProgress.map((prog, i) => {
                        const completedSteps = Array.isArray(prog.completed_steps) ? prog.completed_steps.length : (prog.completed_steps || 0);
                        const totalSteps = prog.total_steps || 0;
                        const currentStep = prog.current_step || 0;
                        const progressPct = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : (prog.completed ? 100 : 0);
                        return (
                          <div key={prog.id || i} className={`flex items-center gap-3 p-3 rounded-lg border ${cardBorder} ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                            {prog.completed ? (
                              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${textPrimary}`}>
                                {(prog.module_id || '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${prog.completed ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                    style={{ width: `${progressPct}%` }}
                                  />
                                </div>
                                <span className={`text-xs ${textMuted} whitespace-nowrap`}>
                                  {totalSteps > 0 ? `${completedSteps}/${totalSteps} steps` : (prog.completed ? 'Complete' : `Step ${currentStep}`)}
                                </span>
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${prog.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                              {prog.completed ? 'Done' : 'In Progress'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className={`${cardBg} rounded-2xl border ${glowStyles.blue} p-5`}>
                  <h3 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2 tracking-tight`}>
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Module Responses
                  </h3>
                  {!clientInsights.moduleResponses || Object.keys(clientInsights.moduleResponses).length === 0 ? (
                    <div className="text-center py-6">
                      <MessageSquare className={`w-8 h-8 mx-auto mb-2 ${textMuted}`} />
                      <p className={`text-sm ${textSecondary}`}>No module responses recorded yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(clientInsights.moduleResponses)
                        .sort((a, b) => {
                          const modA = curriculumModules.find(m => m.id === a[0]);
                          const modB = curriculumModules.find(m => m.id === b[0]);
                          return (modA?.order || 999) - (modB?.order || 999);
                        })
                        .map(([moduleId, responses]) => {
                          const moduleData = curriculumModules.find(m => m.id === moduleId);
                          const moduleName = moduleData?.title || getModuleName(moduleId) || moduleId;
                          const isExpanded = expandedResponseModules[moduleId];
                          const totalResponses = responses.reduce((sum, r) => sum + Object.keys(r.answers || {}).filter(k => {
                            const v = r.answers[k];
                            return typeof v === 'string' && v.trim().length > 0;
                          }).length, 0);
                          const completedModules = clientInsights.moduleProgress?.filter(p => p.completed && p.module_id === moduleId);
                          const isCompleted = completedModules && completedModules.length > 0;
                          const clientWound = clientInsights.assessment?.primary_wound || client?.primaryWound || 'abandonment';

                          return (
                            <div key={moduleId} className={`rounded-lg border ${cardBorder} overflow-hidden`}>
                              <button
                                onClick={() => setExpandedResponseModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }))}
                                className={`w-full flex items-center justify-between p-3 ${hoverBg} transition-colors`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                  <span className={`text-sm font-medium ${textPrimary} truncate`}>{moduleName}</span>
                                  {isCompleted && (
                                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0">Completed</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className={`text-xs ${textMuted}`}>{totalResponses} response{totalResponses !== 1 ? 's' : ''}</span>
                                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </div>
                              </button>
                              {isExpanded && (
                                <div className={`p-3 pt-0 space-y-3`}>
                                  {totalResponses === 0 ? (
                                    <p className={`text-sm ${textMuted} text-center py-3`}>No responses yet</p>
                                  ) : (
                                    responses.map((resp, ri) =>
                                      Object.entries(resp.answers || {})
                                        .filter(([, v]) => typeof v === 'string' && v.trim().length > 0)
                                        .map(([key, value], qi) => {
                                          const questionText = mapResponseKey(key, moduleData, clientWound);
                                          const badge = getResponseBadge(key);
                                          return (
                                            <div key={`${ri}-${qi}`} className={`p-3 rounded-lg border ${cardBorder} ${isDark ? 'bg-slate-700/30' : 'bg-gray-50'}`}>
                                              <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${badge.color}`}>{badge.label}</span>
                                              </div>
                                              <p className={`text-sm ${textMuted} mb-1.5`}>{questionText}</p>
                                              <p className={`text-sm ${textPrimary} leading-relaxed`}>"{value}"</p>
                                            </div>
                                          );
                                        })
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                {clientInsights.activityProgress.length > 0 && (
                  <div className={`${cardBg} rounded-2xl border ${glowStyles.emerald} p-5`}>
                    <h3 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2 tracking-tight`}>
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

                <div className={`${cardBg} rounded-2xl border ${glowStyles.amber} p-5`}>
                  <h3 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2 tracking-tight`}>
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Session Prep
                  </h3>
                  <p className={`text-sm ${textSecondary} mb-4`}>
                    Suggested talking points for your next session with {client?.name}:
                  </p>
                  <ul className="space-y-2.5">
                    {clientInsights.sessionPrep.map((point, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm ${textSecondary}`}>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${cardBg} rounded-2xl border ${glowStyles.emerald} p-5`}>
                  <h3 className={`text-lg font-bold ${textPrimary} mb-4 flex items-center gap-2 tracking-tight`}>
                    <FileText className="w-5 h-5 text-emerald-500" />
                    Advisor Feedback
                  </h3>
                  <p className={`text-sm ${textSecondary} mb-3`}>
                    Write your feedback or comments on {client?.name}'s responses:
                  </p>
                  <textarea
                    value={therapistFeedback[selectedInsightClient] || ''}
                    onChange={(e) => handleFeedbackChange(selectedInsightClient, e.target.value)}
                    rows={5}
                    placeholder={`Add your notes and feedback for ${client?.name}...`}
                    className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none resize-none`}
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

      {activeTab === 'co-therapy' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-rose-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${textPrimary}`}>Co-Therapy Sessions</h2>
              <p className={`text-sm ${textSecondary}`}>Guide therapy activities together with your client in real time</p>
            </div>
          </div>

          <div className={`${cardBg} rounded-xl border ${cardBorder} p-6 mb-6`}>
            <p className={`text-sm ${textSecondary} mb-4`}>
              Select a client and launch a guided therapy activity. You'll walk through each step together, with space for your clinical notes and observations at every stage.
            </p>
            <div className="mb-4">
              <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Select Client</label>
              <select
                className={`w-full sm:w-80 px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
                defaultValue=""
                id="co-therapy-client-select"
              >
                <option value="">Choose a client...</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <Link
              to="/co-therapy"
              onClick={(e) => {
                const select = document.getElementById('co-therapy-client-select');
                const clientId = select?.value;
                if (clientId) {
                  sessionStorage.setItem('co_therapy_client_id', clientId);
                  const client = clients.find(c => c.id === clientId);
                  if (client) sessionStorage.setItem('co_therapy_client_name', client.name);
                } else {
                  e.preventDefault();
                  alert('Please select a client first');
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-rose-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-rose-700 transition-all shadow-md"
            >
              <Play className="w-4 h-4" />
              Launch Co-Therapy Session
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Guided Parts Dialogue', desc: 'Advisor-led conversation with internal parts', duration: '20-30 min', category: 'in-session' },
              { title: 'Protector Negotiation', desc: 'Help protective parts feel safe for deeper work', duration: '25-35 min', category: 'in-session' },
              { title: 'Unburdening Ceremony', desc: 'Sacred step-by-step guide for burden release', duration: '30-45 min', category: 'in-session' },
              { title: 'Inner Child Rescue', desc: 'Find, comfort, and retrieve wounded exile parts', duration: '25-40 min', category: 'in-session' },
              { title: 'Parts Council Meeting', desc: 'Facilitate communication between multiple parts', duration: '30-45 min', category: 'in-session' },
              { title: 'Somatic Parts Work', desc: 'Use body sensations to discover and heal parts', duration: '20-30 min', category: 'in-session' },
              { title: 'Attachment Repair', desc: 'Reparent exile parts and repair attachment wounds', duration: '30-40 min', category: 'in-session' },
              { title: 'Self-Energy Cultivation', desc: 'Strengthen the compassionate core of Self', duration: '15-20 min', category: 'in-session' },
              { title: 'Trailhead Exploration', desc: 'Use real-life triggers to discover healing paths', duration: '20-30 min', category: 'in-session' }
            ].map((activity, i) => (
              <div key={i} className={`${cardBg} rounded-xl border ${cardBorder} p-4 transition-all hover:shadow-md`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-rose-600 flex items-center justify-center text-white flex-shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium ${textPrimary} text-sm`}>{activity.title}</h4>
                    <p className={`text-xs ${textMuted} mt-1`}>{activity.desc}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs ${textMuted} flex items-center gap-1`}>
                        <Clock className="w-3 h-3" />
                        {activity.duration}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{activity.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Gem className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${textPrimary}`}>Future Features Roadmap</h2>
              <p className={`text-sm ${textSecondary}`}>Upcoming enhancements planned for the IFS therapy platform</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Parts Relationship Mapping', desc: 'Interactive visual SVG map showing how a client\'s protectors, managers, firefighters, and exiles relate to each other — including alliances, conflicts, and polarizations between parts. Navigate to Parts Studio to use.', icon: Users, color: 'from-blue-500 to-cyan-600', status: 'Live' },
              { title: 'Guided Unburdening Protocol', desc: '8-step digital unburdening ceremony with guided prompts, visualization, and burden release tracking. Includes post-unburdening integration exercises. Available under Therapy Integration.', icon: Heart, color: 'from-rose-500 to-pink-600', status: 'Live' },
              { title: 'Assessment Builder', desc: 'Create custom assessments tailored to your practice — define questions, scoring, and wound mappings. Generate shareable client links. Available under Quick Actions.', icon: Target, color: 'from-sky-500 to-blue-600', status: 'Live' },
              { title: 'Parts Dialogue Voice Mode', desc: 'Voice-guided parts dialogue where clients speak to their parts using speech recognition, with AI facilitating the conversation and text-to-speech responses. Available under Parts Dialogue.', icon: MessageCircle, color: 'from-teal-500 to-emerald-600', status: 'Live' },
              { title: 'AI-Powered Session Summaries', desc: 'Automatically generate structured session summaries from advisor notes using AI, with key themes, parts identified, progress markers, and suggested homework — saving advisors 15+ minutes per session.', icon: Sparkles, color: 'from-purple-500 to-indigo-600', status: 'In Development' },
              { title: 'Mood & Parts Pattern Analytics', desc: 'Advanced analytics dashboard showing correlations between mood entries, active parts, triggers, and healing progress over time — with trend detection and early warning alerts.', icon: TrendingUp, color: 'from-emerald-500 to-teal-600', status: 'Live', link: '/mood-analytics' },
              { title: 'Client Self-Check-In Between Sessions', desc: 'Daily micro check-ins where clients rate their parts activity, Self-energy level, and emotional state — with automatic alerts to advisor if concerning patterns emerge.', icon: Activity, color: 'from-amber-500 to-yellow-600', status: 'Live', link: '/daily-checkin' },
              { title: 'Secure Video Session Integration', desc: 'Built-in HIPAA-compliant video sessions with real-time parts tracking sidebar, live session notes, and automatic recording transcription for review.', icon: Play, color: 'from-red-500 to-orange-600', status: 'Researching' },
              { title: 'Group Therapy Module', desc: 'Support for IFS-informed group therapy with shared exercises, group parts mapping, anonymous reflection sharing, and facilitator controls for managing group dynamics.', icon: Users, color: 'from-violet-500 to-purple-600', status: 'Researching' },
              { title: 'Multi-Advisor Practice Management', desc: 'Support for therapy practices with multiple advisors — shared client handoffs, supervisor oversight, cross-advisor analytics, billing integration, and team coordination tools.', icon: Crown, color: 'from-amber-600 to-orange-600', status: 'Planned' }
            ].map((feature, idx) => {
              const FIcon = feature.icon;
              const statusColors = {
                'Live': isDark ? 'bg-amber-900/40 text-amber-300 border-amber-700' : 'bg-amber-100 text-amber-700 border-amber-200',
                'In Development': isDark ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700' : 'bg-emerald-100 text-emerald-700 border-emerald-200',
                'Planned': isDark ? 'bg-blue-900/40 text-blue-300 border-blue-700' : 'bg-blue-100 text-blue-700 border-blue-200',
                'Researching': isDark ? 'bg-purple-900/40 text-purple-300 border-purple-700' : 'bg-purple-100 text-purple-700 border-purple-200'
              };
              return (
                <div key={idx} className={`${cardBg} rounded-xl border ${cardBorder} p-5 transition-all hover:border-amber-300/50`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <FIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className={`font-bold ${textPrimary}`}>{feature.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${statusColors[feature.status]}`}>
                          {feature.status}
                        </span>
                      </div>
                      <p className={`text-sm ${textSecondary} leading-relaxed`}>{feature.desc}</p>
                    </div>
                    <span className={`text-xs font-bold ${textMuted} flex-shrink-0`}>#{idx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistDashboard;
