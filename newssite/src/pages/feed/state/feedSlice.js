// STATE layer — Redux Toolkit slice for the feed.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "../api/postsApi";

export const loadFeed = createAsyncThunk("feed/load", () => fetchPosts());

const feedSlice = createSlice({
  name: "feed",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFeed.pending, (state) => {
        if (state.items.length === 0) state.status = "loading";
      })
      .addCase(loadFeed.fulfilled, (state, action) => {
        state.status = "ready";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(loadFeed.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default feedSlice.reducer;
