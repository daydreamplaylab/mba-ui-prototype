import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Lock, ArrowLeft, Gift } from 'lucide-react';
import { useUser } from '../context/useUser';

export default function Pricing() {
  const navigate = useNavigate();
  const { isPaidUser, setIsPaidUser } = useUser();
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [hasGiftCard, setHasGiftCard] = useState(() => {
    return localStorage.getItem('offerland_gift_card_claimed') === 'true';
  });

  const originalPrice = 349;
  const discountedPrice = hasGiftCard ? 299 : originalPrice;
  const isGiftApplied = hasGiftCard;

  const features = [
    "All 6 Lands with full content",
    "Unlimited AI chat with Milo",
    "Complete school insights for 50+ schools",
    "Full story building with unlimited categories",
    "Detailed essay, resume, and interview guidance",
    "Full application checklist with custom tasks",
    "Coach marketplace with full profiles and contact info"
  ];

  const comparison = [
    { feature: "Price", milestone: `$${discountedPrice}`, consulting: "$3,000-$15,000", diy: "Free" },
    { feature: "Personalized guidance", milestone: true, consulting: true, diy: false },
    { feature: "Available 24/7", milestone: true, consulting: false, diy: true },
    { feature: "Verified coaches", milestone: true, consulting: "Varies", diy: false },
    { feature: "Structured process", milestone: true, consulting: "Varies", diy: false }
  ];

  const handlePurchase = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock Full Access
          </h1>
          <p className="text-xl text-gray-600">
            One-time payment. Full access for 12 months.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 max-w-lg mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6 text-white text-center">
            {isGiftApplied && (
              <p className="text-purple-100 text-sm mb-2">
                Your $50 welcome gift applied
              </p>
            )}
            <div className="flex items-center justify-center gap-2">
              {isGiftApplied && (
                <span className="text-3xl line-through opacity-50">$349</span>
              )}
              <span className="text-6xl font-bold">${discountedPrice}</span>
            </div>
            {isGiftApplied && (
              <p className="text-purple-100 text-sm mt-2">Valid for 3 days</p>
            )}
          </div>

          <div className="p-8">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Full Access
              </span>
              <p className="text-gray-500 mt-2">Valid for 12 months</p>
            </div>

            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check size={18} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handlePurchase}
              className="w-full mt-8 px-6 py-4 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
            >
              Get Full Access — ${discountedPrice}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12 max-w-2xl mx-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500"></th>
                <th className="px-6 py-4 text-center text-sm font-bold text-purple-600">This Product</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Traditional Consulting</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">DIY (Free)</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-700">{row.feature}</td>
                  <td className="px-6 py-4 text-center">
                    {typeof row.milestone === 'boolean' ? (
                      row.milestone ? <Check size={18} className="mx-auto text-green-500" /> : <X size={18} className="mx-auto text-red-400" />
                    ) : (
                      <span className="text-sm font-medium text-purple-600">{row.milestone}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">{row.consulting}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {typeof row.diy === 'boolean' ? (
                      row.diy ? <Check size={18} className="mx-auto text-green-500" /> : <X size={18} className="mx-auto text-red-400" />
                    ) : (
                      row.diy
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <Lock size={16} />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-500" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            One-time payment. No subscription. No hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
}
