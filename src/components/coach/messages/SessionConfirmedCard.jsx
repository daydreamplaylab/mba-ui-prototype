import React from 'react';

const SessionConfirmedCard = ({ data }) => {
    return (
        <div className="p-4 my-4 border rounded-lg bg-green-50 text-green-800 text-center">
            <p>✓ Session confirmed for {data.date} at {data.time}. Payment received.</p>
        </div>
    )
}

export default SessionConfirmedCard;