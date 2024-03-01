import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://127.0.0.1:8000/api/auth/user";

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const accessToken = localUser && localUser.access_token;

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "User not found");
  }
});

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const loadUserSlice = createSlice({
  name: "loadUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
        state.message = "User loaded successfully";
        state.isError = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default loadUserSlice.reducer;
