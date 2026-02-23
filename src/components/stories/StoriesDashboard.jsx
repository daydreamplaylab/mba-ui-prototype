import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ChevronRight } from 'lucide-react';
import { useUser } from '../../context/useUser';
import { categories } from '../../data/stories';
import BackButton from '../../components/common/BackButton';
import StoryBank from './StoryBank';
import UpgradePrompt from '../common/UpgradePrompt';

export default function StoriesDashboard() {
  const navigate = useNavigate();
  const { isPaidUser, stories } = useUser();
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [lockedCategory, setLockedCategory] = useState(null);

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

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BackButton to="/" showArrow={false}>Back to Dashboard</BackButton>

        <div className="mb-8 mt-4">
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
            Build Your Stories
          </h1>
          <p className="text-gray-500 font-light text-lg">
            Let's uncover the stories that make you unique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const isUnlocked = isPaidUser || category.unlocked;
            const storyCount = getStoryCount(category.id);
            
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`relative bg-white rounded-2xl p-6 shadow-card cursor-pointer transition-all hover:shadow-card-hover group ${
                  !isUnlocked ? 'opacity-75' : ''
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute top-4 right-4">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                )}
                
                <h3 className="text-lg font-normal text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {category.description}
                </p>
                
                <div className="text-sm text-gray-500">
                  {storyCount} {storyCount === 1 ? 'story' : 'stories'} saved
                </div>

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>

        <StoryBank />
      </div>

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
