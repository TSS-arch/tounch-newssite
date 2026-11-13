// STATE layer — Redux Toolkit slice for the Admin page.
// Async thunks call the API layer; reducers hold the UI state.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as postsApi from "../api/postsApi";

export const loadPosts = createAsyncThunk("posts/load", () =>
  postsApi.fetchPosts()
);

export const addPost = createAsyncThunk("posts/add", (payload) =>
  postsApi.createPost(payload)
);

export const editPost = createAsyncThunk("posts/edit", ({ id, data }) =>
  postsApi.updatePost(id, data)
);

export const removePost = createAsyncThunk("posts/remove", async (id) => {
  await postsApi.removePost(id);
  return id;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle", // idle | loading | ready | error
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = "ready";
        state.items = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const i = state.items.findIndex((p) => p.id === action.payload.id);
        if (i !== -1) state.items[i] = action.payload;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
