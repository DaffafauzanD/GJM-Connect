import { apiService } from "@/core/auth/infrastructure/api/api.service";

export async function loginUser({ username, password }) {
  try {
    // ApiService already sets baseURL + withCredentials via the interceptor
    const body = await apiService.post("/api/v1/auth/login", { username, password });
    // Backend wraps responses as { success, data, message } -> return the inner data
    return body && typeof body === "object" && "data" in body ? body.data : body;
  } catch (e) {
    // ApiService throws { message, code, status, details } — keep message
    throw new Error(e?.message || "Invalid username or password.");
  }
}

export async function logoutUser() {
  try {
    const body = await apiService.post("/api/v1/auth/logout");
    // Keep whatever the backend returns, but prefer the whole object for success flags
    return body && typeof body === "object" ? body : { success: true };
  } catch (e) {
    throw new Error(e?.message || "Logout failed.");
  }
}