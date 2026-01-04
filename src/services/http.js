export async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`/api${endpoint}`, {
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
