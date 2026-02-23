import { useParams, useNavigate } from 'react-router-dom';
import { applicationMaterialsData } from '../../data/applicationMaterials';
import ContentSection from './ContentSection';
import { useUser } from '../../context/useUser';

export default function ApplicationSectionPage() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { updateCategoryProgress } = useUser();

  const sectionDataMap = {
    'essay': applicationMaterialsData.essayGuidance,
    'resume': applicationMaterialsData.resumeTips,
    'recommendations': applicationMaterialsData.recommendations,
    'application-form': applicationMaterialsData.applicationFormTips,
  };

  const sectionData = sectionDataMap[sectionId];

  if (!sectionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Section not found</p>
          <button 
            onClick={() => navigate('/application')}
            className="mt-4 text-purple-600 hover:text-purple-700"
          >
            Back to Application Materials
          </button>
        </div>
      </div>
    );
  }

  const handleMarkComplete = (completed) => {
    updateCategoryProgress(`application_${sectionId}`, completed ? 'completed' : 'not_started');
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button 
          onClick={() => navigate('/application')}
          className="text-gray-600 hover:text-gray-900 mb-6"
        >
          ← Back to Application Materials
        </button>

        <h1 className="text-3xl font-light text-gray-900 mb-8">
          {sectionData.title}
        </h1>

        <ContentSection 
          title={sectionData.title}
          topics={sectionData.topics}
          sectionKey={sectionId}
          onMarkComplete={handleMarkComplete}
        />
      </div>
    </div>
  );
}
