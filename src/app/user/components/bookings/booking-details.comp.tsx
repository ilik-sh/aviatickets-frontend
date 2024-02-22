import React from "react";
import { Typography, Grid, Divider } from "@mui/material";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import FlightIcon from "@mui/icons-material/Flight";
import { Route } from "../../../bookings/types/types";

const StyledContent = styled("div")`
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const FlightInfoContainer = styled(Grid)`
  width: 95%;
  display: flex;
  justify-content: center;
  padding: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
  }

  @media (max-width: 1199) {
    align-items: center;
    padding: 0;
  }
`;

const FlightTimeContainer = styled(Grid)`
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    width: 95%;
  }
`;

const StyledDivider = styled(Divider)<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 20%;
  margin: 2% 2%;
  height: 0;
  border-top: 1px solid ${({ color }) => color};

  @media (max-width: 600px) {
    width: 20vw;
    margin: 10% auto 10% auto;
  }
`;

const StyledTypography = styled(Typography)`
  flex-direction: row;
`;

const BookingDetails: React.FC<{ flight: Route }> = ({ flight }) => {
  return (
    <StyledContent key={flight.id}>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {flight.originCity} - {flight.destinationCity}
      </Typography>
      <FlightInfoContainer container>
        <Grid item xs={11} lg={2}>
          <Typography variant="body2" color="textSecondary">
            Departure Time:
          </Typography>
          <StyledTypography variant="h6" color="primary">
            {dayjs(flight.departureTime).format("LLL")}
          </StyledTypography>
        </Grid>
        <StyledDivider
          color="gray"
          variant="fullWidth"
          orientation="vertical"
          flexItem
        />
        <Grid item lg={1}>
          <FlightTimeContainer item xs={2}>
            <FlightIcon color="primary" />
            <Typography
              variant="h6"
              color="primary"
              style={{ marginLeft: "5px" }}
            >
              {dayjs(flight.arrivalTime - flight.departureTime).format("LT")}
            </Typography>
          </FlightTimeContainer>
        </Grid>
        <StyledDivider
          color="gray"
          variant="fullWidth"
          orientation="vertical"
          flexItem
        />
        <Grid item xs={11} lg={2}>
          <Typography variant="body2" color="textSecondary">
            Arrival Time:
          </Typography>
          <StyledTypography variant="h6" color="primary">
            {dayjs(flight.arrivalTime).format("LLL")}
          </StyledTypography>
        </Grid>
      </FlightInfoContainer>
    </StyledContent>
  );
};

export default BookingDetails;
