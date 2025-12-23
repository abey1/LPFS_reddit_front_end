import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REDDIT_BASE_URL } from "../../api/redditBaseUrl";

export const fetchSearchResults = createAsyncThunk(
  "searchPage/fetchSearchResults",
  async (query) => {
    const response = await fetch(
      `${REDDIT_BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=25`
    );
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  }
);

const searchPageSlice = createSlice({
  name: "searchPage",
  initialState: {
    isLoading: false,
    error: null,
    searchResults: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data.children.map(
          (child) => child.data
        );
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const searchPageSelector = (state) => state.searchPage;
export default searchPageSlice.reducer;
