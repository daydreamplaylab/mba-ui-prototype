import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function WelcomeSplash() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanSkip(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/dashboard');
    }
  }, [countdown, navigate]);

  const handleEnter = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 flex items-center justify-center">
      <div className="text-center px-6">
        <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 animate-pulse">
          <div className="grid grid-cols-3 gap-3 p-6">
            {[1,2,3,4,5,6].map(i => (
              <div 
                key={i} 
                className={`w-6 h-6 rounded-lg ${
                  i <= 1 ? 'bg-purple-200' : 'bg-purple-100'
                }`}
              />
            ))}
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Offerland!
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Your MBA journey begins now.
        </p>

        <div className="flex items-center justify-center gap-4">
          {canSkip ? (
            <button
              onClick={handleEnter}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              Enter
              <ArrowRight size={18} />
            </button>
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <Sparkles size={18} className="animate-spin" />
              <span>Loading...</span>
            </div>
          )}
        </div>

        {canSkip && countdown > 0 && (
          <p className="text-sm text-gray-400 mt-4">
            Redirecting in {countdown}...
          </p>
        )}
      </div>
    </div>
  );
}
