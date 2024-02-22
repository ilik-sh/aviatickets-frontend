import { Stack, StackProps, styled } from "@mui/material";
import { FC } from "react";

interface TicketPriceDetailsListProps {
  children: string | JSX.Element | JSX.Element[];
}

const StyledContainer = styled(Stack)<StackProps>(() => ({
  flexDirection: 'column',
  rowGap: '10px',
  padding: '15px 10px'
}));

const TicketPriceDetailsList: FC<TicketPriceDetailsListProps> = ({ children }) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}

export default TicketPriceDetailsList;