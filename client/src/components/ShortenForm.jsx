export default function ShortenForm({
  url, setUrl, loading, error, shortUrl, onSubmit, onCopy, onPreview
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center w-full max-w-lg bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl border border-indigo-100 dark:border-slate-700 animate-fade-in gap-2">
      <input
        type="url"
        placeholder="Enter your long URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg border border-indigo-200 dark:border-slate-700 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-700 dark:text-white mb-2 transition"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-lg transition disabled:opacity-60 disabled:cursor-not-allowed mb-2 shadow-lg"
      >
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>
      {error && <div className="text-red-500 mt-1 font-medium animate-shake">{error}</div>}
      {shortUrl && (
        <div className="mt-6 text-center w-full animate-fade-in flex flex-col items-center gap-2">
          <span className="text-green-600 font-semibold">Short URL:</span>
          <div className="flex items-center gap-2 justify-center">
            <a href={shortUrl} target="_blank" rel="noreferrer" className="text-indigo-900 dark:text-indigo-200 font-bold text-lg break-all underline hover:text-indigo-600 transition">{shortUrl}</a>
            <button onClick={() => onCopy(shortUrl)} className="ml-2 px-2 py-1 bg-indigo-100 dark:bg-slate-700 rounded text-indigo-700 dark:text-indigo-200 text-sm hover:bg-indigo-200 dark:hover:bg-slate-600 transition">Copy</button>
            <a href={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(shortUrl)}`} target="_blank" rel="noreferrer" className="ml-2"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=${encodeURIComponent(shortUrl)}`} alt="QR" className="inline" /></a>
          </div>
          <button onClick={onPreview} className="mt-2 text-indigo-500 underline text-sm">Preview Link</button>
        </div>
      )}
    </form>
  );
}
