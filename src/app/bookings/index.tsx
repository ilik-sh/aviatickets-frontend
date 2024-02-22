import { CircularProgress } from "@mui/material";
import { TicketsModulePagePaths } from "enums/page-paths.enum";
import React from "react";
import { FC, PropsWithChildren, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({
  element: Element,
}) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Element />
    </Suspense>
  );
};

const CreateBookingPage = React.lazy(
  () => import("app/bookings/create-booking.page")
);

const BookingsRoutes: FC = () => {
  return (
    <Routes>
      <Route
        path={"/create/:ticketId"}
        element={<Suspended element={CreateBookingPage} />}
      />
      <Route
        path="*"
        element={<Navigate to={TicketsModulePagePaths.SearchTickets} />}
      />
    </Routes>
  );
};

export default BookingsRoutes;
