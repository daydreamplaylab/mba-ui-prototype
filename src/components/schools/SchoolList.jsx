import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { schools } from '../../data/schools';
import { useUser } from '../../context/useUser';
import SchoolCard from '../../components/common/SchoolCard';
import FilterBar from '../../components/common/FilterBar';
import BackButton from '../../components/common/BackButton';

const gmatMap = {
  'Below 650': { min: 0, max: 650 },
  '650-700': { min: 650, max: 700 },
  '700-730': { min: 700, max: 730 },
  '730+': { min: 730, max: 800 },
};

export default function SchoolList() {
  const navigate = useNavigate();
  const { 
    isPaidUser, 
    viewedSchools, 
  } = useUser();

  const [filters, setFilters] = useState({
    location: [],
    ranking: [],
    programLength: [],
    gmatRange: [],
    industryFocus: [],
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [pendingSchool, setPendingSchool] = useState(null);
  const [flippingCardKey, setFlippingCardKey] = useState(0);

  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          school.name.toLowerCase().includes(query) ||
          school.location.toLowerCase().includes(query) ||
          school.industryFocus?.some(i => i.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      const region = school.location.includes('US') ? 'US' :
                     school.location.includes('Europe') ? 'Europe' :
                     school.location.includes('Asia') ? 'Asia' :
                     school.location.includes('Canada') ? 'Canada' : 'Other';

      if (filters.location.length > 0 && !filters.location.includes(region)) return false;
      if (filters.ranking.length > 0 && !filters.ranking.includes(school.ranking)) return false;
      if (filters.programLength.length > 0 && !filters.programLength.includes(school.programLength)) return false;
      if (filters.gmatRange.length > 0) {
        const schoolGMAT = parseInt(school.avgGMAT);
        const matchesRange = filters.gmatRange.some(range => {
          const rangeData = gmatMap[range];
          return rangeData && schoolGMAT >= rangeData.min && schoolGMAT < rangeData.max;
        });
        if (!matchesRange && !filters.gmatRange.includes('Test optional')) return false;
      }
      return true;
    });
  }, [filters, searchQuery]);

  const handleSchoolClick = (school) => {
    if (isPaidUser || viewedSchools.includes(school.id)) {
      navigate(`/schools/${school.id}`);
      return;
    }

    if (viewedSchools.length < 3) {
      setPendingSchool(school);
      setShowPopup(true);
      return;
    }

    setFlippingCardKey(prev => prev + 1);
    navigate(`/schools/${school.id}`);
  };

  const handleConfirmView = () => {
    if (pendingSchool) {
      setShowPopup(false);
      setFlippingCardKey(prev => prev + 1);
      navigate(`/schools/${pendingSchool.id}`);
    }
  };

  const handleCancelPopup = () => {
    setShowPopup(false);
    setPendingSchool(null);
    setFlippingCardKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <BackButton to="/dashboard">Back to Dashboard</BackButton>

        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">School Selection</h1>
          <p className="text-gray-500 font-light text-lg">Find your dream MBA program</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search schools by name, location, or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-[72px] z-30 backdrop-blur-md -mx-6 px-6 py-4 mb-8 transition-all">
          <FilterBar filters={filters} setFilters={setFilters} />
        </div>

        <div className="mb-6">
          <p className="text-gray-500 font-light">
            Showing <span className="font-medium text-gray-900">{filteredSchools.length}</span> schools
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSchools.map((school) => (
            <SchoolCard 
              key={`${school.id}-${flippingCardKey}`}
              school={school} 
              onClick={() => handleSchoolClick(school)}
            />
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg font-light">No schools match your filters</p>
            <button 
              onClick={() => setFilters({ location: [], ranking: [], programLength: [], gmatRange: [], industryFocus: [] })}
              className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* 首次查看弹窗 */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform transition-all scale-100">
            <h3 className="text-xl font-normal text-gray-900 mb-3">
              Continue to school details
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed font-light">
              You have <span className="font-medium text-gray-900">{3 - viewedSchools.length}</span> free views remaining. This is your <span className="font-medium text-gray-900">{viewedSchools.length + 1}{viewedSchools.length === 0 ? 'st' : viewedSchools.length === 1 ? 'nd' : 'rd'}</span> view. Continue?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={handleCancelPopup}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-normal text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmView}
                className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-normal hover:bg-gray-800 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
