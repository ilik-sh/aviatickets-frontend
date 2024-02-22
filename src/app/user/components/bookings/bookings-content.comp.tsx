import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,
  Pagination,
} from "@mui/material";
import styled from "@emotion/styled";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import CenteredLoader from "aviatickets-submodule/libs/components/centered-loader.comp";
import { userSelector } from "app/user/store/user.selector";
import { getAllBookings } from "app/user/store/user.actions";
import { enqueueSnackbar } from "notistack";
import { calculatePageCount } from "aviatickets-submodule/libs/utils/calculate-page-count.utils";
import { updateBooking } from "app/bookings/store/bookings.actions";
import { BookingStatuses } from "app/bookings/enums/booking-statuses.enum";
import BookingDetails from "./booking-details.comp";
import BookingListError from "./booking-list-error.comp";
import NoBookings from "./no-bookings.comp";
import { DefaultPageSize } from "app/user/utils/consts";

const StyledAccordion = styled(Accordion)`
  width: 85%;
  margin-top: 2%;
  cursor: pointer;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &::before {
    position: unset;
  }

  @media (max-width: 800px) {
    width: 90vw;
  }
`;

const TicketHeader = styled(AccordionSummary)`
  width: 100%;
  background-color: #2196f3;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .MuiAccordionSummary-content {
    align-items: center;
    justify-content: space-evenly;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    .MuiAccordionSummary-content {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      row-gap: 20px;
    }
  }
`;

const StyledTypography = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDivider = styled(Divider)<{ color: string }>`
  background-color: ${({ color }) => color};
  margin: 2% 2%;
  width: 20%;
  height: 0;
  border-top: 1px solid ${({ color }) => color};
`;

const StyledStack = styled(Stack)`
  display: flex;
  align-items: center;
`;

const StatusTypography = styled(Typography)<{ status: string }>`
  color: ${({ status }) =>
    status === "Booked"
      ? "purple"
      : status === "Cancelled"
      ? "red"
      : status === "Payed"
      ? "green"
      : "inherit"};
  background: white;
  padding: 1%;
  border-radius: 20px;
  cursor: pointer;
`;

const StyledPagination = styled("div")`
  padding-top: 4%;
`;

const BookingsContent: React.FC = () => {
  const { bookings, count, isPending, errors } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(DefaultPageSize);

  useEffect(() => {}, [bookings]);

  useEffect(() => {
    const query = { pageNumber: currentPage, pageSize: DefaultPageSize };
    dispatch(getAllBookings(query));
  }, [dispatch, currentPage]);

  const params = new URLSearchParams(window.location.search);
  params.set("pageSize", String(perPage));
  params.set("pageNumber", String(currentPage));
  window.history.replaceState({}, "", `${window.location.pathname}?${params}`);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const perPageParam = params.get("pageSize");
    const pageNumberParam = params.get("pageNumber");
    if (perPageParam) {
      const parsedPerPage = parseInt(perPageParam, 10);
      if (!isNaN(parsedPerPage) && parsedPerPage !== perPage) {
        setPerPage(parsedPerPage);
        setCurrentPage(1);
      }
    }
    if (pageNumberParam) {
      const parsedPageNumber = parseInt(pageNumberParam, 10);
      if (!isNaN(parsedPageNumber) && parsedPageNumber !== currentPage) {
        setCurrentPage(parsedPageNumber);
      }
    }
  }, [perPage, currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(page);
    setCurrentPage(page);
  };

  if (isPending.bookings) {
    return <CenteredLoader />;
  }
  if (errors.bookings) {
    return <BookingListError />;
  }
  if (count === 0) {
    return (
      <NoBookings title="No bookings yet. Search for a flight and add new booking!" />
    );
  }
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  const paginatedBookings = bookings.slice(startIndex, endIndex);

  const handlePay = async (bookingId: string, event: any) => {
    event.stopPropagation();
    const params = { bookingId };
    const body = { status: BookingStatuses.Payed };
    const response = await dispatch(updateBooking({ params, body }));
    if (response.meta.requestStatus === "fulfilled") {
      const query = { pageNumber: currentPage, pageSize: DefaultPageSize };
      dispatch(getAllBookings(query));
    }

    enqueueSnackbar("Booking payment failed", { variant: "error" });
  };

  const pageCount = calculatePageCount(count, DefaultPageSize);
  return (
    <StyledStack>
      {bookings.map((booking) => (
        <StyledAccordion key={booking.id}>
          <TicketHeader>
            <Typography variant="body2" component="h6" color="black">
              {dayjs(booking.toDestinationRoute[0].departureTime).format("LL")}
            </Typography>
            <Typography variant="h5" component="h2" color="white">
              {booking.originCity}
            </Typography>
            <StyledDivider variant="fullWidth" color="white" />
            <Typography variant="h5" component="h2" color="white">
              {booking.destinationCity}
            </Typography>
            {booking.toOriginRoute.length !== 0 && (
              <StyledTypography variant="body2" color="textSecondary">
                <ConnectingAirportsIcon />
                <span>Round Trip</span>
              </StyledTypography>
            )}
            <Typography variant="h5" component="h2" color="black">
              ${booking.price}
            </Typography>
            <StatusTypography
              onClick={(e) => {
                handlePay(booking.id, e);
              }}
              variant="h6"
              status={booking.status}
            >
              {booking.status}
            </StatusTypography>
          </TicketHeader>
          <AccordionDetails
            sx={{ display: "flex", flexDirection: "column", rowGap: "60px" }}
          >
            {booking.toDestinationRoute.map((flight) => (
              <BookingDetails key={flight.id} flight={flight} />
            ))}
            {booking.toOriginRoute.map((flight) => (
              <BookingDetails key={flight.id} flight={flight} />
            ))}
            <Stack>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Passengers:
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {booking.passengers.map((passenger, ind) => (
                  <Stack
                    sx={{
                      flexDirection: "column",
                      rowGap: "10px",
                      marginBottom: "20px",
                    }}
                    key={passenger.id}
                  >
                    <Typography>Passenger {ind + 1}</Typography>
                    <Typography>First name: {passenger.firstName} </Typography>
                    <Typography>Last name: {passenger.lastName} </Typography>
                  </Stack>
                ))}
              </Typography>
            </Stack>
          </AccordionDetails>
        </StyledAccordion>
      ))}
      {pageCount > 1 ? (
        <StyledPagination>
          <Pagination
            count={Math.ceil(count! / perPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </StyledPagination>
      ) : null}
    </StyledStack>
  );
};

export default BookingsContent;
