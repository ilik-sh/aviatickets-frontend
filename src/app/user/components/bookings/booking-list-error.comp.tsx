import Header from "components/header.comp";
import Message from "components/message.comp";

const BookingListError = () => {
  return (
    <>
      <Message title="Failed to get bookings" text="Please, try again later" />
    </>
  );
};

export default BookingListError;
