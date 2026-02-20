import { X } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../../context/useUser';

export default function PromotionBar() {
  const { isPaidUser } = useUser();
  const [dismissed, setDismissed] = useState(false);

  if (isPaidUser || dismissed) return null;

  return (
    <div className="bg-gray-900 text-white text-xs py-1.5 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="font-normal">Unlock full access to all schools & get personalized recommendations</span>
        <button className="ml-4 px-3 py-1 border border-white/30 text-white rounded-full text-xs font-normal hover:bg-white/10 transition-colors">
          Upgrade Now
        </button>
      </div>
      <button 
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
      >
        <X size={14} />
      </button>
    </div>
  );
}
