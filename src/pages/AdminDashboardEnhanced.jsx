import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { clientAuth, assessmentManager, progressTracker } from '../lib/supabasePersonalization';

const AdminDashboardEnhanced = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
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

      setStats({
        totalClients: totalCount || 0,
        activeClients: activeCount || 0,
        completedModules: modulesCount || 0,
        avgProgress: totalCount > 0 ? Math.round((modulesCount || 0) / totalCount) : 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
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

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getWoundColor = (wound) => {
    const colors = {
      abandonment: 'bg-blue-100 text-blue-700',
      shame: 'bg-gray-100 text-gray-700',
      neglect: 'bg-purple-100 text-purple-700',
      betrayal: 'bg-red-100 text-red-700'
    };
    return colors[wound] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 mb-2">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage clients and monitor progress</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Client
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalClients}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
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

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
              </select>
              <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Clients Table */}
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
                        <Loader2 className="w-8 h-8 text-purple-600 animate-spin mb-3" />
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
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
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
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          title="Edit Client"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="View Analytics"
                        >
                          <BarChart3 className="w-4 h-4" />
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
      </div>

      {/* Create Client Modal */}
      {showCreateModal && (
        <CreateClientModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateClient}
        />
      )}

      {/* Client Details Modal */}
      {selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
};

// Create Client Modal Component
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Client</h2>
        
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Create Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Client Details Modal Component
const ClientDetailsModal = ({ client, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Client Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          {/* Client Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
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

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-sm text-gray-600 mb-2">Overall Progress</div>
              <div className="text-3xl font-bold text-purple-600">{client.progress}%</div>
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

          {/* Module Progress */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-4">Module Progress</h4>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((moduleNum) => (
                <div key={moduleNum} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Module {moduleNum}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
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

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              View Full Report
            </button>
            <button className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getWoundColor = (wound) => {
  const colors = {
    abandonment: 'bg-blue-100 text-blue-700',
    shame: 'bg-gray-100 text-gray-700',
    neglect: 'bg-purple-100 text-purple-700',
    betrayal: 'bg-red-100 text-red-700'
  };
  return colors[wound] || 'bg-gray-100 text-gray-700';
};

export default AdminDashboardEnhanced;