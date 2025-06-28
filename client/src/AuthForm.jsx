import { useState } from 'react';
import { loginApi, signupApi } from './apis/auth';

export default function AuthForm({ onAuth, isLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = isLogin
        ? await loginApi({ email, password })
        : await signupApi({ email, password });
      onAuth(data);
    } catch (err) {
      setError('Invalid credentials or server error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-2">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="px-4 py-2 rounded-lg border border-indigo-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-700 dark:text-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="px-4 py-2 rounded-lg border border-indigo-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-700 dark:text-white"
      />
      {error && <div className="text-red-500 text-center">{error}</div>}
      <button type="submit" className="w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg transition">
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
}
