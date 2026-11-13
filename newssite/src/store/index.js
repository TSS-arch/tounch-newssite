import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "../pages/feed/state/feedSlice";

export const store = configureStore({
  reducer: {
    feed: feedReducer,
  },
});
