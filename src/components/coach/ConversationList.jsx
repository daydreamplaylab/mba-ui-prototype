import React from 'react';

const ConversationList = ({ conversations, onSelectConversation, selectedConversationId, coaches }) => {

    const getCoach = (coachId) => coaches.find(c => c.id === coachId);

    return (
        <div className="h-full overflow-y-auto">
            {conversations.map(conv => {
                const coach = getCoach(conv.coachId);
                if (!coach) return null; // Skip if coach not found
                const lastMessage = conv.messages[conv.messages.length - 1];
                const isSelected = conv.id === selectedConversationId;
                return (
                    <div 
                        key={conv.id} 
                        onClick={() => onSelectConversation(conv.id)}
                        className={`flex p-4 cursor-pointer border-l-4 ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-transparent hover:bg-gray-50'}`}>
                        {conv.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>}
                        <img src={coach.photo} alt={coach.name} className="w-12 h-12 rounded-full mr-4 object-cover"/>
                        <div className="flex-grow overflow-hidden">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-gray-800">{coach.name}</h3>
                                <p className="text-xs text-gray-400">{lastMessage.timestamp}</p>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{lastMessage.text || '...'}</p>
                            {conv.status && 
                                <div className="mt-1">
                                     <span className={`text-xs font-semibold px-2 py-1 rounded-full ${conv.status === 'Payment Requested' ? 'bg-amber-100 text-amber-800' : conv.status === 'Session Confirmed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {conv.status}
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ConversationList;
