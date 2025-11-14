import { Link } from 'react-router-dom';
import { BookOpen, Heart, Map, Lightbulb, User, ArrowRight, Sparkles, Play, CheckCircle, Book } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'IFS Cheat Sheet',
      description: 'Quick reference guide to Internal Family Systems principles and techniques',
      link: '/cheat-sheet',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Heart,
      title: '10 Common Wounds',
      description: 'Explore the root causes and manifestations of inner child wounds',
      link: '/wounds',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: Lightbulb,
      title: 'Qualities of Self',
      description: 'Discover the 8 C\'s and 5 P\'s that define your authentic Self',
      link: '/qualities',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: Map,
      title: 'Parts Mapping',
      description: 'Interactive tool to identify and understand your internal parts',
      link: '/parts-mapping',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Play,
      title: 'Guided Exercises',
      description: 'Practice connecting with your parts through guided meditations',
      link: '/exercises',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: CheckCircle,
      title: 'Self-Assessment',
      description: 'Gain insights into your inner world through guided assessments',
      link: '/assessment',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      icon: Book,
      title: 'Resource Library',
      description: 'Curated books, videos, and resources to deepen your practice',
      link: '/resources',
      color: 'from-teal-400 to-teal-600'
    },
    {
      icon: User,
      title: 'Personal Journal',
      description: 'Track your healing journey and insights',
      link: '/journal',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-lg rounded-full flex items-center justify-center">
                <Sparkles className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The Luminous Self
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-purple-100">
              A Curriculum for Healing Your Inner World
            </p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-purple-50">
              Discover the power of Internal Family Systems (IFS) therapy to heal your inner child wounds, 
              understand your protective parts, and reconnect with your authentic Self.
            </p>
            <Link
              to="/cheat-sheet"
              className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span>Begin Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Core Philosophy Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            The Foundation: "No Bad Parts"
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The most important principle of this entire curriculum is the philosophy of <strong>"No Bad Parts."</strong> 
            There are no "bad" parts of you. Every part, even those that seem disruptive or harmful, 
            was created to protect you from overwhelming pain.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Instead of battling yourself, you'll learn to lead with curiosity and compassion, 
            understanding that each part has a valuable role and deserves to be heard, honored, and healed.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Explore the Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.link}
                className="group card hover:scale-105 transform transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Key Concepts Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Key IFS Concepts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">The Self</h3>
              <p className="text-gray-700">
                Your core essence - calm, curious, compassionate, and confident. 
                The Self is the natural leader of your internal system.
              </p>
            </div>
            <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Protectors</h3>
              <p className="text-gray-700">
                Managers and Firefighters work to keep you safe from overwhelming emotions 
                and painful memories stored in your Exiles.
              </p>
            </div>
            <div className="card bg-gradient-to-br from-pink-50 to-pink-100">
              <h3 className="text-2xl font-bold text-pink-800 mb-4">Exiles</h3>
              <p className="text-gray-700">
                Young, vulnerable parts carrying pain, trauma, and unmet needs from your past. 
                They need your compassion and healing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card bg-gradient-to-br from-purple-600 to-pink-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Healing Journey?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Start exploring the tools and resources designed to help you understand and heal your inner world.
          </p>
          <Link
            to="/cheat-sheet"
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 shadow-xl"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;