import { Tab, Tabs } from "@mui/material";
import { FC } from "react";

interface BookingTabsProps {
  activeTabIndex: number;
}

export const BookingTabs: FC<BookingTabsProps> = ({ activeTabIndex }) => {
  return (
    <Tabs value={activeTabIndex} >
      <Tab label='Passenger Info' />
      <Tab label='Payment' />
    </Tabs>
  )
};

export default BookingTabs;

