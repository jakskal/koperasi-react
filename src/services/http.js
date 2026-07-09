export async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL || "/api";
  const url = `${apiBaseURL}${endpoint}`;

  const res = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) throw new Error("API error");
  return res.json();
}
