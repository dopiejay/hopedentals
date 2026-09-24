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

async function request(token, method, url, payload) {
  const res = await fetch(`${API_URL}${url}`, {
    method,
    headers: payload ? authHeaders(token) : { Authorization: `Bearer ${token}` },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || 'Request failed.');
  return body;
}

export function fetchSettings(token) {
  return request(token, 'GET', '/api/settings');
}

export function saveSettings(token, settings) {
  return request(token, 'PUT', '/api/settings', settings);
}

export function fetchAdminServices(token) {
  return request(token, 'GET', '/api/services/all');
}

export function createService(token, data) {
  return request(token, 'POST', '/api/services', data);
}

export function updateService(token, id, data) {
  return request(token, 'PATCH', `/api/services/${id}`, data);
}

export function deleteService(token, id) {
  return request(token, 'DELETE', `/api/services/${id}`);
}

export function fetchAdminTeam(token) {
  return request(token, 'GET', '/api/team/all');
}

export function createTeamMember(token, data) {
  return request(token, 'POST', '/api/team', data);
}

export function updateTeamMember(token, id, data) {
  return request(token, 'PATCH', `/api/team/${id}`, data);
}

export function deleteTeamMember(token, id) {
  return request(token, 'DELETE', `/api/team/${id}`);
}

export function fetchAdminTestimonials(token) {
  return request(token, 'GET', '/api/testimonials');
}

export function createTestimonial(token, data) {
  return request(token, 'POST', '/api/testimonials', data);
}

export function updateTestimonial(token, id, data) {
  return request(token, 'PATCH', `/api/testimonials/${id}`, data);
}

export function deleteTestimonial(token, id) {
  return request(token, 'DELETE', `/api/testimonials/${id}`);
}
