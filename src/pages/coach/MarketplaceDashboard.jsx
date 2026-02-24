
import React, { useState, useContext } from 'react';
import { coaches } from '../../data/coaches';
import CoachCard from '../../components/coach/CoachCard';
import CoachDetailPanel from '../../components/coach/CoachDetailPanel';
import IntakeFormModal from '../../components/coach/IntakeFormModal';
import { UserContext } from '../../context/UserContext';

const SERVICE_CATEGORIES = [
  "Strategy & Career",
  "School Selection",
  "Essay & Resume Review",
  "Interview Prep",
];

const FILTER_OPTIONS = {
  priceRange: ["Under $100/hr", "$100–$150/hr", "$150–$200/hr", "$200+/hr"],
  school: ["Harvard", "Stanford", "Wharton", "Booth", "Kellogg", "Columbia", "Other"],
  industry: ["Consulting", "Finance", "Tech", "Healthcare", "Entrepreneurship", "Other"],
  language: ["English", "Mandarin", "Spanish", "Hindi", "Other"],
};

import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = ({ title, options, selected, onChange, isExpanded, onToggle }) => (
    <div className="mb-6">
        <div className="flex justify-between items-center cursor-pointer" onClick={onToggle}>
            <h3 className="font-semibold capitalize">{title.replace(/([A-Z])/g, ' $1')}</h3>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {isExpanded && (
            <div className="mt-2">
                {options.map(option => (
                    <div key={option} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={`${title}-${option}`}
                            checked={selected.includes(option)}
                            onChange={() => onChange(title, option)}
                            className="mr-2"
                        />
                        <label htmlFor={`${title}-${option}`}>{option}</label>
                    </div>
                ))}
            </div>
        )}
    </div>
);

const MarketplaceDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: [],
    school: [],
    industry: [],
    language: [],
  });
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showIntakeForm, setShowIntakeForm] = useState(false);
  const { isPaidUser } = useContext(UserContext);
  const [expandedFilters, setExpandedFilters] = useState({
      priceRange: true,
      school: true,
      industry: true,
      language: true,
  });

  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const newValues = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value];
      return { ...prevFilters, [filterType]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [],
      school: [],
      industry: [],
      language: [],
    });
  };

  const handleCoachSelect = (coach) => {
    setSelectedCoach(coach);
  };

  const handleClosePanel = () => {
    setSelectedCoach(null);
  };

  const handleConnect = () => {
      if(isPaidUser) {
          setShowIntakeForm(true);
      }
  }

  const handleIntakeFormSubmit = (data) => {
      console.log("Intake form data:", data);
      setShowIntakeForm(false);
      setSelectedCoach(null);
  }

  const toggleFilter = (filter) => {
      setExpandedFilters(prev => ({...prev, [filter]: !prev[filter]}));
  }

  const filteredCoaches = coaches.filter(coach => {
    // Filter by category
    if (selectedCategory && !coach.services.includes(selectedCategory)) {
      return false;
    }

    // Price filter
    if (filters.priceRange.length > 0) {
      const price = coach.hourlyRate;
      const priceCategory =
        price < 100
          ? "Under $100/hr"
          : price <= 150
          ? "$100–$150/hr"
          : price <= 200
          ? "$150–$200/hr"
          : "$200+/hr";
      if (!filters.priceRange.includes(priceCategory)) {
        return false;
      }
    }

    // School filter
    if (filters.school.length > 0) {
      const mainSchools = FILTER_OPTIONS.school.slice(0, -1);
      const isOtherSchool = !mainSchools.includes(coach.school);
      const schoolMatches = filters.school.some(
        s => (s === 'Other' && isOtherSchool) || coach.school === s
      );
      if (!schoolMatches) return false;
    }

    // Industry filter
    if (filters.industry.length > 0) {
      const mainIndustries = FILTER_OPTIONS.industry.slice(0, -1);
      const hasOtherIndustry = coach.industries.some(i => !mainIndustries.includes(i));
      const industryMatches = filters.industry.some(
        i => (i === 'Other' && hasOtherIndustry) || coach.industries.includes(i)
      );
      if (!industryMatches) return false;
    }

    // Language filter
    if (filters.language.length > 0) {
      const mainLanguages = FILTER_OPTIONS.language.slice(0, -1);
      const hasOtherLanguage = coach.languages.some(l => !mainLanguages.includes(l));
      const languageMatches = filters.language.some(
        l => (l === 'Other' && hasOtherLanguage) || coach.languages.includes(l)
      );
      if (!languageMatches) return false;
    }

    return true;
  });

  return (
    <div className="p-8">
      <div className="text-sm text-gray-500 mb-4">Dashboard &gt; Coach Marketplace</div>
      <h1 className="text-3xl font-bold mb-4">Find the right coach for your journey.</h1>
      
      <div className="flex space-x-4 mb-8">
        {SERVICE_CATEGORIES.map(category => (
          <button 
            key={category} 
            onClick={() => handleCategorySelect(category)}
            className={`px-6 py-3 rounded-lg font-semibold ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            {category}
          </button>
        ))}
      </div>

      <div className="flex">
        <div className="w-1/4 pr-8">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <button onClick={clearFilters} className="text-sm text-gray-500 mb-4">Clear all filters</button>
          
          {Object.entries(FILTER_OPTIONS).map(([filterType, options]) => (
             <FilterSection 
                key={filterType}
                title={filterType}
                options={options}
                selected={filters[filterType]}
                onChange={handleFilterChange}
                isExpanded={expandedFilters[filterType]}
                onToggle={() => toggleFilter(filterType)}
             />
          ))}
        </div>

        <div className="w-3/4">
          <div className="text-gray-600 mb-4">Showing {filteredCoaches.length} coaches</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCoaches.map(coach => (
              <CoachCard key={coach.id} coach={coach} onSelect={handleCoachSelect} />
            ))}
          </div>
        </div>
      </div>
      <CoachDetailPanel coach={selectedCoach} onClose={handleClosePanel} onConnect={handleConnect} isPaidMember={isPaidUser} />
      {showIntakeForm && <IntakeFormModal coach={selectedCoach} onClose={() => setShowIntakeForm(false)} onSubmit={handleIntakeFormSubmit} />}
    </div>
  );
};

export default MarketplaceDashboard;
