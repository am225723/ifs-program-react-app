import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, User, TrendingUp, Calendar, FileText, MessageSquare, 
  Clock, CheckCircle, AlertTriangle, Activity, Heart, Shield,
  ChevronRight, Search, Filter, Plus, Eye, BarChart3, Sparkles
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
          { id: 'actions', label: 'Quick Actions', icon: Sparkles }
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
    </div>
  );
};

export default TherapistDashboard;
