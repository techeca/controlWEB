const BASE_URL = import.meta.env.VITE_API_URL;

async function apiClient( endpoint: string, { method = "GET", body, headers = {} }: RequestInit & { body?: any; requiresAuth?: boolean } = {} ) {
  const token = localStorage.getItem("token");
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    }
  };

  if (body) {
    config.body = body;
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error en la API");
  }

  return response.json();
}

export default apiClient;
