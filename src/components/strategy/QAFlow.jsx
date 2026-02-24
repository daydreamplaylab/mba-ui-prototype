import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import BackButton from '../../components/common/BackButton';

export default function QAFlow({ 
  title, 
  questions, 
  onComplete, 
  backUrl 
}) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const initial = {};
    questions.forEach(q => {
      initial[q.id] = q.mockAnswer || '';
    });
    return initial;
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = `${currentIndex + 1} of ${questions.length}`;

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        if (onComplete) {
          navigate(onComplete);
        }
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const hasPrevious = currentIndex > 0;
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BackButton to={backUrl || '/strategy'}>← Back</BackButton>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-sm text-gray-400">{progress}</p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1 mb-8">
            <div 
              className="bg-purple-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {currentQuestion.acknowledgment ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {currentQuestion.acknowledgment}
                  </p>
                  <p className="text-sm text-gray-800 font-medium pt-3 border-t border-gray-100">
                    {currentQuestion.question}
                  </p>
                </div>
              ) : (
                <h2 className="text-lg font-normal text-gray-900">
                  {currentQuestion.question}
                </h2>
              )}
            </div>
          </div>

          <div className="col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-64 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
          <button 
            onClick={handlePrevious}
            disabled={!hasPrevious}
            className={`flex items-center gap-2 px-4 py-2 text-sm ${
              hasPrevious ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <button 
            onClick={handleNext}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-normal transition-colors ${
              isGenerating
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {isGenerating ? (
              'Generating...'
            ) : isLast ? (
              'Complete'
            ) : (
              <>
                Next
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
