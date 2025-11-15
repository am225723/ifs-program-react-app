import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CurriculumSystem from '../components/CurriculumSystem';
import LearningModule from '../components/LearningModule';
import { curriculumModules } from '../data/curriculumData';

const Curriculum = () => {
  const [searchParams] = useSearchParams();
  const [selectedModule, setSelectedModule] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  // Load user progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    
    // Check if a specific module is requested
    const moduleId = searchParams.get('module');
    if (moduleId) {
      const module = curriculumModules.find(m => m.id === moduleId);
      if (module) {
        setSelectedModule(module);
      }
    }
  }, [searchParams]);

  // Handle module selection
  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    // Update URL to include module ID
    const url = new URL(window.location);
    url.searchParams.set('module', module.id);
    window.history.pushState({}, '', url);
  };

  // Handle module completion
  const handleModuleComplete = (module) => {
    // Update user progress
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    if (!completedModules.includes(module.id)) {
      completedModules.push(module.id);
      localStorage.setItem('completedModules', JSON.stringify(completedModules));
    }
    
    // Update progress tracking
    const newProgress = {
      ...userProgress,
      [module.id]: {
        completed: true,
        completedAt: new Date().toISOString()
      }
    };
    setUserProgress(newProgress);
    localStorage.setItem('userProgress', JSON.stringify(newProgress));
    
    // Return to curriculum overview
    setSelectedModule(null);
    // Remove module from URL
    const url = new URL(window.location);
    url.searchParams.delete('module');
    window.history.pushState({}, '', url);
  };

  // Handle back to curriculum
  const handleBackToCurriculum = () => {
    setSelectedModule(null);
    // Remove module from URL
    const url = new URL(window.location);
    url.searchParams.delete('module');
    window.history.pushState({}, '', url);
  };

  // If a specific module is selected, show the learning module
  if (selectedModule) {
    return (
      <LearningModule
        module={selectedModule}
        onComplete={handleModuleComplete}
        onBack={handleBackToCurriculum}
        userProgress={userProgress}
      />
    );
  }

  // Otherwise, show the curriculum system
  return (
    <CurriculumSystem
      onModuleSelect={handleModuleSelect}
      userProgress={userProgress}
    />
  );
};

export default Curriculum;