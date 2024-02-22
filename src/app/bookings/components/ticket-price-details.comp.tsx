import {
  Box,
  Divider,
  Stack,
  StackProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { tickerSearchFilterSelector } from "aviatickets-submodule/ticket-search-filter/store/ticket-search-filter.selectors";
import { TicketDto } from "aviatickets-submodule/tickets/types/ticket.dto";
import { useAppSelector } from "hooks/redux.hooks";
import { FC } from "react";
import TicketPriceDetailsListItem from "./ticket-price-details-list-item.comp";
import TicketPriceDetailsList from "./ticket-price-details-list.comp";
import TicketTotalPrice from "./ticket-total-price.comp";

interface TicketPriceDetailsProps {
  ticket: TicketDto;
}

const StyledContainer = styled(Stack)<StackProps>(() => ({
  gridArea: "ticketSummary",
  flexDirection: "column",
  border: "1px solid lightgray",
  borderRadius: "20px",
  height: "min-content",
}));

const StyledTitle = styled(Typography)<TypographyProps>(() => ({
  padding: "10px",
  borderRadius: "20px 20px 0 0",
  fontWeight: 600,
}));

const TicketPriceDetails: FC<TicketPriceDetailsProps> = ({ ticket }) => {
  const {
    filter: { passengerAmount },
  } = useAppSelector(tickerSearchFilterSelector);
  const { price } = ticket;
  const totalPrice = `${passengerAmount * price}$`;

  return (
    <StyledContainer>
      <StyledTitle variant="h6">Ticket price details</StyledTitle>
      <Divider />
      <TicketPriceDetailsList>
        <TicketPriceDetailsListItem label="Ticket price" value={`${price}$`} />
        <TicketPriceDetailsListItem
          label="Passenger amount"
          value={passengerAmount}
        />
      </TicketPriceDetailsList>
      <Divider />
      <TicketTotalPrice totalPrice={totalPrice} />
    </StyledContainer>
  );
};

export default TicketPriceDetails;
