// API layer for the public feed.
import api from "../../../api/axiosInstance";

export const fetchPosts = () => api.get("/api/posts").then((r) => r.data);
