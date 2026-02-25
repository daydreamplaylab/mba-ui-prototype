
import React from 'react';
import { conversations } from '../../data/coaches';
import { useParams } from 'react-router-dom';

const CoachConversation = () => {
    const { id } = useParams();
    const conversation = conversations.find(c => c.id === parseInt(id));

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold">Conversation with User</h2>
      </div>
      <div className="flex-grow overflow-y-auto">
        {conversation && conversation.messages.map((msg, index) => (
          <div key={index} className={`flex mb-4 ${msg.sender === 'coach' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-lg ${msg.sender === 'coach' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text && <p>{msg.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea className="w-full p-2 border rounded-lg" rows="3" placeholder="Type your message..."></textarea>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-2 mr-4">Send</button>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg mt-2 mr-4">Send Payment Request</button>
        <button className="bg-purple-500 text-white px-6 py-2 rounded-lg mt-2">Mark Session Complete</button>
      </div>
    </div>
  );
};

export default CoachConversation;
