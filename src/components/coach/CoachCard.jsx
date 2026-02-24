
import React from 'react';
import { Leaf } from 'lucide-react';

const CoachCard = ({ coach, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-purple-300 border border-transparent"
      onClick={() => onSelect(coach)}
    >
      <div>
        <div className="flex items-start mb-4">
          <img src={coach.photo} alt={coach.name} className="w-16 h-16 rounded-full mr-4 object-cover" />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">{coach.name}</h3>
            {coach.verified && (
              <div className="inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full mt-1">
                <Leaf size={12} className="mr-1" />
                <span>Verified</span>
              </div>
            )}
            <p className="text-gray-500 mt-1">{coach.school}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4 text-sm">{coach.bio}</p>
        <div className="flex flex-wrap mb-4">
          {coach.services.map(service => (
            <span key={service} className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2">{service}</span>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <span className="text-base font-semibold text-gray-500">${coach.price}/hr</span>
        <button className="text-purple-600 font-semibold hover:underline">View Profile</button>
      </div>
    </div>
  );
};

export default CoachCard;
