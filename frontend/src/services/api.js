const API_BASE_URL = "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    const message = await response.json().catch(() => null);
    throw new Error(message?.message || "Request failed");
  }

  if (response.status === 204) return null;
  return response.json();
}

export function fetchDestinations() {
  return request("/destinations");
}

export function fetchDestinationById(id) {
  return request(`/destinations/${id}`);
}

export function createDestination(payload, token) {
  return request("/destinations", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(payload),
  });
}

export function registerUser(payload) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchAdminStats(token) {
  return request("/admin/stats", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}
