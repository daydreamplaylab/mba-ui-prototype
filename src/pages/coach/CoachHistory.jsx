
import React from 'react';
import { conversations, coaches } from '../../data/coaches';

const CoachHistory = () => {
  const completedSessions = conversations.filter(c => c.messages.some(m => m.sessionCompleted));

  if (completedSessions.length === 0) {
    return (
        <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">No coaching sessions yet.</h2>
            <a href="/coach-marketplace/browse" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Browse Coaches</a>
        </div>
    )
  }

  return (
    <div className="p-8">
      {completedSessions.map(convo => {
          const coach = coaches.find(c => c.id === convo.coachId);
          const completedMessage = convo.messages.find(m => m.sessionCompleted);
          return (
            <div key={convo.id} className="border-b py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={coach.photo} alt={coach.name} className="w-16 h-16 rounded-full mr-4 object-cover" />
                        <div>
                            <h3 className="text-xl font-bold">{coach.name}</h3>
                            <p className="text-gray-600">{coach.services.join(', ')}</p>
                            <p className="text-gray-500">Jan 15, 2025</p>
                        </div>
                    </div>
                    <div>
                        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Completed</span>
                    </div>
                    <div>
                        <button className="text-blue-600">View Notes</button>
                        <button className="text-blue-600 ml-4">View Conversation</button>
                    </div>
                </div>
            </div>
          )
      })}
    </div>
  );
};

export default CoachHistory;
