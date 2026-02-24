import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, CheckCircle } from 'lucide-react';
import { useUser } from '../context/useUser';
import { strategyData } from '../data/strategy';

const defaultProfileData = {
  name: 'Demo User',
  email: 'demo@example.com',
  currentRole: "Senior Consultant at McKinsey & Company, 3 years in current role",
  yearsOfExperience: "5 years",
  education: "BS Computer Science, UC Berkeley, 2020",
  gpa: "3.6 / 4.0",
  testScore: "GMAT 720 (Q49, V40)",
  targetSchools: "Harvard, Stanford, Wharton, Kellogg",
  postMbaGoal: "Product Management at a major tech company, long-term goal to lead product at a startup",
  whyMba: "Career transition from consulting to tech, build a stronger network, develop product skills"
};

const paymentHistory = [
  { date: 'Feb 23, 2026', description: 'Offerland Full Access (12 months)', amount: '$299.00' },
  { date: 'Mar 10, 2026', description: 'Coach Session — Essay Review (Sarah Chen)', amount: '$150.00' },
  { date: 'Mar 25, 2026', description: 'Coach Session — Interview Prep (James Wong)', amount: '$200.00' },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { isPaidUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(defaultProfileData);
  const [originalData, setOriginalData] = useState(defaultProfileData);
  const [showToast, setShowToast] = useState(false);

  const handleEdit = () => {
    setOriginalData(profileData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 pb-20">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {showToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50">
            <Check size={18} />
            Profile updated
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Personal Information</h1>
              <p className="text-gray-500 text-sm mt-1">Your profile information from the Initial Assessment</p>
            </div>
            {!isEditing ? (
              <button 
                onClick={handleEdit}
                className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-1"
                >
                  <Check size={16} />
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              ) : (
                <p className="text-gray-900">{profileData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <input
                type="text"
                value={profileData.email}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Current Role</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.currentRole}
                  onChange={(e) => handleChange('currentRole', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              ) : (
                <p className="text-gray-900">{profileData.currentRole}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Years of Experience</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.yearsOfExperience}
                  onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              ) : (
                <p className="text-gray-900">{profileData.yearsOfExperience}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Education</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              ) : (
                <p className="text-gray-900">{profileData.education}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">GPA</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.gpa}
                  onChange={(e) => handleChange('gpa', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              ) : (
                <p className="text-gray-900">{profileData.gpa}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Test Score</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.testScore}
                  onChange={(e) => handleChange('testScore', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              ) : (
                <p className="text-gray-900">{profileData.testScore}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Target Schools</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.targetSchools}
                  onChange={(e) => handleChange('targetSchools', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              ) : (
                <p className="text-gray-900">{profileData.targetSchools}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Post-MBA Goal</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.postMbaGoal}
                  onChange={(e) => handleChange('postMbaGoal', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              ) : (
                <p className="text-gray-900">{profileData.postMbaGoal}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Why MBA</label>
              {isEditing ? (
                <textarea
                  value={profileData.whyMba}
                  onChange={(e) => handleChange('whyMba', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              ) : (
                <p className="text-gray-900">{profileData.whyMba}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Billing</h1>

          <div className={`p-4 rounded-xl mb-6 ${isPaidUser ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
            {isPaidUser ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                <span className="font-medium text-gray-900">Offerland Full Access</span>
                <span className="text-gray-500">· Valid until February 23, 2027</span>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Free Plan</span>
                <button 
                  onClick={() => navigate('/pricing')}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Upgrade to Full Access
                </button>
              </div>
            )}
          </div>

          <h2 className="text-lg font-medium text-gray-900 mb-4">Payment History</h2>

          {isPaidUser ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-sm font-medium text-gray-500 pb-3">Date</th>
                    <th className="text-left text-sm font-medium text-gray-500 pb-3">Description</th>
                    <th className="text-right text-sm font-medium text-gray-500 pb-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="py-3 text-sm text-gray-600">{payment.date}</td>
                      <td className="py-3 text-sm text-gray-900">{payment.description}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">{payment.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No payment history yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
