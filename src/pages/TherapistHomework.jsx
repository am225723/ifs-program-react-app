import { useState, useEffect, useCallback } from 'react';
import {
  ClipboardList, Plus, Search, CheckCircle, Clock, AlertTriangle,
  Calendar, User, ChevronDown, ChevronUp, X, RefreshCw, BookOpen,
  Flag, Edit3, Trash2, MessageSquare
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';
import { clientAuth } from '../lib/supabasePersonalization';

const categories = [
  { value: 'general', label: 'General', color: 'bg-gray-100 text-gray-700' },
  { value: 'journaling', label: 'Journaling', color: 'bg-blue-100 text-blue-700' },
  { value: 'parts-work', label: 'Parts Work', color: 'bg-purple-100 text-purple-700' },
  { value: 'meditation', label: 'Meditation', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'exercise', label: 'Exercise', color: 'bg-amber-100 text-amber-700' },
  { value: 'reading', label: 'Reading', color: 'bg-rose-100 text-rose-700' },
  { value: 'self-care', label: 'Self-Care', color: 'bg-teal-100 text-teal-700' },
];

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'text-green-600', bg: 'bg-green-100' },
  { value: 'normal', label: 'Normal', color: 'text-blue-600', bg: 'bg-blue-100' },
  { value: 'high', label: 'High', color: 'text-red-600', bg: 'bg-red-100' },
];

const TherapistHomework = () => {
  const { theme } = useTheme();
  const isDark = theme.isDark;
  const therapist = clientAuth.getCurrentClient();
  const [clients, setClients] = useState([]);
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterClient, setFilterClient] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState({});
  const [form, setForm] = useState({
    clientId: '', title: '', description: '', category: 'general',
    priority: 'normal', dueDate: ''
  });

  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-slate-300' : 'text-gray-600';
  const textMuted = isDark ? 'text-slate-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-slate-800/60' : 'bg-white';
  const cardBorder = isDark ? 'border-slate-700/50' : 'border-gray-200';
  const inputBg = isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900';

  const loadData = useCallback(async () => {
    if (!therapist?.id) return;
    setLoading(true);
    const [clientRes, hwRes] = await Promise.all([
      supabase.from('ifs_clients').select('id, name, user_role').eq('user_role', 'client').order('name'),
      supabase.from('ifs_therapy_homework').select('*').eq('therapist_id', therapist.id).order('created_at', { ascending: false })
    ]);
    if (clientRes.error) console.error('Error loading clients:', clientRes.error);
    if (hwRes.error) console.error('Error loading homework:', hwRes.error);
    if (clientRes.data) setClients(clientRes.data);
    if (hwRes.data) setHomework(hwRes.data);
    setLoading(false);
  }, [therapist?.id]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSubmit = async () => {
    if (!form.clientId || !form.title.trim()) return;
    const payload = {
      client_id: form.clientId,
      therapist_id: therapist?.id,
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category,
      priority: form.priority,
      due_date: form.dueDate || null,
      status: 'assigned',
      completed: false,
    };

    if (editingId) {
      payload.updated_at = new Date().toISOString();
      await supabase.from('ifs_therapy_homework').update(payload).eq('id', editingId);
    } else {
      await supabase.from('ifs_therapy_homework').insert(payload);
    }

    resetForm();
    await loadData();
  };

  const handleDelete = async (id) => {
    await supabase.from('ifs_therapy_homework').delete().eq('id', id);
    await loadData();
  };

  const handleEdit = (item) => {
    setForm({
      clientId: item.client_id,
      title: item.title,
      description: item.description || '',
      category: item.category || 'general',
      priority: item.priority || 'normal',
      dueDate: item.due_date || ''
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ clientId: '', title: '', description: '', category: 'general', priority: 'normal', dueDate: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const getClientName = (id) => clients.find(c => c.id === id)?.name || 'Unknown';

  const getStatusInfo = (item) => {
    if (item.completed || item.status === 'completed') {
      return { label: 'Completed', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' };
    }
    if (item.due_date && new Date(item.due_date) < new Date()) {
      return { label: 'Overdue', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' };
    }
    return { label: 'Assigned', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' };
  };

  const filtered = homework.filter(h => {
    if (filterClient !== 'all' && h.client_id !== filterClient) return false;
    if (filterStatus === 'completed' && !h.completed) return false;
    if (filterStatus === 'assigned' && h.completed) return false;
    if (filterStatus === 'overdue' && (h.completed || !h.due_date || new Date(h.due_date) >= new Date())) return false;
    if (searchQuery && !h.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: homework.length,
    completed: homework.filter(h => h.completed).length,
    overdue: homework.filter(h => !h.completed && h.due_date && new Date(h.due_date) < new Date()).length,
    assigned: homework.filter(h => !h.completed).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${textPrimary}`}>Homework Assignments</h1>
            <p className={`text-sm ${textMuted}`}>Create and track client homework</p>
          </div>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-sm font-medium hover:from-amber-600 hover:to-amber-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Assign Homework
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'from-blue-500 to-blue-600' },
          { label: 'Assigned', value: stats.assigned, color: 'from-amber-500 to-amber-600' },
          { label: 'Completed', value: stats.completed, color: 'from-emerald-500 to-emerald-600' },
          { label: 'Overdue', value: stats.overdue, color: 'from-red-500 to-red-600' },
        ].map(s => (
          <div key={s.label} className={`${cardBg} rounded-xl border ${cardBorder} p-4`}>
            <p className={`text-xs font-medium ${textMuted} mb-1`}>{s.label}</p>
            <p className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className={`${cardBg} rounded-2xl border ${cardBorder} p-6 mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${textPrimary}`}>
              {editingId ? 'Edit Assignment' : 'New Homework Assignment'}
            </h2>
            <button onClick={resetForm} className={`p-1 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Client *</label>
              <select
                value={form.clientId}
                onChange={e => setForm(prev => ({ ...prev, clientId: e.target.value }))}
                className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
              >
                <option value="">Select a client...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Journal about protective parts"
                className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
              />
            </div>
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed instructions for the client..."
                rows={3}
                className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none resize-none`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Category</label>
              <select
                value={form.category}
                onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
              >
                {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Priority</label>
              <div className="flex gap-2">
                {priorityOptions.map(p => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, priority: p.value }))}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                      form.priority === p.value
                        ? `${p.bg} ${p.color} border-current`
                        : `${cardBorder} border-transparent ${textMuted}`
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium ${textSecondary} mb-1.5`}>Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={e => setForm(prev => ({ ...prev, dueDate: e.target.value }))}
                className={`w-full px-3 py-2.5 rounded-lg border ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5">
            <button onClick={resetForm} className={`px-4 py-2.5 rounded-lg text-sm font-medium border ${cardBorder} ${textSecondary}`}>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!form.clientId || !form.title.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50"
            >
              {editingId ? 'Update Assignment' : 'Assign Homework'}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textMuted}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search assignments..."
            className={`w-full pl-9 pr-3 py-2 rounded-lg border text-sm ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
          />
        </div>
        <select
          value={filterClient}
          onChange={e => setFilterClient(e.target.value)}
          className={`px-3 py-2 rounded-lg border text-sm ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
        >
          <option value="all">All Clients</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className={`px-3 py-2 rounded-lg border text-sm ${inputBg} focus:ring-2 focus:ring-amber-500 outline-none`}
        >
          <option value="all">All Status</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className={`${cardBg} rounded-2xl border ${cardBorder} p-12 text-center`}>
            <ClipboardList className={`w-12 h-12 mx-auto mb-3 ${textMuted} opacity-30`} />
            <p className={`text-sm font-medium ${textSecondary}`}>No homework assignments found</p>
            <p className={`text-xs ${textMuted} mt-1`}>Click "Assign Homework" to create one</p>
          </div>
        ) : (
          filtered.map(item => {
            const statusInfo = getStatusInfo(item);
            const StatusIcon = statusInfo.icon;
            const catInfo = categories.find(c => c.value === item.category) || categories[0];
            const isExpanded = expandedItems[item.id];

            return (
              <div key={item.id} className={`${cardBg} rounded-xl border ${cardBorder} overflow-hidden`}>
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer"
                  onClick={() => setExpandedItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                >
                  <StatusIcon className={`w-5 h-5 flex-shrink-0 ${statusInfo.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-semibold ${textPrimary} ${item.completed ? 'line-through opacity-60' : ''}`}>
                        {item.title}
                      </p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${catInfo.color}`}>{catInfo.label}</span>
                      {item.priority === 'high' && (
                        <Flag className="w-3.5 h-3.5 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-xs ${textMuted} flex items-center gap-1`}>
                        <User className="w-3 h-3" /> {getClientName(item.client_id)}
                      </span>
                      {item.due_date && (
                        <span className={`text-xs ${textMuted} flex items-center gap-1`}>
                          <Calendar className="w-3 h-3" /> {new Date(item.due_date).toLocaleDateString()}
                        </span>
                      )}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={e => { e.stopPropagation(); handleEdit(item); }}
                      className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
                    >
                      <Edit3 className={`w-4 h-4 ${textMuted}`} />
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(item.id); }}
                      className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-50'}`}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                    {isExpanded ? <ChevronUp className={`w-4 h-4 ${textMuted}`} /> : <ChevronDown className={`w-4 h-4 ${textMuted}`} />}
                  </div>
                </div>
                {isExpanded && (
                  <div className={`px-4 pb-4 pt-0 border-t ${cardBorder}`}>
                    {item.description && (
                      <div className="mt-3">
                        <p className={`text-xs font-semibold ${textMuted} uppercase tracking-wider mb-1`}>Instructions</p>
                        <p className={`text-sm ${textSecondary} leading-relaxed whitespace-pre-wrap`}>{item.description}</p>
                      </div>
                    )}
                    {item.completion_notes && (
                      <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-emerald-900/20 border border-emerald-800/30' : 'bg-emerald-50 border border-emerald-200'}`}>
                        <p className={`text-xs font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'} mb-1 flex items-center gap-1`}>
                          <MessageSquare className="w-3 h-3" /> Client's Response
                        </p>
                        <p className={`text-sm ${isDark ? 'text-emerald-200' : 'text-emerald-700'} leading-relaxed`}>{item.completion_notes}</p>
                      </div>
                    )}
                    {item.completed_at && (
                      <p className={`text-xs ${textMuted} mt-2`}>
                        Completed: {new Date(item.completed_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                    <p className={`text-xs ${textMuted} mt-1`}>
                      Assigned: {new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TherapistHomework;
