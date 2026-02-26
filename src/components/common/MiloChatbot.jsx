import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, ArrowRight, ExternalLink, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/useUser';

const mockResponses = {
  'where should i start': {
    text: "Great question! Since you've completed your Initial Assessment, I'd recommend starting with **School Selection** to research your target schools. You can also explore **Build Your Stories** to start brainstorming experiences for your essays. Both are great next steps!",
    links: [
      { text: 'Go to School Selection', url: '/schools' },
      { text: 'Go to Build Your Stories', url: '/stories' }
    ]
  },
  'what is build your stories': {
    text: "Build Your Stories helps you brainstorm and organize your personal and professional experiences into compelling narratives. You'll work through different categories like Leadership, Teamwork, and Impact — and for each one, you'll answer prompts that help you uncover stories you might not have thought of. These stories become the foundation for your essays and interview answers.",
    links: [
      { text: 'Go to Build Your Stories', url: '/stories' }
    ]
  },
  'what should i do next': {
    text: "Let me check your progress! Here's where you stand:\n\n✅ Strategy — Initial Assessment complete\n📋 School Selection — 3 schools in your list\n📝 Build Your Stories — 2 stories created\n⬜ Application Materials — Not started\n⬜ Interview Prep — Not started\n⬜ Application Plan — 0/20 tasks done\n\nI'd suggest moving to **Application Materials** next — learning about essay writing and resume tips will help you put your stories to work.",
    links: [
      { text: 'Go to Application Materials', url: '/application' }
    ]
  },
  'do you know my background': {
    text: "Yes! Based on your profile, here's what I know:\n\n• You're a Senior Consultant at McKinsey with 5 years of experience\n• You studied Computer Science at UC Berkeley (3.6 GPA)\n• Your GMAT score is 720\n• You're targeting Harvard, Stanford, Wharton, and Kellogg\n• Your goal is to transition into Product Management in tech\n\nThis information helps me point you to the right resources. If anything has changed, you can update your profile in the Strategy section."
  }
};

const fallbackResponse = "That's a great question! I'm best at helping you navigate Offerland and find the right resources. Here are some things I can help with:\n\n• 🧭 Finding a specific section or feature\n• 📖 Explaining what each Land does\n• 📊 Checking your progress\n• 👤 Referencing your profile\n\nFor deeper questions about strategy, school selection advice, or essay feedback, I'd recommend connecting with one of our expert coaches.";

const quickStartChips = [
  { id: 'start', label: 'Where should I start?' },
  { id: 'stories', label: 'What is Build Your Stories?' },
  { id: 'next', label: 'What should I do next?' },
  { id: 'background', label: 'Do you know my background?' }
];

function MessageBubble({ message, isUser }) {
  const navigate = useNavigate();
  
  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
        isUser 
          ? 'bg-purple-600 text-white rounded-br-md' 
          : 'bg-gray-100 text-gray-900 rounded-bl-md'
      }`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
              <Sparkles size={12} className="text-purple-600" />
            </div>
            <span className="text-xs font-medium text-purple-600">Milo</span>
          </div>
        )}
        <p className="text-sm whitespace-pre-line">{message.text}</p>
        {message.links && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.links.map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleLinkClick(link.url)}
                className={`flex items-center gap-1 text-xs font-medium ${
                  isUser ? 'text-purple-200 hover:text-white' : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                {link.text} <ArrowRight size={12} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MiloChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showChips, setShowChips] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { isPaidUser } = useUser();
  
  const hasUsedFirstMessage = messageCount > 0;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        isUser: false,
        text: "Hi, I'm Milo — your guide for Offerland! I can help you find what you need, show you where you are in your journey, and point you to the right resources. Just ask!"
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(mockResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return { text: fallbackResponse };
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;
    if (!isPaidUser && messageCount >= 5) return;
    
    const userMessage = {
      id: Date.now(),
      isUser: true,
      text: text.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowChips(false);
    
    if (!isPaidUser) {
      setMessageCount(prev => prev + 1);
    }
    
    setTimeout(() => {
      const response = getResponse(text);
      const aiMessage = {
        id: Date.now() + 1,
        isUser: false,
        ...response
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 500);
  };

  const handleChipClick = (chip) => {
    handleSendMessage(chip.label);
  };

  const handleUpgradeClick = () => {
    setIsOpen(false);
    navigate('/pricing');
  };

  const handleCoachClick = () => {
    window.open('/coach-marketplace/browse', '_blank');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors"
      >
        <MessageCircle size={24} className="text-white" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed top-0 right-0 h-full w-full md:w-[380px] bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Sparkles size={16} className="text-purple-600" />
                </div>
                <span className="font-semibold text-gray-900">Milo</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="px-4 py-3 border-b border-gray-100 bg-purple-50">
              <p className="text-xs text-gray-500 mb-1">Need human help?</p>
              <button 
                onClick={handleCoachClick}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
              >
                Browse expert coaches <ExternalLink size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} isUser={msg.isUser} />
              ))}
              
              {!isPaidUser && messageCount >= 5 && (
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-700 mb-3">
                    You've used all 5 free messages with Milo. Upgrade to Full Access for unlimited conversations.
                  </p>
                  <button
                    onClick={handleUpgradeClick}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                  >
                    Upgrade
                  </button>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-100 p-4">
              {showChips && hasUsedFirstMessage === false && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {quickStartChips.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => handleChipClick(chip)}
                      disabled={!isPaidUser && messageCount >= 5}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors disabled:opacity-50"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Milo anything..."
                  disabled={!isPaidUser && messageCount >= 5}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 disabled:bg-gray-100 disabled:text-gray-400"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || (!isPaidUser && messageCount >= 5)}
                  className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
              
              {!isPaidUser && (
                <p className={`text-xs mt-2 text-center font-medium ${
                  messageCount >= 4 ? 'text-red-500' : messageCount >= 3 ? 'text-yellow-500' : 'text-gray-500'
                }`}>
                  {messageCount >= 5 ? 'Message limit reached. Upgrade to continue.' : `${messageCount}/5 messages sent`}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
