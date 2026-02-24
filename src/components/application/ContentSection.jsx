import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Lock, Check } from 'lucide-react';
import { useUser } from '../../context/useUser';

export default function ContentSection({ title, topics, sectionKey, onMarkComplete }) {
  const navigate = useNavigate();
  const { isPaidUser } = useUser();
  const [expandedTopics, setExpandedTopics] = useState({ 0: true });
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleTopic = (index) => {
    setExpandedTopics(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleMarkComplete = (completed) => {
    if (completed) {
      setIsCompleted(true);
    }
    if (onMarkComplete) {
      onMarkComplete(completed);
    }
  };

  const handleUpgradeClick = () => {
    navigate('/pricing');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {topics.map((topic, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => toggleTopic(index)}
              className={`w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors ${
                index === 0 ? 'bg-purple-50/50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${index === 0 ? 'text-purple-600' : 'text-gray-900'}`}>
                  {index + 1}.
                </span>
                <span className={`font-normal ${index === 0 ? 'text-purple-900' : 'text-gray-900'}`}>
                  {topic.title}
                </span>
                {index > 0 && !isPaidUser && (
                  <Lock size={14} className="text-gray-400" />
                )}
              </div>
              {expandedTopics[index] ? (
                <ChevronUp size={18} className="text-gray-400" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </button>

            {expandedTopics[index] && (
              <div className="relative">
                <div className={`px-6 pb-6 ${index > 0 && !isPaidUser ? 'blur-sm select-none' : ''}`}>
                  <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap">
                    {topic.content.split('\n').map((line, i) => {
                      if (line.includes('[View your saved schools]')) {
                        const parts = line.split('[View your saved schools]');
                        return (
                          <p key={i} className="mb-2">
                            {parts[0]}
                            <Link to="/my-schools" target="_blank" className="text-purple-600 underline hover:text-purple-700">View your saved schools →</Link>
                            {parts[1]}
                          </p>
                        );
                      }
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={i} className="font-semibold text-gray-900 mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
                      }
                      if (line.startsWith('- ') || line.startsWith('* ')) {
                        return <p key={i} className="ml-4 mb-1">• {line.substring(2)}</p>;
                      }
                      if (line.startsWith('[ ]') || line.startsWith('[x]')) {
                        return <p key={i} className="ml-4 mb-1">{line}</p>;
                      }
                      return line ? <p key={i} className="mb-2">{line}</p> : <br key={i} />;
                    })}
                  </div>
                </div>

                {index > 0 && !isPaidUser && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 z-10">
                    <Lock size={32} className="text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium text-sm mb-1">Unlock this section</p>
                    <p className="text-gray-500 text-xs mb-3">Upgrade to access all content</p>
                    <button 
                      onClick={handleUpgradeClick}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors"
                    >
                      Upgrade to Unlock
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => handleMarkComplete(true)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-normal transition-colors ${
            isCompleted 
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          {isCompleted ? (
            <>
              <Check size={16} />
              Completed
            </>
          ) : (
            'Mark as Complete'
          )}
        </button>
      </div>
    </div>
  );
}
