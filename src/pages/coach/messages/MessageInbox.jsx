import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { conversations, coaches } from '../../../data/coaches';
import ConversationList from '../../../components/coach/ConversationList';

import ConversationThread from '../../../components/coach/ConversationThread';

const MessageInbox = () => {
    const { isPaidUser } = useContext(UserContext);
    const [selectedConversationId, setSelectedConversationId] = useState(conversations.length > 0 ? conversations[0].id : null);

    if (!isPaidUser) {
        return (
            <div className="text-center p-12 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Connect with coaches by upgrading to Full Access.</h2>
                <a href="#" className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full">Upgrade</a>
            </div>
        )
    }

    if (conversations.length === 0) {
        return (
            <div className="text-center p-12 bg-gray-100 rounded-lg">
                 <h2 className="text-xl font-semibold mb-4">No messages yet.</h2>
                 {/* This should ideally switch the tab back to Browse Coaches */}
                 <a href="#" className="text-blue-600 font-semibold">Browse Coaches</a>
            </div>
        )
    }
    
    const selectedConversation = conversations.find(c => c.id === selectedConversationId);
    const selectedCoach = selectedConversation ? coaches.find(c => c.id === selectedConversation.coachId) : null;

    return (
        <div className="flex h-[calc(100vh-200px)] border rounded-lg bg-white shadow-sm">
            <div className="w-1/3 h-full">
                <ConversationList 
                    conversations={conversations}
                    selectedConversationId={selectedConversationId}
                    onSelectConversation={setSelectedConversationId}
                    coaches={coaches}
                />
            </div>
            <div className="w-2/3 h-full border-l">
                <ConversationThread conversation={selectedConversation} coach={selectedCoach} />
            </div>
        </div>
    )
}

export default MessageInbox;
