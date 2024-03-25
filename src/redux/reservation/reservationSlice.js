import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    reservations: [],
    loading: false,
    isSuccess: false,
    error: null,
    isError: false,
    message: "",
    totalPages: null,
    resPerPage: null,
    reserveCount: null,
    };

export const createReservation = createAsyncThunk('reservation/create', async(reserveData) => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = localUser && localUser.access_token;

    const response = await axios.post('http://127.0.0.1:8000/api/reservations', reserveData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
})

export const fetchReservations = createAsyncThunk('reservation/fetch', async({currentPage = 1, reservationsPerPage = 5, keyword = ''}, {rejectWithValue}) => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = localUser && localUser.access_token;

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/reservations?page=${currentPage}&per_page=${reservationsPerPage}&q=${keyword}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const reservationsDisplay = response.data.data.map((reservation, index) => ({
            id: reservation.id,
            description: reservation.description,
            contact: reservation.contact,
            date: reservation.appointment_date,
            user_name: reservation.client_name,
            itemNumber: index + 1,
        }));

            const lastPage = response.data.last_page;
            const responsePerPage = response.data.per_page;
            const reservationCount = response.data.total;

        return {reservationsDisplay, lastPage, reservationCount, responsePerPage };
    }catch (err) {
        return rejectWithValue(err.response.data);
    }
},
);

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
                state.error = action.error.message;
                state.isError = true;
                state.loading = false;
            })
            .addCase(fetchReservations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReservations.fulfilled, (state, action) => {
                state.reservations = action.payload.reservationsDisplay.map((reserveDisplay) => ({
                    ...reserveDisplay,
                }));
                state.totalPages = action.payload.lastPage;
                state.resPerPage = action.payload.responsePerPage;
                state.reserveCount = action.payload.reservationCount;
                state.loading = false;
            })
            .addCase(fetchReservations.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.loading = false;
            })
    },
});

export default reservationSlice.reducer;