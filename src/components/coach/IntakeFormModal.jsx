
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">✓ Request sent!</h2>
                <p className="text-gray-600 mb-6">{coach.name} will reply within 24 hours.</p>
                <button onClick={() => { /* Navigate to messages */ }} className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-2">Go to Messages</button>
                <button onClick={onClose} className="text-gray-600">Close</button>
            </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Connect with {coach.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Coaching Topic</label>
            <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option value="">Select a topic</option>
              <option value="Strategy & Career">Strategy & Career</option>
              <option value="School Selection">School Selection</option>
              <option value="Essay & Resume Review">Essay & Resume Review</option>
              <option value="Interview Prep">Interview Prep</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Specific Requirements</label>
            <textarea id="requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} rows="4" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Tell the coach about your situation and what you'd like to focus on..."></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
            <textarea id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)} rows="2" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="When are you free over the next 7 days? (e.g., 'Weekday evenings EST', 'Anytime Saturday')"></textarea>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 text-gray-600">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Send Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntakeFormModal;
