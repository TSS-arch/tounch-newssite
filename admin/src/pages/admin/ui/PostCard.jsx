import { motion } from "framer-motion";
import MediaThumb from "./MediaThumb";

const BADGE = {
  image: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  video: "bg-sky-500/15 text-sky-300 ring-sky-500/30",
  youtube: "bg-red-500/15 text-red-300 ring-red-500/30",
};

export default function PostCard({ post, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/40"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <MediaThumb post={post} />
        <span
          className={`absolute left-3 top-3 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ${BADGE[post.media_type]}`}
        >
          {post.media_type}
        </span>
      </div>
      <div className="space-y-3 p-4">
        <p className="min-h-[2.5rem] text-sm text-slate-200">
          {post.caption || <span className="text-slate-500">No caption</span>}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">#{post.id}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(post)}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium transition hover:bg-white/10"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="rounded-lg bg-red-500/90 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
