const AUTH_API = '/api/auth';

async function request(endpoint, options = {}) {
  const response = await fetch(`${AUTH_API}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.headers || {})
    }
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Something went wrong. Please try again.');
  }
  return result.data;
}

export function loginUser(credentials) {
  return request('/login', { method: 'POST', body: JSON.stringify(credentials) });
}

export function registerUser(account) {
  return request('/register', { method: 'POST', body: JSON.stringify(account) });
}

export function getCurrentUser(token) {
  return request('/me', { token });
}
