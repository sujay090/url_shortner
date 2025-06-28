import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';
import ShortenForm from '../components/ShortenForm';
import AuthForm from '../AuthForm';
import { createShortUrlApi, getUserHistoryApi } from '../apis/urlShortener';

export default function HomePage({ user, setUser }) {
  // Initialize dark mode from localStorage, default to false
  const [dark, setDark] = useState(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      if (theme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      return theme === 'dark';
    }
    return false;
  });
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [links, setLinks] = useState([]);
  const [modalAnim, setModalAnim] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (user) {
      getUserHistoryApi().then(setLinks).catch(() => setLinks([]));
    } else {
      setLinks([]);
    }
  }, [user]);

  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');
    try {
      const data = await createShortUrlApi({ url });
      const short = data.shortUrl || `sho.rt/${Math.random().toString(36).slice(2,8)}`;
      const newLink = {
        id: Math.random().toString(36).slice(2,8),
        url,
        short,
        clicks: 0,
        created: new Date().toISOString().slice(0,10),
      };
      if (!user) {
        setLinks([newLink, ...links]);
      } else {
        // Refresh history for authenticated user
        getUserHistoryApi().then(setLinks).catch(() => setLinks([]));
      }
      setShortUrl(short);
      setUrl('');
    } catch (err) {
      setError('Could not shorten the URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const openModal = (type) => {
    setShowLogin(type);
    setTimeout(() => setModalAnim(true), 10);
  };
  const closeModal = () => {
    setModalAnim(false);
    setTimeout(() => setShowLogin(false), 200);
  };

  return (
    <div className={dark ? "dark bg-slate-900 min-h-screen flex flex-col transition-colors duration-500" : "bg-gradient-to-br from-slate-50 to-indigo-100 min-h-screen flex flex-col transition-colors duration-500"}>
      <Navbar user={user} onLogin={() => openModal(true)} onToggleDark={() => setDark(d => !d)} dark={dark} />
      {(showLogin === true || showLogin === 'signup') && (
        <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-200 ${modalAnim ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}> 
          <div className={`bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all duration-200 ${modalAnim ? 'scale-100' : 'scale-95'}`}>
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-2xl text-slate-400 hover:text-red-400 transition"
              aria-label="Close auth modal"
            >×</button>
            <AuthForm onAuth={(user) => { setUser(user); closeModal(); }} isLogin={showLogin === true} />
            <div className="mt-4 text-center text-slate-500 dark:text-slate-300">
              {showLogin === true ? (
                <>
                  <span>Don't have an account? </span>
                  <button className="text-indigo-500 hover:underline" onClick={() => openModal('signup')}>Sign Up</button>
                </>
              ) : (
                <>
                  <span>Already have an account? </span>
                  <button className="text-indigo-500 hover:underline" onClick={() => openModal(true)}>Login</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <section className="flex flex-col items-center justify-center flex-1 py-12 px-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-indigo-400 mb-2 text-center drop-shadow-lg tracking-tight">Simplify Your Links Instantly</h1>
        <p className="text-lg md:text-xl text-indigo-500 dark:text-indigo-300 mb-8 text-center max-w-xl">Paste your long URL below and get a short, shareable link in seconds. Fast, free, and reliable.</p>
        <ShortenForm
          url={url}
          setUrl={setUrl}
          loading={loading}
          error={error}
          shortUrl={shortUrl}
          onSubmit={handleShorten}
          onCopy={handleCopy}
        />
      </section>
      {user && (
        <Dashboard links={links} onDelete={id => setLinks(links.filter(l => l.id !== id))} />
      )}
      <Footer />
    </div>
  );
}
