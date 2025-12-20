import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { REDDIT_BASE_URL } from "../../api/redditBaseUrl";

export const fetchMorePostsNext = createAsyncThunk(
  "loadMore/fetchMorePostsNext",
  async (next) => {
    const response = await fetch(
      `${REDDIT_BASE_URL}/.json?after=${next}&limit=25`
    );
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  }
);

export const fetchMorePostsBefore = createAsyncThunk(
  "loadMore/fetchMorePostsBefore",
  async (before) => {
    const response = await fetch(
      `${REDDIT_BASE_URL}/.json?before=${before}&limit=25`
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
    homeDataNext: [],
    homeDataBefore: [],
    totalData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMorePostsNext.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMorePostsNext.fulfilled, (state, action) => {
        state.isLoading = false;
        (state.homeDataNext = action.payload.data.children.map(
          (item) => item.data
        )),
          (state.totalData = action.payload.data);
      })
      .addCase(fetchMorePostsNext.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMorePostsBefore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMorePostsBefore.fulfilled, (state, action) => {
        state.isLoading = false;
        (state.homeDataBefore = action.payload.data.children.map(
          (item) => item.data
        )),
          (state.totalData = action.payload.data);
      })
      .addCase(fetchMorePostsBefore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default loadMoreSlice.reducer;
export const loadMoreDataSelector = (state) => state.loadMore.data;
export const isLoadingMoreSelector = (state) => state.loadMore.isLoading;
export const homeDataNextSelector = (state) => state.loadMore.homeDataNext;
export const homeDataBeforeSelector = (state) => state.loadMore.homeDataBefore;
export const totalDataSelector = (state) => state.loadMore.totalData;
