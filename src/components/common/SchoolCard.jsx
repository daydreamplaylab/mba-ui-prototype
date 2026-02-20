import { useState } from 'react';
import { Heart, MapPin, Award, Clock, TrendingUp } from 'lucide-react';
import { useUser } from '../../context/useUser';

export default function SchoolCard({ school, onClick, showRemove = false }) {
  const { isSchoolSaved, removeSavedSchool, addSavedSchool } = useUser();
  const [isFlipping, setIsFlipping] = useState(false);
  
  const saved = isSchoolSaved(school.id);

  const handleClick = () => {
    setIsFlipping(true);
    setTimeout(() => {
      onClick();
    }, 600);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (saved) {
      removeSavedSchool(school.id);
    } else {
      addSavedSchool(school);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeSavedSchool(school.id);
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative h-[240px] cursor-pointer perspective-1000"
    >
      <div className={`relative w-full h-full duration-600 transform-style-3d transition-all ${isFlipping ? 'rotate-y-180' : ''}`}>
        
        {/* Front Face */}
        <div className="absolute inset-0 bg-white rounded-2xl p-5 shadow-card group-hover:shadow-card-hover transition-all backface-hidden flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center text-lg font-medium text-purple-600 shadow-sm border border-purple-100/50">
                {school.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-normal text-gray-900 leading-tight mb-1 text-sm">{school.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs font-light">
                  <MapPin size={12} />
                  <span>{school.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1 p-2 rounded-lg bg-gray-50/80">
              <span className="text-xs text-gray-400 font-normal flex items-center gap-1">
                <Award size={10} /> Rank
              </span>
              <span className="text-sm font-normal text-gray-700">{school.ranking}</span>
            </div>
            <div className="flex flex-col gap-1 p-2 rounded-lg bg-gray-50/80">
              <span className="text-xs text-gray-400 font-normal flex items-center gap-1">
                <Clock size={10} /> Length
              </span>
              <span className="text-sm font-normal text-gray-700">{school.programLength}</span>
            </div>
            <div className="flex flex-col gap-1 p-2 rounded-lg bg-gray-50/80">
              <span className="text-xs text-gray-400 font-normal flex items-center gap-1">
                <TrendingUp size={10} /> GMAT
              </span>
              <span className="text-sm font-normal text-gray-700">{school.avgGMAT}</span>
            </div>
          </div>

          {/* Industry Focus */}
          <div className="flex flex-wrap gap-1.5">
            {school.industryFocus?.slice(0, 3).map((industry, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-normal rounded-full"
              >
                {industry}
              </span>
            ))}
          </div>

          {/* Save Button */}
          <div className="absolute top-4 right-4 z-10">
             <button 
              onClick={showRemove ? handleRemove : handleSave}
              className={`p-2 rounded-full transition-all duration-300 ${
                saved 
                  ? 'text-pink-500 bg-pink-50 hover:bg-pink-100' 
                  : 'text-gray-300 hover:text-pink-500 hover:bg-gray-50'
              }`}
            >
              <Heart size={18} fill={saved ? 'currentColor' : 'none'} strokeWidth={saved ? 0 : 2} />
            </button>
          </div>

        </div>

        {/* Back Face - Always show loading */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl shadow-card backface-hidden rotate-y-180 flex items-center justify-center">
          <div className="text-white font-normal text-lg tracking-wide animate-pulse">
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
}
