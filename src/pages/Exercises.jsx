import { useState } from 'react';
import { Play, Pause, RotateCcw, Heart, Brain, Sparkles } from 'lucide-react';

const Exercises = () => {
  const [activeExercise, setActiveExercise] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);

  const exercises = [
    {
      id: 1,
      title: "Meet Your Parts",
      icon: Heart,
      duration: "10 minutes",
      color: "from-pink-400 to-red-400",
      description: "A gentle introduction to identifying and connecting with your internal parts.",
      steps: [
        {
          title: "Find a Comfortable Space",
          content: "Sit or lie down in a quiet, comfortable place where you won't be disturbed. Close your eyes or soften your gaze.",
          duration: 60
        },
        {
          title: "Take Three Deep Breaths",
          content: "Breathe in slowly through your nose, hold for a moment, and exhale through your mouth. Feel your body settling.",
          duration: 90
        },
        {
          title: "Notice What's Present",
          content: "Without judgment, notice what thoughts, feelings, or sensations are present right now. Just observe.",
          duration: 120
        },
        {
          title: "Ask: 'Who's Here?'",
          content: "Gently ask yourself: 'What part of me is showing up right now?' Notice what comes to mind—a feeling, an image, a voice, or a sensation.",
          duration: 180
        },
        {
          title: "Get Curious",
          content: "If a part shows up, get curious about it. How does it feel? Where do you notice it in your body? What does it want you to know?",
          duration: 180
        },
        {
          title: "Thank the Part",
          content: "Thank the part for showing up and for all the ways it has tried to protect you. Let it know you're here to listen.",
          duration: 120
        },
        {
          title: "Return Gently",
          content: "When you're ready, take a few deep breaths and slowly return your awareness to the room. Open your eyes.",
          duration: 60
        }
      ]
    },
    {
      id: 2,
      title: "Self-Energy Check-In",
      icon: Sparkles,
      duration: "5 minutes",
      color: "from-yellow-400 to-orange-400",
      description: "Assess your connection to Self-energy using the 8 C's.",
      steps: [
        {
          title: "Center Yourself",
          content: "Take a moment to pause and breathe. Notice your current state without judgment.",
          duration: 60
        },
        {
          title: "Check for Calmness",
          content: "Do you feel calm in your body? Or is there tension, anxiety, or restlessness? Just notice.",
          duration: 60
        },
        {
          title: "Check for Curiosity",
          content: "Are you curious about what's happening inside you? Or do you feel defensive, shut down, or judgmental?",
          duration: 60
        },
        {
          title: "Check for Compassion",
          content: "Can you feel compassion for yourself and your parts? Or is there criticism or harshness?",
          duration: 60
        },
        {
          title: "Check for Clarity",
          content: "Do you have clarity about what's happening? Or is there confusion or overwhelm?",
          duration: 60
        },
        {
          title: "Notice What's Blocking Self",
          content: "If you're not feeling the C's, what part has taken over? Can you acknowledge it with kindness?",
          duration: 90
        },
        {
          title: "Invite Self Back",
          content: "Gently ask any protective parts if they'd be willing to step back a little, so you can lead from Self.",
          duration: 90
        }
      ]
    },
    {
      id: 3,
      title: "Dialogue with a Part",
      icon: Brain,
      duration: "15 minutes",
      color: "from-blue-400 to-purple-400",
      description: "Have a compassionate conversation with one of your parts.",
      steps: [
        {
          title: "Identify the Part",
          content: "Think of a part that's been active recently—maybe anxiety, perfectionism, or self-criticism. Notice where you feel it in your body.",
          duration: 120
        },
        {
          title: "Ask Permission",
          content: "Ask the part: 'Would you be willing to talk with me?' Wait for a sense of yes or no.",
          duration: 90
        },
        {
          title: "Get to Know It",
          content: "Ask: 'How old do you feel?' 'What do you want me to know?' 'What are you afraid will happen if you stop doing your job?'",
          duration: 180
        },
        {
          title: "Listen Without Judgment",
          content: "Just listen. Don't try to fix, change, or convince the part of anything. Let it share its story.",
          duration: 180
        },
        {
          title: "Acknowledge Its Efforts",
          content: "Thank the part for working so hard to protect you. Let it know you see how much it's been carrying.",
          duration: 120
        },
        {
          title: "Ask What It Needs",
          content: "Ask: 'What do you need from me?' or 'How can I help you feel safe?' Listen for the answer.",
          duration: 120
        },
        {
          title: "Offer Reassurance",
          content: "Let the part know you're here now, and you can handle things from your Self. It doesn't have to work so hard anymore.",
          duration: 120
        },
        {
          title: "Close with Gratitude",
          content: "Thank the part again. Let it know you'll check in with it regularly. Slowly return to the present moment.",
          duration: 90
        }
      ]
    }
  ];

  const startExercise = (exercise) => {
    setActiveExercise(exercise);
    setCurrentStep(0);
    setIsPlaying(false);
    setTimer(0);
  };

  const nextStep = () => {
    if (currentStep < activeExercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimer(0);
    } else {
      setActiveExercise(null);
      setCurrentStep(0);
      setTimer(0);
      setIsPlaying(false);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimer(0);
    }
  };

  const resetExercise = () => {
    setCurrentStep(0);
    setTimer(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-xl">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Guided Exercises
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practice connecting with your parts through guided meditations and exercises
          </p>
        </div>

        {!activeExercise ? (
          <>
            {/* Introduction */}
            <div className="card mb-12 bg-gradient-to-br from-green-50 to-teal-50">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">How to Use These Exercises</h2>
              <div className="space-y-3 text-gray-700">
                <p className="text-lg">
                  These guided exercises help you practice the core skills of IFS therapy: identifying parts, 
                  connecting with Self-energy, and building compassionate relationships with your internal system.
                </p>
                <p className="text-lg">
                  Find a quiet space where you won't be interrupted. You can read through each step at your own 
                  pace, or use the timer feature to guide you through the exercise.
                </p>
                <p className="text-lg font-semibold">
                  Remember: There's no "right" way to do these exercises. Trust your process and be gentle with yourself.
                </p>
              </div>
            </div>

            {/* Exercise Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exercises.map((exercise) => {
                const Icon = exercise.icon;
                return (
                  <div
                    key={exercise.id}
                    className="card hover:scale-105 transform transition-all duration-300 cursor-pointer"
                    onClick={() => startExercise(exercise)}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${exercise.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{exercise.title}</h3>
                    <p className="text-gray-600 mb-4">{exercise.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-purple-600">{exercise.duration}</span>
                      <span className="text-sm font-semibold text-gray-600">{exercise.steps.length} steps</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Exercise Header */}
            <div className="card mb-8 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-800">{activeExercise.title}</h2>
                <button
                  onClick={() => setActiveExercise(null)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
                >
                  Exit
                </button>
              </div>
              <div className="flex items-center space-x-4 text-gray-600">
                <span>Step {currentStep + 1} of {activeExercise.steps.length}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / activeExercise.steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Current Step */}
            <div className="card mb-8 bg-gradient-to-br from-white to-purple-50">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                {activeExercise.steps[currentStep].title}
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {activeExercise.steps[currentStep].content}
              </p>
              
              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white">
                  <span className="text-4xl font-bold">
                    {Math.floor(activeExercise.steps[currentStep].duration / 60)}:
                    {(activeExercise.steps[currentStep].duration % 60).toString().padStart(2, '0')}
                  </span>
                  <p className="text-sm mt-1">Suggested duration</p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={previousStep}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentStep === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={resetExercise}
                  className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
                >
                  {currentStep === activeExercise.steps.length - 1 ? 'Complete' : 'Next'}
                </button>
              </div>
            </div>

            {/* All Steps Preview */}
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Exercise Steps</h3>
              <div className="space-y-3">
                {activeExercise.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400'
                        : index < currentStep
                        ? 'bg-green-50 border-2 border-green-300'
                        : 'bg-gray-50 border-2 border-gray-200'
                    }`}
                    onClick={() => {
                      setCurrentStep(index);
                      setTimer(0);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === currentStep
                          ? 'bg-purple-600 text-white'
                          : index < currentStep
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`font-semibold ${
                        index === currentStep ? 'text-purple-800' : 'text-gray-700'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercises;