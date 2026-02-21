import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { categories, whyMbaSummary, careerVisionSummary } from '../../data/stories';
import BackButton from '../../components/common/BackButton';

export default function SummaryPage() {
  const { categoryId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const category = categories.find(c => c.id === categoryId);
  
  const summaryData = categoryId === 'why-mba' ? whyMbaSummary : careerVisionSummary;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BackButton to="/stories">← Back to Build Your Stories</BackButton>

        <div className="mt-8 max-w-2xl">
          <h1 className="text-3xl font-light text-gray-900 mb-2">{category?.name}</h1>
          <p className="text-gray-500 mb-8">Completed in Strategy</p>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-normal text-gray-900">Summary</h2>
              <button 
                onClick={() => setShowModal(true)}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                View Details
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <ul className="space-y-3">
                {summaryData.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 pointer-events-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-normal text-gray-900">{category?.name} Details</h2>
              <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <ul className="space-y-3">
                {summaryData.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
