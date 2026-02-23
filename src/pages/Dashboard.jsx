import { useNavigate } from 'react-router-dom';
import { Target, GraduationCap, BookOpen, FileText, MessageSquare, Calendar, Users, ArrowRight } from 'lucide-react';

const modules = [
  {
    id: 'strategy',
    name: 'Strategy',
    description: 'Define your MBA strategy and goals',
    icon: Target,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'school-selection',
    name: 'School Selection',
    description: 'Research and select target schools',
    icon: GraduationCap,
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 'stories',
    name: 'Build Your Stories',
    description: 'Craft compelling narratives',
    icon: BookOpen,
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'materials',
    name: 'Application Materials',
    description: 'Prepare your application documents',
    icon: FileText,
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 'interview',
    name: 'Interview Prep',
    description: 'Practice and prepare for interviews',
    icon: MessageSquare,
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 'plan',
    name: 'Application Plan',
    description: 'Timeline and milestone tracking',
    icon: Calendar,
    color: 'from-emerald-500 to-emerald-600',
  },
];

const coachMarketplace = {
  name: 'Coach Marketplace',
  description: 'Find your perfect admissions coach',
  icon: Users,
  color: 'from-violet-500 to-purple-600',
};

export default function Dashboard() {
  const navigate = useNavigate();

  const handleModuleClick = (moduleId) => {
    switch (moduleId) {
      case 'strategy':
        break;
      case 'school-selection':
        navigate('/schools');
        break;
      case 'stories':
        navigate('/stories');
        break;
      case 'materials':
        navigate('/application');
        break;
      case 'interview':
        navigate('/interview');
        break;
      case 'plan':
        navigate('/plan');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Offerland</h1>
        <p className="text-gray-600 mb-8">Your journey to MBA admission starts here</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all text-left group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-4`}>
                <module.icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                {module.name}
              </h3>
              <p className="text-gray-500 text-sm">{module.description}</p>
              <div className="mt-4 flex items-center text-purple-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Enter</span>
                <ArrowRight size={16} className="ml-1" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => {}}
            className="w-full bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <coachMarketplace.icon className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{coachMarketplace.name}</h3>
                  <p className="text-white/80 text-sm">{coachMarketplace.description}</p>
                </div>
              </div>
              <ArrowRight className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" size={24} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
