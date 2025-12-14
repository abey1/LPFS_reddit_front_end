import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("homePage/fetchPosts", async () => {
  const response = await fetch("https://www.reddit.com/.json");
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
  };
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    posts: [
      {
        id: "1",
        title: "Sample Post",
        thumbnail: "https://via.placeholder.com/150",
        subreddit_id: "t5_2qh33",
        subredditName: "SampleSubreddit",
        author: "SampleAuthor",
        upvotes: 100,
        timePosted: "2 hours ago",
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
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.error("Failed to fetch posts:", action.error);
      })
      .addCase(fetchPosts.pending, () => {
        console.log("Fetching posts...");
      });
  },
});

export default homePageSlice.reducer;
