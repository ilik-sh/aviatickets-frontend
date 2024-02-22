import { Stack, StackProps, styled, Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

interface TicketPriceDetailsListItemProps {
  label: string;
  value: number | string;
}

const StyledContainer = styled(Stack)<StackProps>(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  columnGap: '40px'
}));

const StyledLabel = styled(Typography)<TypographyProps>(() => ({
  // fontWeight: 600
}));

const StyledValue = styled(Typography)<TypographyProps>(() => ({
  // flexDirection: 'column'
}));

const TicketPriceDetailsListItem: FC<TicketPriceDetailsListItemProps> = ({ label, value }) => {
  return (
    <StyledContainer>
      <StyledLabel> {label}</StyledLabel>
      <StyledValue>{value}</StyledValue>
    </StyledContainer>
  )
}

export default TicketPriceDetailsListItem;