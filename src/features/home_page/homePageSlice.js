import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { REDDIT_BASE_URL } from "../../api/redditBaseUrl";
import { apiFetchPosts, apiFetchMorePostsNext } from "../../api/redditApi";

const prepareData = (rawPosts) => {
  return rawPosts.data;
};

export const fetchPosts = createAsyncThunk("homePage/fetchPosts", async () => {
  return await apiFetchPosts();
});

export const fetchMorePostsNext = createAsyncThunk(
  "homePage/fetchMorePostsNext",
  async (next) => {
    return apiFetchMorePostsNext(next);
  },
);

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    isLoading: false,
    isLoadingMorePosts: false,
    error: null,
    errorLoadMore: null,
    beforeCount: -1,
    next: null,
    before: null,
    beforeOriginal: null,
    posts: [],
  },
  reducers: {
    trimList: (state) => {
      if (state.posts.length > 50) {
        // state.posts.splice(0, 25);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data.children.map(prepareData);
        state.beforeOriginal = state.posts[0]?.name || null;
        state.next = action.payload.data.after;
        state.isLoading = false;
        state.errorLoadMore = null;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.error("Failed to fetch posts:", action.error);
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMorePostsNext.pending, (state) => {
        state.isLoadingMorePosts = true;
        state.errorLoadMore = null;
      })
      .addCase(fetchMorePostsNext.fulfilled, (state, action) => {
        state.isLoadingMorePosts = false;
        state.posts = [
          ...state.posts,
          ...action.payload.data.children.map((item) => item.data),
        ];
        state.totalData = action.payload.data;
        state.errorLoadMore = null;
      })
      .addCase(fetchMorePostsNext.rejected, (state, action) => {
        state.isLoadingMorePosts = false;
        state.errorLoadMore = action.error.message;
      });
  },
});

export const postSelector = (state) => state.homePage.posts;
export const isLoadingSelector = (state) => state.homePage.isLoading;
export const errorSelector = (state) => state.homePage.error;
export const nextSelector = (state) => state.homePage.next;
export const beforeSelector = (state) => state.homePage.before;
export const beforeOriginalSelector = (state) => state.homePage.beforeOriginal;
export const beforeCountSelector = (state) => state.homePage.beforeCount;
export const isLoadingMorePostsSelector = (state) =>
  state.homePage.isLoadingMorePosts;
export const errorLoadMoreSelector = (state) => state.homePage.errorLoadMore;
export const { trimList } = homePageSlice.actions;

export default homePageSlice.reducer;
