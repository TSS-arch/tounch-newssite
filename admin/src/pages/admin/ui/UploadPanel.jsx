import { useState } from "react";
import { youtubeId, youtubeThumb } from "../hooks/youtube";

export default function UploadPanel({ onCreate }) {
  const [tab, setTab] = useState("file"); // 'file' | 'youtube'
  const [file, setFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    const ok = await onCreate({ tab, file, youtubeUrl, caption });
    setBusy(false);
    if (ok) {
      setFile(null);
      setYoutubeUrl("");
      setCaption("");
      e.target.reset?.();
    }
  }

  return (
    <div className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40">
      <div className="flex border-b border-white/10">
        {[
          ["file", "Upload File"],
          ["youtube", "YouTube Link"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`relative flex-1 px-5 py-4 text-sm font-semibold transition ${
              tab === key ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {label}
            {tab === key && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            )}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-5 p-6">
        {tab === "file" ? (
          <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/15 bg-slate-900/40 px-6 py-10 text-center transition hover:border-indigo-400/60 hover:bg-indigo-500/5">
            <svg
              viewBox="0 0 24 24"
              className="h-10 w-10 stroke-slate-400 transition group-hover:-translate-y-1 group-hover:stroke-indigo-300"
              fill="none"
              strokeWidth="1.8"
            >
              <path d="M12 16V4m0 0 4 4m-4-4L8 8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-medium text-slate-200">
              {file ? file.name : "Click to choose an image or video"}
            </span>
            <span className="text-xs text-slate-500">
              PNG, JPG, GIF, WEBP, MP4, WEBM, MOV — up to 200 MB
            </span>
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        ) : (
          <div>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20"
            />
            {youtubeId(youtubeUrl) && (
              <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                <img src={youtubeThumb(youtubeUrl)} alt="" className="w-full" />
              </div>
            )}
          </div>
        )}

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          rows={2}
          className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20"
        />

        <button
          disabled={busy}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
        >
          {busy ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
