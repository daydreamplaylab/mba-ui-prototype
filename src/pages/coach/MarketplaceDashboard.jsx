import React, { useState, useContext } from 'react';
import { coaches } from '../../data/coaches';
import CoachCard from '../../components/coach/CoachCard';
import CoachDetailPanel from '../../components/coach/CoachDetailPanel';
import IntakeFormModal from '../../components/coach/IntakeFormModal';
import { UserContext } from '../../context/UserContext';
import { ChevronDown, ChevronUp, Mail, History } from 'lucide-react';
import MessageInbox from './messages/MessageInbox';
import CoachHistory from './history/CoachHistory';
import PaymentCheckout from './payment/PaymentCheckout';

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

const FilterSection = ({ title, options, selected, onChange, isExpanded, onToggle, children }) => (
    <div className="mb-6">
        <div className="flex justify-between items-center cursor-pointer" onClick={onToggle}>
            <h3 className="font-semibold capitalize">{title.replace(/([A-Z])/g, ' $1')}</h3>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {isExpanded && (
            <div className="mt-2">
                {options && options.map(option => (
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
                {children}
            </div>
        )}
    </div>
);

const MarketplaceDashboard = () => {
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'payment'
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('Browse Coaches');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: [],
    school: [],
    industry: [],
    language: [],
  });
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
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
    setMinPrice('');
    setMaxPrice('');
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

  const handlePaymentStart = (coach, session) => {
      setPaymentDetails({ coach, session });
      setView('payment');
  }
  window.handlePaymentStart = handlePaymentStart; // Expose to child components

  const handlePaymentSuccess = () => {
      // Here you would typically update the conversation data
      setView('dashboard');
      setActiveTab('Messages');
  }

  if (view === 'payment') {
      return <PaymentCheckout onBack={() => setView('dashboard')} onSuccess={handlePaymentSuccess} {...paymentDetails} />
  }

  const filteredCoaches = coaches.filter(coach => {
    // This filtering logic can be improved based on new requirements if any
    return true;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="text-sm text-gray-500 mb-4">Dashboard &gt; Coach Marketplace</div>
      
      <div className="flex border-b mb-6">
        <button onClick={() => setActiveTab('Browse Coaches')} className={`flex items-center px-6 py-3 font-semibold ${activeTab === 'Browse Coaches' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
            Browse Coaches
        </button>
        <button onClick={() => setActiveTab('Messages')} className={`flex items-center px-6 py-3 font-semibold ${activeTab === 'Messages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
            <Mail size={18} className="mr-2"/> Messages
        </button>
        <button onClick={() => setActiveTab('Coach History')} className={`flex items-center px-6 py-3 font-semibold ${activeTab === 'Coach History' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
            <History size={18} className="mr-2"/> Coach History
        </button>
      </div>

      {activeTab === 'Browse Coaches' && (
        <>
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
                <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline mt-4">Clear all filters</button>
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
        </>
      )}

      {activeTab === 'Messages' && <MessageInbox />}
      {activeTab === 'Coach History' && <CoachHistory />}

      <CoachDetailPanel coach={selectedCoach} onClose={handleClosePanel} onConnect={handleConnect} isPaidMember={isPaidUser} />
      {showIntakeForm && <IntakeFormModal coach={selectedCoach} onClose={() => setShowIntakeForm(false)} onSubmit={handleIntakeFormSubmit} />}
    </div>
  );
};

export default MarketplaceDashboard;
