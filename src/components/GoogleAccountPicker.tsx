import { AuthUser } from '@/types/auth';

const MOCK_ACCOUNTS: AuthUser[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex.johnson@gmail.com', avatar: 'A', provider: 'google' },
  { id: '2', name: 'Maria Garcia', email: 'maria.garcia@gmail.com', avatar: 'M', provider: 'google' },
  { id: '3', name: 'Sam Lee', email: 'sam.lee@gmail.com', avatar: 'S', provider: 'google' },
];

const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500'];

interface Props {
  onSelect: (user: AuthUser) => void;
  onClose: () => void;
}

export default function GoogleAccountPicker({ onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-80 overflow-hidden animate-fade-in">
        {/* Google header */}
        <div className="px-6 pt-6 pb-4 text-center border-b border-gray-100">
          <svg viewBox="0 0 48 48" className="w-10 h-10 mx-auto mb-3">
            <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.1-6.1C34.46 3.19 29.5 1 24 1 14.82 1 7.08 6.48 3.61 14.24l7.1 5.52C12.38 13.59 17.73 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.7c-.55 2.98-2.2 5.5-4.68 7.2l7.18 5.58C43.18 37.3 46.52 31.4 46.52 24.5z"/>
            <path fill="#FBBC05" d="M10.71 28.24A14.54 14.54 0 0 1 9.5 24c0-1.48.25-2.91.71-4.24l-7.1-5.52A23.94 23.94 0 0 0 0 24c0 3.86.92 7.5 2.55 10.72l8.16-6.48z"/>
            <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.94l-7.18-5.58C28.5 37.9 26.35 38.5 24 38.5c-6.27 0-11.62-4.09-13.29-9.76l-8.16 6.48C6.08 42.6 14.46 47 24 47z"/>
          </svg>
          <p className="text-sm font-medium text-gray-700">Choose an account</p>
          <p className="text-xs text-gray-400 mt-1">to continue to My To-Do List</p>
        </div>

        {/* Accounts */}
        <ul>
          {MOCK_ACCOUNTS.map((account, i) => (
            <li key={account.id}>
              <button
                onClick={() => onSelect(account)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className={`w-9 h-9 rounded-full ${COLORS[i]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {account.avatar}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-gray-800 truncate">{account.name}</span>
                  <span className="text-xs text-gray-400 truncate">{account.email}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="border-t border-gray-100 px-5 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
