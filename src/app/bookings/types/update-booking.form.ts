import { BookingStatuses } from "../enums/booking-statuses.enum";

export interface UpdateBookingForm {
  status: BookingStatuses;
}
