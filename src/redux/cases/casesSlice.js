import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cases: [],
  loading: 'idle',
  isSuccess: false,
  error: null,
  isError: false,
  message: '',
};

export const displayCases = createAsyncThunk('cases', async (_, {rejectWithValue}) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  const accessToken = localUser && localUser.access_token;

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/cases', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const casesDisplay = response.data.map((caseName, index) => ({
      case_id: caseName.id,
      case_title: caseName.title,
      description: caseName.description,
      status: caseName.status,
      stakeholders: caseName.stakeholders,
      itemNumber: index + 1,
    }));
    return casesDisplay;
    }catch (err) {
      return rejectWithValue(err.response.data);
    }
  }, 
);

const casesSlice = createSlice({
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
      .addCase(displayCases.rejected, (state, action) => {
        state.loading = 'failed to load cases';
        state.error = action.payload;
        state.isError = true;
      });
  },
});

export default casesSlice.reducer;
