import { User, GraduationCap, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/useUser';

export default function Navbar() {
  const { isPaidUser, getUsedViewsDisplay } = useUser();
  const viewsDisplay = getUsedViewsDisplay();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 will-change-transform transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={20} />
          </div>
          <span className="text-xl font-normal tracking-tight text-gray-900 group-hover:text-purple-600 transition-colors">
            Offerland
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          {!isPaidUser && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-normal">
              <Zap size={14} className="fill-current" />
              <span>{viewsDisplay}</span>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-full text-sm font-normal hover:bg-gray-50 transition-colors">
              Upgrade
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
