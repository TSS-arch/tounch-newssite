// Redux store configuration.
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../pages/admin/state/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  // FormData is passed through thunks; disable serializable check for file args.
  middleware: (getDefault) =>
    getDefault({ serializableCheck: false }),
});
