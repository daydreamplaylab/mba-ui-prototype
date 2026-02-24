import React, { useState } from 'react';

const IntakeFormModal = ({ coach, onClose, onSubmit }) => {
  const [topic, setTopic] = useState('');
  const [requirements, setRequirements] = useState('');
  const [availability, setAvailability] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ topic, requirements, availability });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[80] flex justify-center items-center" onClick={onClose}>
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold mb-4">Request Sent!</h2>
          <p className="text-gray-600 mb-8">The coach will reply within 24 hours.</p>
          <button 
            onClick={onClose} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg w-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[80] flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">Connect with {coach.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Coaching Topic</label>
            <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select a topic</option>
              <option value="Strategy & Career">Strategy & Career</option>
              <option value="School Selection">School Selection</option>
              <option value="Essay & Resume Review">Essay & Resume Review</option>
              <option value="Interview Prep">Interview Prep</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">Specific Requirements</label>
            <textarea id="requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} rows="4" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Tell the coach about your situation and what you'd like to focus on..."></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
            <textarea id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)} rows="2" className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="When are you free over the next 7 days? (e.g., 'Weekday evenings EST', 'Anytime Saturday')"></textarea>
          </div>
          <div className="flex justify-end items-center border-t pt-4 mt-6">
            <button type="button" onClick={onClose} className="mr-4 text-gray-600 font-semibold hover:underline">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold">Send Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntakeFormModal;
