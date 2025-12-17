import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch Reddit post + comments by subreddit and postId
export const fetchSingleRedditPost = createAsyncThunk(
  "singlePost/fetchSingleRedditPost",
  async ({ sub, post_id }) => {
    // const url = `https://corsproxy.io/?https://www.reddit.com/r/${sub}/comments/${post_id}.json`;
    const url = `/reddit./r/${sub}/comments/${post_id}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    // Reddit JSON: [postInfo, commentsInfo]
    const post = data[0]?.data?.children?.[0]?.data;
    const comments =
      data[1]?.data?.children
        ?.filter((item) => item.kind === "t1")
        .map((item) => item.data) || [];
    return { post, comments };
  }
);

const initialState = {
  loading: false,
  error: null,
  post: {},
  comments: [],
};

const singlePostPageSlice = createSlice({
  name: "singlePost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleRedditPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.post = null;
        state.comments = [];
      })
      .addCase(fetchSingleRedditPost.fulfilled, (state, action) => {
        state.loading = false;

        state.comments = action.payload.comments;
        const postData = {
          title: action.payload.post.title,
          body: action.payload.post.selftext,
          subreddit: action.payload.post.subreddit_name_prefixed,
          upvotes: action.payload.post.ups,
          author: action.payload.post.author,
          commentsCount: action.payload.post.num_comments,
          createdAt: new Date(
            action.payload.post.created_utc * 1000
          ).toLocaleString(),
          image:
            action.payload.post.post_hint === "image"
              ? action.payload.post.preview?.images?.[0]?.source?.url.replace(
                  /&amp;/g,
                  "&"
                )
              : null,
          link:
            action.payload.post.post_hint === "link"
              ? action.payload.post.url
              : null,
          video: action.payload.post.is_video
            ? action.payload.post.media?.reddit_video?.fallback_url
            : null,
        };
        state.post = postData;
      })
      .addCase(fetchSingleRedditPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.post = null;
        state.comments = [];
      });
  },
});

export const singlePostSelector = (state) => state.singlePost;
export default singlePostPageSlice.reducer;
