import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CheatSheet from './pages/CheatSheet';
import Wounds from './pages/Wounds';
import Qualities from './pages/Qualities';
import PartsMapping from './pages/PartsMapping';
import Exercises from './pages/Exercises';
import Assessment from './pages/Assessment';
import Resources from './pages/Resources';
import Journal from './pages/Journal';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cheat-sheet" element={<CheatSheet />} />
          <Route path="/wounds" element={<Wounds />} />
          <Route path="/qualities" element={<Qualities />} />
          <Route path="/parts-mapping" element={<PartsMapping />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;