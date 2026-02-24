
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConversationThread = ({ conversation }) => {
  const navigate = useNavigate();

  if (!conversation) {
    return <div className="p-8"><h2 className="text-2xl font-bold">Select a conversation</h2></div>;
  }

  const handlePayment = () => {
      navigate('/coach-marketplace/checkout');
  }

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold">{conversation.coachName}</h2>
        <p className="text-gray-500">{conversation.serviceArea}</p>
      </div>
      <div className="flex-grow overflow-y-auto">
        {conversation.messages.map((msg, index) => (
          <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text && <p>{msg.text}</p>}
              {msg.paymentRequest && (
                  <div className="bg-white text-black p-4 rounded-lg shadow-md">
                      <h4 className="font-bold text-lg mb-2">Payment Request</h4>
                      <p><strong>Title:</strong> {msg.paymentRequest.title}</p>
                      <p><strong>Category:</strong> {msg.paymentRequest.category}</p>
                      <p><strong>Topics:</strong> {msg.paymentRequest.topics}</p>
                      <p><strong>Length:</strong> {msg.paymentRequest.length} min</p>
                      <p className="font-bold text-xl mt-2">Price: ${msg.paymentRequest.price}</p>
                      <div className="flex justify-end mt-4">
                          <button className="text-red-500 mr-4">Decline</button>
                          <button onClick={handlePayment} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Pay & Confirm</button>
                      </div>
                  </div>
              )}
              {msg.paymentConfirmation && (
                  <div className="bg-green-100 text-black p-4 rounded-lg shadow-md">
                      <h4 className="font-bold text-lg mb-2">✓ Session Confirmed</h4>
                      <p><strong>Title:</strong> {msg.paymentConfirmation.title}</p>
                      <p><strong>Date:</strong> {new Date(msg.paymentConfirmation.date).toLocaleString()}</p>
                      <p><strong>Price:</strong> ${msg.paymentConfirmation.price}</p>
                  </div>
              )}
              {msg.sessionCompleted && (
                  <div className="bg-gray-100 text-black p-4 rounded-lg shadow-md">
                        <h4 className="font-bold text-lg mb-2">Session Completed</h4>
                        <p>{msg.sessionCompleted.notes}</p>
                        <a href="#" className="text-blue-600">View Session Notes</a>
                  </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea className="w-full p-2 border rounded-lg" rows="3" placeholder="Type your message..."></textarea>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-2">Send</button>
      </div>
    </div>
  );
};

export default ConversationThread;
