import { useUser } from '../../context/useUser';

export default function UserToggle() {
  const { isPaidUser, setIsPaidUser } = useUser();

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${!isPaidUser ? 'text-purple-600' : 'text-gray-400'}`}>
          Free User
        </span>
        <button
          onClick={() => setIsPaidUser(!isPaidUser)}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            isPaidUser ? 'bg-purple-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              isPaidUser ? 'translate-x-7' : 'translate-x-0'
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${isPaidUser ? 'text-purple-600' : 'text-gray-400'}`}>
          Paid User
        </span>
      </div>
      <div className="text-xs text-gray-500 mt-2 text-center">
        Demo toggle for testing
      </div>
    </div>
  );
}
