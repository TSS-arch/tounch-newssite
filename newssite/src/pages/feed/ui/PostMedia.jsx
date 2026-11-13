import { toAbsoluteUrl } from "../../../api/axiosInstance";
import { youtubeEmbed } from "../hooks/youtube";

// Full-width media. Height is capped so a single wide post stays comfortable.
export default function PostMedia({ post }) {
  if (post.media_type === "youtube") {
    return (
      <div className="aspect-video max-h-[560px] w-full bg-black">
        <iframe
          src={youtubeEmbed(post.url)}
          title={post.caption || "YouTube video"}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  if (post.media_type === "video") {
    return (
      <video
        src={toAbsoluteUrl(post.media_url)}
        controls
        className="aspect-video max-h-[560px] w-full bg-black object-cover"
      />
    );
  }
  return (
    <div className="aspect-video max-h-[560px] w-full overflow-hidden bg-black">
      <img
        src={toAbsoluteUrl(post.media_url)}
        alt={post.caption}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 hover:scale-105"
      />
    </div>
  );
}