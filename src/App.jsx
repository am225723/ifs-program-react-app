import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import AdminDashboard from './pages/AdminDashboard';
import AuthDebug from './components/AuthDebug';
import PINEntry from './components/PINEntry';
import { DataProvider } from './contexts/DataContext';
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
              {/* Add header with navigation */}
              <div className="bg-white shadow-sm p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <h1 className="text-xl font-bold text-gray-900">
                    Welcome, {currentClient?.name}
                  </h1>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              
              <Routes>
                <Route path="/" element={<Home clientId={currentClient?.id} />} />
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
  );
}

export default App;
