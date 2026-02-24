import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Check } from 'lucide-react';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const hasGiftCard = localStorage.getItem('offerland_gift_card_claimed') === 'true';
  const price = hasGiftCard ? 299 : 349;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
      localStorage.setItem('offerland_is_paid_user', 'true');
    }, 1500);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome to Offerland Full Access. All features are now unlocked.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 pb-20">
      <div className="max-w-lg mx-auto px-6 py-8">
        <button 
          onClick={() => navigate('/pricing')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={18} />
          Back to pricing
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Complete Your Purchase
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-medium text-gray-500 mb-4">Order Summary</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-medium">Offerland Full Access</span>
            <span className="text-gray-900 font-bold">${price}</span>
          </div>
          {hasGiftCard && (
            <p className="text-sm text-green-600 mt-2">
              $50 welcome gift applied
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-medium text-gray-500 mb-4">Payment Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                defaultValue="4242 4242 4242 4242"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                <input
                  type="text"
                  defaultValue="12/27"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <input
                  type="text"
                  defaultValue="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input
                type="text"
                defaultValue="Demo User"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full px-6 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : `Pay $${price}`}
        </button>

        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Lock size={14} />
            <span>Secure payment</span>
          </div>
          <span>·</span>
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  );
}
