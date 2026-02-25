import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2 } from 'lucide-react';
import BackButton from '../../components/common/BackButton';

export default function ChatQAFlow({ 
  title, 
  questions, 
  onComplete, 
  backUrl 
}) {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [messages, setMessages] = useState(() => {
    return [
      { type: 'ai', content: questions[0].question }
    ];
  });
  const [inputValue, setInputValue] = useState(questions[0].mockAnswer || '');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = `${currentIndex + 1} of ${questions.length}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);

    if (currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1];
      
      setTimeout(() => {
        const hasAck = !!nextQuestion.acknowledgment;
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: nextQuestion.question,
          acknowledgment: hasAck ? nextQuestion.acknowledgment : null
        }]);
        setInputValue(nextQuestion.mockAnswer || '');
        setCurrentIndex(prev => prev + 1);
      }, 500);
    } else {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        if (onComplete) {
          navigate(onComplete);
        }
      }, 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <BackButton to={backUrl}>Back</BackButton>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-sm text-gray-400">{progress}</p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1 mb-6">
            <div 
              className="bg-purple-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-4" style={{ minHeight: '400px', maxHeight: '500px', overflowY: 'auto' }}>
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-5 py-4 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-purple-500 text-white rounded-br-md' 
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
                  }`}
                >
                  {msg.type === 'ai' && msg.acknowledgment ? (
                    <div className="space-y-3">
                      <p className="text-sm whitespace-pre-wrap">{msg.acknowledgment}</p>
                      <p className="text-sm whitespace-pre-wrap font-medium pt-2 border-t border-gray-100">{msg.content}</p>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {isGenerating ? (
          <div className="flex items-center justify-center gap-2 py-4">
            <Loader2 size={20} className="animate-spin text-purple-500" />
            <span className="text-gray-500">Generating your assessment...</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-200 p-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer..."
              className="flex-1 resize-none border-0 focus:outline-none focus:ring-0 text-sm max-h-32"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`p-2 rounded-lg transition-colors ${
                inputValue.trim()
                  ? 'bg-purple-500 text-white hover:bg-purple-600'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
