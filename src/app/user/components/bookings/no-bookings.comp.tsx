import Header from "components/header.comp";
import Message from "components/message.comp";
import { FC } from "react";

interface NoBookingsProps {
  title: string;
  text?: string;
}

const NoBookings: FC<NoBookingsProps> = (props) => {
  return (
    <>
      <Message {...props} />
    </>
  );
};

export default NoBookings;
