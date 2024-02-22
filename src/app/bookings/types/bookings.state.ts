import { BaseState } from "aviatickets-submodule/libs/types/base.state";
import { BookingDto } from "./booking.dto";

export interface BookingState extends BaseState {
  booking: BookingDto | null;
  isPending: {
    booking: boolean;
  };
  errors: {
    booking: string | null;
  };
}
