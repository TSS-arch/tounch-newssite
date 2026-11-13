// HOOKS layer — business logic for the feed: load + auto-refresh.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFeed } from "../state/feedSlice";

export function useFeed(pollMs = 10000) {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.feed);

  useEffect(() => {
    dispatch(loadFeed());
    const t = setInterval(() => dispatch(loadFeed()), pollMs);
    return () => clearInterval(t);
  }, [dispatch, pollMs]);

  return { posts: items, status, error };
}

export function timeAgo(iso) {
  const d = new Date(iso + "Z");
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return `${Math.floor(hr / 24)}d ago`;
}
