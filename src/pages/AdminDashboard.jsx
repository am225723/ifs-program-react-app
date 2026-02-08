import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Target, 
  Activity, 
  Settings,
  LogOut,
  BarChart3,
  PieChart,
  Clock,
  Star,
  Zap,
  Brain,
  Heart,
  ArrowRight
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    totalUsers: 245,
    activeUsers: 89,
    completedModules: 1247,
    averageProgress: 68
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: 'Sarah M.', action: 'Completed Inner Child Healing Module', time: '2 hours ago', type: 'completion' },
    { id: 2, user: 'John D.', action: 'Started Parts Mapping Exercise', time: '3 hours ago', type: 'start' },
    { id: 3, user: 'Emma L.', action: 'Achieved Self-Leadership Badge', time: '5 hours ago', type: 'achievement' },
    { id: 4, user: 'Michael R.', action: 'Completed Daily Journal', time: '6 hours ago', type: 'journal' }
  ]);

  const [popularModules, setPopularModules] = useState([
    { name: 'Inner Child Healing', users: 156, completionRate: 78 },
    { name: 'Self-Leadership Development', users: 142, completionRate: 85 },
    { name: 'Parts Mapping', users: 128, completionRate: 92 },
    { name: 'Unburdening Protocols', users: 97, completionRate: 71 }
  ]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{userStats.totalUsers}</h3>
            <p className="text-gray-600 text-sm">Total Users</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+8%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{userStats.activeUsers}</h3>
            <p className="text-gray-600 text-sm">Active Users</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+15%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{userStats.completedModules}</h3>
            <p className="text-gray-600 text-sm">Completed Modules</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+5%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{userStats.averageProgress}%</h3>
            <p className="text-gray-600 text-sm">Avg. Progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'completion' ? 'bg-green-100' :
                      activity.type === 'start' ? 'bg-blue-100' :
                      activity.type === 'achievement' ? 'bg-yellow-100' : 'bg-purple-100'
                    }`}>
                      {activity.type === 'completion' ? <Target className="w-5 h-5 text-green-600" /> :
                       activity.type === 'start' ? <BookOpen className="w-5 h-5 text-blue-600" /> :
                       activity.type === 'achievement' ? <Award className="w-5 h-5 text-yellow-600" /> : 
                       <Heart className="w-5 h-5 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Modules */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Modules</h2>
              
              <div className="space-y-4">
                {popularModules.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{module.name}</h3>
                      <span className="text-sm font-medium text-purple-600">{module.completionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>{module.users} users</span>
                      <span>Completion</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${module.completionRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/curriculum"
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-purple-300 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Manage Curriculum</h3>
              <p className="text-sm text-gray-600 mb-3">Update modules and content</p>
              <div className="flex items-center text-purple-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Manage</span>
                <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Link>

            <Link
              to="/assessment"
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-purple-300 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">View Assessments</h3>
              <p className="text-sm text-gray-600 mb-3">Review user assessments</p>
              <div className="flex items-center text-purple-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View</span>
                <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Link>

            <button className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-purple-300 transition-all group text-left">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-sm text-gray-600 mb-3">Manage user accounts</p>
              <div className="flex items-center text-purple-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Manage</span>
                <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </button>

            <button className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-purple-300 transition-all group text-left">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-sm text-gray-600 mb-3">Platform configuration</p>
              <div className="flex items-center text-purple-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Configure</span>
                <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;