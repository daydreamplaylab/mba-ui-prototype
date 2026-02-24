import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

export default function CoachesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BackButton to="/dashboard">← Back to Dashboard</BackButton>

        <div className="mb-8 mt-4">
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
            Coach Marketplace
          </h1>
          <p className="text-gray-500 font-light text-lg">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}
