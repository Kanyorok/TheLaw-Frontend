import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCaseDetails = createAsyncThunk(
  'serviceDetails/fetchCaseDetails',
  async (caseId, {rejectWithValue}) => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = localUser && localUser.access_token;

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cases/${caseId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const casesDisplay = response.data;
    return casesDisplay;
    }catch (err) {
      return rejectWithValue(err.response.data);
    }
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
