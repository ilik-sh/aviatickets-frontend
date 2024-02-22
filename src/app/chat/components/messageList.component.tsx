import { Paper } from "@mui/material";
import { Message } from "aviatickets-submodule/libs/socket/types/message";
import MessageItem from "./messageItem.component";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { chatSelector } from "../store/chat.selectors";

type Props = {};

export default function MessageList({}: Props) {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector(chatSelector);
  return (
    <Paper
      square
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flexGrow: "10",
        padding: "10px",
        gap: "10px",
        overflowY: "scroll",
      }}
    >
      {messages.map((message, index) => {
        return <MessageItem key={index} message={message}></MessageItem>;
      })}
    </Paper>
  );
}
