import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cases: [],
  loading: false,
  isSuccess: false,
  error: null,
  isError: false,
  message: '',
  totalPages: null,
  resPerPage: null,
  casesCount: null,
};

export const displayCases = createAsyncThunk('cases/viewCases', async ({currentPage = 1, casesPerPage = 5, Keyword = ''}, {rejectWithValue}) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  const accessToken = localUser && localUser.access_token;

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cases?page=${currentPage}&per_page=${casesPerPage}&q=${Keyword}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const caseCount = response.data.total;
    const casesDisplay = response.data.data.map((caseName, index) => ({
      case_id: caseName.id,
      case_title: caseName.title,
      description: caseName.description,
      status: caseName.status,
      stakeholders: caseName.stakeholders,
      itemNumber: index + 1,
    }));

    const lastPage = response.data.last_page;
    const responsePerPage = response.data.per_page
    
    return { casesDisplay, lastPage, caseCount, responsePerPage };
    }catch (err) {
      return rejectWithValue(err.response.data);
    }
  }, 
);

export const createCase = createAsyncThunk('cases/createService', async (caseData) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  const accessToken = localUser && localUser.access_token;

  const response = await axios.post('http://127.0.0.1:8000/api/cases', caseData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.case;
});

const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(displayCases.pending, (state) => {
        state.loading = true;
      })
      .addCase(displayCases.fulfilled, (state, action) => {
        state.cases = action.payload.casesDisplay.map((caseView) => ({
          ...caseView,
          reserved: false,
        }));
        state.totalPages = action.payload.lastPage;
        state.casesCount = action.payload.caseCount;
        state.resPerPage = action.payload.responsePerPage;
        state.loading = false;
      })
      .addCase(displayCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isError = true;
      })
      .addCase(createCase.fulfilled, (state, action) => {
        state.cases.push(action.payload);
        state.message = 'Service created successfully';
        state.isSuccess = true;
      })
      .addCase(createCase.rejected, (state, action) => {
        state.error = action.error.message;
        state.isSuccess = false;
        state.message = 'Case was not created successfully';
      });
  },
});

export default casesSlice.reducer;
