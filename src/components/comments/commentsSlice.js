import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ sub, post_id }) => {
    const url = `/reddit/r/${sub}/comments/${post_id}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    isLoading: false,
    error: null,
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments =
          action.payload[1]?.data?.children
            ?.filter((item) => item.kind === "t1")
            .map((item) => item.data) || [];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const commentsSelector = (state) => state.comments.comments;
export const isLoadingCommentsSelector = (state) => state.comments.isLoading;
export const errorCommentsSelector = (state) => state.comments.error;

export default commentsSlice.reducer;
