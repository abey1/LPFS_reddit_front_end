import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { REDDIT_BASE_URL } from "../../api/redditBaseUrl";

export const fetchPopularSubreddits = createAsyncThunk(
  "sideBarSubreddit/fetchPopularSubreddits",
  async () => {
    // const response = await fetch("/reddit/subreddits/popular.json");
    const response = await fetch(`${REDDIT_BASE_URL}/subreddits/popular.json`);
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
    selected: {},
  },
  reducers: {
    setSelectedSubreddit(state, action) {
      state.selected = state.subreddits[action.payload];
    },
  },
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

export const { setSelectedSubreddit } = sideBarSubRedditSlice.actions;
export const selectSubreddits = (state) => state.sideBarSubreddit.subreddits;
export const selectSelectedSubreddit = (state) =>
  state.sideBarSubreddit.selected;
export const selectIsLoadingSubreddits = (state) =>
  state.sideBarSubreddit.isLoading;
export const selectErrorSubreddits = (state) => state.sideBarSubreddit.error;

export default sideBarSubRedditSlice.reducer;
