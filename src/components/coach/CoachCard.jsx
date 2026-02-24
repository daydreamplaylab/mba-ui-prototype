
import React from 'react';

const CoachCard = ({ coach, onSelect }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between cursor-pointer" onClick={() => onSelect(coach)}>
      <div>
        <div className="flex items-center mb-4">
          <img src={coach.photo} alt={coach.name} className="w-16 h-16 rounded-full mr-4 object-cover" />
          <div>
            <h3 className="text-xl font-bold">{coach.name}</h3>
            {coach.verified && <span className="text-sm text-green-500">✓ Verified</span>}
          </div>
        </div>
        <p className="text-gray-600 mb-4">{coach.bio}</p>
        <div className="flex flex-wrap mb-4">
          {coach.services.map(service => (
            <span key={service} className="bg-gray-200 rounded-full px-3 py-1 text-sm mr-2 mb-2">{service}</span>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          <p><strong>MBA School:</strong> {coach.school}</p>
          <p><strong>Industry:</strong> {coach.industry}</p>
          <p><strong>Languages:</strong> {coach.languages.join(', ')}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">${coach.price}/hr</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">View Profile</button>
      </div>
    </div>
  );
};

export default CoachCard;
