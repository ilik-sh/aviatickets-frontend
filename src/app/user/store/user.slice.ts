import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/user.state";
import { getAllBookings } from "./user.actions";

const initialState: UserState = {
  isUser: !!sessionStorage.getItem("access_token"),
  bookings: [],
  count: null,
  isPending: {
    bookings: false,
  },
  errors: {
    bookings: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookings.pending, (state, action) => {
        state.isPending.bookings = true;
        state.errors.bookings = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.bookings = action.payload.bookings;
        state.count = action.payload.count;
        state.isPending.bookings = false;
        state.errors.bookings = null;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.isPending.bookings = false;
        state.errors.bookings = action.error.message || null;
      });
  },
});

export const authReducer = userSlice.reducer;
