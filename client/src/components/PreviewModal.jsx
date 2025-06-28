export default function PreviewModal({ link, onClose }) {
  if (!link) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-slate-400 hover:text-red-400 transition">×</button>
        <h2 className="text-xl font-bold mb-2 text-indigo-700 dark:text-indigo-200">Preview Link</h2>
        <div className="mb-2"><span className="font-semibold">Destination:</span> {link.url}</div>
        <div className="mb-2"><span className="font-semibold">Short:</span> {link.short}</div>
        <div className="mb-2"><span className="font-semibold">Clicks:</span> {link.clicks}</div>
        <a href={link.url} target="_blank" rel="noreferrer" className="mt-4 inline-block px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">Continue to site</a>
      </div>
    </div>
  );
}
