import { useState, useMemo } from 'react';
import { useUser } from '../../context/useUser';
import { categories } from '../../data/stories';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import StoryDetailModal from './StoryDetailModal';
import AddStoryModal from './AddStoryModal';
import UpgradePrompt from '../common/UpgradePrompt';

export default function StoryBank() {
  const { stories, deleteStory, canSaveStory, isPaidUser, getUsedStoriesDisplay } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedStory, setSelectedStory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || story.categoryId === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [stories, searchQuery, categoryFilter]);

  const handleAddStory = () => {
    if (!canSaveStory()) {
      setShowUpgradePrompt(true);
      return;
    }
    setShowAddModal(true);
  };

  const handleDeleteStory = (storyId) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      deleteStory(storyId);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="border-t border-gray-100 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-gray-900">My Story Bank</h2>
        <button 
          onClick={handleAddStory}
          disabled={!canSaveStory() && !isPaidUser}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-normal transition-colors ${
            canSaveStory() || isPaidUser
              ? 'bg-purple-500 text-white hover:bg-purple-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Plus size={18} />
          Add Story
        </button>
      </div>

      {!isPaidUser && (
        <div className="mb-4 text-sm text-gray-500">
          {getUsedStoriesDisplay()} saved
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {['all', 'leadership', 'impact', 'failure', 'teamwork', 'why-mba', 'career-vision'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-normal transition-colors ${
                categoryFilter === cat
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All' : getCategoryName(cat)}
            </button>
          ))}
        </div>
      </div>

      {filteredStories.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <p className="text-gray-400">
            {stories.length === 0 
              ? 'No stories yet. Start by adding your first story!' 
              : 'No stories match your search.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStories.map((story) => (
            <div 
              key={story.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-normal text-gray-900 text-sm line-clamp-1">{story.title}</h3>
                <div className="flex gap-1">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedStory(story); }}
                    className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteStory(story.id); }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full">
                  {getCategoryName(story.categoryId)}
                </span>
              </div>
              
              <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                {story.star?.situation || story.userDraft?.substring(0, 100)}
              </p>
              
              <p className="text-xs text-gray-400">{story.dateAdded}</p>
            </div>
          ))}
        </div>
      )}

      {selectedStory && (
        <StoryDetailModal 
          story={selectedStory} 
          onClose={() => setSelectedStory(null)} 
        />
      )}

      {showAddModal && (
        <AddStoryModal 
          onClose={() => setShowAddModal(false)} 
        />
      )}

      {showUpgradePrompt && (
        <UpgradePrompt
          title="Story Limit Reached"
          message="You've reached the free story limit (3 stories). Upgrade to save unlimited stories and access all categories."
          onUpgrade={() => { setShowUpgradePrompt(false); window.location.href = '/pricing'; }}
          onClose={() => setShowUpgradePrompt(false)}
        />
      )}
    </div>
  );
}
