export interface CreateBookingForm {
  price: number;
  originCity: string;
  destinationCity: string;
  toDestinationRoute: string[];
  toOriginRoute: string[];
  passengers: Passenger[];
}

interface Passenger {
  firstName: string;
  lastName: string;
  passportId: string;
}
