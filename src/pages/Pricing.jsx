import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🚧</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pricing Page</h1>
        <p className="text-gray-600 mb-8">Coming Soon</p>
        <button 
          onClick={() => navigate('/schools')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Schools
        </button>
      </div>
    </div>
  );
}
