import { useRef } from "react";
import PostCard from "./PostCard";
import Loader from "./Loader";
import { useReveal } from "../hooks/useReveal";

export default function Feed({ posts, status, error }) {
  const root = useRef(null);
  useReveal(root, [posts.length]);

  return (
    <section
      id="feed"
      ref={root}
      className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28"
    >
      <div data-reveal className="mb-10 text-center">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Latest Feed</h2>
        <p className="mt-2 text-stone-500">Everything we post, updated live.</p>
      </div>

      {status === "loading" && posts.length === 0 && <Loader />}

      {error && (
        <p className="mx-auto max-w-md rounded-xl bg-red-50 p-4 text-center text-sm text-red-600">
          {error}
        </p>
      )}

      {status === "ready" && posts.length === 0 && (
        <p className="py-20 text-center text-stone-400">
          No posts yet. Check back soon.
        </p>
      )}

      {/* One post per row, stretched across the full width */}
      <div className="space-y-8">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}