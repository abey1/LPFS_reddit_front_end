import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { REDDIT_BASE_URL } from "../../api/redditBaseUrl";

export const fetchMorePosts = createAsyncThunk(
  "loadMore/fetchMorePosts",
  async (next) => {
    const response = await fetch(
      `${REDDIT_BASE_URL}/.json?after=${next}&limit=25`
    );
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  }
);

const loadMoreSlice = createSlice({
  name: "loadMore",
  initialState: {
    isLoading: false,
    error: null,
    homeData: [],
    totalData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMorePosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMorePosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.homeData = [
          ...state.homeData,
          ...action.payload.data.children.map((item) => item.data),
        ];
        state.totalData = action.payload.data;
      })
      .addCase(fetchMorePosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default loadMoreSlice.reducer;
export const loadMoreDataSelector = (state) => state.loadMore.data;
export const isLoadingMoreSelector = (state) => state.loadMore.isLoading;
export const homeDataSelector = (state) => state.loadMore.homeData;
export const totalDataSelector = (state) => state.loadMore.totalData;
