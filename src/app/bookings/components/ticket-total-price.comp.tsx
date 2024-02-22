import styled from "@emotion/styled";
import { Stack, StackProps, Typography } from "@mui/material";
import { FC } from "react";

interface TicketTotalPriceProps {
  totalPrice: string;
}

const StyledContainer = styled(Stack)<StackProps>(() => ({
  padding: '10px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const TicketTotalPrice: FC<TicketTotalPriceProps> = ({ totalPrice }) => {
  return (
    <StyledContainer>
      <Typography variant='h6'>Total price</Typography>
      <Typography variant='h6'>{totalPrice}</Typography>
    </StyledContainer>
  )
};

export default TicketTotalPrice;