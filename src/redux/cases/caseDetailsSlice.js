import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCaseDetails = createAsyncThunk(
  'serviceDetails/fetchCaseDetails',
  async (caseId) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/cases/${caseId}`,
    );
    return response.data;
  },
);

const caseDetailsSlice = createSlice({
  name: 'caseDetails',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCaseDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCaseDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default caseDetailsSlice.reducer;
