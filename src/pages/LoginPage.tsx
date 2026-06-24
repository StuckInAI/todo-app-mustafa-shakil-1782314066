import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthUser } from '@/types/auth';
import GoogleAccountPicker from '@/components/GoogleAccountPicker';

export default function LoginPage() {
  const { login } = useAuth();
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPicker(true);
    }, 800);
  };

  const handleSelect = (user: AuthUser) => {
    setShowPicker(false);
    login(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-10 flex flex-col items-center gap-7">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">My To-Do List</h1>
          <p className="text-sm text-gray-400 text-center">Sign in to manage your tasks</p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-100" />

        {/* Google button */}
        <button
          onClick={handleGoogleClick}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <svg className="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 48 48" className="w-5 h-5 flex-shrink-0">
              <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.1-6.1C34.46 3.19 29.5 1 24 1 14.82 1 7.08 6.48 3.61 14.24l7.1 5.52C12.38 13.59 17.73 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.7c-.55 2.98-2.2 5.5-4.68 7.2l7.18 5.58C43.18 37.3 46.52 31.4 46.52 24.5z"/>
              <path fill="#FBBC05" d="M10.71 28.24A14.54 14.54 0 0 1 9.5 24c0-1.48.25-2.91.71-4.24l-7.1-5.52A23.94 23.94 0 0 0 0 24c0 3.86.92 7.5 2.55 10.72l8.16-6.48z"/>
              <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.94l-7.18-5.58C28.5 37.9 26.35 38.5 24 38.5c-6.27 0-11.62-4.09-13.29-9.76l-8.16 6.48C6.08 42.6 14.46 47 24 47z"/>
            </svg>
          )}
          <span className="text-sm font-medium text-gray-700">
            {loading ? 'Connecting…' : 'Continue with Google'}
          </span>
        </button>

        <p className="text-xs text-gray-300 text-center">
          By signing in you agree to our Terms & Privacy Policy
        </p>
      </div>

      {showPicker && (
        <GoogleAccountPicker onSelect={handleSelect} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}
