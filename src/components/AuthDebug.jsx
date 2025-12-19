import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientAuth } from '../lib/supabasePersonalization';

const AuthDebug = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState({});
  const [personalizedCurriculum, setPersonalizedCurriculum] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const client = clientAuth.getCurrentClientValidated();
    const curriculum = localStorage.getItem('personalizedCurriculum');
    const assessment = localStorage.getItem('assessmentResults');
    
    setAuthStatus({
      isAuthenticated: !!client,
      client: client,
      hasSession: !!localStorage.getItem('clientSession'),
      hasCurriculum: !!curriculum,
      hasAssessment: !!assessment
    });

    if (curriculum) {
      try {
        setPersonalizedCurriculum(JSON.parse(curriculum));
      } catch (e) {
        console.error('Error parsing curriculum:', e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication & Data Debug</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Authentication Status</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="font-semibold w-48">Is Authenticated:</span>
              <span className={authStatus.isAuthenticated ? 'text-green-600' : 'text-red-600'}>
                {authStatus.isAuthenticated ? '✅ Yes' : '❌ No'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-48">Has Curriculum:</span>
              <span className={authStatus.hasCurriculum ? 'text-green-600' : 'text-red-600'}>
                {authStatus.hasCurriculum ? '✅ Yes' : '❌ No'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Navigation Tests</h2>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/curriculum')}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Navigate to Curriculum
            </button>
            <button
              onClick={checkAuthStatus}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Refresh Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;
