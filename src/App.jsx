import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Curriculum from './pages/Curriculum';
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePINSubmit = (pin) => {
    // Simple PIN validation - in production, this would be server-side
    if (pin === '123456') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/cheat-sheet" element={<CheatSheet />} />
          <Route path="/wounds" element={<Wounds />} />
          <Route path="/qualities" element={<Qualities />} />
          <Route path="/parts-mapping" element={<PartsMapping />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/journal" element={<Journal />} />
          <Route 
            path="/admin" 
            element={
              isAuthenticated ? 
              <AdminDashboard /> : 
              <PINEntry onSubmit={handlePINSubmit} />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;