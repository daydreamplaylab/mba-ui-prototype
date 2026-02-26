import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, GraduationCap, BookOpen, FileText, MessageSquare, Calendar, Lock, Compass, Search, Pen, MessageCircle, Castle, FileStack } from 'lucide-react';
import GiftCardModal from '../components/common/GiftCardModal';
import MiloChatbot from '../components/common/MiloChatbot';
import { useUser } from '../context/useUser';

const lands = [
  {
    id: 'strategy',
    name: 'Strategy',
    subtitle: 'Define your MBA strategy',
    icon: Compass,
    color: '#9333ea',
    gradient: 'from-purple-500 to-purple-600',
    position: 'top-left',
  },
  {
    id: 'school-selection',
    name: 'School Selection',
    subtitle: 'Research target schools',
    icon: Search,
    color: '#ec4899',
    gradient: 'from-pink-500 to-pink-600',
    position: 'top-right',
  },
  {
    id: 'stories',
    name: 'Build Your Stories',
    subtitle: 'Craft compelling narratives',
    icon: Pen,
    color: '#6366f1',
    gradient: 'from-indigo-500 to-indigo-600',
    position: 'left',
  },
  {
    id: 'materials',
    name: 'Application Materials',
    subtitle: 'Prepare documents',
    icon: FileStack,
    color: '#f59e0b',
    gradient: 'from-amber-500 to-amber-600',
    position: 'right',
  },
  {
    id: 'interview',
    name: 'Interview Prep',
    subtitle: 'Practice and prepare',
    icon: MessageCircle,
    color: '#14b8a6',
    gradient: 'from-teal-500 to-teal-600',
    position: 'bottom-left',
  },
  {
    id: 'coaches',
    name: 'Coach Marketplace',
    subtitle: 'Find your perfect admissions coach',
    icon: Castle,
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-violet-600',
    position: 'bottom-right',
    isCastle: true,
  },
];

function Island({ land, isLocked, isFirstUser, onClick, showTooltip }) {
  const Icon = land.icon;
  
  const positions = {
    'top-left': { top: '8%', left: '15%' },
    'top-right': { top: '8%', right: '15%' },
    'left': { top: '45%', left: '5%' },
    'right': { top: '45%', right: '5%' },
    'bottom-left': { bottom: '12%', left: '20%' },
    'bottom-right': { bottom: '12%', right: '20%' },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };

  const pos = positions[land.position];
  const isCenter = land.id === 'plan';

  return (
    <div 
      className={`absolute cursor-pointer transition-all duration-300 ${isLocked ? 'opacity-40 grayscale' : 'hover:scale-105'}`}
      style={pos}
      onClick={isLocked ? () => onClick(land.id) : () => onClick(land.id)}
    >
      {showTooltip && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20">
          Complete your assessment in Strategy to unlock all Lands
        </div>
      )}
      
      {isFirstUser && land.id === 'strategy' && !isLocked && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 animate-bounce bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
          Start Here
        </div>
      )}
      
      {land.isCastle ? (
        <div className={`w-28 h-28 ${isLocked ? 'grayscale' : ''}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`castle-${land.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={land.color} />
                <stop offset="100%" stopColor={land.color} opacity="0.7" />
              </linearGradient>
            </defs>
            <path 
              d="M50 5 L55 20 L55 35 L70 35 L70 45 L80 45 L80 60 L85 60 L85 80 L90 80 L90 95 L10 95 L10 80 L15 80 L15 60 L20 60 L20 45 L30 45 L30 35 L45 35 L45 20 Z" 
              fill={`url(#castle-${land.id})`}
              stroke={land.color}
              strokeWidth="2"
            />
            <rect x="35" y="65" width="12" height="30" fill="#1f2937" rx="2" />
            <rect x="53" y="65" width="12" height="30" fill="#1f2937" rx="2" />
            <rect x="40" y="40" width="8" height="10" fill="#1f2937" rx="1" />
            <rect x="52" y="40" width="8" height="10" fill="#1f2937" rx="1" />
          </svg>
        </div>
      ) : isCenter ? (
        <div className="w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`island-${land.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={land.color} />
                <stop offset="100%" stopColor={land.color} opacity="0.6" />
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="55" rx="45" ry="35" fill={`url(#island-${land.id})`} />
            <ellipse cx="50" cy="50" rx="40" ry="28" fill={land.color} opacity="0.8" />
          </svg>
        </div>
      ) : (
        <div className="w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`island-${land.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={land.color} />
                <stop offset="100%" stopColor={land.color} opacity="0.7" />
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="55" rx="40" ry="30" fill={`url(#island-${land.id})`} />
            <ellipse cx="50" cy="50" rx="35" ry="23" fill={land.color} opacity="0.6" />
          </svg>
        </div>
      )}
      
      <div className={`absolute ${isCenter ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'bottom-0 left-1/2 -translate-x-1/2'} text-center`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1 ${isLocked ? 'bg-gray-300' : `bg-gradient-to-br ${land.gradient}`}`}>
          <Icon className="text-white" size={20} />
        </div>
        <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{land.name}</p>
        {land.subtitle && (
          <p className="text-xs text-gray-500 whitespace-nowrap">{land.subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { isPaidUser } = useUser();
  const [partACompleted, setPartACompleted] = useState(() => {
    return localStorage.getItem('offerland_part_a_completed') === 'true';
  });
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [giftClaimed, setGiftClaimed] = useState(() => {
    return localStorage.getItem('offerland_gift_card_claimed') === 'true';
  });
  const [showLockedTooltip, setShowLockedTooltip] = useState(null);

  const isFirstUser = !partACompleted;

  useEffect(() => {
    const stored = localStorage.getItem('offerland_part_a_completed') === 'true';
    setPartACompleted(stored);
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      const stored = localStorage.getItem('offerland_part_a_completed') === 'true';
      setPartACompleted(stored);
      const claimed = localStorage.getItem('offerland_gift_card_claimed') === 'true';
      setGiftClaimed(claimed);
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  useEffect(() => {
    if (partACompleted && !giftClaimed) {
      const timer = setTimeout(() => {
        setShowGiftModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [partACompleted, giftClaimed]);

  const handleIslandClick = (landId) => {
    if (isFirstUser && landId !== 'strategy') {
      setShowLockedTooltip(landId);
      setTimeout(() => setShowLockedTooltip(null), 3000);
      return;
    }
    
    switch (landId) {
      case 'strategy':
        navigate('/strategy');
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
      case 'coaches':
        navigate('/coach-marketplace/browse');
        break;
      default:
        break;
    }
  };

  const handleClaimGift = () => {
    setGiftClaimed(true);
    localStorage.setItem('offerland_gift_card_claimed', 'true');
    setShowGiftModal(false);
  };

  const handleCloseGift = () => {
    setShowGiftModal(false);
  };

  const tasksDone = 5;
  const totalTasks = 20;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {showGiftModal && (
        <GiftCardModal onClose={handleCloseGift} onClaim={handleClaimGift} />
      )}
      
      <MiloChatbot />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Offerland</h1>
          <p className="text-gray-600 text-lg">Your journey to MBA admission starts here</p>
        </div>

        <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-cyan-200 via-blue-200 to-teal-200 rounded-3xl overflow-hidden shadow-2xl">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="wave" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q25 0 50 10 T100 10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
              </pattern>
              <pattern id="wave2" x="0" y="0" width="100" height="30" patternUnits="userSpaceOnUse">
                <path d="M0 15 Q25 5 50 15 T100 15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave)" />
            <rect width="100%" height="100%" fill="url(#wave2)" />
          </svg>

          <Island 
            land={{ id: 'plan', name: 'Application Plan', subtitle: 'Track your progress', icon: Calendar, color: '#06b6d4', gradient: 'from-cyan-500 to-cyan-600', position: 'center' }}
            isLocked={isFirstUser}
            isFirstUser={isFirstUser}
            onClick={handleIslandClick}
            showTooltip={isFirstUser}
          />

          {lands.map((land) => (
            <Island 
              key={land.id}
              land={land}
              isLocked={isFirstUser && land.id !== 'strategy'}
              isFirstUser={isFirstUser}
              onClick={handleIslandClick}
              showTooltip={showLockedTooltip === land.id}
            />
          ))}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16 text-center pointer-events-none">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${partACompleted ? 'bg-cyan-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              {partACompleted ? `${tasksDone}/${totalTasks} tasks done` : '0/20 tasks done'}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {isFirstUser ? 'Start with Strategy to begin your journey' : 'Click on any island to explore'}
          </p>
        </div>
      </div>
    </div>
  );
}
