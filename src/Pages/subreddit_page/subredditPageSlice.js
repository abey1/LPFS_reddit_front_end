import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { trimList } from "../home_page/homePageSlice";

// Async thunk to fetch subreddit details by subreddit name
export const fetchSubredditDetailsHot = createAsyncThunk(
  "subredditPage/fetchSubredditDetailsHot",
  async (subredditName) => {
    const hotSortUrl = `https://www.reddit.com/r/${subredditName}.json?sort=hot`;
    const response = await fetch(hotSortUrl);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  }
);

export const fetchSubredditDetailsNew = createAsyncThunk(
  "subredditPage/fetchSubredditDetailsNew",
  async (subredditName) => {
    const newSortUrl = `https://www.reddit.com/r/${subredditName}.json?sort=new`;
    const response = await fetch(newSortUrl);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  }
);

export const fetchSubredditDetailsTop = createAsyncThunk(
  "subredditPage/fetchSubredditDetailsTop",
  async (subredditName) => {
    const topSortUrl = `https://www.reddit.com/r/${subredditName}.json?sort=top`;
    const response = await fetch(topSortUrl);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  }
);

export const LoadMoreSubredditPosts = createAsyncThunk(
  "subredditPage/LoadMoreSubredditPosts",
  async (subredditName, thunkAPI) => {
    const state = thunkAPI.getState();
    const after = state.subredditPage.next;
    const response = await fetch(
      `https://www.reddit.com/r/${subredditName}.json?after=${after}&limit=25`
    );
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    console.log(
      "load more subreddit url:",
      `https://www.reddit.com/r/${subredditName}.json?after=${after}&limit=25`
    );
    console.log("Load more subreddit posts data:", data);
    return data;
  }
);

const sortByOptions = ["hot", "new", "top"];

const subredditPageSlice = createSlice({
  name: "subredditPage",
  initialState: {
    pending: false,
    error: null,
    errorLoadMore: null,
    newPosts: [],
    hot: [],
    top: [],
    sortBy: "hot",
    next: null,
    isLoadingMorePosts: false,
  },
  reducers: {
    sortByReducer: (state, action) => {
      if (sortByOptions.includes(action.payload)) {
        state.sortBy = action.payload;
      }
    },
    trimSubredditList: (state) => {
      if (state.sortBy === "hot") {
        if (state.hot.length > 50) {
          state.hot = state.hot.splice(0, 25);
        }
      } else if (state.sortBy === "new") {
        if (state.newPosts.length > 50) {
          state.newPosts = state.newPosts.splice(0, 25);
        }
      } else if (state.sortBy === "top") {
        if (state.top.length > 50) {
          state.top = state.top.splice(0, 25);
        }
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
        state.errorLoadMore = null;
        state.hot = action.payload.data.children.map((item) => item.data);
        state.next = action.payload.data.after;
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
        state.errorLoadMore = null;
        state.newPosts = action.payload.data.children.map((item) => item.data);
        state.next = action.payload.data.after;
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
        state.errorLoadMore = null;
        state.top = action.payload.data.children.map((item) => item.data);
        state.next = action.payload.data.after;
      })
      .addCase(fetchSubredditDetailsTop.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      })
      .addCase(LoadMoreSubredditPosts.pending, (state) => {
        state.isLoadingMorePosts = true;
        state.error = null;
      })
      .addCase(LoadMoreSubredditPosts.fulfilled, (state, action) => {
        state.isLoadingMorePosts = false;
        state.errorLoadMore = null;
        if (state.sortBy === "hot") {
          state.hot = [
            ...state.hot,
            ...action.payload.data.children.map((item) => item.data),
          ];
        } else if (state.sortBy === "new") {
          state.newPosts = [
            ...state.newPosts,
            ...action.payload.data.children.map((item) => item.data),
          ];
        } else if (state.sortBy === "top") {
          state.top = [
            ...state.top,
            ...action.payload.data.children.map((item) => item.data),
          ];
        }
        state.next = action.payload.data.after;
      })
      .addCase(LoadMoreSubredditPosts.rejected, (state, action) => {
        state.isLoadingMorePosts = false;
        state.errorLoadMore = action.error.message;
      });
  },
});

export const { sortByReducer, trimSubredditList } = subredditPageSlice.actions;
export const subredditPageSelector = (state) => state.subredditPage;
export default subredditPageSlice.reducer;
