import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import CurriculumSystem from './components/CurriculumSystem';
import CheatSheet from './pages/CheatSheet';
import Wounds from './pages/Wounds';
import Qualities from './pages/Qualities';
import PartsMapping from './pages/PartsMapping';
import Exercises from './pages/Exercises';
import Assessment from './pages/Assessment';
import Resources from './pages/Resources';
import Journal from './pages/Journal';
import AdminDashboard from './pages/AdminDashboard';
import PINEntry from './components/PINEntry';
import { DataProvider } from './contexts/DataContext';
import LearningModule from './components/LearningModuleEnhanced';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  const handlePINSubmit = (pin) => {
    // Simple PIN validation - in production, this would be server-side
    if (pin === '123456') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  const handleModuleComplete = (module) => {
    // Update user progress
    const updatedProgress = {
      ...userProgress,
      completedModules: [
        ...(userProgress.completedModules || []),
        module.id
      ]
    };
    setUserProgress(updatedProgress);
    localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
    setSelectedModule(null);
  };

  const handleBackToCurriculum = () => {
    setSelectedModule(null);
  };

  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
                path="/curriculum" 
                element={
                  selectedModule ? (
                    <LearningModule 
                      module={selectedModule}
                      onComplete={handleModuleComplete}
                      onBack={handleBackToCurriculum}
                      userProgress={userProgress}
                    />
                  ) : (
                    <CurriculumSystem 
                      onModuleSelect={handleModuleSelect}
                      userProgress={userProgress}
                    />
                  )
                } 
              />
            <Route path="/cheat-sheet" element={<CheatSheet />} />
            <Route path="/wounds" element={<Wounds />} />
            <Route path="/qualities" element={<Qualities />} />
            <Route path="/parts-mapping" element={<PartsMapping />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/assessment" />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;