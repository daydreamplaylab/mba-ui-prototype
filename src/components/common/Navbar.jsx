import { useState, useRef, useEffect } from 'react';
import { User, GraduationCap, Zap, User as UserIcon, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/useUser';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isPaidUser, getUsedViewsDisplay, getUsedStoriesDisplay } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  const isStoriesPage = location.pathname.startsWith('/stories');
  const isStrategyPage = location.pathname.startsWith('/strategy');
  const isApplicationPage = location.pathname.startsWith('/application');
  const isInterviewPage = location.pathname.startsWith('/interview');
  const isPlanPage = location.pathname.startsWith('/plan');
  const isDashboardPage = location.pathname === '/dashboard';
  const isPricingPage = location.pathname === '/pricing' || location.pathname === '/payment';
  const showViewsDisplay = !isPaidUser && !isStrategyPage && !isApplicationPage && !isInterviewPage && !isPlanPage && !isDashboardPage && !isPricingPage;
  const displayText = isStoriesPage ? getUsedStoriesDisplay() : getUsedViewsDisplay();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    navigate('/');
  };

  const handleProfile = () => {
    setShowDropdown(false);
    navigate('/profile');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 will-change-transform transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={20} />
          </div>
          <span className="text-xl font-normal tracking-tight text-gray-900 group-hover:text-purple-600 transition-colors">
            Offerland
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          {showViewsDisplay && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-normal">
              <Zap size={14} className="fill-current" />
              <span>{displayText}</span>
            </div>
          )}
          
          <div className="flex items-center gap-3" ref={dropdownRef}>
            {!isPaidUser && (
              <button 
                onClick={() => navigate('/pricing')}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-full text-sm font-normal hover:bg-gray-50 transition-colors"
              >
                Upgrade
              </button>
            )}
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <User size={20} />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <button 
                    onClick={handleProfile}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <UserIcon size={16} />
                    Profile
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
