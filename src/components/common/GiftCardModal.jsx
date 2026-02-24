import { Gift, X } from 'lucide-react';

export default function GiftCardModal({ onClose, onClaim }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift size={40} className="text-purple-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome gift! Here's $50 off.
          </h2>

          <p className="text-gray-600 mb-8">
            As a thank you for completing your assessment, enjoy $50 off Full Access.
          </p>

          <button
            onClick={onClaim}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors mb-3"
          >
            Claim My $50 Off
          </button>

          <p className="text-xs text-gray-400">
            Offer valid for 3 days
          </p>
        </div>
      </div>
    </div>
  );
}
