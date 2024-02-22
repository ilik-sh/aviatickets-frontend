import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingsDto } from "aviatickets-submodule/libs/types/bookings.dto";
import repository from "aviatickets-submodule/libs/api/repository";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { PaginationQueryDto } from "aviatickets-submodule/libs/types/pagination-query.dto";
import axios from "axios";

export const getAllBookings = createAsyncThunk<
  BookingsDto,
  PaginationQueryDto,
  { rejectValue: ApiError | undefined }
>("getAllBookings", async (query, { rejectWithValue }) => {
  try {
    const response = await repository.get("/users/me/bookings", {
      params: query,
    });
    console.log(response.data);
    return response.data.bookingData;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      console.log(error);
      return rejectWithValue(error.response?.data!);
    }
    return rejectWithValue({
      message: "Unknown getting bookings",
      statusCode: 500,
    } as ApiError);
  }
});
