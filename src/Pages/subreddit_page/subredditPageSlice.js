import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REDDIT_BASE_URL } from "../../api/redditBaseUrl";

// Async thunk to fetch subreddit details by subreddit name
export const fetchSubredditDetailsHot = createAsyncThunk(
  "subredditPage/fetchSubredditDetailsHot",
  async (subredditName) => {
    // const hotSortUrl = `https://www.reddit.com/r/${subredditName}.json?sort=hot`;
    const hotSortUrl = `${REDDIT_BASE_URL}/r/${subredditName}.json?sort=hot`;
    const response = await fetch(hotSortUrl);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  }
);

export const fetchSubredditDetailsNew = createAsyncThunk(
  "subredditPage/fetchSubredditDetailsNew",
  async (subredditName) => {
    // const newSortUrl = `https://www.reddit.com/r/${subredditName}.json?sort=new`;
    const newSortUrl = `${REDDIT_BASE_URL}/r/${subredditName}.json?sort=new`;
    const response = await fetch(newSortUrl);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  }
);

export const fetchSubredditDetailsTop = createAsyncThunk(
  "subredditPage/fetchSubredditDetailsTop",
  async (subredditName) => {
    // const topSortUrl = `https://www.reddit.com/r/${subredditName}.json?sort=top`;
    const topSortUrl = `${REDDIT_BASE_URL}/r/${subredditName}.json?sort=top`;
    const response = await fetch(topSortUrl);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  }
);

const sortByOptions = ["hot", "new", "top"];

const subredditPageSlice = createSlice({
  name: "subredditPage",
  initialState: {
    pending: false,
    error: null,
    newPosts: [],
    hot: [],
    top: [],
    sortBy: "hot",
  },
  reducers: {
    sortByReducer: (state, action) => {
      if (sortByOptions.includes(action.payload)) {
        state.sortBy = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubredditDetailsHot.pending, (state) => {
        state.error = null;
        state.pending = true;
      })
      .addCase(fetchSubredditDetailsHot.fulfilled, (state, action) => {
        state.pending = false;
        state.hot = action.payload.data.children.map((item) => item.data);
      })
      .addCase(fetchSubredditDetailsHot.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      })
      .addCase(fetchSubredditDetailsNew.pending, (state) => {
        state.pending = true;
        state.error = null;
        state.pending = true;
      })
      .addCase(fetchSubredditDetailsNew.fulfilled, (state, action) => {
        state.pending = false;
        state.newPosts = action.payload.data.children.map((item) => item.data);
      })
      .addCase(fetchSubredditDetailsNew.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      })
      .addCase(fetchSubredditDetailsTop.pending, (state) => {
        state.pending = true;
        state.error = null;
        state.pending = true;
      })
      .addCase(fetchSubredditDetailsTop.fulfilled, (state, action) => {
        state.pending = false;
        state.top = action.payload.data.children.map((item) => item.data);
      })
      .addCase(fetchSubredditDetailsTop.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export const { sortByReducer } = subredditPageSlice.actions;
export const subredditPageSelector = (state) => state.subredditPage;
export default subredditPageSlice.reducer;
