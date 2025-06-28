const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function loginApi({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}

export async function signupApi({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Signup failed');
  return response.json();
}

export async function getCurrentUserApi() {
  const response = await fetch(`${API_BASE_URL}/api/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Not authenticated');
  return response.json();
}

export async function logoutApi() {
  const response = await fetch(`${API_BASE_URL}/api/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Logout failed');
  return response.json();
}
