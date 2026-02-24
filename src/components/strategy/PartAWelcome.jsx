import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Check, X } from 'lucide-react';
import { strategyData } from '../../data/strategy';
import BackButton from '../../components/common/BackButton';

export default function PartAWelcome() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setUploadedFile(file.name);
        setIsUploading(false);
      }, 1000);
    }
  };

  const handleContinue = () => {
    navigate('/strategy/part-a');
  };

  const handleSkip = () => {
    navigate('/strategy/part-a');
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <BackButton to="/strategy">← Back to Strategy</BackButton>

        <div className="mt-8 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
            {strategyData.partA.welcome}
          </h1>

          <div className="mt-12 mb-8">
            {!uploadedFile ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex flex-col items-center justify-center w-64 h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-colors"
              >
                {isUploading ? (
                  <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Upload size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Upload your resume (optional)
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3 px-6 py-4 bg-green-50 rounded-xl border border-green-200">
                <Check size={20} className="text-green-600" />
                <span className="text-sm text-gray-700">{uploadedFile}</span>
                <button 
                  onClick={() => setUploadedFile(null)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={handleContinue}
              className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Continue
            </button>
            
            <button 
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
