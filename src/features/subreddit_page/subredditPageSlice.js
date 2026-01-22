import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REDDIT_BASE_URL } from "../../api/redditBaseUrl";
import {
  apiFetchSubredditDetailsHot,
  apiFetchSubredditDetailsNew,
  apiFetchSubredditDetailsTop,
  apiLoadMoreSubredditPosts,
} from "../../api/redditApi";
// Async thunk to fetch subreddit details by subreddit name
export const fetchSubredditDetailsHot = createAsyncThunk(
  "subredditPage/fetchSubredditDetailsHot",
  async (subredditName) => {
    return apiFetchSubredditDetailsHot(subredditName);
  }
);

export const fetchSubredditDetailsNew = createAsyncThunk(
  "subredditPage/fetchSubredditDetailsNew",
  async (subredditName) => {
    return apiFetchSubredditDetailsNew(subredditName);
  }
);

export const fetchSubredditDetailsTop = createAsyncThunk(
  "subredditPage/fetchSubredditDetailsTop",
  async (subredditName) => {
    return apiFetchSubredditDetailsTop(subredditName);
  }
);

export const loadMoreSubredditPosts = createAsyncThunk(
  "subredditPage/loadMoreSubredditPosts",
  async (subredditName, thunkAPI) => {
    const state = thunkAPI.getState();
    const after = state.subredditPage.next;
    return apiLoadMoreSubredditPosts(subredditName, after);
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
      .addCase(loadMoreSubredditPosts.pending, (state) => {
        state.isLoadingMorePosts = true;
        state.error = null;
      })
      .addCase(loadMoreSubredditPosts.fulfilled, (state, action) => {
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
      .addCase(loadMoreSubredditPosts.rejected, (state, action) => {
        state.isLoadingMorePosts = false;
        state.errorLoadMore = action.error.message;
      });
  },
});

export const { sortByReducer, trimSubredditList } = subredditPageSlice.actions;
export const subredditPageSelector = (state) => state.subredditPage;
export default subredditPageSlice.reducer;
