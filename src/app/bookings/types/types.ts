export enum BookingStatuses {
  Payed = 'Payed',
  Booked = 'Booked',
  Cancelled = 'Cancelled',
}

export type BookingsDto = {
  count: number;
  bookings: BookingDto[];
}

export type BookingDto = {
  id: string;
  status: string;
  price: number;
  createdAt: number;
  updatedAt: number;
  user: User;
  routeForward: Route[];
  routeBackward: Route[];
  passengers: Passenger[];
  origin: string;
  destination: string;
}

export type Passenger = {
  id: string;
  firstName: string;
  lastName: string;
  passportId: string;
  createdAt: number;
  updatedAt: number;
}

export type Route = {
  id: string;
  originCity: string;
  destinationCity: string;
  departureTime: number;
  arrivalTime: number;
  status: string;
  price: number;
  seatAmount: number;
  availableSeatAmount: number;
  createdAt: number;
  updatedAt: number;
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: number;
  updatedAt: number;
  roleId: string;
  roleType: string;
}