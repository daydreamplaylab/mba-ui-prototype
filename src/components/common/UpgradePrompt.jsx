import { X, Lock } from 'lucide-react';

export default function UpgradePrompt({ title, message, onUpgrade, onClose, showGoBack = true }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center pointer-events-auto relative max-w-md mx-4">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
        
        <Lock size={28} className="text-gray-500 mx-auto mb-3" />
        <h3 className="text-xl font-normal text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        
        <button 
          onClick={onUpgrade}
          className="w-full px-6 py-2.5 bg-purple-500 text-white rounded-full text-sm font-normal hover:bg-purple-600 transition-colors"
        >
          Upgrade Now
        </button>
        
        {showGoBack && (
          <button 
            onClick={onClose}
            className="w-full mt-3 py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}
