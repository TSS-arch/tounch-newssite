import PostMedia from "./PostMedia";
import { timeAgo } from "../hooks/useFeed";
import { SITE } from "../../../config/site";

export default function PostCard({ post }) {
  return (
    <article
      data-reveal
      className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-500/10"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <img
          src="/logo.png"
          alt={SITE.name}
          className="h-10 w-10 rounded-full object-cover ring-1 ring-black/5"
        />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold">{SITE.name}</p>
          <p className="text-xs text-stone-400">{timeAgo(post.created_at)}</p>
        </div>
        <span className="ml-auto rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase text-amber-600">
          {post.media_type}
        </span>
      </div>

      <PostMedia post={post} />

      {post.caption && (
        <p className="px-4 py-4 text-[15px] leading-relaxed text-stone-800">
          {post.caption}
        </p>
      )}
    </article>
  );
}