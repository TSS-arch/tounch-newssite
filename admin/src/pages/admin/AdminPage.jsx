// Composition root for the Admin page — wires UI to the hooks layer.
import { useState } from "react";
import { usePosts } from "./hooks/usePosts";
import { useToast } from "./hooks/useToast";

import Header from "./ui/Header";
import StatCards from "./ui/StatCards";
import UploadPanel from "./ui/UploadPanel";
import PostGrid from "./ui/PostGrid";
import EditModal from "./ui/EditModal";
import Toast from "./ui/Toast";

export default function AdminPage() {
  const toast = useToast();
  const { posts, status, counts, create, update, remove } = usePosts(toast);
  const [editing, setEditing] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-8">
        <StatCards counts={counts} />
        <UploadPanel onCreate={create} />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">All Posts</h2>
          <span className="text-sm text-slate-400">{posts.length} items</span>
        </div>

        <PostGrid
          posts={posts}
          status={status}
          onEdit={setEditing}
          onDelete={remove}
        />
      </main>

      <EditModal post={editing} onClose={() => setEditing(null)} onSave={update} />
      <Toast toast={toast.toast} />
    </div>
  );
}
