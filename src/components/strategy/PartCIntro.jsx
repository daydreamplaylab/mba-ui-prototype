import { useNavigate } from 'react-router-dom';
import { strategyData } from '../../data/strategy';
import BackButton from '../../components/common/BackButton';

export default function PartCIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <BackButton to="/strategy">Back to Strategy</BackButton>

        <div className="mt-12 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
            Career Vision
          </h1>
          
          <p className="text-lg text-gray-500 mb-8">
            {strategyData.partC.intro}
          </p>

          <button 
            onClick={() => navigate('/strategy/part-c')}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
