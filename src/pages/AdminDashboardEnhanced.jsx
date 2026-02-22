import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  BarChart3,
  Calendar,
  Mail,
  Phone,
  Key,
  ArrowLeft,
  Loader2,
  X,
  Save,
  ToggleLeft,
  ToggleRight,
  BookOpen,
  Heart,
  Dumbbell,
  ClipboardList,
  Activity,
  Layers,
  FileText
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { clientAuth, assessmentManager, progressTracker } from '../lib/supabasePersonalization';

const getWoundColor = (wound) => {
  const colors = {
    abandonment: 'bg-blue-100 text-blue-700',
    shame: 'bg-gray-100 text-gray-700',
    neglect: 'bg-amber-100 text-amber-700',
    betrayal: 'bg-red-100 text-red-700'
  };
  return colors[wound] || 'bg-gray-100 text-gray-700';
};

const AdminDashboardEnhanced = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [analyticsClient, setAnalyticsClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('clients');
  const [therapyData, setTherapyData] = useState([]);
  const [therapyLoading, setTherapyLoading] = useState(false);
  const [stats, setStats] = useState({
    totalClients: 0,
    activeClients: 0,
    completedModules: 0,
    avgProgress: 0
  });

  useEffect(() => {
    loadClients();
    loadStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'therapy') {
      loadTherapyData();
    }
  }, [activeTab]);

  const loadClients = async () => {
    setLoading(true);
    try {
      const { data: clientsData, error } = await supabase
        .from('ifs_clients')
        .select('*')
        .eq('user_role', 'client')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const enrichedClients = await Promise.all(
        (clientsData || []).map(async (client) => {
          const { data: assessment } = await supabase
            .from('ifs_assessment_results')
            .select('primary_wound')
            .eq('client_id', client.id)
            .order('assessment_date', { ascending: false })
            .limit(1)
            .maybeSingle();

          const { count: completedCount } = await supabase
            .from('ifs_client_progress')
            .select('*', { count: 'exact', head: true })
            .eq('client_id', client.id)
            .eq('completed', true);

          return {
            id: client.id,
            name: client.name,
            email: client.email || '',
            pin: client.pin,
            status: client.status,
            primaryWound: assessment?.primary_wound || 'not assessed',
            progress: completedCount ? Math.min(Math.round((completedCount / 30) * 100), 100) : 0,
            lastActive: client.last_active ? new Date(client.last_active).toLocaleDateString() : 'Never',
            modulesCompleted: completedCount || 0,
            totalModules: 6,
            created_at: client.created_at
          };
        })
      );

      setClients(enrichedClients);
    } catch (error) {
      console.error('Error loading clients:', error);
      setClients([]);
    }
    setLoading(false);
  };

  const loadStats = async () => {
    try {
      const { count: totalCount } = await supabase
        .from('ifs_clients')
        .select('*', { count: 'exact', head: true })
        .eq('user_role', 'client');

      const { count: activeCount } = await supabase
        .from('ifs_clients')
        .select('*', { count: 'exact', head: true })
        .eq('user_role', 'client')
        .eq('status', 'active');

      const { count: modulesCount } = await supabase
        .from('ifs_client_progress')
        .select('*', { count: 'exact', head: true })
        .eq('completed', true);

      const TOTAL_MODULES = 12;
      const avgProg = totalCount > 0 ? Math.round(((modulesCount || 0) / (totalCount * TOTAL_MODULES)) * 100) : 0;
      setStats({
        totalClients: totalCount || 0,
        activeClients: activeCount || 0,
        completedModules: modulesCount || 0,
        avgProgress: Math.min(avgProg, 100)
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadTherapyData = async () => {
    setTherapyLoading(true);
    try {
      const { data, error } = await supabase
        .from('ifs_therapy_activity_progress')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const clientIds = [...new Set((data || []).map(d => d.client_id))];
      let clientMap = {};
      if (clientIds.length > 0) {
        const { data: clientsInfo } = await supabase
          .from('ifs_clients')
          .select('id, name')
          .in('id', clientIds);
        (clientsInfo || []).forEach(c => { clientMap[c.id] = c.name; });
      }

      const enriched = (data || []).map(item => ({
        ...item,
        client_name: clientMap[item.client_id] || 'Unknown'
      }));

      setTherapyData(enriched);
    } catch (error) {
      console.error('Error loading therapy data:', error);
      setTherapyData([]);
    }
    setTherapyLoading(false);
  };

  const handleCreateClient = async (clientData) => {
    const result = await clientAuth.createClient(clientData);
    if (result.success) {
      alert(`Client created successfully!\n\nPIN: ${result.pin}\n\nPlease provide this PIN to the client. It will not be shown again.`);
      await loadClients();
      await loadStats();
      setShowCreateModal(false);
    } else {
      alert(`Error creating client: ${result.error}`);
    }
  };

  const handleToggleStatus = async (client) => {
    const newStatus = client.status === 'active' ? 'inactive' : 'active';
    try {
      const { error } = await supabase
        .from('ifs_clients')
        .update({ status: newStatus })
        .eq('id', client.id);

      if (error) throw error;
      await loadClients();
      await loadStats();
    } catch (error) {
      console.error('Error toggling client status:', error);
      alert('Failed to update client status.');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'PIN', 'Status', 'Primary Wound', 'Progress %', 'Modules Completed', 'Last Active', 'Created'];
    const rows = filteredClients.map(c => [
      c.name,
      c.email,
      c.pin,
      c.status,
      c.primaryWound,
      c.progress,
      c.modulesCompleted,
      c.lastActive,
      c.created_at ? new Date(c.created_at).toLocaleDateString() : ''
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clients_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="inline-flex items-center text-sm text-amber-600 hover:text-amber-800 mb-2">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage clients and monitor progress</p>
              <Link to="/therapist-dashboard" className="inline-flex items-center text-sm text-amber-600 hover:text-indigo-800 mt-1 font-medium">
                <BookOpen className="w-4 h-4 mr-1" />
                Go to Therapist Dashboard (Lesson Plans & Client Insights)
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Export CSV
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Client
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalClients}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Clients</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeClients}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Modules Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedModules}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.avgProgress}%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'clients'
                ? 'bg-gradient-to-r from-amber-600 to-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Clients
          </button>
          <button
            onClick={() => setActiveTab('therapy')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'therapy'
                ? 'bg-gradient-to-r from-amber-600 to-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Therapy Integration
          </button>
        </div>

        {activeTab === 'clients' && (
          <>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search clients by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => { loadClients(); loadStats(); }}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    title="Refresh"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Primary Wound
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-3" />
                            <span className="text-gray-500">Loading clients...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredClients.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <Users className="w-8 h-8 text-gray-400 mb-3" />
                            <span className="text-gray-500">No clients found</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredClients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-gray-900">{client.name}</div>
                            <div className="text-sm text-gray-600">{client.email}</div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center">
                              <Key className="w-3 h-3 mr-1" />
                              PIN: {client.pin}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getWoundColor(client.primaryWound)}`}>
                            {client.primaryWound}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">{client.progress}%</span>
                              <span className="text-xs text-gray-500">
                                {client.modulesCompleted}/{client.totalModules} modules
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-amber-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${client.progress}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {client.lastActive}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            client.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedClient(client)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingClient(client)}
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                              title="Edit Client"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setAnalyticsClient(client)}
                              className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="View Analytics"
                            >
                              <BarChart3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleToggleStatus(client)}
                              className={`p-2 rounded-lg transition-colors ${
                                client.status === 'active'
                                  ? 'text-orange-600 hover:bg-orange-50'
                                  : 'text-green-600 hover:bg-green-50'
                              }`}
                              title={client.status === 'active' ? 'Deactivate' : 'Activate'}
                            >
                              {client.status === 'active' ? (
                                <ToggleRight className="w-4 h-4" />
                              ) : (
                                <ToggleLeft className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'therapy' && (
          <TherapyIntegrationTab data={therapyData} loading={therapyLoading} onRefresh={loadTherapyData} />
        )}
      </div>

      {showCreateModal && (
        <CreateClientModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateClient}
        />
      )}

      {selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onViewReport={() => { setSelectedClient(null); navigate('/therapist-reports'); }}
          onSendMessage={() => { setSelectedClient(null); navigate('/therapist-messages'); }}
        />
      )}

      {editingClient && (
        <EditClientModal
          client={editingClient}
          onClose={() => setEditingClient(null)}
          onSave={async () => {
            setEditingClient(null);
            await loadClients();
            await loadStats();
          }}
        />
      )}

      {analyticsClient && (
        <ClientAnalyticsModal
          client={analyticsClient}
          onClose={() => setAnalyticsClient(null)}
        />
      )}
    </div>
  );
};

const TherapyIntegrationTab = ({ data, loading, onRefresh }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto mb-3" />
        <span className="text-gray-500">Loading therapy activity data...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Therapy Activity Completions</h3>
          <p className="text-sm text-gray-500">Track which activities clients have completed across all therapy modules</p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
      {data.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <Activity className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <span className="text-gray-500">No therapy activity data found</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Activity ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.client_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.activity_id}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const EditClientModal = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: client.name || '',
    email: client.email || '',
    status: client.status || 'active'
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from('ifs_clients')
        .update({
          name: formData.name,
          email: formData.email,
          status: formData.status
        })
        .eq('id', client.id);

      if (error) throw error;
      onSave();
    } catch (error) {
      console.error('Error updating client:', error);
      alert('Failed to update client: ' + error.message);
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Client</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ClientAnalyticsModal = ({ client, onClose }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [client.id]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const [journalRes, moodRes, exerciseRes, assessmentRes, therapyRes, progressRes] = await Promise.all([
        supabase.from('ifs_journal_entries').select('*').eq('client_id', client.id).order('created_at', { ascending: false }).limit(5),
        supabase.from('ifs_mood_entries').select('*').eq('client_id', client.id).order('date', { ascending: false }).limit(10),
        supabase.from('ifs_exercise_progress').select('*').eq('client_id', client.id),
        supabase.from('ifs_assessment_results').select('*').eq('client_id', client.id).order('assessment_date', { ascending: false }),
        supabase.from('ifs_therapy_activity_progress').select('*').eq('client_id', client.id),
        supabase.from('ifs_client_progress').select('*').eq('client_id', client.id)
      ]);

      const { count: journalTotal } = await supabase
        .from('ifs_journal_entries')
        .select('*', { count: 'exact', head: true })
        .eq('client_id', client.id);

      const moduleMap = {};
      (progressRes.data || []).forEach(p => {
        const mid = p.module_id || 'unknown';
        if (!moduleMap[mid]) moduleMap[mid] = { total: 0, completed: 0 };
        moduleMap[mid].total++;
        if (p.completed) moduleMap[mid].completed++;
      });

      setAnalytics({
        journalCount: journalTotal || 0,
        recentJournals: journalRes.data || [],
        moodEntries: moodRes.data || [],
        exercises: exerciseRes.data || [],
        assessments: assessmentRes.data || [],
        therapyActivities: therapyRes.data || [],
        moduleProgress: moduleMap
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Client Analytics</h2>
            <p className="text-sm text-gray-500">{client.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-3" />
              <span className="text-gray-500">Loading analytics...</span>
            </div>
          ) : analytics ? (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <BookOpen className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-amber-700">{analytics.journalCount}</div>
                  <div className="text-xs text-amber-600">Journal Entries</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <Heart className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-emerald-700">{analytics.moodEntries.length}</div>
                  <div className="text-xs text-emerald-600">Mood Entries</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <Dumbbell className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{analytics.exercises.filter(e => e.completed).length}/{analytics.exercises.length}</div>
                  <div className="text-xs text-blue-600">Exercises Done</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">{analytics.therapyActivities.filter(a => a.completed).length}/{analytics.therapyActivities.length}</div>
                  <div className="text-xs text-green-600">Therapy Activities</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <ClipboardList className="w-5 h-5 mr-2 text-amber-600" />
                  Assessment Results ({analytics.assessments.length})
                </h4>
                {analytics.assessments.length === 0 ? (
                  <p className="text-gray-500 text-sm">No assessments taken yet.</p>
                ) : (
                  <div className="space-y-3">
                    {analytics.assessments.map((a, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getWoundColor(a.primary_wound)}`}>
                            Primary: {a.primary_wound}
                          </span>
                          <span className="text-xs text-gray-500">
                            {a.assessment_date ? new Date(a.assessment_date).toLocaleDateString() : '—'}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div><span className="text-gray-500">Abandonment:</span> <span className="font-medium">{a.abandonment_score ?? '—'}</span></div>
                          <div><span className="text-gray-500">Shame:</span> <span className="font-medium">{a.shame_score ?? '—'}</span></div>
                          <div><span className="text-gray-500">Neglect:</span> <span className="font-medium">{a.neglect_score ?? '—'}</span></div>
                          <div><span className="text-gray-500">Betrayal:</span> <span className="font-medium">{a.betrayal_score ?? '—'}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-amber-600" />
                  Recent Journal Entries
                </h4>
                {analytics.recentJournals.length === 0 ? (
                  <p className="text-gray-500 text-sm">No journal entries yet.</p>
                ) : (
                  <div className="space-y-3">
                    {analytics.recentJournals.map((j, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 text-sm">{j.title || 'Untitled'}</span>
                          <span className="text-xs text-gray-500">
                            {j.created_at ? new Date(j.created_at).toLocaleDateString() : '—'}
                          </span>
                        </div>
                        {j.mood && <span className="text-xs text-amber-600">Mood: {j.mood}</span>}
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{j.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-emerald-600" />
                  Mood Summary
                </h4>
                {analytics.moodEntries.length === 0 ? (
                  <p className="text-gray-500 text-sm">No mood entries yet.</p>
                ) : (
                  <div className="space-y-2">
                    {analytics.moodEntries.map((m, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{m.mood <= 2 ? '😔' : m.mood <= 4 ? '😐' : m.mood <= 6 ? '🙂' : m.mood <= 8 ? '😊' : '😄'}</span>
                          <span className="text-sm font-medium text-gray-700">Mood: {m.mood}/10</span>
                          {m.energy !== null && m.energy !== undefined && (
                            <span className="text-xs text-gray-500">Energy: {m.energy}/10</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {m.date ? new Date(m.date).toLocaleDateString() : '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Dumbbell className="w-5 h-5 mr-2 text-blue-600" />
                  Exercise Progress
                </h4>
                {analytics.exercises.length === 0 ? (
                  <p className="text-gray-500 text-sm">No exercise progress yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {analytics.exercises.map((ex, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                        <span className="text-sm text-gray-700">{ex.exercise_id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ex.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {ex.completed ? 'Done' : 'In Progress'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-amber-600" />
                  Module Progress Breakdown
                </h4>
                {Object.keys(analytics.moduleProgress).length === 0 ? (
                  <p className="text-gray-500 text-sm">No module progress yet.</p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(analytics.moduleProgress).map(([moduleId, data]) => (
                      <div key={moduleId}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{moduleId}</span>
                          <span className="text-xs text-gray-500">{data.completed}/{data.total} activities</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-amber-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-600" />
                  Therapy Activity Completions
                </h4>
                {analytics.therapyActivities.length === 0 ? (
                  <p className="text-gray-500 text-sm">No therapy activities yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {analytics.therapyActivities.map((ta, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                        <span className="text-sm text-gray-700">{ta.activity_id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ta.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {ta.completed ? 'Done' : 'In Progress'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">Failed to load analytics data.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const CreateClientModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New Client</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="555-0123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Initial consultation notes..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-emerald-700 transition-all duration-300"
            >
              Create Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ClientDetailsModal = ({ client, onClose, onViewReport, onSendMessage }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Client Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-r from-amber-50 to-emerald-50 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{client.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Key className="w-4 h-4 mr-2" />
                    PIN: {client.pin}
                  </div>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getWoundColor(client.primaryWound)}`}>
                Primary: {client.primaryWound}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-sm text-gray-600 mb-2">Overall Progress</div>
              <div className="text-3xl font-bold text-amber-600">{client.progress}%</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-sm text-gray-600 mb-2">Modules Completed</div>
              <div className="text-3xl font-bold text-blue-600">
                {client.modulesCompleted}/{client.totalModules}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-sm text-gray-600 mb-2">Last Active</div>
              <div className="text-lg font-bold text-gray-900">{client.lastActive}</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-4">Module Progress</h4>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((moduleNum) => (
                <div key={moduleNum} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Module {moduleNum}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-amber-600 to-emerald-600 h-2 rounded-full"
                        style={{ width: `${moduleNum <= client.modulesCompleted ? 100 : 0}%` }}
                      />
                    </div>
                    {moduleNum <= client.modulesCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onViewReport}
              className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              View Full Report
            </button>
            <button
              onClick={onSendMessage}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEnhanced;
