
import React from 'react';

const CoachDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Coach Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">New Requests</h2>
          <div className="border rounded-lg p-4 mb-4">
            <h3 className="font-semibold">John D.</h3>
            <p className="text-sm text-gray-600">Strategy & Career</p>
            <p className="text-sm my-2">I need help with my application strategy for M7 schools.</p>
            <p className="text-xs text-red-500">Reply within 12 hours</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">Reply</button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Sessions</h2>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Jane S.</h3>
            <p className="text-sm text-gray-600">Interview Prep</p>
            <p className="text-sm my-2">Tomorrow at 2:00 PM</p>
            <button className="bg-gray-200 px-4 py-2 rounded-lg mt-2">Send Payment Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
