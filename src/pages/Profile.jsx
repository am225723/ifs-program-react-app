import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  FileText, 
  Download, 
  Printer,
  Heart,
  Shield,
  AlertCircle,
  TrendingUp,
  Calendar,
  ArrowLeft,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { assessmentManager } from '../lib/supabasePersonalization';

const woundColors = {
  abandonment: { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-700', fill: 'bg-blue-500' },
  shame: { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-700', fill: 'bg-purple-500' },
  neglect: { bg: 'bg-amber-100', border: 'border-amber-400', text: 'text-amber-700', fill: 'bg-amber-500' },
  betrayal: { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-700', fill: 'bg-red-500' }
};

const woundDescriptions = {
  abandonment: "A deep fear of being left alone or rejected. This wound often develops when caregivers were physically or emotionally unavailable.",
  shame: "A core belief of being fundamentally flawed or unworthy. This wound develops from criticism, humiliation, or conditional love.",
  neglect: "Feeling invisible or that your needs don't matter. This wound comes from emotional or physical needs being consistently unmet.",
  betrayal: "Difficulty trusting others due to broken promises or violated boundaries. This wound develops from experiences of deception or abandonment."
};

const Profile = ({ client }) => {
  const navigate = useNavigate();
  const printRef = useRef();
  const [assessment, setAssessment] = useState(null);
  const [allAssessments, setAllAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadAssessmentData();
  }, [client]);

  const loadAssessmentData = async () => {
    if (!client?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [latestResult, historyResult] = await Promise.all([
        assessmentManager.getLatestAssessment(client.id),
        assessmentManager.getAllAssessments(client.id)
      ]);

      if (latestResult.success && latestResult.assessment) {
        setAssessment(latestResult.assessment);
      }
      
      if (historyResult.success) {
        setAllAssessments(historyResult.assessments || []);
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
    }
    setLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getIntensityLevel = (score) => {
    if (score >= 18) return { level: 'High', color: 'text-red-600' };
    if (score >= 12) return { level: 'Moderate', color: 'text-amber-600' };
    if (score >= 6) return { level: 'Mild', color: 'text-yellow-600' };
    return { level: 'Low', color: 'text-green-600' };
  };

  const getScorePercentage = (score) => Math.round((score / 24) * 100);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-600">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading your profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%;
            padding: 20px;
          }
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="no-print flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div ref={printRef} className="print-area">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{client?.name || 'Your Profile'}</h1>
                  <p className="text-purple-100">IFS Healing Journey</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  Wound Assessment Results
                </h2>
                <div className="no-print flex gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Save as PDF
                  </button>
                </div>
              </div>

              {!assessment ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Assessment Found</h3>
                  <p className="text-gray-500 mb-4">You haven't completed the wound assessment yet.</p>
                  <button
                    onClick={() => navigate('/assessment')}
                    className="no-print px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Take Assessment
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Calendar className="w-4 h-4" />
                    Assessment Date: {formatDate(assessment.assessment_date || assessment.created_at)}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className={`p-6 rounded-xl ${woundColors[assessment.primary_wound]?.bg || 'bg-gray-100'} border-2 ${woundColors[assessment.primary_wound]?.border || 'border-gray-300'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5" />
                        <span className="text-sm font-medium uppercase tracking-wide">Primary Wound</span>
                      </div>
                      <h3 className={`text-2xl font-bold capitalize mb-2 ${woundColors[assessment.primary_wound]?.text || 'text-gray-700'}`}>
                        {assessment.primary_wound}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {woundDescriptions[assessment.primary_wound]}
                      </p>
                    </div>

                    {assessment.secondary_wound && (
                      <div className={`p-6 rounded-xl ${woundColors[assessment.secondary_wound]?.bg || 'bg-gray-100'} border-2 ${woundColors[assessment.secondary_wound]?.border || 'border-gray-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5" />
                          <span className="text-sm font-medium uppercase tracking-wide">Secondary Wound</span>
                        </div>
                        <h3 className={`text-2xl font-bold capitalize mb-2 ${woundColors[assessment.secondary_wound]?.text || 'text-gray-700'}`}>
                          {assessment.secondary_wound}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {woundDescriptions[assessment.secondary_wound]}
                        </p>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    Detailed Scores
                  </h3>

                  <div className="space-y-4 mb-8">
                    {['abandonment', 'shame', 'neglect', 'betrayal'].map((wound) => {
                      const score = assessment[`${wound}_score`] || 0;
                      const intensity = getIntensityLevel(score);
                      const percentage = getScorePercentage(score);
                      const colors = woundColors[wound];

                      return (
                        <div key={wound} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className={`font-medium capitalize ${colors.text}`}>{wound}</span>
                            <div className="flex items-center gap-3">
                              <span className={`text-sm font-medium ${intensity.color}`}>{intensity.level}</span>
                              <span className="font-bold text-gray-700">{score}/24</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-500 ${colors.fill}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-3">What This Means For Your Healing</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Your assessment reveals that <strong className="text-purple-700">{assessment.primary_wound}</strong> is 
                      your primary area for healing work. This doesn't define you—it simply shows where your inner child 
                      may need the most attention and compassion. Your curriculum has been personalized to address these 
                      patterns with targeted exercises and IFS techniques.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {allAssessments.length > 1 && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden no-print">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full px-8 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  Assessment History ({allAssessments.length} total)
                </h2>
                {showHistory ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {showHistory && (
                <div className="px-8 pb-6">
                  <div className="space-y-3">
                    {allAssessments.map((a, index) => (
                      <div 
                        key={a.id || index}
                        className={`p-4 rounded-lg border ${index === 0 ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm text-gray-500">
                              {formatDate(a.assessment_date || a.created_at)}
                            </span>
                            {index === 0 && (
                              <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-sm">
                            <span className={`font-medium capitalize ${woundColors[a.primary_wound]?.text}`}>
                              {a.primary_wound}
                            </span>
                            {a.secondary_wound && (
                              <span className="text-gray-400"> / {a.secondary_wound}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
