// HOOKS layer — business logic for the Admin page.
// UI components call these handlers; they never touch the API or store directly.
import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadPosts,
  addPost,
  editPost,
  removePost,
} from "../state/postsSlice";

export function usePosts(toast) {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.posts);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const counts = useMemo(
    () => ({
      all: items.length,
      image: items.filter((p) => p.media_type === "image").length,
      video: items.filter((p) => p.media_type === "video").length,
      youtube: items.filter((p) => p.media_type === "youtube").length,
    }),
    [items]
  );

  const create = useCallback(
    async ({ tab, file, youtubeUrl, caption }) => {
      if (tab === "file" && !file) {
        toast.error("Please choose a file first");
        return false;
      }
      if (tab === "youtube" && !youtubeUrl.trim()) {
        toast.error("Please paste a YouTube link");
        return false;
      }
      try {
        await dispatch(
          addPost({
            file: tab === "file" ? file : null,
            youtubeUrl: tab === "youtube" ? youtubeUrl.trim() : null,
            caption,
          })
        ).unwrap();
        toast.success("Post published");
        return true;
      } catch (e) {
        toast.error(e.message);
        return false;
      }
    },
    [dispatch, toast]
  );

  const update = useCallback(
    async (id, data) => {
      try {
        await dispatch(editPost({ id, data })).unwrap();
        toast.success("Post updated");
        return true;
      } catch (e) {
        toast.error(e.message);
        return false;
      }
    },
    [dispatch, toast]
  );

  const remove = useCallback(
    async (id) => {
      if (!confirm("Delete this post permanently?")) return;
      try {
        await dispatch(removePost(id)).unwrap();
        toast.success("Post deleted");
      } catch (e) {
        toast.error(e.message);
      }
    },
    [dispatch, toast]
  );

  return { posts: items, status, error, counts, create, update, remove };
}
