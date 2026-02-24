
import React, { useState } from 'react';
import { conversations, coaches } from '../../data/coaches';
import ConversationThread from '../../components/coach/ConversationThread';

const MessageInbox = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSelectConversation = (convo) => {
    const coach = coaches.find(c => c.id === convo.coachId);
    setSelectedConversation({ ...convo, coachName: coach?.name, serviceArea: coach?.services.join(', ') });
  };

  if (conversations.length === 0) {
    return (
        <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">No messages yet.</h2>
            <p className="text-gray-600 mb-6">Browse coaches to get started.</p>
            <a href="/coach-marketplace/browse" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Browse Coaches</a>
        </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-200px)]">
      <div className="w-1/3 border-r overflow-y-auto">
        {conversations.map(convo => (
          <div key={convo.id} className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === convo.id ? 'bg-gray-100' : ''}`} onClick={() => handleSelectConversation(convo)}>
            <div className="flex items-center">
              <img src={coaches.find(c => c.id === convo.coachId)?.photo} alt="coach" className="w-12 h-12 rounded-full mr-4 object-cover" />
              <div>
                <h3 className="font-semibold">{coaches.find(c => c.id === convo.coachId)?.name}</h3>
                <p className="text-sm text-gray-500 truncate">{convo.messages[convo.messages.length - 1].text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-2/3">
        <ConversationThread conversation={selectedConversation} />
      </div>
    </div>
  );
};

export default MessageInbox;
