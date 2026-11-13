// Shared Axios instance — every API call in the feed app goes through this.
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000",
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || "Failed to load the feed";
    return Promise.reject(new Error(message));
  }
);

export const toAbsoluteUrl = (path) =>
  path ? `${api.defaults.baseURL}${path}` : null;

export default api;
