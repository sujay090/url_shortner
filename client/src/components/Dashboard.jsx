export default function Dashboard({ links, onDelete }) {
  const handleDeleteAll = () => {
    links.forEach(link => onDelete(link.id));
  };
  return (
    <section className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-500">User History</h2>
        {links.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold text-sm shadow"
          >
            Delete All
          </button>
        )}
      </div>
      <div className="overflow-auto" style={{ maxHeight: '400px' }}>
        {links.length === 0 ? (
          <div className="text-slate-500 dark:text-slate-400 text-center py-8">No history found.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {links.map(link => (
              <div key={link.id} className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-indigo-100 dark:border-slate-700">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-indigo-700 dark:text-indigo-200 break-all">{link.short}</div>
                  <div className="text-slate-500 dark:text-slate-300 text-sm break-all">{link.url}</div>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400 dark:text-slate-400">
                    <span>Clicks: <span className="font-bold text-indigo-500">{link.clicks}</span></span>
                    <span>Created: {link.created}</span>
                    <span>Expires: {link.expires || '-'}</span>
                    <span>One-Time: {link.oneTime ? 'Yes' : 'No'}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:ml-4">
                  <a href={link.short} target="_blank" rel="noreferrer" className="px-3 py-1 rounded bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold text-center">Open</a>
                  <button
                    onClick={() => onDelete(link.id)}
                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-semibold text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
