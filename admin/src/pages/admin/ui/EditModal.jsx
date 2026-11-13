import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditModal({ post, onClose, onSave }) {
  const [caption, setCaption] = useState(post?.caption || "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const ok = await onSave(post.id, { caption });
    setSaving(false);
    if (ok) onClose();
  }

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 16 }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-bold">Edit caption</h3>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              autoFocus
              className="w-full resize-none rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm outline-none focus:border-indigo-400/60"
            />
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
