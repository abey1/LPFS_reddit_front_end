import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REDDIT_BASE_URL } from "../../api/redditBaseUrl";
import {
  apiFetchSearchResults,
  apiFetchMoreSearchResults,
} from "../../api/redditApi";

export const fetchSearchResults = createAsyncThunk(
  "searchPage/fetchSearchResults",
  async (query) => {
    return apiFetchSearchResults(query);
  },
);

export const fetchMoreSearchResults = createAsyncThunk(
  "searchPage/fetchMoreSearchResults",
  async ({ query, after }) => {
    return apiFetchMoreSearchResults(query, after);
  },
);

const searchPageSlice = createSlice({
  name: "searchPage",
  initialState: {
    isLoading: false,
    isLoadingMoreSearchResults: false,
    error: null,
    errorLoadMore: null,
    next: null,
    searchResults: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data.children.map(
          (child) => child.data,
        );
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMoreSearchResults.pending, (state) => {
        state.isLoadingMoreSearchResults = true;
        state.errorLoadMore = null;
      })
      .addCase(fetchMoreSearchResults.fulfilled, (state, action) => {
        state.isLoadingMoreSearchResults = false;
        state.searchResults = [
          ...state.searchResults,
          ...action.payload.data.children.map((child) => child.data),
        ];
      })
      .addCase(fetchMoreSearchResults.rejected, (state, action) => {
        state.isLoadingMoreSearchResults = false;
        state.errorLoadMore = action.error.message;
      });
  },
});

export const searchPageSelector = (state) => state.searchPage;

export default searchPageSlice.reducer;
