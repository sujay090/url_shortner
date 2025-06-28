export default function Features() {
  return (
    <section id="features" className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
      <h2 className="text-indigo-900 dark:text-indigo-500 font-bold text-3xl mb-8 text-center">Why Use Shortify?</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 flex-1 min-w-[220px] max-w-xs text-center border border-indigo-100 dark:border-slate-700 hover:scale-105 transition-transform duration-200">
          <h3 className="text-indigo-500 dark:text-indigo-300 font-bold text-xl mb-2">Fast & Free</h3>
          <p className="text-slate-500 dark:text-slate-300">Shorten your links instantly at no cost, with no sign-up required.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 flex-1 min-w-[220px] max-w-xs text-center border border-indigo-100 dark:border-slate-700 hover:scale-105 transition-transform duration-200">
          <h3 className="text-indigo-500 dark:text-indigo-300 font-bold text-xl mb-2">Share Anywhere</h3>
          <p className="text-slate-500 dark:text-slate-300">Get a short, easy-to-share link for social media, emails, or messages.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 flex-1 min-w-[220px] max-w-xs text-center border border-indigo-100 dark:border-slate-700 hover:scale-105 transition-transform duration-200">
          <h3 className="text-indigo-500 dark:text-indigo-300 font-bold text-xl mb-2">Reliable</h3>
          <p className="text-slate-500 dark:text-slate-300">Your links are always available and redirect instantly, 24/7.</p>
        </div>
      </div>
    </section>
  );
}
