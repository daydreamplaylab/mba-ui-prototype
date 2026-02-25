import { useState } from 'react';
import { X } from 'lucide-react';
import { useUser } from '../../context/useUser';
import { categories } from '../../data/stories';
import STARCard from './STARCard';

export default function StoryDetailModal({ story, onClose }) {
  const { updateStory } = useUser();
  const [editedStory, setEditedStory] = useState(story);
  const [isEditing, setIsEditing] = useState(true);

  const isStrategyStory = story.categoryId === 'career-vision' || story.categoryId === 'why-mba';

  const getCategoryDisplayName = (categoryId) => {
    const categoryNames = {
      'leadership': 'Leadership',
      'impact': 'Impact/Achievement',
      'failure': 'Failure/Learning',
      'teamwork': 'Teamwork',
      'why-mba': 'Why MBA',
      'career-vision': 'Career Vision'
    };
    return categoryNames[categoryId] || categoryId;
  };

  const handleSave = () => {
    if (isStrategyStory) {
      const textContent = editedStory.textContent || '';
      const bullets = textContent.split('\n').filter(line => line.trim());
      editedStory.bullets = bullets;
    }
    updateStory(story.id, editedStory);
    onClose();
  };

  const handleCancel = () => {
    setEditedStory(story);
    onClose();
  };

  const handleStarChange = (newStar) => {
    setEditedStory({ ...editedStory, star: newStar });
  };

  const handleTitleChange = (e) => {
    setEditedStory({ ...editedStory, title: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setEditedStory({ ...editedStory, categoryId: e.target.value });
  };

  const handleTextContentChange = (e) => {
    setEditedStory({ ...editedStory, textContent: e.target.value });
  };

  const getTextContent = () => {
    if (editedStory.textContent) return editedStory.textContent;
    if (editedStory.bullets) return editedStory.bullets.join('\n');
    return '';
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/30" onClick={onClose}></div>
      
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-normal text-gray-900">Story Details</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Title</label>
            {isStrategyStory ? (
              <h3 className="text-base font-normal text-gray-900">{story.title}</h3>
            ) : isEditing ? (
              <input
                type="text"
                value={editedStory.title}
                onChange={handleTitleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            ) : (
              <h3 className="text-base font-normal text-gray-900">{story.title}</h3>
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Category</label>
            {isStrategyStory ? (
              <span className="inline-flex px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                {getCategoryDisplayName(story.categoryId)}
              </span>
            ) : isEditing ? (
              <select
                value={editedStory.categoryId}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            ) : (
              <span className="inline-flex px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                {categories.find(c => c.id === story.categoryId)?.name || story.categoryId}
              </span>
            )}
          </div>

          {!isStrategyStory && (
            <div>
              <label className="block text-xs text-gray-500 mb-2">STAR</label>
              <div className="bg-gray-50 rounded-xl p-4">
                <STARCard 
                  star={isEditing ? editedStory.star : story.star} 
                  editable={isEditing}
                  onChange={handleStarChange}
                />
              </div>
            </div>
          )}

          {isStrategyStory && (
            <div>
              <label className="block text-xs text-gray-500 mb-2">Content</label>
              <textarea
                value={isEditing ? getTextContent() : (story.bullets?.join('\n') || '')}
                onChange={handleTextContentChange}
                disabled={!isEditing}
                placeholder="Write your content here. Each line will be treated as a separate bullet point..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none min-h-[200px]"
              />
            </div>
          )}

          {story.userDraft && (
            <div>
              <label className="block text-xs text-gray-500 mb-2">Your Original Draft</label>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 italic">{story.userDraft}</p>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-400">
            Added on {story.dateAdded}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
          <button 
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
