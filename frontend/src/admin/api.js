const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function authHeaders(token) {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || 'Login failed.');
  return body; // { token, email }
}

export async function fetchAppointments(token) {
  const res = await fetch(`${API_URL}/api/appointments`, { headers: authHeaders(token) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || 'Could not load appointments.');
  return body;
}

export async function updateAppointmentStatus(token, id, status) {
  const res = await fetch(`${API_URL}/api/appointments/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ status }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || 'Could not update appointment.');
  return body;
}

export async function fetchMessages(token) {
  const res = await fetch(`${API_URL}/api/contact`, { headers: authHeaders(token) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || 'Could not load messages.');
  return body;
}

export async function updateMessageReadStatus(token, id, is_read) {
  const res = await fetch(`${API_URL}/api/contact/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ is_read }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || 'Could not update message.');
  return body;
}
