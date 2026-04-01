const API_BASE_URL = "/api";

export async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  if (response.status === 204) return null;
  return response.json();
}
