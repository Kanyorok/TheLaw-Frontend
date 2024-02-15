import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_DATA = 'http://127.0.0.1:8000/cases';

export const displayCases = createAsyncThunk('cases', async () => {
  try {
    const retrievedCases = await axios.get(API_DATA);
    const casesDisplay = retrievedCases.data.map((caseName, index) => ({
      case_id: caseName.id,
      case_title: caseName.title,
      description: caseName.description,
      itemNumber: index + 1,
    }));
    return casesDisplay;
  } catch (error) {
    throw Error(error);
  }
});

const initialState = {
  cases: [],
  loading: 'idle',
};

const caseSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(displayCases.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(displayCases.fulfilled, (state, action) => {
        state.cases = action.payload.map((caseView) => ({
          ...caseView,
          reserved: false,
        }));
        state.loading = 'Succeeded';
      })
      .addCase(displayCases.rejected, (state) => {
        state.loading = 'failed load cases';
      });
  },
});

export default caseSlice.reducer;
