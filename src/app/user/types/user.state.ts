import { BookingDto } from "aviatickets-submodule/libs/types/booking.dto";
import { BaseState } from "aviatickets-submodule/libs/types/base.state";

export interface UserState extends BaseState {
  isUser: boolean;
  bookings: BookingDto[];
  count: number | null;
  isPending: {
    bookings: boolean;
  };
  errors: {
    bookings: string | null;
  };
}
