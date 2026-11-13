import { toAbsoluteUrl } from "../../../api/axiosInstance";
import { youtubeThumb } from "../hooks/youtube";

export default function MediaThumb({ post }) {
  if (post.media_type === "youtube") {
    return (
      <div className="relative h-full w-full">
        <img src={youtubeThumb(post.url)} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 grid place-items-center bg-black/30">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-red-600 shadow-lg transition group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
  if (post.media_type === "video") {
    return (
      <video src={toAbsoluteUrl(post.media_url)} className="h-full w-full object-cover" muted />
    );
  }
  return (
    <img
      src={toAbsoluteUrl(post.media_url)}
      alt={post.caption}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
  );
}
