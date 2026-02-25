import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SessionCompletedCard = ({ data }) => {
    const [showNotes, setShowNotes] = useState(false);

    return (
        <div className="p-4 my-4 border rounded-lg bg-blue-50">
            <p>Session marked as complete by coach.</p>
            <div className="mt-2">
                {data.notes && <button onClick={() => setShowNotes(!showNotes)} className="text-sm text-blue-600 font-semibold">View Session Notes {showNotes ? <ChevronUp size={16} className="inline"/> : <ChevronDown size={16} className="inline"/>}</button>}
                <button className="text-sm text-gray-500 ml-4">Report an Issue</button>
            </div>
            {showNotes && data.notes && (
                 <div className="mt-4 pt-4 border-t">
                    <h4 className="font-bold mb-2">Session Notes</h4>
                    <p className="text-sm text-gray-600"><strong className="font-semibold">Summary:</strong> {data.notes.summary}</p>
                    <p className="text-sm text-gray-600"><strong className="font-semibold">Feedback:</strong> {data.notes.feedback}</p>
                    <p className="text-sm text-gray-600"><strong className="font-semibold">Next Steps:</strong> {data.notes.nextSteps}</p>
                </div>
            )}
        </div>
    )
}

export default SessionCompletedCard;