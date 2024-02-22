import { FlightDto } from "aviatickets-submodule/libs/types/flight.dto";
import { PassengerDto } from "aviatickets-submodule/libs/types/passenger.dto";
import { UserDto } from "aviatickets-submodule/libs/types/user.dto";
import { UUIDDto } from "aviatickets-submodule/libs/types/uuid.dto";
import { BookingStatuses } from "../enums/booking-statuses.enum";

export interface BookingDto extends UUIDDto {
  status: BookingStatuses;
  price: number;
  user: UserDto;
  originCity: string;
  destinationCity: string;
  passengers: PassengerDto[];
  toDestinationRoute: FlightDto[];
  toOriginRoute: FlightDto[];
}
