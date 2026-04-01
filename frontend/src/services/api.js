const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const RETRY_COUNT = 2;
const RETRY_DELAY_MS = 500;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(path, options = {}, attempt = 0) {
  try {
    const { headers, ...rest } = options;
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: { "Content-Type": "application/json", ...(headers || {}) },
    });

    if (!response.ok) {
      const message = await response.json().catch(() => null);
      throw new Error(message?.message || "Запрос не выполнен");
    }

    if (response.status === 204) return null;
    return response.json();
  } catch (error) {
    const shouldRetry = attempt < RETRY_COUNT;
    if (shouldRetry) {
      await delay(RETRY_DELAY_MS * (attempt + 1));
      return request(path, options, attempt + 1);
    }
    throw error;
  }
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

export async function uploadDestinationImage(file, token) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/uploads/images`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!response.ok) {
    const message = await response.json().catch(() => null);
    throw new Error(message?.message || "Upload failed");
  }

  return response.json();
}
