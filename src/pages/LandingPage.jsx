import { useNavigate } from 'react-router-dom';
import { Check, Star, TrendingUp, Users, Award, Sparkles, GraduationCap } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Strategy",
      description: "Initial assessment and career vision planning"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "School Selection",
      description: "Curated insights for 50+ top MBA programs"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Build Your Stories",
      description: "AI-powered brainstorming for compelling essays"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Application Materials",
      description: "Expert guidance for essays, resume & more"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Interview Prep",
      description: "Common questions and proven answer strategies"
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "Application Plan",
      description: "Stay organized with your personalized checklist"
    }
  ];

  const coaches = [
    {
      name: "Jennifer Wu",
      credential: "Former HBS Admissions Committee",
      specialty: "Specializes in career changer applications"
    },
    {
      name: "David Chen",
      credential: "Wharton MBA '18, ex-McKinsey",
      specialty: "Expert in consulting-to-tech transitions"
    },
    {
      name: "Sarah Mitchell",
      credential: "Stanford GSB Alum, 10+ years coaching",
      specialty: "Focuses on leadership narratives"
    },
    {
      name: "Michael Rodriguez",
      credential: "Kellogg MBA '15, former Admissions Reader",
      specialty: "Strong track record with international applicants"
    }
  ];

  const differentiators = [
    "AI-powered brainstorming that brings out your unique story",
    "Curated insights from verified admissions experts",
    "Structured journey from strategy to acceptance",
    "Connect with verified MBA coaches for personalized guidance"
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Offerland</span>
          </div>
          <button 
            onClick={() => navigate('/signup')}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                AI just made MBA applications
                <span className="text-purple-600"> very different</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your comprehensive MBA application toolkit that makes professional consulting accessible to everyone. From strategy to acceptance.
              </p>
              <button 
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
              >
                Start Free
              </button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 aspect-square max-w-lg mx-auto">
                <div className="grid grid-cols-3 gap-3 h-full">
                  {features.map((f, i) => (
                    <div key={i} className={`bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm ${
                      i === 0 ? 'col-span-3' : ''
                    }`}>
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
                        {f.icon}
                      </div>
                      <span className="text-xs font-medium text-gray-700">{f.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Powered by Experienced Coaches
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {coaches.map((coach, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap size={32} className="text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-center mb-1">{coach.name}</h3>
                <p className="text-sm text-purple-600 text-center mb-3">{coach.credential}</p>
                <p className="text-sm text-gray-500 text-center">{coach.specialty}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-500">
            Trusted by applicants from <span className="font-medium text-gray-700">McKinsey, Google, Goldman Sachs</span> and more
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Your Complete MBA Journey
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Six integrated lands covering every aspect of your application
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center mb-12">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Users size={32} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI gets you started. Expert coaches take you further.
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Connect with verified MBA coaches for personalized guidance. Our marketplace features former admissions committee members and successful alumni.
            </p>
          </div>

          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
              {differentiators.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={18} className="text-green-500" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Your Free Journey
          </h2>
          <p className="text-purple-100 text-lg mb-8">
            Join thousands of applicants who have transformed their MBA applications with Offerland.
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="px-10 py-4 bg-white text-purple-700 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            Get Started Free
          </button>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">O</span>
            </div>
            <span className="font-medium text-gray-900">Offerland</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2025 Offerland. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
