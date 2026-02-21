import { useState } from 'react';
import { X } from 'lucide-react';
import { useUser } from '../../context/useUser';
import { categories } from '../../data/stories';
import STARCard from './STARCard';

export default function AddStoryModal({ onClose }) {
  const { addStory } = useUser();
  const [categoryId, setCategoryId] = useState('leadership');
  const [userDraft, setUserDraft] = useState('');
  const [generatedStar, setGeneratedStar] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!userDraft.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      setGeneratedStar({
        situation: userDraft.substring(0, 150) + '...',
        task: 'Analyze the context and identify key objectives from the story.',
        action: 'Structure the narrative using STAR methodology to highlight key actions taken.',
        result: 'Successfully crafted a compelling story with clear outcomes and impact.',
      });
      setIsGenerating(false);
    }, 1000);
  };

  const handleSave = () => {
    if (!generatedStar) return;
    
    const newStory = {
      categoryId,
      title: `${categories.find(c => c.id === categoryId)?.name} Story`,
      userDraft,
      star: generatedStar,
    };
    
    addStory(newStory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto pointer-events-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-normal text-gray-900">Add New Story</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Your Story</label>
            <textarea
              value={userDraft}
              onChange={(e) => setUserDraft(e.target.value)}
              placeholder="Write your story here. Tell us about your experience, challenges, and achievements..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
              rows={6}
              disabled={generatedStar}
            />
          </div>

          {!generatedStar ? (
            <button
              onClick={handleGenerate}
              disabled={!userDraft.trim() || isGenerating}
              className={`w-full py-2.5 rounded-lg text-sm font-normal transition-colors ${
                userDraft.trim() && !isGenerating
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate STAR Story'}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs text-gray-500">Generated STAR Story</label>
                <button 
                  onClick={() => { setGeneratedStar(null); setUserDraft(''); }}
                  className="text-xs text-purple-600 hover:text-purple-700"
                >
                  Start Over
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <STARCard star={generatedStar} />
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={!generatedStar}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              generatedStar
                ? 'bg-purple-500 text-white hover:bg-purple-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Save Story
          </button>
        </div>
      </div>
    </div>
  );
}
