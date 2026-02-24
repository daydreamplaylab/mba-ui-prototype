import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { useUser } from '../../context/useUser';
import { applicationMaterialsData } from '../../data/applicationMaterials';
import BackButton from '../../components/common/BackButton';

export default function ApplicationMaterialsDashboard() {
  const navigate = useNavigate();
  const { categoryProgress, updateCategoryProgress } = useUser();

  const sections = [
    { id: 'essay', ...applicationMaterialsData.essayGuidance },
    { id: 'resume', ...applicationMaterialsData.resumeTips },
    { id: 'recommendations', ...applicationMaterialsData.recommendations },
    { id: 'application-form', ...applicationMaterialsData.applicationFormTips },
  ];

  const handleSectionClick = (sectionId) => {
    navigate(`/application/${sectionId}`);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BackButton to="/dashboard">← Back to Dashboard</BackButton>

        <div className="mb-8 mt-4">
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
            Application Materials
          </h1>
          <p className="text-gray-500 font-light text-lg">
            Learn how to craft strong application materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => {
            const isCompleted = categoryProgress[`application_${section.id}`] === 'completed';
            
            return (
              <div
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="relative bg-white rounded-2xl p-6 shadow-card cursor-pointer transition-all hover:shadow-card-hover group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-normal text-gray-900">
                    {section.title}
                  </h3>
                  {isCompleted && (
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-green-600" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-500 mb-4">
                  {section.description}
                </p>

                <div className="flex items-center gap-1 text-sm text-purple-600">
                  <span>{isCompleted ? 'Review' : 'Start'}</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
