import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Lightbulb, AlertCircle, ArrowRight, RotateCcw, Plus } from 'lucide-react';
import { useUser } from '../../context/useUser';
import { categories, questions } from '../../data/stories';
import BackButton from '../../components/common/BackButton';
import STARCard from './STARCard';
import CompletionSummary from './CompletionSummary';

export default function BrainstormPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addStory, updateCategoryProgress, canSaveStory, isPaidUser, stories } = useUser();

  const categoryQuestions = useMemo(() => questions[categoryId] || [], [categoryId]);
  
  const currentQuestionIndex = useMemo(() => 
    Math.min(
      stories.filter(s => s.categoryId === categoryId).length,
      Math.max(0, categoryQuestions.length - 1)
    ), [stories, categoryId, categoryQuestions.length]);
  
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [viewState, setViewState] = useState('writing');
  const [userDraft, setUserDraft] = useState('');
  const [generatedStar, setGeneratedStar] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSubQuestions, setShowSubQuestions] = useState(true);
  const [showTips, setShowTips] = useState(false);
  const [activeTab, setActiveTab] = useState('ai');

  useEffect(() => {
    setQuestionIndex(currentQuestionIndex);
  }, [currentQuestionIndex]);

  useEffect(() => {
    const question = categoryQuestions[questionIndex];
    if (question) {
      setCurrentQuestion(question);
      setUserDraft('');
      setGeneratedStar(null);
      setViewState('writing');
      setActiveTab('ai');
    }
  }, [questionIndex, categoryQuestions]);

  const handleGenerate = () => {
    if (!userDraft.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      setGeneratedStar({
        situation: userDraft.substring(0, 150) + '...',
        task: 'Analyze the context and identify key objectives from your experience.',
        action: 'Structure the narrative using STAR methodology to highlight your specific actions.',
        result: 'Successfully crafted a compelling story demonstrating your capabilities.',
      });
      setIsGenerating(false);
      setViewState('review');
    }, 1000);
  };

  const handleSkip = () => {
    if (questionIndex < categoryQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate('/stories/completion', { state: { categoryId, totalQuestions: categoryQuestions.length } });
    }
  };

  const handleSaveAndNext = () => {
    if (!generatedStar || !canSaveStory()) return;
    
    addStory({
      categoryId,
      title: `${categories.find(c => c.id === categoryId)?.name} - Question ${questionIndex + 1}`,
      userDraft,
      star: generatedStar,
    });

    if (questionIndex < categoryQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      updateCategoryProgress(categoryId, 'completed');
      navigate('/stories/completion', { state: { categoryId, totalQuestions: categoryQuestions.length } });
    }
  };

  const handleAddAnother = () => {
    setGeneratedStar(null);
    setUserDraft('');
    setViewState('writing');
    setActiveTab('ai');
  };

  const handleStartOver = () => {
    setUserDraft('');
    setGeneratedStar(null);
    setViewState('writing');
    setActiveTab('ai');
  };

  if (!currentQuestion) {
    return <CompletionSummary categoryId={categoryId} totalQuestions={categoryQuestions.length} />;
  }

  const category = categories.find(c => c.id === categoryId);

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BackButton to="/stories">← Back to Build Your Stories</BackButton>

        <div className="mt-4 mb-8">
          <h1 className="text-3xl font-light text-gray-900">{category?.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Question {questionIndex + 1} of {categoryQuestions.length}
          </p>
        </div>

        <div className="flex gap-8">
          <div className="w-[30%] flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-base font-normal text-gray-900 mb-4">
                {currentQuestion.prompt}
              </h2>

              <div className="mb-4">
                <button 
                  onClick={() => setShowSubQuestions(!showSubQuestions)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  {showSubQuestions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  Consider these questions
                </button>
                
                {showSubQuestions && (
                  <ul className="mt-3 space-y-2">
                    {currentQuestion.subQuestions.map((sq, i) => (
                      <li key={i} className="text-sm text-gray-500 flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        {sq}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <button 
                  onClick={() => setShowTips(!showTips)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  {showTips ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <Lightbulb size={16} className="text-yellow-500" />
                  Tips & Mistakes
                </button>
                
                {showTips && (
                  <div className="mt-3 space-y-4">
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-1">Tips</p>
                      <ul className="space-y-1">
                        {currentQuestion.tips.map((tip, i) => (
                          <li key={i} className="text-xs text-green-600 flex items-start gap-1">
                            <span className="text-green-400">✓</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-1">Mistakes to avoid</p>
                      <ul className="space-y-1">
                        {currentQuestion.mistakes.map((mistake, i) => (
                          <li key={i} className="text-xs text-red-500 flex items-start gap-1">
                            <AlertCircle size={12} />
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            {viewState === 'writing' ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <textarea
                  value={userDraft}
                  onChange={(e) => setUserDraft(e.target.value)}
                  placeholder="Start writing your story here..."
                  className="w-full h-64 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
                
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={handleSkip}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Skip this Question
                  </button>
                  <button 
                    onClick={handleGenerate}
                    disabled={!userDraft.trim() || isGenerating}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-normal transition-colors ${
                      userDraft.trim() && !isGenerating
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Story'}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-4 mb-4 border-b border-gray-100">
                  <button
                    onClick={() => setActiveTab('draft')}
                    className={`pb-3 px-2 text-sm font-normal transition-colors ${
                      activeTab === 'draft'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    My Draft
                  </button>
                  <button
                    onClick={() => setActiveTab('ai')}
                    className={`pb-3 px-2 text-sm font-normal transition-colors ${
                      activeTab === 'ai'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    AI STAR Version
                  </button>
                </div>

                {activeTab === 'draft' && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">Your original draft is saved for reference</p>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{userDraft}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="mb-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <STARCard star={generatedStar} />
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-3">
                    <button 
                      onClick={handleAddAnother}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <Plus size={16} />
                      Add Another
                    </button>
                    <button 
                      onClick={handleStartOver}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                    >
                      <RotateCcw size={16} />
                      Start Over
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleSaveAndNext}
                    disabled={!canSaveStory()}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-normal transition-colors ${
                      canSaveStory()
                        ? 'bg-purple-500 text-white hover:bg-purple-600'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {questionIndex < categoryQuestions.length - 1 ? 'Save & Next Question' : 'Save & Complete'}
                    <ArrowRight size={16} />
                  </button>
                </div>

                {!canSaveStory() && !isPaidUser && (
                  <p className="text-xs text-red-500 mt-2 text-center">
                    You've reached the free story limit. Upgrade to save more.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
