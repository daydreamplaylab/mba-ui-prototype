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

  const [stories, setStories] = useState(() => {
    try {
      const saved = localStorage.getItem('offerland_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [categoryProgress, setCategoryProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('offerland_category_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [customCategories, setCustomCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('offerland_custom_categories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
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

  const canSaveStory = () => {
    if (isPaidUser) return true;
    return stories.length < 3;
  };

  const getRemainingStories = () => {
    if (isPaidUser) return '∞';
    return Math.max(0, 3 - stories.length);
  };

  const getUsedStoriesDisplay = () => {
    if (isPaidUser) return '∞';
    return `${stories.length}/3 free stories`;
  };

  const addStory = (story) => {
    const newStory = { ...story, id: Date.now(), dateAdded: new Date().toISOString().split('T')[0] };
    const newStories = [...stories, newStory];
    setStories(newStories);
    localStorage.setItem('offerland_stories', JSON.stringify(newStories));
    
    if (story.categoryId && !customCategories.includes(story.categoryId)) {
      const newCategories = [...customCategories, story.categoryId];
      setCustomCategories(newCategories);
      localStorage.setItem('offerland_custom_categories', JSON.stringify(newCategories));
    }
    
    return newStory;
  };

  const updateStory = (storyId, updates) => {
    const newStories = stories.map(s => s.id === storyId ? { ...s, ...updates } : s);
    setStories(newStories);
    localStorage.setItem('offerland_stories', JSON.stringify(newStories));
  };

  const deleteStory = (storyId) => {
    const newStories = stories.filter(s => s.id !== storyId);
    setStories(newStories);
    localStorage.setItem('offerland_stories', JSON.stringify(newStories));
  };

  const updateCategoryProgress = (categoryId, progress) => {
    const newProgress = { ...categoryProgress, [categoryId]: progress };
    setCategoryProgress(newProgress);
    localStorage.setItem('offerland_category_progress', JSON.stringify(newProgress));
  };

  const getCategoryStatus = (categoryId) => {
    return categoryProgress[categoryId] || 'not_started';
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
    stories,
    addStory,
    updateStory,
    deleteStory,
    canSaveStory,
    getRemainingStories,
    getUsedStoriesDisplay,
    categoryProgress,
    updateCategoryProgress,
    getCategoryStatus,
    customCategories,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
