export function youtubeId(url) {
  if (!url) return null;
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  );
  return m ? m[1] : null;
}

export function youtubeEmbed(url) {
  const id = youtubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
