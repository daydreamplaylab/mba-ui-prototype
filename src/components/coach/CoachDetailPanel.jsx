import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

const CoachDetailPanel = ({ coach, onClose, onConnect, isPaidMember }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleConnectClick = () => {
    if (isPaidMember) {
      onConnect();
    } else {
      setShowUpgradeModal(true);
    }
  };

  return (
    <>
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${coach ? 'bg-[rgba(0,0,0,0.5)]' : 'bg-transparent pointer-events-none'}`} onClick={() => {
        onClose();
        setShowUpgradeModal(false); // Also close modal if background is clicked
      }}>
        <div className={`fixed right-0 top-0 h-full w-1/2 bg-white shadow-lg p-8 overflow-y-auto transition-transform duration-300 ease-in-out ${coach ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
          
          {coach && (
              <>
                  {/* Coach details content... */}
                  <div className="flex items-center mb-6">
                    <img src={coach.photo} alt={coach.name} className="w-24 h-24 rounded-full mr-6 object-cover" />
                    <div>
                        <h2 className="text-3xl font-bold">{coach.name}</h2>
                        {coach.verified && <span className="text-sm text-green-500">✓ Verified</span>}
                        <p className="text-gray-600">{coach.school}</p>
                        <p className="text-gray-600">{coach.industry}</p>
                    </div>
                  </div>
  
                  <div className="mb-6">
                      <p className="text-lg font-semibold">${coach.price}/hr</p>
                      <p className="text-gray-600">Languages: {coach.languages.join(', ')}</p>
                  </div>
  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">About Me</h3>
                    <p className="text-gray-700 whitespace-pre-line">{coach.fullBio}</p>
                  </div>
  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Services Offered</h3>
                    <div className="flex flex-wrap">
                        {coach.services.map(service => (
                        <span key={service} className="bg-gray-200 rounded-full px-3 py-1 text-sm mr-2 mb-2">{service}</span>
                        ))}
                    </div>
                    <p className="text-gray-600 mt-4">{coach.detailedServices}</p>
                  </div>

                  {/* Sticky footer with Connect button */}
                  <div className="sticky bottom-0 bg-white py-4">
                      <button 
                          onClick={handleConnectClick}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center">
                          Connect
                      </button>
                  </div>
              </>
          )}
        </div>
      </div>

      {/* Upgrade Modal - Appears on top without dark overlay */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none">
            <div className="bg-white p-8 rounded-xl shadow-2xl text-center relative w-full max-w-sm mx-4 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setShowUpgradeModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                <div className="mb-4">
                   <Lock size={40} className="mx-auto text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-800 mb-4">Upgrade to unlock full details</p>
                <a href="/pricing" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-block">
                    Upgrade Now
                </a>
            </div>
        </div>
      )}
    </>
  );
};

export default CoachDetailPanel;
