// API layer for the Admin page. Uses the shared axios instance.
// No React, no Redux here — just functions that talk to the backend.
import api from "../../../api/axiosInstance";

export const fetchPosts = () => api.get("/api/posts").then((r) => r.data);

export function createPost({ file, youtubeUrl, caption }) {
  const fd = new FormData();
  fd.append("caption", caption || "");
  if (youtubeUrl) fd.append("youtube_url", youtubeUrl);
  else if (file) fd.append("file", file);
  return api.post("/api/posts", fd).then((r) => r.data);
}

export function updatePost(id, { caption, file, youtubeUrl }) {
  const fd = new FormData();
  if (caption !== undefined) fd.append("caption", caption ?? "");
  if (youtubeUrl) fd.append("youtube_url", youtubeUrl);
  else if (file) fd.append("file", file);
  return api.put(`/api/posts/${id}`, fd).then((r) => r.data);
}

export const removePost = (id) =>
  api.delete(`/api/posts/${id}`).then((r) => r.data);
