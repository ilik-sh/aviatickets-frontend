import { createSlice } from "@reduxjs/toolkit";
import { BookingState } from "../types/bookings.state";
import { createBooking, updateBooking } from "./bookings.actions";

const initialState: BookingState = {
  booking: null,
  isPending: {
    booking: false,
  },
  errors: {
    booking: null,
  },
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create a booking
      .addCase(createBooking.pending, (state) => {
        state.isPending.booking = true;
        state.errors.booking = null;
      })
      .addCase(createBooking.fulfilled, (state, { payload }) => {
        state.isPending.booking = false;
        state.booking = payload;
      })
      .addCase(createBooking.rejected, (state, action: any & { payload: any }) => {
        state.isPending.booking = false;
        state.errors.booking = action.payload.message;
      })
      // Update a booking
      .addCase(updateBooking.pending, (state) => {
        state.isPending.booking = true;
        state.errors.booking = null;
      })
      .addCase(updateBooking.fulfilled, (state, { payload }) => {
        state.isPending.booking = false;
        state.booking = payload;
      })
      .addCase(updateBooking.rejected, (state, action: any & { payload: any }) => {
        state.isPending.booking = false;
        state.errors.booking = action.payload.message;
      });
  },
});
