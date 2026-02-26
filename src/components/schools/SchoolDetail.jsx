import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Award, Clock, TrendingUp, Users, Briefcase, GraduationCap, Globe, ExternalLink, Heart, Check, Lock, X } from 'lucide-react';
import { schools } from '../../data/schools';
import { useUser } from '../../context/useUser';
import BackButton from '../../components/common/BackButton';

const StatItem = ({ icon, label, value }) => {
  const Icon = icon;
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100/50">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100 text-purple-600">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="font-semibold text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
};

export default function SchoolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [fromPath, setFromPath] = useState('/schools');
  
  const { 
    isPaidUser, 
    addViewedSchool, 
    addSavedSchool, 
    removeSavedSchool,
    isSchoolSaved, 
    canViewSchool,
    viewedSchools
  } = useUser();

  const school = schools.find(s => s.id === parseInt(id));

  useEffect(() => {
    const prevPath = sessionStorage.getItem('schoolDetailReferrer');
    if (prevPath && (prevPath === '/my-schools' || prevPath === '/schools')) {
      setFromPath(prevPath);
    }
  }, []);
  
  const canView = school ? canViewSchool(school.id) : true;
  const saved = school ? isSchoolSaved(school.id) : false;
  const isLocked = !canView;
  const hasCountedRef = useRef(false);

  useEffect(() => {
    if (school && canView && !hasCountedRef.current && !viewedSchools.includes(school.id) && !isPaidUser) {
      hasCountedRef.current = true;
      addViewedSchool(school.id);
    }
  }, [school, canView, viewedSchools, isPaidUser, addViewedSchool]);

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">School not found</p>
          <button 
            onClick={() => navigate('/schools')}
            className="mt-4 text-purple-600 hover:text-purple-700"
          >
            Back to Schools
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (saved) {
      removeSavedSchool(school.id);
    } else {
      addSavedSchool(school);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Upgrade hint for locked users - fixed center position */}
      {isLocked && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center pointer-events-auto relative">
            <button 
              onClick={() => navigate('/schools')}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            <Lock size={28} className="text-gray-500 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-4">Upgrade to unlock full details</p>
            <button 
              onClick={() => navigate('/pricing')}
              className="px-6 py-2.5 bg-purple-500 text-white rounded-full text-sm font-normal hover:bg-purple-600 transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-8 relative">
        <BackButton to={fromPath}>
          {fromPath === '/my-schools' ? 'Back to My Schools' : 'Back to Schools'}
        </BackButton>

        <div className={`bg-white rounded-3xl shadow-float overflow-hidden transition-all duration-500 ${isLocked ? 'blur-[4px] select-none pointer-events-none' : ''}`}>
          
          <div className="p-10 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50/30">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-purple-600 shadow-inner">
                  {school.logo}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{school.name}</h1>
                  <div className="flex items-center gap-2 text-gray-500 mt-2 font-light">
                    <MapPin size={18} />
                    <span>{school.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-sm font-medium shadow-md">
                  {school.ranking}
                </span>
                <span className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium">
                  {school.programLength}
                </span>
                <button 
                  onClick={handleSave}
                  className={`p-3 rounded-full transition-all border ${
                    saved 
                      ? 'bg-pink-50 border-pink-100 text-pink-500' 
                      : 'bg-white border-gray-200 text-gray-400 hover:border-pink-200 hover:text-pink-500'
                  }`}
                >
                  <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatItem icon={TrendingUp} label="Average GMAT" value={school.keyStats.avgGMAT} />
            <StatItem icon={GraduationCap} label="Average GPA" value={school.keyStats.avgGPA} />
            <StatItem icon={Briefcase} label="Work Exp" value={`${school.keyStats.yearsWorkExperience} years`} />
            <StatItem icon={Users} label="Class Size" value={school.keyStats.classSize} />
            <StatItem icon={Award} label="Acceptance" value={school.keyStats.acceptanceRate} />
            <StatItem icon={Globe} label="Intl Students" value={school.keyStats.internationalStudentPercent} />
            <StatItem icon={Check} label="Employment" value={school.keyStats.employmentRate} />
            <StatItem icon={Clock} label="Avg GMAT" value={school.avgGMAT} />
          </div>

          <div className="px-10 pb-10 space-y-10">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                Program Highlights
              </h2>
              <p className="text-gray-600 leading-relaxed font-light text-lg">{school.programHighlights}</p>
            </section>

            <div className="grid md:grid-cols-2 gap-10">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                  What They Look For
                </h2>
                <p className="text-gray-600 leading-relaxed font-light">{school.whatTheyLookFor}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                  Student Voice
                </h2>
                <ul className="space-y-4">
                  {school.studentVoice.map((voice, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-600 bg-gray-50 p-4 rounded-xl">
                      <span className="text-2xl text-purple-300 leading-none">"</span>
                      <span className="font-light italic">{voice}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Application Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4 uppercase text-xs tracking-wider text-gray-500">Deadlines</h3>
                  <div className="space-y-3">
                    {Object.entries(school.applicationInfo.deadlines).map(([round, date]) => (
                      <div key={round} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100">
                        <span className="font-medium text-purple-700">{round}</span>
                        <span className="text-gray-600 font-light">{date}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-4 uppercase text-xs tracking-wider text-gray-500">Requirements</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <p className="text-sm font-medium text-gray-900 mb-2">Essays</p>
                      <ul className="space-y-1">
                        {school.applicationInfo.essays.map((essay, idx) => (
                          <li key={idx} className="text-sm text-gray-600 font-light">• {essay}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                       <p className="text-sm font-medium text-gray-900 mb-1">Interview</p>
                       <p className="text-sm text-gray-600 font-light">{school.applicationInfo.interviewFormat}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Resources</h2>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={school.resources.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-purple-300 hover:text-purple-700 transition-all shadow-sm"
                >
                  <Globe size={18} />
                  Official Website
                  <ExternalLink size={14} className="text-gray-400" />
                </a>
                <a 
                  href={school.resources.application} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                >
                  <ExternalLink size={18} />
                  Application Portal
                </a>
              </div>
            </section>

            <section className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
              <h2 className="text-xl font-semibold text-purple-900 mb-4">Tips for Applying</h2>
              <p className="text-purple-800 leading-relaxed font-light">{school.tips}</p>
            </section>

            <button 
              onClick={handleSave}
              className={`w-full py-4 rounded-xl font-medium transition-all ${
                saved 
                  ? 'bg-pink-50 text-pink-600 border border-pink-200'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {saved ? '✓ Saved to My Schools' : '+ Add to My Schools'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
