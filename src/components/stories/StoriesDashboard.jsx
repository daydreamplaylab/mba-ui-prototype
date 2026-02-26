import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ChevronRight, Check, Info } from 'lucide-react';
import { useUser } from '../../context/useUser';
import { categories } from '../../data/stories';
import { strategyData } from '../../data/strategy';
import BackButton from '../../components/common/BackButton';
import StoryBank from './StoryBank';
import UpgradePrompt from '../common/UpgradePrompt';

export default function StoriesDashboard() {
  const navigate = useNavigate();
  const { isPaidUser, stories } = useUser();
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [lockedCategory, setLockedCategory] = useState(null);
  const [showTipsFor, setShowTipsFor] = useState(null);

  const partCCompleted = localStorage.getItem('offerland_part_c_completed') === 'true';
  const partDCompleted = localStorage.getItem('offerland_part_d_completed') === 'true';

  const careerVisionTips = {
    strongExamples: [
      "Specific short-term and long-term goals that show clear progression",
      "Logical connection between your past experience and future aspirations",
      "Clear explanation of how the MBA specifically bridges your skill gaps"
    ],
    commonMistakes: [
      "Being too vague (e.g., 'I want to be a leader')",
      "Unrealistic timelines or goals that don't match your background",
      "Not explaining how the MBA connects to your career path"
    ]
  };

  const whyMBATips = {
    strongExamples: [
      "Showing you've explored alternatives to an MBA and why they don't fully meet your needs",
      "Connecting the MBA specifically to your skill gaps with concrete examples",
      "Articulating a unique perspective or contribution you'll bring to the class"
    ],
    commonMistakes: [
      "Wanting an MBA 'for the prestige' without concrete career goals",
      "Being unable to articulate why now is the right timing",
      "Vague goals that don't require an MBA (e.g., 'I want to learn business')"
    ]
  };

  const getCareerVisionSummary = () => {
    return strategyData.partC.results.summary;
  };

  const getWhyMBASummary = () => {
    return strategyData.partD.results.summary;
  };

  const handleCategoryClick = (category) => {
    const isUnlocked = isPaidUser || category.unlocked;
    
    if (!isUnlocked) {
      setLockedCategory(category);
      setShowUpgradePrompt(true);
      return;
    }

    if (category.id === 'why-mba' || category.id === 'career-vision') {
      navigate(`/stories/${category.id}/summary`);
      return;
    }

    navigate(`/stories/${category.id}`);
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  const handleCloseUpgrade = () => {
    setShowUpgradePrompt(false);
    setLockedCategory(null);
  };

  const getStoryCount = (categoryId) => {
    return stories.filter(s => s.categoryId === categoryId).length;
  };

  const getCategoryStatus = (categoryId) => {
    if (categoryId === 'career-vision') {
      return partCCompleted ? 'completed' : 'not_started';
    }
    if (categoryId === 'why-mba') {
      return partDCompleted ? 'completed' : 'not_started';
    }
    return null;
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BackButton to="/dashboard" showArrow={false}>Back to Dashboard</BackButton>

        <div className="mb-8 mt-4">
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
            Build Your Stories
          </h1>
          <p className="text-gray-500 font-light text-lg">
            Let's uncover the stories that make you unique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {categories.map((category) => {
            const isUnlocked = isPaidUser || category.unlocked;
            const storyCount = getStoryCount(category.id);
            const status = getCategoryStatus(category.id);
            const isStrategyCategory = category.id === 'career-vision' || category.id === 'why-mba';
            const isCompleted = status === 'completed';
            
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`relative bg-white rounded-2xl p-6 shadow-card cursor-pointer transition-all hover:shadow-card-hover group ${
                  !isUnlocked ? 'opacity-75' : ''
                }`}
              >
                {isStrategyCategory && (
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTipsFor(showTipsFor === category.id ? null : category.id);
                      }}
                      className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      <Info size={16} />
                    </button>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <Check size={14} />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Not started</span>
                    )}
                  </div>
                )}
                
                <h3 className="text-lg font-normal text-gray-900 mb-2">
                  {category.name}
                </h3>
                
                {isStrategyCategory && !isCompleted ? (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-3">
                      Complete the {category.id === 'career-vision' ? 'Career Vision' : 'Why MBA'} assessment in Strategy to generate this story.
                    </p>
                    <a 
                      href="/strategy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-purple-600 hover:text-purple-700 cursor-pointer"
                    >
                      → Go to Strategy
                    </a>
                  </div>
                ) : isStrategyCategory && isCompleted ? (
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {(category.id === 'career-vision' ? getCareerVisionSummary() : getWhyMBASummary()).slice(0, 2).map((item, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                          <span className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Retake feature coming soon. If you have any considerations, please email us at support@offerland.com');
                      }}
                      className="text-xs text-purple-600 hover:text-purple-700 mt-2"
                    >
                      Retake Assessment
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}
                
                {!isStrategyCategory && (
                  <div className="text-sm text-gray-500">
                    {storyCount} {storyCount === 1 ? 'story' : 'stories'} saved
                  </div>
                )}

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>

        <StoryBank />
      </div>

      {showTipsFor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowTipsFor(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Tips: {showTipsFor === 'career-vision' ? 'Strong Career Vision Statements' : 'Strong Why MBA Statements'}
              </h3>
              <button onClick={() => setShowTipsFor(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">What makes a compelling statement:</p>
                <ul className="space-y-2">
                  {(showTipsFor === 'career-vision' ? careerVisionTips.strongExamples : whyMBATips.strongExamples).map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span className="text-sm text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Common mistakes to avoid:</p>
                <ul className="space-y-2">
                  {(showTipsFor === 'career-vision' ? careerVisionTips.commonMistakes : whyMBATips.commonMistakes).map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">✕</span>
                      <span className="text-sm text-gray-600">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpgradePrompt && lockedCategory && (
        <UpgradePrompt
          title={`Unlock ${lockedCategory.name}`}
          message={`Get full access to all story categories and save unlimited stories. Upgrade now to unlock ${lockedCategory.name}.`}
          onUpgrade={handleUpgrade}
          onClose={handleCloseUpgrade}
        />
      )}
    </div>
  );
}
