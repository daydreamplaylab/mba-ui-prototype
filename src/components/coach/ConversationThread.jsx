import React from 'react';
import ChatMessage from './messages/ChatMessage';
import IntakeRequestCard from './messages/IntakeRequestCard';
import PaymentRequestCard from './messages/PaymentRequestCard';
import SessionConfirmedCard from './messages/SessionConfirmedCard';
import SessionCompletedCard from './messages/SessionCompletedCard';

const ConversationThread = ({ conversation, coach }) => {
    if (!conversation) {
        return <div className="flex items-center justify-center h-full text-gray-500">Select a conversation to view messages.</div>;
    }

    const renderMessage = (msg, index) => {
        switch (msg.type) {
            case 'message':
                return <ChatMessage key={index} message={msg} />;
            case 'intake':
                return <IntakeRequestCard key={index} data={msg.data} />;
            case 'payment_request':
                return <PaymentRequestCard key={index} data={msg.data} coachName={coach.name} />;
            case 'session_confirmed':
                return <SessionConfirmedCard key={index} data={msg.data} />;
            case 'session_completed':
                return <SessionCompletedCard key={index} data={msg.data} />;
            default:
                return null;
        }
    }

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
                <div className="flex items-center">
                    <img src={coach.photo} alt={coach.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                    <div>
                        <h3 className="font-bold text-gray-800">{coach.name}</h3>
                        {conversation.messages[0].type === 'intake' && 
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{conversation.messages[0].data.topic}</span>
                        }
                    </div>
                </div>
                <button className="text-sm text-blue-600 font-semibold hover:underline">View Profile</button>
            </div>

            <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {conversation.messages.map(renderMessage)}
            </div>

            <div className="p-4 border-t bg-white">
                <div className="relative">
                    <input type="text" placeholder="Type a message..." className="w-full p-3 pr-20 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-md px-4 py-2 font-semibold">Send</button>
                </div>
            </div>
        </div>
    );
}

export default ConversationThread;
