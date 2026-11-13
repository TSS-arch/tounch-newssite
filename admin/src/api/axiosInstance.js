// Shared Axios instance. EVERY API call in the app goes through this.
// Change the baseURL here if the backend moves.
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000",
  timeout: 30000,
});

// Request interceptor — a good place to attach auth tokens later.
api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — normalize errors into readable messages.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

// Absolute URL for a backend-served media path (used in <img>/<video> src).
export const toAbsoluteUrl = (path) =>
  path ? `${api.defaults.baseURL}${path}` : null;

export default api;
