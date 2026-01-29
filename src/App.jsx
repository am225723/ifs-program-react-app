import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import ClientPINLogin from './components/ClientPINLogin';
import PINAuthDiagnostic from './components/PINAuthDiagnostic';
import TestClientCreator from './components/TestClientCreator';
import Home from './pages/Home';
import CurriculumSystem from './components/CurriculumSystem';
import LearningModuleRenderer from './components/LearningModuleRenderer';
import CheatSheet from './pages/CheatSheet';
import Wounds from './pages/Wounds';
import Qualities from './pages/Qualities';
import PartsMapping from './pages/PartsMapping';
import Exercises from './pages/Exercises';
import Assessment from './pages/Assessment';
import Resources from './pages/Resources';
import Journal from './pages/Journal';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import PartsStudio from './pages/PartsStudio';
import MicroLearning from './pages/MicroLearning';
import Affirmations from './pages/Affirmations';
import TherapyIntegration from './pages/TherapyIntegration';
import AdminDashboard from './pages/AdminDashboard';
import AuthDebug from './components/AuthDebug';
import PINEntry from './components/PINEntry';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { clientAuth } from './lib/supabasePersonalization';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  useEffect(() => {
    // Check for existing session and handle token authentication
    const initializeAuth = async () => {
      // First check for token in URL
      const tokenResult = await clientAuth.handleTokenFromURL();
      
      if (tokenResult && tokenResult.success) {
        setIsAuthenticated(true);
        setCurrentClient(tokenResult.client);
        return;
      }

      // Check for existing session
      const client = clientAuth.getCurrentClientValidated();
      if (client) {
        setIsAuthenticated(true);
        setCurrentClient(client);
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = async (pin) => {
    const result = await clientAuth.authenticateWithPIN(pin);
    if (result.success) {
      setIsAuthenticated(true);
      setCurrentClient(result.client);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    clientAuth.logout();
    setIsAuthenticated(false);
    setCurrentClient(null);
  };

  return (
    <ThemeProvider>
    <DataProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
          {!isAuthenticated ? (
            <Routes>
              <Route path="/" element={<ClientPINLogin onLogin={handleLogin} />} />
              <Route path="/test-client" element={<TestClientCreator />} />
              <Route path="/diagnostic" element={<PINAuthDiagnostic />} />
              <Route path="/auth-debug" element={<AuthDebug />} />
              <Route path="*" element={<ClientPINLogin onLogin={handleLogin} />} />
            </Routes>
          ) : (
            <>
              {/* Modern glassmorphism header */}
              <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <span className="text-white text-xl">✦</span>
                      </div>
                      <div>
                        <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          IFS Healing
                        </h1>
                        <p className="text-xs text-gray-500 -mt-0.5">Welcome, {currentClient?.name?.split(' ')[0]}</p>
                      </div>
                    </Link>
                    <nav className="flex items-center gap-2">
                      <Link
                        to="/"
                        className="px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all text-sm font-medium"
                      >
                        Home
                      </Link>
                      <Link
                        to="/curriculum"
                        className="px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all text-sm font-medium"
                      >
                        Curriculum
                      </Link>
                      <Link
                        to="/journal"
                        className="px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all text-sm font-medium"
                      >
                        Journal
                      </Link>
                      <div className="w-px h-6 bg-gray-200 mx-1"></div>
                      <Link
                        to="/settings"
                        className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                        title="Customize Theme"
                      >
                        <SettingsIcon className="w-5 h-5" />
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all text-sm font-medium"
                      >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">
                          {currentClient?.name?.charAt(0) || '?'}
                        </div>
                        <span className="hidden sm:inline">Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all text-sm"
                      >
                        Logout
                      </button>
                    </nav>
                  </div>
                </div>
              </header>
              
              <Routes>
                <Route path="/" element={<Home clientId={currentClient?.id} client={currentClient} />} />
                <Route path="/curriculum" element={<CurriculumSystem clientId={currentClient?.id} userProgress={{}} />} />
                <Route path="/curriculum/module/:moduleId" element={<LearningModuleRenderer userProgress={{}} />} />
                <Route path="/cheat-sheet" element={<CheatSheet />} />
                <Route path="/wounds" element={<Wounds />} />
                <Route path="/qualities" element={<Qualities />} />
                <Route path="/parts-mapping" element={<PartsMapping />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/profile" element={<Profile client={currentClient} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/parts-studio" element={<PartsStudio />} />
                <Route path="/micro-learning" element={<MicroLearning />} />
                <Route path="/affirmations" element={<Affirmations />} />
                <Route path="/therapy" element={<TherapyIntegration />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/test-client" element={<TestClientCreator />} />
                <Route path="/diagnostic" element={<PINAuthDiagnostic />} />
                <Route path="/auth-debug" element={<AuthDebug />} />
                <Route path="*" element={<Home clientId={currentClient?.id} />} />
              </Routes>
            </>
          )}
        </div>
      </Router>
    </DataProvider>
    </ThemeProvider>
  );
}

export default App;
