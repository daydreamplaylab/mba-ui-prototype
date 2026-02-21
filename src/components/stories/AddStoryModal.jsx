import { useState } from 'react';
import { X } from 'lucide-react';
import { useUser } from '../../context/useUser';
import { categories } from '../../data/stories';
import STARCard from './STARCard';

export default function AddStoryModal({ onClose }) {
  const { addStory } = useUser();
  const [step, setStep] = useState(1);
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
      setStep(2);
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

  const handleStartOver = () => {
    setUserDraft('');
    setGeneratedStar(null);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-2xl shadow-2xl w-[70vw] h-[80vh] max-w-5xl pointer-events-auto flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-normal text-gray-900">Add New Story</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-hidden flex flex-col">
          {step === 1 ? (
            <div className="flex flex-col h-full">
              <div className="mb-4 flex-shrink-0">
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

              <div className="flex-1 flex flex-col">
                <label className="block text-xs text-gray-500 mb-1 flex-shrink-0">Your Story</label>
                <textarea
                  value={userDraft}
                  onChange={(e) => setUserDraft(e.target.value)}
                  placeholder="Write your story here. Tell us about your experience, challenges, and achievements..."
                  className="flex-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4 flex-shrink-0">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!userDraft.trim() || isGenerating}
                  className={`px-6 py-2 rounded-lg text-sm font-normal transition-colors ${
                    userDraft.trim() && !isGenerating
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isGenerating ? 'Generating...' : 'Generate Story'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Category</label>
                  <span className="text-sm text-gray-700">
                    {categories.find(c => c.id === categoryId)?.name}
                  </span>
                </div>
                <button 
                  onClick={handleStartOver}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Start Over
                </button>
              </div>

              <div className="flex-1 overflow-auto">
                <label className="block text-xs text-gray-500 mb-2">Generated STAR Story</label>
                <div className="bg-gray-50 rounded-xl p-4">
                  <STARCard star={generatedStar} />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4 flex-shrink-0">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors"
                >
                  Save Story
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
