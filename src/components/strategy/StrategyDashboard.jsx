import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Check } from 'lucide-react';
import { useUser } from '../../context/useUser';
import { strategyData } from '../../data/strategy';
import BackButton from '../../components/common/BackButton';

export default function StrategyDashboard() {
  const navigate = useNavigate();
  const { isPaidUser, categoryProgress } = useUser();
  const [partACompleted, setPartACompleted] = useState(() => {
    return localStorage.getItem('offerland_part_a_completed') === 'true';
  });
  const [partBCompleted, setPartBCompleted] = useState(() => {
    return localStorage.getItem('offerland_part_b_completed') === 'true';
  });
  const [partCCompleted, setPartCCompleted] = useState(() => {
    return localStorage.getItem('offerland_part_c_completed') === 'true';
  });
  const [partDCompleted, setPartDCompleted] = useState(() => {
    return localStorage.getItem('offerland_part_d_completed') === 'true';
  });

  useEffect(() => {
    const stored = localStorage.getItem('offerland_part_a_completed') === 'true';
    setPartACompleted(stored);
    setPartBCompleted(localStorage.getItem('offerland_part_b_completed') === 'true');
    setPartCCompleted(localStorage.getItem('offerland_part_c_completed') === 'true');
    setPartDCompleted(localStorage.getItem('offerland_part_d_completed') === 'true');
  }, []);

  const getStatus = (partId) => {
    if (partId === 'part-a' && partACompleted) return 'completed';
    if (partId === 'part-b' && partBCompleted) return 'completed';
    if (partId === 'part-c' && partCCompleted) return 'completed';
    if (partId === 'part-d' && partDCompleted) return 'completed';
    const progress = categoryProgress[`strategy_${partId}`];
    if (progress === 'completed') return 'completed';
    if (progress === 'in_progress') return 'in_progress';
    return 'not_started';
  };

  const handlePartAClick = () => {
    navigate('/strategy/part-a-welcome');
  };

  const handlePartClick = (partId) => {
    if (!isPaidUser) {
      navigate('/pricing');
      return;
    }
    switch(partId) {
      case 'part-b':
        navigate('/strategy/part-b-intro');
        break;
      case 'part-c':
        navigate('/strategy/part-c-intro');
        break;
      case 'part-d':
        navigate('/strategy/part-d-intro');
        break;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BackButton to="/dashboard">← Back to Dashboard</BackButton>

        <div className="mb-8 mt-4">
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
            Strategy
          </h1>
          <p className="text-gray-500 font-light text-lg">
            Map your path to business school.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-3 uppercase tracking-wide">Required</p>
          
          <div 
            onClick={handlePartAClick}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-normal text-gray-900 mb-1">
                  Initial Assessment
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {strategyData.dashboard.partA.description}
                </p>
                <p className="text-xs text-gray-400">
                  {strategyData.dashboard.partA.time}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatus('part-a') === 'completed' ? (
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <Check size={14} />
                    Completed
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">
                    Not started
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-3 uppercase tracking-wide">
            We also strongly encourage you to complete these modules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strategyData.dashboard.parts.map((part) => {
            const status = getStatus(part.id);
            const isLocked = !isPaidUser;

            return (
              <div 
                key={part.id}
                onClick={() => handlePartClick(part.id)}
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:shadow-md transition-all relative ${isLocked ? 'overflow-hidden' : ''}`}
              >
                {isLocked && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center">
                    <Lock size={24} className="text-gray-400 mb-1" />
                    <p className="text-gray-500 text-xs mb-2">Upgrade to unlock</p>
                    <button className="px-4 py-2 bg-purple-600 text-white text-xs font-medium rounded-lg">
                      Upgrade Now
                    </button>
                  </div>
                )}
                
                <h3 className="text-lg font-normal text-gray-900 mb-2">
                  {part.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {part.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    {part.time}
                  </p>
                  <div>
                    {status === 'completed' && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <Check size={14} />
                        Completed
                      </span>
                    )}
                    {status === 'in_progress' && (
                      <span className="text-xs text-purple-600">
                        In progress
                      </span>
                    )}
                    {status === 'not_started' && (
                      <span className="text-xs text-gray-400">
                        Not started
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
