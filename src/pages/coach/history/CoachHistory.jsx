import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { coachHistory, coaches } from '../../../data/coaches';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SessionHistoryCard = ({ session, coach, onToggle, isExpanded }) => {
    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Funds Released': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border mb-4">
            <div className="p-4 grid grid-cols-4 items-center">
                <div className="flex items-center col-span-2">
                    <img src={coach.photo} alt={coach.name} className="w-12 h-12 rounded-full mr-4 object-cover"/>
                    <div>
                        <h3 className="font-bold text-gray-800">{coach.name}</h3>
                        <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{session.serviceArea}</span>
                    </div>
                </div>
                <p className="text-sm text-gray-500">{session.date}</p>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full justify-self-end ${getStatusBadgeStyle(session.status)}`}>
                    {session.status}
                </span>
            </div>
            <div className="px-4 pb-4 border-t border-gray-100 flex items-center justify-end space-x-6">
                {session.notes && 
                    <button onClick={onToggle} className="text-sm text-blue-600 font-semibold flex items-center">
                        View Notes {isExpanded ? <ChevronUp size={16} className="ml-1"/> : <ChevronDown size={16} className="ml-1"/>}
                    </button>
                }
                <button className="text-sm text-blue-600 font-semibold">View Conversation</button>
            </div>
            {isExpanded && session.notes && (
                <div className="p-4 bg-gray-50 border-t">
                    <h4 className="font-bold mb-2">Session Notes</h4>
                    <p className="text-sm text-gray-600 mb-2"><strong className="font-semibold">Summary:</strong> {session.notes.summary}</p>
                    <p className="text-sm text-gray-600 mb-2"><strong className="font-semibold">Feedback:</strong> {session.notes.feedback}</p>
                    <p className="text-sm text-gray-600"><strong className="font-semibold">Next Steps:</strong> {session.notes.nextSteps}</p>
                </div>
            )}
        </div>
    )
}

const CoachHistory = () => {
    const { isPaidUser } = useContext(UserContext);
    const [expandedId, setExpandedId] = useState(null);

    if (!isPaidUser) {
        return (
            <div className="text-center p-12 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">View your coaching history by upgrading to Full Access.</h2>
                <a href="#" className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full">Upgrade</a>
            </div>
        )
    }

    if (coachHistory.length === 0) {
        return (
             <div className="text-center p-12 bg-gray-100 rounded-lg">
                 <h2 className="text-xl font-semibold mb-4">No coaching sessions yet.</h2>
                 <a href="#" className="text-blue-600 font-semibold">Browse Coaches</a>
            </div>
        )
    }

    const getCoach = (coachId) => coaches.find(c => c.id === coachId);

    const handleToggle = (sessionId) => {
        setExpandedId(expandedId === sessionId ? null : sessionId);
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Coach History</h1>
            <p className="text-gray-600 mb-8">All your past coaching sessions in one place.</p>
            <div>
                {coachHistory.map(session => (
                    <SessionHistoryCard 
                        key={session.id} 
                        session={session} 
                        coach={getCoach(session.coachId)} 
                        onToggle={() => handleToggle(session.id)}
                        isExpanded={expandedId === session.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default CoachHistory;
