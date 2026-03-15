import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, Shield, Users, Sparkles, ArrowRight, ArrowLeft,
  BookOpen, Brain, Target, CheckCircle2, Star
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const STEPS = [
  {
    id: 'welcome',
    icon: Heart,
    gradient: 'from-amber-500 to-orange-500',
    title: 'Welcome to Your Healing Journey',
    subtitle: "You've taken a brave first step",
    body: "This app is your personal companion for Internal Family Systems (IFS) self-therapy. It's designed to help you explore your inner world at your own pace, in a safe and supportive space.",
    tip: "Everything here is private and secure. Take your time — there's no rush.",
  },
  {
    id: 'what-is-ifs',
    icon: Brain,
    gradient: 'from-purple-500 to-indigo-500',
    title: 'What is IFS?',
    subtitle: 'Understanding your inner family',
    body: "IFS is based on the idea that your mind is made up of different \"parts\" — like an inner family. Some parts protect you, some carry pain from the past, and at your core is your true Self — calm, compassionate, and wise.",
    highlights: [
      { icon: Shield, label: 'Protectors', desc: 'Parts that keep you safe (managers & firefighters)' },
      { icon: Heart, label: 'Exiles', desc: 'Younger parts carrying wounds and emotions' },
      { icon: Star, label: 'Self', desc: 'Your wise, compassionate core — the healer within' },
    ],
  },
  {
    id: 'how-it-works',
    icon: Target,
    gradient: 'from-emerald-500 to-teal-500',
    title: 'How This App Helps You',
    subtitle: 'Your personalized toolkit',
    features: [
      { icon: BookOpen, label: 'Personalized Curriculum', desc: 'Learning modules adapted to your unique wounds and healing needs' },
      { icon: Users, label: 'Parts Exploration', desc: 'Map, visualize, and build relationships with your inner parts' },
      { icon: Sparkles, label: 'Guided Exercises', desc: 'Meditations, journaling, daily check-ins, and healing activities' },
      { icon: Shield, label: 'Advisor Support', desc: 'Your advisor can send messages, assignments, and track your progress' },
    ],
  },
  {
    id: 'get-started',
    icon: Sparkles,
    gradient: 'from-amber-500 to-emerald-500',
    title: "Let's Get Started",
    subtitle: 'Your first step: the Wound Assessment',
    body: "We recommend starting with a short assessment that helps identify your primary inner child wound. This personalizes your entire experience — from curriculum content to exercise recommendations.",
    reassurance: "The assessment takes about 5-10 minutes. There are no right or wrong answers — just honest reflection. You can always retake it later.",
  },
];

export default function OnboardingFlow({ onComplete, clientName, clientId }) {
  const { theme } = useTheme();
  const isDark = theme.isDark;
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;
  const isFirst = currentStep === 0;

  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-slate-300' : 'text-gray-600';
  const textMuted = isDark ? 'text-slate-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-slate-800/80' : 'bg-white/90';
  const cardBorder = isDark ? 'border-slate-700/50' : 'border-gray-200/50';
  const featureBg = isDark ? 'bg-slate-700/50' : 'bg-gray-50';

  const handleNext = () => {
    if (isLast) return;
    setIsExiting(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsExiting(false);
    }, 200);
  };

  const handleBack = () => {
    if (isFirst) return;
    setIsExiting(true);
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsExiting(false);
    }, 200);
  };

  const handleFinish = (goToAssessment) => {
    if (clientId) {
      localStorage.setItem(`onboarding_completed_${clientId}`, 'true');
    }
    localStorage.setItem('onboarding_completed', 'true');
    onComplete();
    if (goToAssessment) {
      navigate('/assessment');
    }
  };

  const StepIcon = step.icon;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br ${isDark ? 'from-slate-900 via-slate-800 to-slate-900' : 'from-amber-50 via-white to-emerald-50'}`}>
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-center gap-2 mb-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? `w-8 bg-gradient-to-r ${step.gradient}`
                  : i < currentStep
                    ? 'w-4 bg-amber-400'
                    : isDark ? 'w-4 bg-slate-600' : 'w-4 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className={`${cardBg} backdrop-blur-lg rounded-3xl border ${cardBorder} shadow-xl overflow-hidden transition-opacity duration-200 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
          <div className={`bg-gradient-to-r ${step.gradient} p-6 text-center`}>
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
              <StepIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{step.title}</h2>
            <p className="text-white/80 text-sm">{step.subtitle}</p>
          </div>

          <div className="p-6">
            {step.id === 'welcome' && (
              <>
                {clientName && (
                  <p className={`text-center text-lg font-medium ${textPrimary} mb-4`}>
                    Hi {clientName}, welcome!
                  </p>
                )}
                <p className={`${textSecondary} leading-relaxed mb-4`}>{step.body}</p>
                <div className={`${featureBg} rounded-xl p-4 border ${cardBorder}`}>
                  <p className={`text-sm ${textMuted} italic flex items-start gap-2`}>
                    <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                    {step.tip}
                  </p>
                </div>
              </>
            )}

            {step.id === 'what-is-ifs' && (
              <>
                <p className={`${textSecondary} leading-relaxed mb-5`}>{step.body}</p>
                <div className="space-y-3">
                  {step.highlights.map((h, i) => {
                    const HIcon = h.icon;
                    return (
                      <div key={i} className={`flex items-start gap-3 ${featureBg} rounded-xl p-3.5 border ${cardBorder}`}>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${STEPS[1].gradient} flex items-center justify-center flex-shrink-0`}>
                          <HIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className={`font-semibold text-sm ${textPrimary}`}>{h.label}</p>
                          <p className={`text-xs ${textMuted}`}>{h.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {step.id === 'how-it-works' && (
              <div className="space-y-3">
                {step.features.map((f, i) => {
                  const FIcon = f.icon;
                  return (
                    <div key={i} className={`flex items-start gap-3 ${featureBg} rounded-xl p-3.5 border ${cardBorder}`}>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${STEPS[2].gradient} flex items-center justify-center flex-shrink-0`}>
                        <FIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`font-semibold text-sm ${textPrimary}`}>{f.label}</p>
                        <p className={`text-xs ${textMuted}`}>{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {step.id === 'get-started' && (
              <>
                <p className={`${textSecondary} leading-relaxed mb-4`}>{step.body}</p>
                <div className={`${featureBg} rounded-xl p-4 border ${cardBorder} mb-5`}>
                  <p className={`text-sm ${textMuted} italic flex items-start gap-2`}>
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                    {step.reassurance}
                  </p>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => handleFinish(true)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-white font-semibold text-sm hover:from-amber-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Sparkles className="w-5 h-5" />
                    Take the Wound Assessment
                  </button>
                  <button
                    onClick={() => handleFinish(false)}
                    className={`w-full py-3 rounded-xl border ${cardBorder} ${textSecondary} text-sm font-medium hover:${isDark ? 'bg-slate-700' : 'bg-gray-50'} transition-all`}
                  >
                    I'll explore on my own first
                  </button>
                </div>
              </>
            )}
          </div>

          {!isLast && (
            <div className={`px-6 pb-6 flex items-center ${isFirst ? 'justify-end' : 'justify-between'}`}>
              {!isFirst && (
                <button
                  onClick={handleBack}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium ${textSecondary} hover:${isDark ? 'bg-slate-700' : 'bg-gray-100'} transition-all`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r ${step.gradient} text-white hover:opacity-90 transition-all shadow-md`}
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => handleFinish(false)}
          className={`mt-4 w-full text-center text-xs ${textMuted} hover:underline`}
        >
          Skip onboarding
        </button>
      </div>
    </div>
  );
}
