import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/useUser';

const filterOptions = {
  location: ['US', 'Europe', 'Asia', 'Canada', 'Other'],
  ranking: ['M7', 'T15', 'T25', 'T50', 'Other'],
  programLength: ['1-year', '2-year', 'Part-time'],
  gmatRange: ['Below 650', '650-700', '700-730', '730+', 'Test optional'],
};

const FilterDropdown = ({ label, category, options, selected, onToggle, active, onOpen, onClose }) => {
  const isSelected = selected.length > 0;
  
  return (
    <div className="relative">
      <button
        onClick={active ? onClose : onOpen}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
          active || isSelected
            ? 'bg-gray-900 text-white border-gray-900 shadow-md'
            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        <span>{label}</span>
        {isSelected && (
          <span className="flex items-center justify-center bg-white text-gray-900 text-xs w-5 h-5 rounded-full font-bold">
            {selected.length}
          </span>
        )}
        <ChevronDown size={14} className={`transition-transform duration-300 ${active ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      <div 
        className={`absolute top-full left-0 mt-2 min-w-[240px] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-40 transition-all duration-300 origin-top-left ${
          active 
            ? 'opacity-100 scale-100 translate-y-0 visible' 
            : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <div className="space-y-2">
          {options.map(option => {
            const isActive = selected.includes(option);
            return (
              <button
                key={option}
                onClick={() => onToggle(category, option)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span>{option}</span>
                {isActive && <Check size={16} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function FilterBar({ filters, setFilters }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const { savedSchools } = useUser();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const clearAll = () => {
    setFilters({
      location: [],
      ranking: [],
      programLength: [],
      gmatRange: [],
      industryFocus: [],
    });
    setActiveFilter(null);
  };

  const hasFilters = Object.values(filters).some(arr => arr.length > 0);

  return (
    <div className="relative mb-8" ref={dropdownRef}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Group */}
        <div className="flex flex-wrap items-center gap-3">
          <FilterDropdown 
            label="Location" 
            category="location" 
            options={filterOptions.location} 
            selected={filters.location}
            onToggle={toggleFilter}
            active={activeFilter === 'location'}
            onOpen={() => setActiveFilter('location')}
            onClose={() => setActiveFilter(null)}
          />
          <FilterDropdown 
            label="Ranking" 
            category="ranking" 
            options={filterOptions.ranking} 
            selected={filters.ranking}
            onToggle={toggleFilter}
            active={activeFilter === 'ranking'}
            onOpen={() => setActiveFilter('ranking')}
            onClose={() => setActiveFilter(null)}
          />
          <FilterDropdown 
            label="Program Length" 
            category="programLength" 
            options={filterOptions.programLength} 
            selected={filters.programLength}
            onToggle={toggleFilter}
            active={activeFilter === 'programLength'}
            onOpen={() => setActiveFilter('programLength')}
            onClose={() => setActiveFilter(null)}
          />
          <FilterDropdown 
            label="GMAT" 
            category="gmatRange" 
            options={filterOptions.gmatRange} 
            selected={filters.gmatRange}
            onToggle={toggleFilter}
            active={activeFilter === 'gmatRange'}
            onOpen={() => setActiveFilter('gmatRange')}
            onClose={() => setActiveFilter(null)}
          />

          {hasFilters && (
            <button 
              onClick={clearAll}
              className="ml-2 text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>

        {/* My School List - 紧凑版 */}
        <button
          onClick={() => navigate('/my-schools')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all shadow-sm group"
        >
          <Heart size={16} className={`transition-colors ${savedSchools.length > 0 ? 'fill-purple-600 text-purple-600' : 'text-gray-400 group-hover:text-purple-600'}`} />
          <span>My Schools</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
            {savedSchools.length}
          </span>
        </button>
      </div>
    </div>
  );
}
