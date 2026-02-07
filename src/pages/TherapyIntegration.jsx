import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, FileText, CheckSquare, Clock, MessageSquare, Download, Trash2, Edit3, Save, X, ChevronDown, ChevronUp, Heart, Shield, Users, Play, Pause, Star, BookOpen, Target, Sparkles, Eye, Brain, AlertCircle, Lightbulb } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const therapistClientActivities = [
  {
    id: 'session-prep',
    title: 'Pre-Session Preparation',
    icon: 'BookOpen',
    category: 'preparation',
    duration: '10-15 min',
    description: 'Prepare yourself before meeting with your therapist so you can make the most of your session time.',
    steps: [
      { title: 'Internal Check-In', instruction: 'Close your eyes and take 3 slow breaths. Notice which parts are present right now. Are any parts activated or anxious about the upcoming session?', duration: 3 },
      { title: 'Identify Session Focus', instruction: 'Ask inside: "What part most needs attention today?" Notice who speaks up. Write down the part\'s name and what it wants to share.', duration: 3 },
      { title: 'Note Protector Concerns', instruction: 'Check if any protective parts have concerns about today\'s work. What are they worried about? What do they need to feel safe enough to allow deeper work?', duration: 3 },
      { title: 'Set an Intention', instruction: 'Set a clear intention for today\'s session. Examples: "I want to understand my inner critic better" or "I\'m ready to witness my wounded child part." Write this down to share with your therapist.', duration: 2 },
      { title: 'Self-Energy Check', instruction: 'Rate your access to Self-energy right now (1-10). If below 5, do a brief grounding exercise. Your therapist can help you access more Self-energy at the start of your session.', duration: 2 }
    ],
    reflectionPrompts: [
      'Which parts showed up during your preparation?',
      'What feels most important to explore today?',
      'What might your protectors need to hear before deeper work begins?'
    ]
  },
  {
    id: 'parts-dialogue',
    title: 'Guided Parts Dialogue',
    icon: 'MessageSquare',
    category: 'in-session',
    duration: '20-30 min',
    description: 'A structured exercise for therapist-guided conversation with your internal parts. Your therapist leads while you turn inward.',
    steps: [
      { title: 'Find the Target Part', instruction: 'With your therapist\'s guidance, notice which part is most present. Where do you feel it in your body? What emotion does it carry? Describe what you notice to your therapist.', duration: 5 },
      { title: 'How Do You Feel Toward It?', instruction: 'Your therapist will ask: "How do you feel toward this part?" Notice your honest response. If you feel anything other than curiosity and compassion (like frustration, fear, or judgment), another part is blended. Ask that part to step back.', duration: 5 },
      { title: 'Get to Know the Part', instruction: 'From Self-energy, ask the part: "What do you want me to know about you?" Listen without judging. Let it share at its own pace. Your therapist will help you stay in Self.', duration: 5 },
      { title: 'Understand Its Role', instruction: 'Ask the part: "What is your job in my system? What are you trying to protect me from?" Appreciate its efforts, even if its methods have been painful. Every part has positive intent.', duration: 5 },
      { title: 'What Does It Need?', instruction: 'Ask: "What do you need from me right now?" and "What would you like me to know that I haven\'t understood yet?" Let the part guide the conversation.', duration: 5 },
      { title: 'Thank and Close', instruction: 'Thank the part for sharing. Ask if there\'s anything else before you close. Let it know you\'ll return. Your therapist will help you transition back.', duration: 3 }
    ],
    reflectionPrompts: [
      'What surprised you about what this part shared?',
      'Did you notice any shift in how you feel toward this part?',
      'What did you learn about why this part behaves the way it does?',
      'How did it feel to approach this part from Self-energy?'
    ]
  },
  {
    id: 'protector-negotiation',
    title: 'Protector Parts Negotiation',
    icon: 'Shield',
    category: 'in-session',
    duration: '25-35 min',
    description: 'Work with your therapist to help protective parts (Managers and Firefighters) feel safe enough to allow access to vulnerable exile parts.',
    steps: [
      { title: 'Identify the Protector', instruction: 'With your therapist, identify which protector is active. Is it a Manager (preventing pain through control) or a Firefighter (reacting to pain that\'s already leaked through)? Notice how it shows up in your body and behavior.', duration: 4 },
      { title: 'Acknowledge Its Work', instruction: 'Tell the protector: "I see how hard you\'ve been working to keep me safe. Thank you for protecting me all this time." Notice its response. Does it soften? Does it have more to say?', duration: 4 },
      { title: 'Understand the Fear', instruction: 'Ask the protector: "What are you afraid would happen if you stepped back, even a little?" Listen carefully. Its fears are usually about the exile it\'s guarding — the vulnerable part carrying old pain.', duration: 5 },
      { title: 'Address Its Concerns', instruction: 'With your therapist\'s help, address each fear directly. Reassure the protector: "I\'m an adult now with resources. I have my therapist here. I can handle what comes up." Ask what it needs to feel safe enough.', duration: 5 },
      { title: 'Negotiate Access', instruction: 'Ask the protector: "Would you be willing to relax just a little so I can get to know the part you\'re protecting? You can step back in anytime if it feels too much." Wait for genuine permission — don\'t force it.', duration: 5 },
      { title: 'Honor the Agreement', instruction: 'If permission is granted, proceed gently with your therapist. If the protector says no, respect that boundary. Ask what it would need before it could allow access in the future. Build trust over time.', duration: 4 },
      { title: 'Check Back In', instruction: 'After any deeper work, check back with the protector: "How are you doing? Was that okay? Do you need anything from me?" This builds trust for future sessions.', duration: 3 }
    ],
    reflectionPrompts: [
      'Which protector did you work with and what is its primary strategy?',
      'What is the protector most afraid of?',
      'Did the protector grant permission? What did it need to feel safe?',
      'How has your relationship with this protector shifted?'
    ]
  },
  {
    id: 'unburdening-ceremony',
    title: 'Unburdening Ceremony Guide',
    icon: 'Sparkles',
    category: 'in-session',
    duration: '30-45 min',
    description: 'A sacred step-by-step guide for the unburdening process. Best done with your therapist present for support and safety.',
    steps: [
      { title: 'Confirm Readiness', instruction: 'Check with all protectors: "Are you ready for this part to release its burdens?" Check with the exile: "Are you ready to let go of what you\'ve been carrying?" Both must say yes. If not, spend more time building trust.', duration: 5 },
      { title: 'Witness the Story', instruction: 'With your therapist holding space, let the exile show you what happened. Witness the original experience with compassion. You don\'t need to re-live it — just witness it from Self. Let the part know: "I see what happened to you. I\'m so sorry."', duration: 8 },
      { title: 'Retrieve the Part', instruction: 'Ask the part: "Would you like to leave that scene? Would you like to come with me to somewhere safe?" If yes, help the part leave the past. Bring it to a safe place — real or imagined. Let it know: "You\'re safe now. That\'s over."', duration: 5 },
      { title: 'Identify the Burdens', instruction: 'Ask the part: "What beliefs or feelings did you take on from that experience?" Common burdens: "I\'m not good enough," "I\'m unlovable," "It was my fault," "I\'m broken." Let the part name each burden.', duration: 5 },
      { title: 'Choose the Release', instruction: 'Ask the part: "How would you like to release these burdens?" Offer the elements: fire (burn away), water (wash away), wind (blow away), earth (bury/compost), light (dissolve into light). Let the part choose what feels right.', duration: 3 },
      { title: 'Release the Burdens', instruction: 'Guide the part through releasing each burden using its chosen element. Take your time. Notice what happens in the part and in your body as each burden lifts. Your therapist will support you through this.', duration: 8 },
      { title: 'Invite In Qualities', instruction: 'Ask the unburdened part: "What qualities would you like to take in to replace what you released?" Common qualities: worthiness, safety, love, joy, innocence, strength, freedom. Let the part absorb these new qualities.', duration: 4 },
      { title: 'Check the System', instruction: 'Notice how your protectors responded to the unburdening. Often they spontaneously relax or shift. Ask them: "How are you now?" Thank all parts involved for their courage and willingness.', duration: 4 }
    ],
    reflectionPrompts: [
      'What burdens did the part release? What element did it choose?',
      'What new qualities did the part take in?',
      'How do you feel different in your body after the unburdening?',
      'How did your protector parts respond to the exile\'s release?',
      'What shifted in your internal system?'
    ]
  },
  {
    id: 'post-session-integration',
    title: 'Post-Session Integration',
    icon: 'Heart',
    category: 'after-session',
    duration: '15-20 min',
    description: 'Process and integrate what happened in your therapy session. Best done within 24 hours of your session.',
    steps: [
      { title: 'Grounding Return', instruction: 'Find a quiet space. Take 5 slow breaths. Feel your feet on the ground. Place a hand on your heart. You\'re here, now, in the present moment. The session work is held safely inside you.', duration: 3 },
      { title: 'Session Recap', instruction: 'Without judgment, recall the key moments of your session. What parts did you work with? What did you learn? What emotions came up? Write a brief summary in your session notes.', duration: 4 },
      { title: 'Parts Check-In', instruction: 'Check in with the parts you worked with: "How are you feeling after our session?" Listen to each part. Some may feel relief, others may feel stirred up. All responses are valid. Offer comfort to any part that needs it.', duration: 4 },
      { title: 'Body Awareness', instruction: 'Scan your body from head to toe. Notice any areas of tension, release, warmth, or change since the session. These physical shifts often mirror internal healing. Note what you observe.', duration: 3 },
      { title: 'Integration Journaling', instruction: 'Write freely for 5 minutes about your experience. What shifted? What surprised you? What do you want to remember? What feels different? Don\'t edit — just let it flow.', duration: 5 },
      { title: 'Self-Care Plan', instruction: 'Based on what came up, what do you need in the next 24-48 hours? More rest? Gentle movement? Connection with a safe person? Creative expression? Make a simple self-care plan and commit to it.', duration: 3 }
    ],
    reflectionPrompts: [
      'What was the most meaningful moment of today\'s session?',
      'What do your parts need from you in the days ahead?',
      'What self-care will you prioritize this week?',
      'What would you like to explore further in your next session?'
    ]
  },
  {
    id: 'daily-parts-check',
    title: 'Daily Parts Check-In Practice',
    icon: 'Eye',
    category: 'daily-practice',
    duration: '5-10 min',
    description: 'A brief daily practice to maintain connection with your internal system between therapy sessions.',
    steps: [
      { title: 'Settle In', instruction: 'Find a comfortable position. Close your eyes or soften your gaze. Take 3 deep breaths to arrive in the present moment. Set the intention to connect with your internal family.', duration: 2 },
      { title: 'Invite All Parts', instruction: 'Silently say: "I\'d like to check in with all of my parts. Everyone is welcome." Notice who shows up. There\'s no right or wrong — just notice which parts are present today.', duration: 2 },
      { title: 'Listen Without Fixing', instruction: 'For each part that shows up, simply ask: "How are you today?" Listen to the response without trying to fix or change anything. Just acknowledge: "I hear you. Thank you for sharing."', duration: 3 },
      { title: 'Notice Any Needs', instruction: 'Ask: "Does anyone need anything from me today?" A protector might need reassurance. An exile might need comfort. Self might need space. Note what comes up.', duration: 2 },
      { title: 'Close with Gratitude', instruction: 'Thank all your parts for showing up. Remind them: "I\'m here for all of you. We\'re in this together." Take one final deep breath and gently open your eyes.', duration: 1 }
    ],
    reflectionPrompts: [
      'Which parts were most present today?',
      'Did any part have an urgent need?',
      'How is your relationship with your parts evolving over time?'
    ]
  },
  {
    id: 'trailhead-exploration',
    title: 'Trailhead Exploration Exercise',
    icon: 'Target',
    category: 'in-session',
    duration: '20-30 min',
    description: 'Use real-life triggers ("trailheads") as doorways to discover and heal parts. Bring a recent triggering event to explore with your therapist.',
    steps: [
      { title: 'Identify the Trigger', instruction: 'Think of a recent situation where you had a strong emotional reaction — anger, sadness, anxiety, shutdown. Describe the situation to your therapist: What happened? Who was involved? What was said or done?', duration: 4 },
      { title: 'Notice the Reaction', instruction: 'Recall your reaction in detail. What emotions came up? What thoughts? What physical sensations? What did you want to do (fight, flee, freeze, fix)? This reaction is a part — it\'s your trailhead.', duration: 4 },
      { title: 'Find the Part', instruction: 'Turn inward and locate the part that reacted. Where is it in your body? What does it look like? How old does it feel? Ask your therapist to help you stay curious rather than blended.', duration: 4 },
      { title: 'Explore the Chain', instruction: 'This reacting part is usually a protector. Ask it: "Who are you protecting?" Follow the chain inward. The protector guards an exile — a younger part carrying original pain. Notice who appears.', duration: 5 },
      { title: 'Connect the Pattern', instruction: 'With your therapist, explore how this trigger connects to older experiences. Ask the exile: "When did you first feel this way?" Let it show you the original wound, if it\'s ready.', duration: 5 },
      { title: 'Offer What Was Needed', instruction: 'Ask the younger part: "What did you need back then that you didn\'t get?" Then offer it now from Self: safety, comfort, validation, protection, love. Notice what the part receives.', duration: 4 },
      { title: 'Update the System', instruction: 'Let the protector know what you\'ve learned. Ask: "Now that I\'ve connected with the part you\'re protecting, would you be willing to try a different approach next time this trigger comes up?" Discuss alternatives.', duration: 4 }
    ],
    reflectionPrompts: [
      'What was the trailhead (trigger) you explored?',
      'What protector was activated, and who was it guarding?',
      'What original wound or experience did the exile reveal?',
      'What did the younger part need that it didn\'t receive?',
      'How might this pattern show up differently now that you\'ve connected with these parts?'
    ]
  },
  {
    id: 'self-energy-cultivation',
    title: 'Self-Energy Cultivation with Therapist',
    icon: 'Brain',
    category: 'in-session',
    duration: '15-20 min',
    description: 'Strengthen your connection to Self — the calm, compassionate, curious core of who you are. Your therapist guides you to access and deepen Self-energy.',
    steps: [
      { title: 'The 8 C\'s Inventory', instruction: 'Your therapist will guide you through the 8 C\'s of Self: Calm, Curiosity, Clarity, Compassion, Confidence, Courage, Creativity, Connectedness. Rate each one 1-10. Which are strongest? Which need development?', duration: 4 },
      { title: 'Unblending Practice', instruction: 'If a part is strongly blended (you ARE the emotion rather than noticing it), your therapist will help you unblend. Try: "I notice a part of me that feels [emotion]" rather than "I feel [emotion]." Notice the shift in perspective.', duration: 4 },
      { title: 'Self-Energy Expansion', instruction: 'Focus on an area of your body where you feel most like your true self. Your therapist will guide you to expand that feeling outward — like warm light spreading through your body. This IS Self-energy.', duration: 4 },
      { title: 'Parts as Visitors', instruction: 'Imagine yourself sitting in a peaceful place. Parts can come visit you there, but they don\'t overwhelm you. Practice noticing parts arriving and greeting them from Self: "I see you. Welcome. What brings you here?"', duration: 4 },
      { title: 'Anchoring Self', instruction: 'Create a physical anchor for Self-energy: a hand on your heart, a specific breath pattern, or a word/phrase. Practice accessing Self through this anchor. Your therapist will help you test it with activated parts.', duration: 4 }
    ],
    reflectionPrompts: [
      'Which of the 8 C\'s feel most natural to you?',
      'Which C\'s does your system most need to develop?',
      'What does Self-energy feel like in your body?',
      'What anchor did you create for accessing Self?'
    ]
  }
];

const categoryLabels = {
  'preparation': { label: 'Before Session', color: 'blue' },
  'in-session': { label: 'With Therapist', color: 'purple' },
  'after-session': { label: 'After Session', color: 'green' },
  'daily-practice': { label: 'Daily Practice', color: 'amber' }
};

const iconMap = {
  BookOpen, MessageSquare, Shield, Sparkles, Heart, Eye, Target, Brain
};

export default function TherapyIntegration() {
  const { theme, getAnimationClass } = useTheme();
  const [activeTab, setActiveTab] = useState('activities');
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('therapySessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [homework, setHomework] = useState(() => {
    const saved = localStorage.getItem('therapyHomework');
    return saved ? JSON.parse(saved) : [];
  });
  const [activityProgress, setActivityProgress] = useState(() => {
    const saved = localStorage.getItem('therapyActivityProgress');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeActivity, setActiveActivity] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stepTimer, setStepTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activityReflections, setActivityReflections] = useState({});
  const [showAddSession, setShowAddSession] = useState(false);
  const [showAddHomework, setShowAddHomework] = useState(false);
  const [expandedSession, setExpandedSession] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newSession, setNewSession] = useState({
    date: new Date().toISOString().split('T')[0],
    therapistNotes: '',
    myNotes: '',
    partsDiscussed: '',
    insights: '',
    nextSessionGoals: ''
  });
  const [newHomework, setNewHomework] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false
  });

  useEffect(() => {
    localStorage.setItem('therapySessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('therapyHomework', JSON.stringify(homework));
  }, [homework]);

  useEffect(() => {
    localStorage.setItem('therapyActivityProgress', JSON.stringify(activityProgress));
  }, [activityProgress]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && activeActivity) {
      interval = setInterval(() => {
        setStepTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, activeActivity]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const startActivity = (activity) => {
    setActiveActivity(activity);
    setActiveStep(0);
    setStepTimer(0);
    setIsTimerRunning(false);
    setActivityReflections({});
  };

  const nextStep = () => {
    if (activeActivity && activeStep < activeActivity.steps.length - 1) {
      setActiveStep(prev => prev + 1);
      setStepTimer(0);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
      setStepTimer(0);
    }
  };

  const completeActivity = () => {
    if (activeActivity) {
      const progress = {
        ...activityProgress,
        [activeActivity.id]: {
          completedAt: new Date().toISOString(),
          reflections: activityReflections,
          timesCompleted: (activityProgress[activeActivity.id]?.timesCompleted || 0) + 1
        }
      };
      setActivityProgress(progress);
      setActiveActivity(null);
      setActiveStep(0);
      setStepTimer(0);
      setIsTimerRunning(false);
    }
  };

  const addSession = () => {
    if (!newSession.date) return;
    const session = {
      id: Date.now(),
      ...newSession,
      createdAt: new Date().toISOString()
    };
    setSessions(prev => [session, ...prev]);
    setNewSession({
      date: new Date().toISOString().split('T')[0],
      therapistNotes: '',
      myNotes: '',
      partsDiscussed: '',
      insights: '',
      nextSessionGoals: ''
    });
    setShowAddSession(false);
  };

  const deleteSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const addHomework = () => {
    if (!newHomework.title) return;
    const hw = {
      id: Date.now(),
      ...newHomework,
      createdAt: new Date().toISOString()
    };
    setHomework(prev => [hw, ...prev]);
    setNewHomework({ title: '', description: '', dueDate: '', completed: false });
    setShowAddHomework(false);
  };

  const toggleHomework = (id) => {
    setHomework(prev => prev.map(h =>
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  const deleteHomework = (id) => {
    setHomework(prev => prev.filter(h => h.id !== id));
  };

  const exportSessionNotes = () => {
    let content = 'IFS THERAPY SESSION NOTES\n' + '='.repeat(50) + '\n\n';

    content += sessions.map(s => `SESSION: ${new Date(s.date).toLocaleDateString()}
${'='.repeat(40)}

My Notes:
${s.myNotes || 'N/A'}

Parts Discussed:
${s.partsDiscussed || 'N/A'}

Key Insights:
${s.insights || 'N/A'}

Next Session Goals:
${s.nextSessionGoals || 'N/A'}

Therapist Notes:
${s.therapistNotes || 'N/A'}
`).join('\n---\n');

    if (Object.keys(activityProgress).length > 0) {
      content += '\n\n' + '='.repeat(50) + '\nACTIVITY COMPLETION LOG\n' + '='.repeat(50) + '\n\n';
      Object.entries(activityProgress).forEach(([id, data]) => {
        const activity = therapistClientActivities.find(a => a.id === id);
        if (activity) {
          content += `${activity.title} - Completed ${data.timesCompleted} time(s)\n`;
          content += `Last completed: ${new Date(data.completedAt).toLocaleDateString()}\n`;
          if (data.reflections && Object.keys(data.reflections).length > 0) {
            content += 'Reflections:\n';
            Object.entries(data.reflections).forEach(([q, a]) => {
              content += `  Q: ${q}\n  A: ${a}\n`;
            });
          }
          content += '\n';
        }
      });
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `therapy-integration-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const pendingHomework = homework.filter(h => !h.completed);
  const completedHomework = homework.filter(h => h.completed);

  const filteredActivities = selectedCategory === 'all'
    ? therapistClientActivities
    : therapistClientActivities.filter(a => a.category === selectedCategory);

  const completedActivitiesCount = Object.keys(activityProgress).length;

  if (activeActivity) {
    const step = activeActivity.steps[activeStep];
    const isLastStep = activeStep === activeActivity.steps.length - 1;
    const showReflection = isLastStep && activeStep === activeActivity.steps.length - 1;

    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.primary} ${theme.isDark ? 'text-slate-100' : ''}`}>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button
            onClick={() => { setActiveActivity(null); setIsTimerRunning(false); }}
            className={`inline-flex items-center gap-2 ${theme.isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-6 ${getAnimationClass('transition')}`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Activities
          </button>

          <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-6 mb-6`}>
            <div className="flex items-center justify-between mb-2">
              <h1 className={`text-2xl font-bold ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
                {activeActivity.title}
              </h1>
              <span className={`text-sm px-3 py-1 rounded-full ${theme.isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
                {activeActivity.duration}
              </span>
            </div>
            <p className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              {activeActivity.description}
            </p>

            <div className="flex items-center gap-2 mt-4">
              {activeActivity.steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${getAnimationClass('transition')}`}
                  style={{
                    backgroundColor: i <= activeStep ? theme.accentColor : (theme.isDark ? '#334155' : '#e2e8f0')
                  }}
                />
              ))}
            </div>
            <p className={`text-xs mt-2 ${theme.isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              Step {activeStep + 1} of {activeActivity.steps.length}
            </p>
          </div>

          <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-8 mb-6`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
              {step.title}
            </h2>
            <p className={`leading-relaxed mb-6 ${theme.isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              {step.instruction}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${theme.isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-700'} ${getAnimationClass('transition')}`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {formatTime(stepTimer)}
                </button>
                <span className={`text-sm ${theme.isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                  ~{step.duration} min suggested
                </span>
              </div>

              <div className="flex items-center gap-2">
                {activeStep > 0 && (
                  <button
                    onClick={prevStep}
                    className={`px-4 py-2 rounded-lg text-sm ${theme.isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-700'} ${getAnimationClass('transition')}`}
                  >
                    Previous
                  </button>
                )}
                {!isLastStep ? (
                  <button
                    onClick={nextStep}
                    className={`px-4 py-2 rounded-lg text-white text-sm ${getAnimationClass('transition')}`}
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={completeActivity}
                    className={`px-4 py-2 rounded-lg text-white text-sm ${getAnimationClass('transition')}`}
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    Complete Activity
                  </button>
                )}
              </div>
            </div>
          </div>

          {isLastStep && activeActivity.reflectionPrompts && (
            <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-6`}>
              <h3 className={`font-semibold mb-4 ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
                Reflection Questions
              </h3>
              <div className="space-y-4">
                {activeActivity.reflectionPrompts.map((prompt, i) => (
                  <div key={i}>
                    <label className={`text-sm font-medium ${theme.isDark ? 'text-slate-300' : 'text-gray-600'} block mb-1`}>
                      {prompt}
                    </label>
                    <textarea
                      value={activityReflections[prompt] || ''}
                      onChange={(e) => setActivityReflections(prev => ({ ...prev, [prompt]: e.target.value }))}
                      rows={2}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="Write your reflection..."
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.primary} ${theme.isDark ? 'text-slate-100' : ''}`}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 ${theme.isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-6 ${getAnimationClass('transition')}`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${theme.isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Therapy Integration
            </h1>
            <p className={theme.isDark ? 'text-slate-300' : 'text-gray-600'}>
              Bridge your in-person therapy with your self-guided healing work.
            </p>
          </div>
          {sessions.length > 0 && (
            <button
              onClick={exportSessionNotes}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${theme.isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-700'} ${getAnimationClass('transition')}`}
            >
              <Download className="w-4 h-4" />
              Export All
            </button>
          )}
        </div>

        <div className={`grid grid-cols-3 gap-3 mb-8 p-1 rounded-xl ${theme.isDark ? 'bg-slate-800/50' : 'bg-gray-100'}`}>
          {[
            { id: 'activities', label: 'Guided Activities', icon: Sparkles },
            { id: 'sessions', label: 'Session Notes', icon: Calendar },
            { id: 'homework', label: 'Homework', icon: CheckSquare }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${getAnimationClass('transition')} ${
                activeTab === tab.id
                  ? 'text-white shadow-md'
                  : theme.isDark ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === tab.id ? { backgroundColor: theme.accentColor } : {}}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'activities' && (
          <div>
            <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-6 mb-6`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: theme.accentColor + '20' }}>
                  <Users className="w-6 h-6" style={{ color: theme.accentColor }} />
                </div>
                <div>
                  <h2 className={`text-lg font-semibold ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
                    Therapist & Client Activities
                  </h2>
                  <p className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                    {completedActivitiesCount} of {therapistClientActivities.length} activities completed
                  </p>
                </div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.isDark ? '#334155' : '#e2e8f0' }}>
                <div
                  className={`h-full rounded-full ${getAnimationClass('transition')}`}
                  style={{ width: `${(completedActivitiesCount / therapistClientActivities.length) * 100}%`, backgroundColor: theme.accentColor }}
                />
              </div>
            </div>

            <div className="flex gap-2 mb-6 flex-wrap">
              {[
                { id: 'all', label: 'All' },
                { id: 'preparation', label: 'Before Session' },
                { id: 'in-session', label: 'With Therapist' },
                { id: 'after-session', label: 'After Session' },
                { id: 'daily-practice', label: 'Daily Practice' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${getAnimationClass('transition')} ${
                    selectedCategory === cat.id
                      ? 'text-white'
                      : theme.isDark ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-600'
                  }`}
                  style={selectedCategory === cat.id ? { backgroundColor: theme.accentColor } : {}}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredActivities.map(activity => {
                const IconComponent = iconMap[activity.icon] || Heart;
                const progress = activityProgress[activity.id];
                const catInfo = categoryLabels[activity.category];

                return (
                  <div
                    key={activity.id}
                    className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-6 ${getAnimationClass('transition')} hover:shadow-xl cursor-pointer`}
                    onClick={() => startActivity(activity)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl" style={{ backgroundColor: theme.accentColor + '20' }}>
                          <IconComponent className="w-5 h-5" style={{ color: theme.accentColor }} />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
                            {activity.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              catInfo.color === 'blue' ? (theme.isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700') :
                              catInfo.color === 'purple' ? (theme.isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700') :
                              catInfo.color === 'green' ? (theme.isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700') :
                              (theme.isDark ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-100 text-amber-700')
                            }`}>
                              {catInfo.label}
                            </span>
                            <span className={`text-xs ${theme.isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                              {activity.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      {progress && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" style={{ color: theme.accentColor }} />
                          <span className={`text-xs ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                            {progress.timesCompleted}x
                          </span>
                        </div>
                      )}
                    </div>
                    <p className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-600'} mb-3`}>
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${theme.isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                        {activity.steps.length} guided steps
                      </span>
                      <span className="text-sm font-medium" style={{ color: theme.accentColor }}>
                        {progress ? 'Do Again' : 'Start'} →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
                Session Notes
              </h2>
              <button
                onClick={() => setShowAddSession(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm ${getAnimationClass('transition')}`}
                style={{ backgroundColor: theme.accentColor }}
              >
                <Plus className="w-4 h-4" />
                Add Session
              </button>
            </div>

            {showAddSession && (
              <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-6 mb-4`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>New Session</h3>
                  <button onClick={() => setShowAddSession(false)} className="p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Session Date</label>
                    <input
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession(prev => ({ ...prev, date: e.target.value }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>My Notes</label>
                    <textarea
                      value={newSession.myNotes}
                      onChange={(e) => setNewSession(prev => ({ ...prev, myNotes: e.target.value }))}
                      rows={3}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="What came up for me in this session..."
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Parts Discussed</label>
                    <input
                      type="text"
                      value={newSession.partsDiscussed}
                      onChange={(e) => setNewSession(prev => ({ ...prev, partsDiscussed: e.target.value }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="e.g., Inner Critic, Wounded Child"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Key Insights</label>
                    <textarea
                      value={newSession.insights}
                      onChange={(e) => setNewSession(prev => ({ ...prev, insights: e.target.value }))}
                      rows={2}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="What did I learn or realize?"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Goals for Next Session</label>
                    <input
                      type="text"
                      value={newSession.nextSessionGoals}
                      onChange={(e) => setNewSession(prev => ({ ...prev, nextSessionGoals: e.target.value }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="What I want to explore next..."
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Therapist Notes (optional)</label>
                    <textarea
                      value={newSession.therapistNotes}
                      onChange={(e) => setNewSession(prev => ({ ...prev, therapistNotes: e.target.value }))}
                      rows={2}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="Notes or guidance from your therapist..."
                    />
                  </div>
                  <button
                    onClick={addSession}
                    className={`w-full py-2 rounded-lg text-white font-medium ${getAnimationClass('transition')}`}
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    Save Session
                  </button>
                </div>
              </div>
            )}

            {sessions.length === 0 ? (
              <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-8 text-center`}>
                <Calendar className={`w-12 h-12 mx-auto mb-3 ${theme.isDark ? 'text-slate-500' : 'text-gray-300'}`} />
                <p className={theme.isDark ? 'text-slate-400' : 'text-gray-500'}>
                  No sessions recorded yet. Add your first session after your next therapy appointment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map(session => (
                  <div
                    key={session.id}
                    className={`${theme.cardBg} backdrop-blur-sm rounded-xl shadow-sm border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} overflow-hidden`}
                  >
                    <button
                      onClick={() => setExpandedSession(expandedSession === session.id ? null : session.id)}
                      className={`w-full p-4 flex items-center justify-between ${getAnimationClass('transition')}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: theme.accentColor + '20' }}>
                          <Calendar className="w-5 h-5" style={{ color: theme.accentColor }} />
                        </div>
                        <div className="text-left">
                          <p className={`font-medium ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
                            {new Date(session.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </p>
                          {session.partsDiscussed && (
                            <p className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                              Parts: {session.partsDiscussed}
                            </p>
                          )}
                        </div>
                      </div>
                      {expandedSession === session.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    {expandedSession === session.id && (
                      <div className={`px-4 pb-4 border-t ${theme.isDark ? 'border-slate-700' : 'border-gray-100'}`}>
                        <div className="pt-4 space-y-4">
                          {session.myNotes && (
                            <div>
                              <h4 className={`text-sm font-medium ${theme.isDark ? 'text-slate-300' : 'text-gray-600'} mb-1`}>My Notes</h4>
                              <p className={`text-sm ${theme.isDark ? 'text-slate-200' : 'text-gray-700'}`}>{session.myNotes}</p>
                            </div>
                          )}
                          {session.insights && (
                            <div>
                              <h4 className={`text-sm font-medium ${theme.isDark ? 'text-slate-300' : 'text-gray-600'} mb-1`}>Key Insights</h4>
                              <p className={`text-sm ${theme.isDark ? 'text-slate-200' : 'text-gray-700'}`}>{session.insights}</p>
                            </div>
                          )}
                          {session.nextSessionGoals && (
                            <div>
                              <h4 className={`text-sm font-medium ${theme.isDark ? 'text-slate-300' : 'text-gray-600'} mb-1`}>Next Session Goals</h4>
                              <p className={`text-sm ${theme.isDark ? 'text-slate-200' : 'text-gray-700'}`}>{session.nextSessionGoals}</p>
                            </div>
                          )}
                          {session.therapistNotes && (
                            <div>
                              <h4 className={`text-sm font-medium ${theme.isDark ? 'text-slate-300' : 'text-gray-600'} mb-1`}>Therapist Notes</h4>
                              <p className={`text-sm ${theme.isDark ? 'text-slate-200' : 'text-gray-700'}`}>{session.therapistNotes}</p>
                            </div>
                          )}
                          <button
                            onClick={() => deleteSession(session.id)}
                            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete Session
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'homework' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>
                Homework & Tasks
              </h2>
              <button
                onClick={() => setShowAddHomework(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm ${getAnimationClass('transition')}`}
                style={{ backgroundColor: theme.accentColor }}
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>

            {showAddHomework && (
              <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-6 mb-4`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>New Homework</h3>
                  <button onClick={() => setShowAddHomework(false)} className="p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Task Title</label>
                    <input
                      type="text"
                      value={newHomework.title}
                      onChange={(e) => setNewHomework(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="e.g., Journal about inner critic"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Description</label>
                    <textarea
                      value={newHomework.description}
                      onChange={(e) => setNewHomework(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                      placeholder="Details about the assignment..."
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>Due Date (optional)</label>
                    <input
                      type="date"
                      value={newHomework.dueDate}
                      onChange={(e) => setNewHomework(prev => ({ ...prev, dueDate: e.target.value }))}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border ${theme.isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200'}`}
                    />
                  </div>
                  <button
                    onClick={addHomework}
                    className={`w-full py-2 rounded-lg text-white font-medium ${getAnimationClass('transition')}`}
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    Add Homework
                  </button>
                </div>
              </div>
            )}

            {pendingHomework.length > 0 && (
              <div className="mb-6">
                <h3 className={`text-sm font-medium ${theme.isDark ? 'text-slate-400' : 'text-gray-500'} mb-3`}>Pending</h3>
                <div className="space-y-2">
                  {pendingHomework.map(hw => (
                    <div
                      key={hw.id}
                      className={`${theme.cardBg} backdrop-blur-sm rounded-xl shadow-sm border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-4 flex items-start gap-3`}
                    >
                      <button
                        onClick={() => toggleHomework(hw.id)}
                        className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 ${theme.isDark ? 'border-slate-500' : 'border-gray-300'}`}
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${theme.isDark ? 'text-white' : 'text-gray-900'}`}>{hw.title}</p>
                        {hw.description && (
                          <p className={`text-sm ${theme.isDark ? 'text-slate-400' : 'text-gray-500'} mt-1`}>{hw.description}</p>
                        )}
                        {hw.dueDate && (
                          <p className={`text-xs ${theme.isDark ? 'text-slate-500' : 'text-gray-400'} mt-2 flex items-center gap-1`}>
                            <Clock className="w-3 h-3" />
                            Due: {new Date(hw.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteHomework(hw.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {completedHomework.length > 0 && (
              <div>
                <h3 className={`text-sm font-medium ${theme.isDark ? 'text-slate-400' : 'text-gray-500'} mb-3`}>Completed</h3>
                <div className="space-y-2">
                  {completedHomework.map(hw => (
                    <div
                      key={hw.id}
                      className={`${theme.cardBg} backdrop-blur-sm rounded-xl shadow-sm border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-4 flex items-start gap-3 opacity-60`}
                    >
                      <button
                        onClick={() => toggleHomework(hw.id)}
                        className="mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-white"
                        style={{ backgroundColor: theme.accentColor }}
                      >
                        <CheckSquare className="w-4 h-4" />
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium line-through ${theme.isDark ? 'text-slate-400' : 'text-gray-500'}`}>{hw.title}</p>
                      </div>
                      <button
                        onClick={() => deleteHomework(hw.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {homework.length === 0 && !showAddHomework && (
              <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl shadow-lg border ${theme.isDark ? 'border-slate-700' : 'border-gray-100'} p-8 text-center`}>
                <CheckSquare className={`w-12 h-12 mx-auto mb-3 ${theme.isDark ? 'text-slate-500' : 'text-gray-300'}`} />
                <p className={theme.isDark ? 'text-slate-400' : 'text-gray-500'}>
                  No homework assigned yet. Add tasks from your therapy sessions.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
