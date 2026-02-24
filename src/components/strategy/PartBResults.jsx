import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { strategyData } from '../../data/strategy';
import BackButton from '../../components/common/BackButton';

export default function PartBResults() {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState({});
  const [showStartOver, setShowStartOver] = useState(false);

  const { strengths, weaknesses } = strategyData.partB.results;

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleStartOver = () => {
    setShowStartOver(true);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BackButton to="/strategy">← Back to Strategy</BackButton>

        <div className="mt-8">
          <h1 className="text-3xl font-light text-gray-900 mb-8 tracking-tight">
            Your Strengths & Weaknesses
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-normal text-gray-900 mb-4">Strengths</h2>
              <div className="space-y-3">
                {strengths.map((item, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleExpand(`strength-${idx}`)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                    >
                      <span className="text-sm text-gray-700">{item.title}</span>
                      {expandedItems[`strength-${idx}`] ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>
                    {expandedItems[`strength-${idx}`] && (
                      <div className="px-3 pb-3">
                        <p className="text-xs text-gray-500">{item.tip}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-normal text-gray-900 mb-4">Areas to Improve</h2>
              <div className="space-y-3">
                {weaknesses.map((item, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleExpand(`weakness-${idx}`)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                    >
                      <span className="text-sm text-gray-700">{item.title}</span>
                      {expandedItems[`weakness-${idx}`] ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>
                    {expandedItems[`weakness-${idx}`] && (
                      <div className="px-3 pb-3">
                        <p className="text-xs text-gray-500">{item.tip}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <button 
              onClick={handleStartOver}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Start Over
            </button>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/strategy')}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Back to Strategy
              </button>
              <button 
                onClick={() => navigate('/strategy/part-c-intro')}
                className="px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Continue to Career Vision →
              </button>
            </div>
          </div>

          {showStartOver && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
                <p className="text-gray-700 mb-4">
                  Start Over feature coming soon. If you have any considerations, please email us at support@example.com
                </p>
                <button 
                  onClick={() => setShowStartOver(false)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
