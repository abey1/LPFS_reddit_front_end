import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("homePage/fetchPosts", async () => {
  const response = await fetch("/reddit/.json");
  const data = await response.json();
  return data;
});

const prepareData = (rawPosts) => {
  return {
    id: rawPosts.data.name,
    title: rawPosts.data.title,
    thumbnail: rawPosts.data.thumbnail,
    subreddit_id: rawPosts.data.subreddit_id,
    subredditName: rawPosts.data.subreddit_name_prefixed,
    author: rawPosts.data.author,
    upvotes: rawPosts.data.ups,
    timePosted: rawPosts.data.created_utc,
    url_overridden_by_dest: rawPosts.data.url_overridden_by_dest,
  };
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    isLoading: false,
    error: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data.children.map(prepareData);
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

export default homePageSlice.reducer;
