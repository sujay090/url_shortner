import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogin, onToggleDark, dark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="bg-indigo-900 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-30">
      <div className="font-bold text-2xl tracking-wide flex items-center gap-2 animate-fade-in cursor-pointer" onClick={() => navigate('/') }>
        <span role="img" aria-label="link">🔗</span> Shortify
      </div>
      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-6 text-base font-medium">
        <a href="#" className="hover:text-indigo-300 transition">Home</a>
        <a href="#features" className="hover:text-indigo-300 transition">Features</a>
        <a href="#contact" className="hover:text-indigo-300 transition">Contact</a>
        <button
          onClick={onToggleDark}
          className={`px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-600 text-white font-semibold transition flex items-center gap-2 shadow ${dark ? 'ring-2 ring-indigo-300' : ''}`}
          aria-label="Toggle dark mode"
        >
          <span className="transition-transform duration-300 text-lg">{dark ? '🌙' : '☀️'}</span>
          <span className="hidden md:inline">{dark ? 'Dark' : 'Light'}</span>
        </button>
        {user ? (
          <button
            onClick={() => navigate('/profile')}
            className="ml-2 w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold text-lg border-2 border-indigo-700 hover:border-indigo-300 transition"
            aria-label="Profile"
          >
            {user.email[0]?.toUpperCase()}
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="ml-2 px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-600 text-white font-semibold transition shadow"
          >
            Login/Sign Up
          </button>
        )}
      </div>
      {/* Right side controls for mobile only */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={onToggleDark}
          className={`px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-600 text-white font-semibold transition flex items-center gap-2 shadow ${dark ? 'ring-2 ring-indigo-300' : ''}`}
          aria-label="Toggle dark mode"
        >
          <span className="transition-transform duration-300 text-lg">{dark ? '🌙' : '☀️'}</span>
        </button>
        {/* Hamburger for mobile */}
        <button
          className="flex items-center px-2 py-1 rounded hover:bg-indigo-800 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-indigo-900 flex flex-col items-center gap-4 py-4 md:hidden animate-fade-in z-40 shadow-lg">
          <a href="#" className="hover:text-indigo-300 transition" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#features" className="hover:text-indigo-300 transition" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#contact" className="hover:text-indigo-300 transition" onClick={() => setMenuOpen(false)}>Contact</a>
          {user ? (
            <button
              onClick={() => { setMenuOpen(false); navigate('/profile'); }}
              className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold text-lg border-2 border-indigo-700 hover:border-indigo-300 transition"
              aria-label="Profile"
            >
              {user.email[0]?.toUpperCase()}
            </button>
          ) : (
            <button
              onClick={() => { onLogin(); setMenuOpen(false); }}
              className="px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-600 text-white font-semibold transition shadow"
            >
              Login/Sign Up
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
