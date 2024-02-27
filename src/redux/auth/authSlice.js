import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from './authService';

const user = JSON.parse(localStorage.getItem('user'));
const user_reg = JSON.parse(localStorage.getItem('auth_registration'));

const initialState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const register = createAsyncThunk('Auth/register', async (user_reg, thunkAPI) => {
  try {
    return await authServices.register(user_reg);
  } catch (error) {
    const message = (error.response
        && error.response.data
        && error.response.data.message)
      || error.message
      || error.toString();
    return thunkAPI.rejectWithValue({ message });
  }
});

export const login = createAsyncThunk('Authentication', async (user, thunkAPI) => {
  try {
    return await authServices.login(user);
  } catch (error) {
    const message = (error.response
        && error.response.data
        && error.response.data.message)
      || error.message
      || error.toString();
    return thunkAPI.rejectWithValue({ message });
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const localuser = JSON.parse(localStorage.getItem('user'));
  const token = localuser && localuser.Authorization;

  try {
    const response = await axios.delete('http://127.0.0.1:8000/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      localStorage.removeItem('user');
    }
    return null;
  } catch (error) {
    throw new Error(error.response.data.status.message || 'Logout failed');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = 'Registration successful';
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = 'Login successful';
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
