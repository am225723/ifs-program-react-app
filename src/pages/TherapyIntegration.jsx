import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, FileText, CheckSquare, Clock, MessageSquare, Download, Trash2, Edit3, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function TherapyIntegration() {
  const { theme, getAnimationClass } = useTheme();
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('therapySessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [homework, setHomework] = useState(() => {
    const saved = localStorage.getItem('therapyHomework');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddSession, setShowAddSession] = useState(false);
  const [showAddHomework, setShowAddHomework] = useState(false);
  const [expandedSession, setExpandedSession] = useState(null);
  const [newSession, setNewSession] = useState({
    date: new Date().toISOString().split('T')[0],
    therapistNotes: '',
    myNotes: '',
    partsDiscussed: '',
    insights: '',
    nextSessionGoals: ''
  });
  const [newHomework, setNewHomework] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false
  });

  useEffect(() => {
    localStorage.setItem('therapySessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('therapyHomework', JSON.stringify(homework));
  }, [homework]);

  const addSession = () => {
    if (!newSession.date) return;
    const session = {
      id: Date.now(),
      ...newSession,
      createdAt: new Date().toISOString()
    };
    setSessions(prev => [session, ...prev]);
    setNewSession({
      date: new Date().toISOString().split('T')[0],
      therapistNotes: '',
      myNotes: '',
      partsDiscussed: '',
      insights: '',
      nextSessionGoals: ''
    });
    setShowAddSession(false);
  };

  const deleteSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const addHomework = () => {
    if (!newHomework.title) return;
    const hw = {
      id: Date.now(),
      ...newHomework,
      createdAt: new Date().toISOString()
    };
    setHomework(prev => [hw, ...prev]);
    setNewHomework({ title: '', description: '', dueDate: '', completed: false });
    setShowAddHomework(false);
  };

  const toggleHomework = (id) => {
    setHomework(prev => prev.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  const deleteHomework = (id) => {
    setHomework(prev => prev.filter(h => h.id !== id));
  };

  const exportSessionNotes = () => {
    const content = sessions.map(s => `
SESSION: ${new Date(s.date).toLocaleDateString()}
${'='.repeat(40)}

My Notes:
${s.myNotes || 'N/A'}

Parts Discussed:
${s.partsDiscussed || 'N/A'}

Key Insights:
${s.insights || 'N/A'}

Next Session Goals:
${s.nextSessionGoals || 'N/A'}

Therapist Notes:
${s.therapistNotes || 'N/A'}

`).join('\n---\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `therapy-sessions-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  const pendingHomework = homework.filter(h => !h.completed);
  const completedHomework = homework.filter(h => h.completed);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary} ${theme.isDark ? 'text-slate-100' : ''}`}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link 
          to="/" 
          className={`inline-flex items-center gap-2 ${theme.isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-6 ${getAnimationClass('transition')}`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${theme.isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Therapy Integration
            </h1>
            <p className={theme.isDark ? 'text-slate-300' : 'text-gray-600'}>
              Bridge your in-person therapy with your self-guided healing work.
            </p>
          </div>
          {sessions.length > 0 && (
            <button
              onClick={exportSessionNotes}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${theme.isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-700'} ${getAnimationClass('transition')}`}
            >
              <Download className="w-4 h-4" />
              Export Notes
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
                Session Notes
              </h2>
              <button
                onClick={() => setShowAddSession(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm ${getAnimationClass('transition')}`}
                style={{ backgroundColor: theme.accentColor }}
              >
                <Plus className="w-4 h-4" />
                Add Session
              </button>
            </div>

            {showAddSession && (
              <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-6 mb-4`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>New Session</h3>
                  <button onClick={() => setShowAddSession(false)} className="p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Session Date</label>
                    <input
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession(prev => ({ ...prev, date: e.target.value }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>My Notes</label>
                    <textarea
                      value={newSession.myNotes}
                      onChange={(e) => setNewSession(prev => ({ ...prev, myNotes: e.target.value }))}
                      rows={3}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="What came up for me in this session..."
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Parts Discussed</label>
                    <input
                      type="text"
                      value={newSession.partsDiscussed}
                      onChange={(e) => setNewSession(prev => ({ ...prev, partsDiscussed: e.target.value }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="e.g., Inner Critic, Wounded Child"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Key Insights</label>
                    <textarea
                      value={newSession.insights}
                      onChange={(e) => setNewSession(prev => ({ ...prev, insights: e.target.value }))}
                      rows={2}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="What did I learn or realize?"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Goals for Next Session</label>
                    <input
                      type="text"
                      value={newSession.nextSessionGoals}
                      onChange={(e) => setNewSession(prev => ({ ...prev, nextSessionGoals: e.target.value }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="What I want to explore next..."
                    />
                  </div>
                  <button
                    onClick={addSession}
                    className={`w-full py-2 rounded-lg text-white font-medium ${getAnimationClass('transition')}`}
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    Save Session
                  </button>
                </div>
              </div>
            )}

            {sessions.length === 0 ? (
              <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-8 text-center`}>
                <Calendar className={`w-12 h-12 mx-auto mb-3 ${theme.isDark ? 'text-slate-500' : 'text-gray-300'}`} />
                <p className={theme.isDark ? 'text-slate-400' : 'text-gray-500'}>
                  No sessions recorded yet. Add your first session after your next therapy appointment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map(session => (
                  <div 
                    key={session.id}
                    className={`${theme.cardBg} backdrop-blur-sm rounded-xl shadow-sm border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} overflow-hidden`}
                  >
                    <button
                      onClick={() => setExpandedSession(expandedSession === session.id ? null : session.id)}
                      className={`w-full p-4 flex items-center justify-between ${getAnimationClass('transition')}`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: theme.accentColor + '20' }}
                        >
                          <Calendar className="w-5 h-5" style={{ color: theme.accentColor }} />
                        </div>
                        <div className="text-left">
                          <p className={`font-medium ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
                            {new Date(session.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </p>
                          {session.partsDiscussed && (
                            <p className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                              Parts: {session.partsDiscussed}
                            </p>
                          )}
                        </div>
                      </div>
                      {expandedSession === session.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    {expandedSession === session.id && (
                      <div className={`px-4 pb-4 border-t ${theme.isDark ? 'border-slate-700' : 'border-gray-100'}`}>
                        <div className="pt-4 space-y-4">
                          {session.myNotes && (
                            <div>
                              <h4 className={`text-sm font-medium ${theme.isDark ? 'text-slate-300' : 'text-gray-600'} mb-1`}>My Notes</h4>
                              <p className={`text-sm ${theme.isDark ? 'text-slate-200' : 'text-gray-700'}`}>{session.myNotes}</p>
                            </div>
                          )}
                          {session.insights && (
                            <div>
                              <h4 className={`text-sm font-medium ${theme.isDark ? 'text-slate-300' : 'text-gray-600'} mb-1`}>Key Insights</h4>
                              <p className={`text-sm ${theme.isDark ? 'text-slate-200' : 'text-gray-700'}`}>{session.insights}</p>
                            </div>
                          )}
                          {session.nextSessionGoals && (
                            <div>
                              <h4 className={`text-sm font-medium ${theme.isDark ? 'text-slate-300' : 'text-gray-600'} mb-1`}>Next Session Goals</h4>
                              <p className={`text-sm ${theme.isDark ? 'text-slate-200' : 'text-gray-700'}`}>{session.nextSessionGoals}</p>
                            </div>
                          )}
                          <button
                            onClick={() => deleteSession(session.id)}
                            className="text-sm text-red-500 hover:text-red-600"
                          >
                            Delete Session
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
                Homework & Tasks
              </h2>
              <button
                onClick={() => setShowAddHomework(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm ${getAnimationClass('transition')}`}
                style={{ backgroundColor: theme.accentColor }}
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>

            {showAddHomework && (
              <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-6 mb-4`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>New Homework</h3>
                  <button onClick={() => setShowAddHomework(false)} className="p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Task Title</label>
                    <input
                      type="text"
                      value={newHomework.title}
                      onChange={(e) => setNewHomework(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="e.g., Journal about inner critic"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Description</label>
                    <textarea
                      value={newHomework.description}
                      onChange={(e) => setNewHomework(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="Details about the assignment..."
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Due Date (optional)</label>
                    <input
                      type="date"
                      value={newHomework.dueDate}
                      onChange={(e) => setNewHomework(prev => ({ ...prev, dueDate: e.target.value }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                    />
                  </div>
                  <button
                    onClick={addHomework}
                    className={`w-full py-2 rounded-lg text-white font-medium ${getAnimationClass('transition')}`}
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    Add Homework
                  </button>
                </div>
              </div>
            )}

            {pendingHomework.length > 0 && (
              <div className="mb-6">
                <h3 className={`text-sm font-medium ${theme.isDark ? 'text-slate-400' : 'text-gray-500'} mb-3`}>Pending</h3>
                <div className="space-y-2">
                  {pendingHomework.map(hw => (
                    <div 
                      key={hw.id}
                      className={`${theme.cardBg} backdrop-blur-sm rounded-xl shadow-sm border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-4 flex items-start gap-3`}
                    >
                      <button
                        onClick={() => toggleHomework(hw.id)}
                        className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 ${theme.isDark ? 'border-slate-500' : 'border-gray-300'}`}
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>{hw.title}</p>
                        {hw.description && (
                          <p className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'} mt-1`}>{hw.description}</p>
                        )}
                        {hw.dueDate && (
                          <p className={`text-xs ${theme.isDark ? 'text-slate-500' : 'text-gray-400'} mt-2 flex items-center gap-1`}>
                            <Clock className="w-3 h-3" />
                            Due: {new Date(hw.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteHomework(hw.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {completedHomework.length > 0 && (
              <div>
                <h3 className={`text-sm font-medium ${theme.isDark ? 'text-slate-400' : 'text-gray-500'} mb-3`}>Completed</h3>
                <div className="space-y-2">
                  {completedHomework.map(hw => (
                    <div 
                      key={hw.id}
                      className={`${theme.cardBg} backdrop-blur-sm rounded-xl shadow-sm border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-4 flex items-start gap-3 opacity-60`}
                    >
                      <button
                        onClick={() => toggleHomework(hw.id)}
                        className="mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-white"
                        style={{ backgroundColor: theme.accentColor }}
                      >
                        <CheckSquare className="w-4 h-4" />
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium line-through ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>{hw.title}</p>
                      </div>
                      <button
                        onClick={() => deleteHomework(hw.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {homework.length === 0 && !showAddHomework && (
              <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-8 text-center`}>
                <CheckSquare className={`w-12 h-12 mx-auto mb-3 ${theme.isDark ? 'text-slate-500' : 'text-gray-300'}`} />
                <p className={theme.isDark ? 'text-slate-400' : 'text-gray-500'}>
                  No homework assigned yet. Add tasks from your therapy sessions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
