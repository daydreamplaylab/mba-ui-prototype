import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { strategyData } from '../../data/strategy';
import BackButton from '../../components/common/BackButton';

export default function PartAResults() {
  const navigate = useNavigate();
  const [showStartOver, setShowStartOver] = useState(false);
  const { profileSummary, guidance, nextSteps } = strategyData.partA.results;

  useEffect(() => {
    localStorage.setItem('offerland_part_a_completed', 'true');
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <BackButton to="/strategy">Back to Strategy</BackButton>

        <div className="mt-8">
          <h1 className="text-3xl font-light text-gray-900 mb-8 tracking-tight">
            Your Assessment Results
          </h1>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-lg font-normal text-gray-900 mb-4">Profile Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Current Role</p>
                <p className="text-sm text-gray-700">{profileSummary.currentRole}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Experience</p>
                <p className="text-sm text-gray-700">{profileSummary.experience}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Education</p>
                <p className="text-sm text-gray-700">{profileSummary.education}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Test Score</p>
                <p className="text-sm text-gray-700">{profileSummary.testScore}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Target Schools</p>
                <p className="text-sm text-gray-700">{profileSummary.targetSchools}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Post-MBA Goal</p>
                <p className="text-sm text-gray-700">{profileSummary.postMbaGoal}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-lg font-normal text-gray-900 mb-4">Guidance</h2>
            <div className="space-y-4">
              {guidance.map((paragraph, idx) => (
                <p key={idx} className="text-sm text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-lg font-normal text-gray-900 mb-4">Recommended Next Steps</h2>
            <ul className="space-y-3">
              {nextSteps.map((step, idx) => (
                <li key={idx}>
                  <a 
                    href={step.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:text-purple-700 underline"
                  >
                    {step.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <button 
              onClick={() => setShowStartOver(true)}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Start Over
            </button>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>

          {showStartOver && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
                <p className="text-gray-700 mb-4">
                  Start Over feature coming soon. If you have any considerations, please email us at support@offerland.com
                </p>
                <button 
                  onClick={() => setShowStartOver(false)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
