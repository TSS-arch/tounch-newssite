import { AnimatePresence } from "framer-motion";
import PostCard from "./PostCard";

export default function PostGrid({ posts, status, onEdit, onDelete }) {
  if (status === "loading" && posts.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
          >
            <div className="aspect-video w-full bg-white/5" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-2/3 rounded bg-white/10" />
              <div className="h-3 w-1/3 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-slate-500">
        No posts yet. Create your first one above.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {posts.map((p) => (
          <PostCard key={p.id} post={p} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </div>
  );
}
