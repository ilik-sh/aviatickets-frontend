import { createAsyncThunk } from "@reduxjs/toolkit";
import repository from "aviatickets-submodule/libs/api/repository";
import { BookingParamsDto } from "../types/booking-params.dto";
import { BookingDto } from "../types/booking.dto";
import { CreateBookingForm } from "../types/create-booking.form";
import { UpdateBookingForm } from "../types/update-booking.form";

export const createBooking = createAsyncThunk<
  BookingDto,
  { body: CreateBookingForm }
>("POST/create-booking", async ({ body }, { rejectWithValue }) => {
  try {
    const response = await repository.post<BookingDto>("bookings", body);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updateBooking = createAsyncThunk<
  BookingDto,
  { params: BookingParamsDto; body: UpdateBookingForm }
>("PUT/update-booking", async ({ params, body }, { rejectWithValue }) => {
  try {
    const { bookingId } = params;
    const response = await repository.put<BookingDto>(
      `bookings/${bookingId}`,
      body
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
