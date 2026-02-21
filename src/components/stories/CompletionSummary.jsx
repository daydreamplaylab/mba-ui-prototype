import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { categories } from '../../data/stories';

export default function CompletionSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const state = location.state || {};
  const categoryId = state.categoryId;
  const totalQuestions = state.totalQuestions || 3;

  const category = categories.find(c => c.id === categoryId);

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>

        <h1 className="text-3xl font-light text-gray-900 mb-4">
          Great job!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          You finished all {totalQuestions} questions for {category?.name}.
        </p>

        <button 
          onClick={() => navigate('/stories')}
          className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
        >
          Back to Build Your Stories
        </button>
      </div>
    </div>
  );
}
