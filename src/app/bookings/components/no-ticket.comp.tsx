import Message from "components/message.comp";
import { FC } from "react";

const NoTicket: FC = () => {
  return <Message
    title="The ticket isn't available to book"
  />
}

export default NoTicket;