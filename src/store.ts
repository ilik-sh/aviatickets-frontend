import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "aviatickets-submodule/auth/store/auth.slice";
import { bookingsSlice } from "app/bookings/store/bookings.slice";
import { chatSlice } from "app/chat/store/chat.slice";
import { citiesSlice } from "aviatickets-submodule/cities/store/cities.slice";
import { ticketSearchFilterSlice } from "aviatickets-submodule/ticket-search-filter/store/ticket-search-filter.slice";
import { ticketsSlice } from "aviatickets-submodule/tickets/store/tickets.slice";
import { userSlice } from "app/user/store/user.slice";

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    ticketSearchFilter: ticketSearchFilterSlice.reducer,
    tickets: ticketsSlice.reducer,
    cities: citiesSlice.reducer,
    bookings: bookingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
