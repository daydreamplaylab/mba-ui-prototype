import React from 'react';

const ChatMessage = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md p-3 rounded-lg ${isUser ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <p className="text-sm text-gray-800">{message.text}</p>
                <p className={`text-xs mt-1 ${isUser ? 'text-right' : 'text-left'} text-gray-400`}>{message.timestamp}</p>
            </div>
        </div>
    )
}

export default ChatMessage;