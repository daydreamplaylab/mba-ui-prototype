import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useUser } from '../../context/useUser';
import SchoolCard from '../../components/common/SchoolCard';
import BackButton from '../../components/common/BackButton';

export default function MySchools() {
  const navigate = useNavigate();
  const { savedSchools, removeSavedSchool } = useUser();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all schools from your list?')) {
      savedSchools.forEach(school => removeSavedSchool(school.id));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <BackButton to="/schools">← Back to Schools</BackButton>
          
          {savedSchools.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isEditMode 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isEditMode ? 'Done' : 'Manage List'}
              </button>
              
              {isEditMode && (
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Clear All
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">My School List</h1>
          <p className="text-gray-500 font-light">
            {savedSchools.length} {savedSchools.length === 1 ? 'school' : 'schools'} saved
          </p>
        </div>

        {savedSchools.length === 0 ? (
          <div className="text-center py-32 bg-white/50 rounded-3xl border border-dashed border-gray-200">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your list is empty</h3>
            <p className="text-gray-500 font-light mb-8">
              Start exploring schools and save your favorites here.
            </p>
            <button 
              onClick={() => navigate('/schools')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl group"
            >
              Browse Schools
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedSchools.map((school) => (
              <div key={school.id} className="relative group">
                <SchoolCard 
                  school={school}
                  onClick={() => {
                    sessionStorage.setItem('schoolDetailReferrer', '/my-schools');
                    navigate(`/schools/${school.id}`);
                  }}
                  showRemove={true} // Always show heart/remove button
                />
                {isEditMode && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSavedSchool(school.id);
                      }}
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
