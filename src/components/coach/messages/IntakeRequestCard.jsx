import React from 'react';

const IntakeRequestCard = ({ data }) => {
    return (
        <div className="p-4 my-4 border rounded-lg bg-gray-50">
            <h4 className="font-bold mb-2">Your Request</h4>
            <p className="text-sm text-gray-600"><strong className="font-semibold">Coaching Topic:</strong> {data.topic}</p>
            <p className="text-sm text-gray-600"><strong className="font-semibold">Requirements:</strong> {data.requirements}</p>
            <p className="text-sm text-gray-600"><strong className="font-semibold">Availability:</strong> {data.availability}</p>
        </div>
    )
}

export default IntakeRequestCard;