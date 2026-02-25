import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { strategyData } from '../../data/strategy';
import { useUser } from '../../context/useUser';
import BackButton from '../../components/common/BackButton';

export default function PartDResults() {
  const navigate = useNavigate();
  const { addStory } = useUser();
  const [showStartOver, setShowStartOver] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const { summary } = strategyData.partD.results;

  useEffect(() => {
    localStorage.setItem('offerland_part_d_completed', 'true');
    
    const existingWhyMbaStory = JSON.parse(localStorage.getItem('offerland_stories') || '[]')
      .find(s => s.categoryId === 'why-mba');
    
    if (!existingWhyMbaStory) {
      const whyMbaStory = {
        categoryId: 'why-mba',
        title: 'Why MBA',
        bullets: summary,
        origin: 'strategy',
        dateAdded: new Date().toISOString().split('T')[0]
      };
      addStory(whyMbaStory);
    }
  }, [summary, addStory]);

  const handleStartOver = () => {
    setShowStartOver(true);
  };

  const tips = {
    strongExamples: [
      "Showing you've explored alternatives to an MBA and why they don't fully meet your needs",
      "Connecting the MBA specifically to your skill gaps with concrete examples",
      "Articulating a unique perspective or contribution you'll bring to the class"
    ],
    redFlags: [
      "Wanting an MBA 'for the prestige' without concrete career goals",
      "Being unable to articulate why now is the right timing",
      "Vague goals that don't require an MBA (e.g., 'I want to learn business')"
    ]
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <BackButton to="/strategy">Back to Strategy</BackButton>

        <div className="mt-8">
          <h1 className="text-3xl font-light text-gray-900 mb-8 tracking-tight">
            Your Why MBA Narrative
          </h1>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <ul className="space-y-3">
              {summary.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-gray-500">
              This has been saved to your Story Bank in Build Your Stories. You can edit it there.{' '}
              <a 
                href="/stories" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 underline hover:text-purple-700"
              >
                → Go to Story Bank
              </a>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <button
              onClick={() => setShowTips(!showTips)}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-lg font-normal text-gray-900">Tips: Compelling 'Why MBA' Answers</h2>
              {showTips ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            
            {showTips && (
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">What makes a strong answer:</p>
                  <ul className="space-y-2">
                    {tips.strongExamples.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-sm text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Red flags to avoid:</p>
                  <ul className="space-y-2">
                    {tips.redFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">✕</span>
                        <span className="text-sm text-gray-600">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
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
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>

          {showStartOver && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
                <p className="text-gray-700 mb-4">
                  Start Over feature coming soon. If you have any considerations, please email us at support@offerland.com
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
