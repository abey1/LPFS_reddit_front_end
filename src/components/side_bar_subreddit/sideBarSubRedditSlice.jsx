import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPopularSubreddits = createAsyncThunk(
  "sideBarSubreddit/fetchPopularSubreddits",
  async () => {
    const response = await fetch("/reddit/subreddits/popular.json");
    const data = await response.json();
    return data;
  }
);

const sideBarSubRedditSlice = createSlice({
  name: "sideBarSubreddit",
  initialState: {
    isLoading: false,
    error: null,
    subreddits: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularSubreddits.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularSubreddits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subreddits = action.payload.data.children.map(
          (item) => item.data
        );
      })
      .addCase(fetchPopularSubreddits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectSubreddits = (state) => state.sideBarSubreddit.subreddits;
export const selectIsLoadingSubreddits = (state) =>
  state.sideBarSubreddit.isLoading;
export const selectErrorSubreddits = (state) => state.sideBarSubreddit.error;

export default sideBarSubRedditSlice.reducer;
