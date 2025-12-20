import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";

export const fetchPosts = createAsyncThunk("homePage/fetchPosts", async () => {
  const response = await fetch("/reddit/.json");
  const data = await response.json();
  return data;
});

const prepareData = (rawPosts) => {
  return rawPosts.data;
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    isLoading: false,
    error: false,
    next: null,
    before: null,
    beforeOriginal: null,
    posts: [
      {
        author: "Any_Gap9612",
        id: "t3_1pm0mds",
        subredditName: "r/mildlyinfuriating",
        subreddit_id: "t5_2ubgg",
        thumbnail:
          "https://b.thumbs.redditmedia.com/7WlhG6c6ed3Spc7pbZm8QXROZxyLLbXdEL_K0V8lbZA.jpg",
        timePosted: 1765672551,
        title:
          "I got uninvited to a friend’s holiday potluck, while I was on my way to it.",
        upvotes: 18393,
        url_overridden_by_dest: "https://i.redd.it/cvd6ean0f27g1.jpeg",
      },
    ],
  },
  reducers: {
    // Define your synchronous reducers here if needed
    addMorePosts: (state, action) => {
      const { data, isAfter, isBefore } = action.payload;
      if (isAfter) {
        state.posts = [...state.posts, ...data];
        if (state.posts.length > 50) {
          state.posts.splice(0, 25);
          state.before = state.posts[0]?.name || null;
        }
      }
      if (isBefore) {
        state.posts = [...data, ...state.posts];
        if (state.posts.length > 50) {
          state.posts.splice(state.posts.length - 25, state.posts.length);
          state.next = state.posts[state.posts.length - 1]?.name || null;
          state.before = state.posts[0]?.name || null;
        }
      }
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
      });
  },
});

export const postSelector = (state) => state.homePage.posts;
export const isLoadingSelector = (state) => state.homePage.isLoading;
export const errorSelector = (state) => state.homePage.error;
export const nextSelector = (state) => state.homePage.next;
export const beforeSelector = (state) => state.homePage.before;
export const beforeOriginalSelector = (state) => state.homePage.beforeOriginal;
export const { addMorePosts } = homePageSlice.actions;

export default homePageSlice.reducer;
