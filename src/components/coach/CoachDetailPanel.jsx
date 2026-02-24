
import React from 'react';
import { X } from 'lucide-react';

const CoachDetailPanel = ({ coach, onClose, onConnect, isPaidMember }) => {

  return (
    <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${coach ? 'bg-[rgba(0,0,0,0.5)]' : 'bg-transparent pointer-events-none'}`} onClick={onClose}>
      <div className={`fixed right-0 top-0 h-full w-1/2 bg-white shadow-lg p-8 overflow-y-auto transition-transform duration-300 ease-in-out ${coach ? 'translate-x-0' : 'translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        
        {coach && (
            <>
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
                <p className="text-gray-700">{coach.bio}</p>
                </div>

                <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Services Offered</h3>
                <div className="flex flex-wrap">
                    {coach.services.map(service => (
                    <span key={service} className="bg-gray-200 rounded-full px-3 py-1 text-sm mr-2 mb-2">{service}</span>
                    ))}
                </div>
                </div>

                <div className="sticky bottom-0 bg-white py-4">
                    <button 
                        onClick={onConnect}
                        disabled={!isPaidMember}
                        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center">
                        {!isPaidMember && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>}
                        Connect
                    </button>
                    {!isPaidMember && <p className="text-center text-sm text-gray-500 mt-2">Connecting with coaches is available for Full Access members. <a href="/pricing" className="text-blue-600">Upgrade now</a></p>}
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default CoachDetailPanel;
