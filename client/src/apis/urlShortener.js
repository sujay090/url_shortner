const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createShortUrlApi({ url, customAlias, expires, oneTime }) {
  const response = await fetch(`${API_BASE_URL}/api/create-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, customAlias, expires, oneTime }),
  });
  if (!response.ok) throw new Error('Failed to shorten URL');
  return response.json();
}

export async function getUserHistoryApi() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/history`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
}
