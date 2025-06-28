import { useEffect, useState } from 'react';
import { logoutApi } from '../apis/auth';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage({ user, setUser }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // In a real app, fetch user info from API
    setProfile(user);
  }, [user]);

  const handleLogout = async () => {
    setLoading(true);
    setError('');
    try {
      await logoutApi();
      setUser(null);
      navigate('/');
    } catch (err) {
      setError('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
          {profile.email[0]?.toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">Profile</h2>
        <div className="w-full text-center">
          <div className="mb-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Email:</span>
            <span className="ml-2 text-indigo-700 dark:text-indigo-300">{profile.email}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200">User ID:</span>
            <span className="ml-2 text-indigo-700 dark:text-indigo-300">{profile.id}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="mt-6 px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging out...' : 'Logout'}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
}
