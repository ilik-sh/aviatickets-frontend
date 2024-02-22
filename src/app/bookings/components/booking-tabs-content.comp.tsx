import { Stack, StackProps, styled } from "@mui/system";
import { TicketDto } from "aviatickets-submodule/tickets/types/ticket.dto";
import { TicketsModulePagePaths } from "enums/page-paths.enum";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { useSnackbar } from "notistack";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingStatuses } from "../enums/booking-statuses.enum";
import { createBooking, updateBooking } from "../store/bookings.actions";
import { BookingsSelector } from "../store/bookings.selectors";
import { CreateBookingFormYup } from "../validation-schemas/create-booking-form.schema";
import BookingTabs from "./booking-tabs.comp";
import CreateBookingForm from "./create-booking-form.comp";
import PaymentTabContent from "./payment-tab-content.form";

interface BookingTabsContentProps {
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
  ticket: TicketDto;
}

const StyledStack = styled(Stack)<StackProps>(() => ({
  gridArea: "bookingTabContent",
}));

const BookingTabsContent: FC<BookingTabsContentProps> = ({
  activeTabIndex,
  setActiveTabIndex,
  ticket,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isBookButtonDisabled, setIsBookButtonDisabled] =
    useState<boolean>(false);
  const [isPayButtonDisabled, setIsPayButtonDisabled] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { booking } = useAppSelector(BookingsSelector);
  const navigate = useNavigate();

  const handleBookButtonClick = async (state: CreateBookingFormYup) => {
    const { passengers } = state;
    const { toDestinationRoute, toOriginRoute } = ticket;

    const totalPrice = ticket.price * passengers.length;
    const isRoundTripJourney = Boolean(toOriginRoute);
    const originCity = toDestinationRoute.flights.at(0)!.originCity;
    const destinationCity = toDestinationRoute.flights.at(-1)!.destinationCity;
    const toDestinationFlightIds = toDestinationRoute.flights.map(
      (flight) => flight.id
    );
    const toOriginFlightIds = isRoundTripJourney
      ? toOriginRoute!.flights.map((flight) => flight.id)
      : [];

    const body = {
      price: totalPrice,
      passengers,
      originCity,
      destinationCity,
      toDestinationRoute: toDestinationFlightIds,
      toOriginRoute: toOriginFlightIds,
    };

    setIsBookButtonDisabled(true);

    const response = await dispatch(createBooking({ body }));
    if (response.meta.requestStatus === "rejected") {
      enqueueSnackbar("Booking creation failed", { variant: "error" });
      setIsBookButtonDisabled(false);
      return;
    }

    setIsBookButtonDisabled(false);
    enqueueSnackbar("Booking successfully created", { variant: "success" });
    setActiveTabIndex(1);
  };

  const handlePayButtonClick = async () => {
    if (!booking) {
      enqueueSnackbar("There is no booking to pay for", { variant: "error" });
      return;
    }

    const params = { bookingId: booking.id };
    const body = { status: BookingStatuses.Payed };

    setIsPayButtonDisabled(true);

    const response = await dispatch(updateBooking({ params, body }));

    if (response.meta.requestStatus === "rejected") {
      enqueueSnackbar("Booking payment failed", { variant: "error" });
      setIsPayButtonDisabled(false);
      return;
    }

    enqueueSnackbar("Booking successfully payed", { variant: "success" });
    setIsPayButtonDisabled(false);

    navigate(TicketsModulePagePaths.SearchTickets);
  };

  let tabContent = null;

  switch (activeTabIndex) {
    case 0:
      tabContent = (
        <CreateBookingForm
          onBookButtonClick={handleBookButtonClick}
          isBookButtonDisabled={isBookButtonDisabled}
        />
      );
      break;
    case 1:
      tabContent = (
        <PaymentTabContent
          onPayButtonClick={handlePayButtonClick}
          isPayButtonDisabled={isPayButtonDisabled}
        />
      );
      break;
  }

  return (
    <StyledStack>
      <BookingTabs activeTabIndex={activeTabIndex} />
      {tabContent}
    </StyledStack>
  );
};

export default BookingTabsContent;
