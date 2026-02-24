
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const CoachMarketplace = () => {
  return (
    <div>
      <div className="p-8">
          <div className="flex justify-between items-center mb-4">
              <nav className="flex space-x-4">
                <Link to="/coach-marketplace/browse" className="text-lg font-semibold text-gray-700 hover:text-blue-600">Browse Coaches</Link>
                <Link to="/coach-marketplace/messages" className="text-lg font-semibold text-gray-700 hover:text-blue-600">Messages</Link>
                <Link to="/coach-marketplace/history" className="text-lg font-semibold text-gray-700 hover:text-blue-600">Coach History</Link>
              </nav>
          </div>
      </div>
      <Outlet />
    </div>
  );
};

export default CoachMarketplace;
