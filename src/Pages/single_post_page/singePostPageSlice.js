import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSinglePost = createAsyncThunk("singlePostPage/fetchSinglePost", async (postUrl) => {
  const response = await fetch(postUrl);
  const data = await response.json();
  return data;
}

const singePageSlice = createSlice({
  name: "singlePostPage",
  initialState: {}}))