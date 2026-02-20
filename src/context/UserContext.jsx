/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [viewedSchools, setViewedSchools] = useState([]);
  const [savedSchools, setSavedSchools] = useState(() => {
    try {
      const saved = localStorage.getItem('offerland_saved_schools');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [hasSeenPopup, setHasSeenPopup] = useState(() => {
    return localStorage.getItem('offerland_has_seen_popup') === 'true';
  });

  // 确认弹窗逻辑
  const markPopupAsSeen = () => {
    setHasSeenPopup(true);
    localStorage.setItem('offerland_has_seen_popup', 'true');
  };

  const addViewedSchool = (schoolId) => {
    if (!viewedSchools.includes(schoolId)) {
      setViewedSchools(prev => [...prev, schoolId]);
    }
  };

  // 修复 Save 逻辑：实时更新且持久化
  const addSavedSchool = (school) => {
    // 检查是否已存在
    if (savedSchools.some(s => s.id === school.id)) return;
    
    const newSaved = [...savedSchools, school];
    setSavedSchools(newSaved);
    localStorage.setItem('offerland_saved_schools', JSON.stringify(newSaved));
  };

  const removeSavedSchool = (schoolId) => {
    const newSaved = savedSchools.filter(s => s.id !== schoolId);
    setSavedSchools(newSaved);
    localStorage.setItem('offerland_saved_schools', JSON.stringify(newSaved));
  };

  const isSchoolSaved = (schoolId) => {
    return savedSchools.some(s => s.id === schoolId);
  };

  const getRemainingViews = () => {
    if (isPaidUser) return '∞';
    return Math.max(0, 3 - viewedSchools.length);
  };

  const getUsedViewsDisplay = () => {
    if (isPaidUser) return '∞';
    return `${viewedSchools.length}/3 free views used`;
  };

  const canViewSchool = (schoolId) => {
    if (isPaidUser) return true;
    if (viewedSchools.includes(schoolId)) return true;
    return viewedSchools.length < 3;
  };

  const value = {
    isPaidUser,
    setIsPaidUser,
    viewedSchools,
    addViewedSchool,
    savedSchools,
    addSavedSchool,
    removeSavedSchool,
    isSchoolSaved,
    hasSeenPopup,
    markPopupAsSeen,
    getRemainingViews,
    getUsedViewsDisplay,
    canViewSchool,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
