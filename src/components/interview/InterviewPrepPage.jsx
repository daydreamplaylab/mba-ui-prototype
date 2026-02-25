import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Check, Lock } from 'lucide-react';
import { useUser } from '../../context/useUser';
import { interviewPrepData } from '../../data/applicationMaterials';
import BackButton from '../../components/common/BackButton';

export default function InterviewPrepPage() {
  const navigate = useNavigate();
  const { categoryProgress, updateCategoryProgress, isPaidUser } = useUser();
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [completedSections, setCompletedSections] = useState({});

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const toggleQuestion = (qType, qIndex) => {
    const key = `${qType}-${qIndex}`;
    setExpandedQuestions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMarkComplete = (section) => {
    updateCategoryProgress(`interview_${section}`, 'completed');
    setCompletedSections(prev => ({ ...prev, [section]: true }));
  };

  const renderContent = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.includes('[Go to Build Your Stories]')) {
        const parts = line.split('[Go to Build Your Stories]');
        return (
          <p key={i} className="mb-2">
            {parts[0]}
            <Link to="/stories" className="text-purple-600 underline hover:text-purple-700">Go to Build Your Stories</Link>
            {parts[1]}
          </p>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold text-gray-900 mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <p key={i} className="ml-4 mb-1">• {line.substring(2)}</p>;
      }
      return line ? <p key={i} className="mb-2">{line}</p> : <br key={i} />;
    });
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BackButton to="/dashboard">Back to Dashboard</BackButton>

        <div className="mb-8 mt-4">
          <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
            Interview Prep
          </h1>
          <p className="text-gray-600 font-light text-lg max-w-2xl">
            {interviewPrepData.welcome}
          </p>
        </div>

        <div className="bg-purple-50 rounded-2xl p-6 mb-8 border border-purple-100">
          <p className="text-purple-800">
            When you're ready for mock interviews and school-specific questions, our coaches can help.{' '}
            <a href="/coaches" className="underline hover:text-purple-900">Browse coaches</a>
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-6">
            {interviewPrepData.generalTips.title}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {interviewPrepData.generalTips.topics.map((topic, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => toggleSection(`general-${index}`)}
                  className={`w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors ${
                    index === 0 ? 'bg-purple-50/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${index === 0 ? 'text-purple-600' : 'text-gray-900'}`}>
                      {index + 1}.
                    </span>
                    <span className={`font-normal ${index === 0 ? 'text-purple-900' : 'text-gray-900'}`}>
                      {topic.title}
                    </span>
                  </div>
                  {expandedSections[`general-${index}`] ? (
                    <ChevronUp size={18} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400" />
                  )}
                </button>

                {expandedSections[`general-${index}`] && (
                  <div className="px-6 pb-6">
                    <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap">
                      {renderContent(topic.content)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handleMarkComplete('general')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-normal transition-colors ${
                completedSections.general
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {completedSections.general ? (
                <>
                  <Check size={16} />
                  Completed
                </>
              ) : (
                'Mark as Complete'
              )}
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-2">
            {interviewPrepData.commonQuestions.title}
          </h2>

          {!isPaidUser ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center min-h-[300px]">
                <Lock size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium mb-2">Unlock All Interview Questions</p>
                <p className="text-gray-500 text-sm mb-4 text-center max-w-xs">Get access to 20+ common MBA interview questions with expert approach tips.</p>
                <button 
                  onClick={() => navigate('/pricing')}
                  className="px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Upgrade to Unlock
                </button>
              </div>
              <div className="blur-sm select-none pointer-events-none opacity-50">
                {interviewPrepData.commonQuestions.questionTypes.map((qType, typeIndex) => (
                  <div key={typeIndex} className="border-b border-gray-100">
                    <div className="px-6 py-4 bg-gray-50">
                      <h3 className="font-medium text-gray-900">{qType.type}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Think through your answer first, then tap to see our approach.
              </p>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {interviewPrepData.commonQuestions.questionTypes.map((qType, typeIndex) => (
                  <div key={typeIndex} className="border-b border-gray-100 last:border-b-0">
                    <div className="px-6 py-4 bg-gray-50">
                      <h3 className="font-medium text-gray-900">{qType.type}</h3>
                    </div>
                    {qType.questions.map((q, qIndex) => {
                      const key = `${typeIndex}-${qIndex}`;
                      const isExpanded = expandedQuestions[key];

                      return (
                        <div key={qIndex}>
                          <button
                            onClick={() => toggleQuestion(typeIndex, qIndex)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors border-t border-gray-100"
                          >
                            <span className="text-gray-900 pr-4">{q.question}</span>
                            {isExpanded ? (
                              <ChevronUp size={18} className="text-gray-400" />
                            ) : (
                              <ChevronDown size={18} className="text-gray-400" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="px-6 pb-4 border-t border-gray-50">
                              <p className="text-sm text-gray-600 mt-3">{q.tip}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleMarkComplete('questions')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-normal transition-colors ${
                    completedSections.questions
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {completedSections.questions ? (
                    <>
                      <Check size={16} />
                      Completed
                    </>
                  ) : (
                    'Mark as Complete'
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-normal text-white mb-3">
            Get Personalized Prep
          </h3>
          <p className="text-gray-400 mb-6">
            You've got the fundamentals. For school-specific questions, mock practice, and real feedback, connect with a coach.
          </p>
          <button 
            onClick={() => navigate('/coaches')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Get Personalized Prep
          </button>
        </div>
      </div>
    </div>
  );
}
