import { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, Check, Plus, X, Pencil, Trash2 } from 'lucide-react';
import { useUser } from '../../context/useUser';
import { applicationPlanData } from '../../data/applicationPlan';
import BackButton from '../../components/common/BackButton';
import UpgradePrompt from '../common/UpgradePrompt';

export default function ApplicationPlanPage() {
  const { isPaidUser } = useUser();
  const [expandedCategories, setExpandedCategories] = useState({});
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('offerland_completed_tasks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [customTasks, setCustomTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('offerland_custom_tasks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [addingTask, setAddingTask] = useState({});
  const [newTaskName, setNewTaskName] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const toggleTask = (taskId) => {
    if (!isPaidUser) {
      setShowUpgradePrompt(true);
      return;
    }
    const newCompleted = { ...completedTasks, [taskId]: !completedTasks[taskId] };
    setCompletedTasks(newCompleted);
    localStorage.setItem('offerland_completed_tasks', JSON.stringify(newCompleted));
  };

  const getCategoryProgress = (category) => {
    const presetCount = category.tasks.length;
    const customCount = customTasks[category.id]?.length || 0;
    const total = presetCount + customCount;
    
    let completed = 0;
    category.tasks.forEach(task => {
      if (completedTasks[task.id]) completed++;
    });
    if (customTasks[category.id]) {
      customTasks[category.id].forEach(task => {
        if (completedTasks[task.id]) completed++;
      });
    }
    
    return { completed, total };
  };

  const getTotalProgress = () => {
    let total = 0;
    let completed = 0;
    
    applicationPlanData.categories.forEach(category => {
      total += category.tasks.length;
      category.tasks.forEach(task => {
        if (completedTasks[task.id]) completed++;
      });
      if (customTasks[category.id]) {
        total += customTasks[category.id].length;
        customTasks[category.id].forEach(task => {
          if (completedTasks[task.id]) completed++;
        });
      }
    });
    
    return { completed, total };
  };

  const handleAddTask = (categoryId) => {
    if (!newTaskName[categoryId]?.trim()) return;
    
    const newTasks = { ...customTasks };
    if (!newTasks[categoryId]) {
      newTasks[categoryId] = [];
    }
    
    const taskId = `custom-${Date.now()}`;
    newTasks[categoryId].push({ id: taskId, name: newTaskName[categoryId].trim() });
    setCustomTasks(newTasks);
    localStorage.setItem('offerland_custom_tasks', JSON.stringify(newTasks));
    
    setNewTaskName({ ...newTaskName, [categoryId]: '' });
    setAddingTask({ ...addingTask, [categoryId]: false });
  };

  const handleDeleteTask = (categoryId, taskId) => {
    const newTasks = { ...customTasks };
    newTasks[categoryId] = newTasks[categoryId].filter(t => t.id !== taskId);
    setCustomTasks(newTasks);
    localStorage.setItem('offerland_custom_tasks', JSON.stringify(newTasks));
    
    const newCompleted = { ...completedTasks };
    delete newCompleted[taskId];
    setCompletedTasks(newCompleted);
    localStorage.setItem('offerland_completed_tasks', JSON.stringify(newCompleted));
  };

  const handleEditTask = (categoryId, taskId, currentName) => {
    setEditingTask(taskId);
    setEditTaskName(currentName);
  };

  const handleSaveEdit = (categoryId, taskId) => {
    if (!editTaskName.trim()) return;
    
    const newTasks = { ...customTasks };
    const taskIndex = newTasks[categoryId].findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      newTasks[categoryId][taskIndex].name = editTaskName.trim();
      setCustomTasks(newTasks);
      localStorage.setItem('offerland_custom_tasks', JSON.stringify(newTasks));
    }
    setEditingTask(null);
    setEditTaskName('');
  };

  const renderTask = (task, categoryId, isCustom = false) => {
    const isCompleted = completedTasks[task.id];
    const isEditing = editingTask === task.id;

    return (
      <div key={task.id} className="flex items-center gap-3 py-2 group">
        <button
          onClick={() => toggleTask(task.id)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            isCompleted 
              ? 'bg-purple-500 border-purple-500' 
              : 'border-gray-300 hover:border-purple-400'
          }`}
        >
          {isCompleted && <Check size={12} className="text-white" />}
        </button>
        
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editTaskName}
              onChange={(e) => setEditTaskName(e.target.value)}
              className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit(categoryId, taskId);
                if (e.key === 'Escape') setEditingTask(null);
              }}
            />
            <button 
              onClick={() => handleSaveEdit(categoryId, taskId)}
              className="text-purple-600 hover:text-purple-700"
            >
              <Check size={14} />
            </button>
            <button 
              onClick={() => setEditingTask(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
              {task.name}
            </span>
            {task.link && (
              <a 
                href={task.link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-purple-600 hover:text-purple-700"
              >
                → {task.link.text}
              </a>
            )}
            {isCustom && isPaidUser && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEditTask(categoryId, task.id, task.name)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Pencil size={12} />
                </button>
                <button 
                  onClick={() => handleDeleteTask(categoryId, task.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const progress = getTotalProgress();
  const progressPercent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <BackButton to="/">← Back to Dashboard</BackButton>

        <div className="mb-8 mt-4">
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
            Application Plan
          </h1>
          <p className="text-gray-500 font-light text-lg">
            {applicationPlanData.welcome}
          </p>
        </div>

        {isPaidUser && (
          <div className="mb-8 bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-800">
                {progress.completed} of {progress.total} tasks complete ({progressPercent}%)
              </span>
              <span className="text-sm text-purple-600 font-medium">{progressPercent}%</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="space-y-4">
          {applicationPlanData.categories.map((category) => {
            const isExpanded = expandedCategories[category.id];
            const progress = getCategoryProgress(category);
            
            return (
              <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-normal text-gray-900">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {isPaidUser && isExpanded !== true && (
                      <span className="text-xs text-gray-400">
                        {progress.completed}/{progress.total} complete
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp size={18} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="relative">
                    <div className={`px-6 pb-4 ${!isPaidUser ? 'blur-sm select-none' : ''}`}>
                      {category.tasks.map(task => renderTask(task, category.id, false))}
                      
                      {customTasks[category.id]?.map(task => renderTask(task, category.id, true))}
                      
                      {isPaidUser && (
                        <div className="mt-2">
                          {addingTask[category.id] ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={newTaskName[category.id] || ''}
                                onChange={(e) => setNewTaskName({ ...newTaskName, [category.id]: e.target.value })}
                                placeholder="Enter task name..."
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleAddTask(category.id);
                                  if (e.key === 'Escape') {
                                    setAddingTask({ ...addingTask, [category.id]: false });
                                    setNewTaskName({ ...newTaskName, [category.id]: '' });
                                  }
                                }}
                              />
                              <button 
                                onClick={() => handleAddTask(category.id)}
                                className="px-3 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600"
                              >
                                Save
                              </button>
                              <button 
                                onClick={() => {
                                  setAddingTask({ ...addingTask, [category.id]: false });
                                  setNewTaskName({ ...newTaskName, [category.id]: '' });
                                }}
                                className="p-2 text-gray-400 hover:text-gray-600"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setAddingTask({ ...addingTask, [category.id]: true })}
                              className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
                            >
                              <Plus size={14} />
                              Add task
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {!isPaidUser && (
                      <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center z-10">
                        <Lock size={32} className="text-gray-400 mb-2" />
                        <p className="text-gray-600 font-medium text-sm mb-1">Unlock tasks</p>
                        <p className="text-gray-500 text-xs mb-3">Upgrade to check off tasks</p>
                        <button 
                          onClick={() => setShowUpgradePrompt(true)}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors"
                        >
                          Upgrade to Unlock
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showUpgradePrompt && (
        <UpgradePrompt
          title="Unlock Task Tracking"
          message="Upgrade to track your application progress and add custom tasks."
          onUpgrade={() => window.location.href = '/pricing'}
          onClose={() => setShowUpgradePrompt(false)}
        />
      )}
    </div>
  );
}
