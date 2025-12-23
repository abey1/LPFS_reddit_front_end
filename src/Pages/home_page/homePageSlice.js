import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { REDDIT_BASE_URL } from "../../api/redditBaseUrl";

export const fetchPosts = createAsyncThunk("homePage/fetchPosts", async () => {
  const response = await fetch("/reddit/.json");
  const data = await response.json();
  return data;
});

const prepareData = (rawPosts) => {
  return rawPosts.data;
};

export const fetchMorePostsNext = createAsyncThunk(
  "homePage/fetchMorePostsNext",
  async (next) => {
    if (!next) return;
    const response = await fetch(
      `${REDDIT_BASE_URL}/.json?after=${next}&limit=25`
    );
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  }
);

export const fetchMorePostsBefore = createAsyncThunk(
  "homePage/fetchMorePostsBefore",
  async (before) => {
    if (!before) return;
    console.log("Fetching posts before:", before);
    console.log(`${REDDIT_BASE_URL}/.json?before=${before}&limit=25`);
    const response = await fetch(
      `${REDDIT_BASE_URL}/.json?before=${before}&limit=25`
    );
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    console.log("Fetched data before:", data);
    return data;
  }
);

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    isLoading: false,
    isLoadingMorePosts: false,
    error: false,
    beforeCount: -1,
    next: null,
    before: null,
    beforeOriginal: null,
    posts: [],
  },
  reducers: {
    // Define your synchronous reducers here if needed
    // addMorePosts: (state, action) => {
    //   const { data, isAfter, isBefore } = action.payload;

    //   if (isBefore) {
    //     state.posts = [...data, ...state.posts];

    //     if (state.posts.length > 50) {
    //       state.posts.splice(state.posts.length - 25, state.posts.length);

    //       state.next = state.posts[state.posts.length - 1]?.name || null;
    //       state.before = state.posts[0]?.name || null;
    //     }
    //   }
    //   if (isAfter) {
    //     state.posts = [...state.posts, ...data];
    //     if (state.posts.length > 50) {
    //       state.posts.splice(0, 25);

    //       state.before = state.posts[0]?.name || null;
    //       state.next = state.posts[state.posts.length - 1]?.name || null;
    //     }
    //   }
    // },
    setBeforeCount: (state, action) => {
      state.beforeCount += action.payload;
    },
    trimList: (state) => {
      console.log("before trimming, posts length:", state.posts.length);
      if (state.posts.length > 50) {
        state.posts.splice(0, 25);
      }
      console.log("after trimming, posts length:", state.posts.length);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data.children.map(prepareData);
        state.beforeOriginal = state.posts[0]?.name || null;
        state.next = action.payload.data.after;
        console.log("Fetched posts:", state.posts);
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.error("Failed to fetch posts:", action.error);
        state.error = true;
        state.isLoading = false;
      })
      .addCase(fetchPosts.pending, (state) => {
        console.log("Fetching posts...");
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchMorePostsNext.pending, (state) => {
        state.isLoadingMorePosts = true;
        state.error = null;
      })
      .addCase(fetchMorePostsNext.fulfilled, (state, action) => {
        state.isLoadingMorePosts = false;
        state.posts = [
          ...state.posts,
          ...action.payload.data.children.map((item) => item.data),
        ];
        state.totalData = action.payload.data;
      })
      .addCase(fetchMorePostsNext.rejected, (state, action) => {
        state.isLoadingMorePosts = false;
        state.error = action.error.message;
      })
      .addCase(fetchMorePostsBefore.pending, (state) => {
        state.isLoadingMorePosts = true;
        state.error = null;
      })
      .addCase(fetchMorePostsBefore.fulfilled, (state, action) => {
        state.isLoadingMorePosts = false;
        state.homeDataBefore = [
          ...action.payload.data.children.map((item) => item.data),
          ...state.posts,
        ];
        state.totalData = action.payload.data;
      })
      .addCase(fetchMorePostsBefore.rejected, (state, action) => {
        state.isLoadingMorePosts = false;
        state.error = action.error.message;
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
export const { setBeforeCount, trimList } = homePageSlice.actions;

export default homePageSlice.reducer;
