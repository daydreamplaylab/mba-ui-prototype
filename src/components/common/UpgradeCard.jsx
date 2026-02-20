import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UpgradeCard({ title = 'Unlock All Schools', subtitle = 'Get detailed insights for 50+ schools with Full Access' }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-8 text-center">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock className="text-purple-600" size={32} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{subtitle}</p>
      <button 
        onClick={() => navigate('/pricing')}
        className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
      >
        Upgrade
      </button>
    </div>
  );
}
