import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    reservations: [],
    loading: false,
    isSuccess: false,
    error: null,
    isError: false,
    message: "",
    };

export const createReservation = createAsyncThunk('reservation/create', async(reserveData) => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = localUser && localUser.access_token;

    const response = await axios.post('http://127.0.0.1:8000/api/cases', reserveData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
})

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReservation.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReservation.fulfilled, (state, action) => {
                state.reservations = action.payload;
                state.loading = false;
                state.isSuccess = true;
                state.message = 'Reservation created successfully';
            })
            .addCase(createReservation.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.loading = false;
            });
    },
});