import { Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { useEffect } from "react";
import {
  connectToSocket,
  disconnectFromSocket,
  getMessageHistory,
  recieveMessage,
} from "../store/chat.actions";
import { chatSelector } from "../store/chat.selectors";
import ChatHeader from "./chatHeader.component";
import MessageInput from "./messageInput.component";
import MessageList from "./messageList.component";
import { LocalStorageKeys } from "enums/local-storage-keys.enum";

type Props = {
  handleClick: () => void;
};

export default function Chat({ handleClick }: Props) {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(chatSelector);
  useEffect(() => {
    dispatch(connectToSocket());

    return () => {
      if (chat.connected === true) {
        dispatch(disconnectFromSocket());
      }
    };
  }, [dispatch]);
  useEffect(() => {
    console.log("listeners mounted");
    dispatch(recieveMessage());
    dispatch(getMessageHistory());
  }, [dispatch]);
  return (
    <div
      style={{
        width: "min(100%, 300px)",
        height: "min(100%, 500px)",
        position: "fixed",
        bottom: 0,
        right: "0",
        left: "auto",
        display: "flex",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "transparent",
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <ChatHeader handleClick={handleClick}></ChatHeader>
        <MessageList></MessageList>
        <MessageInput></MessageInput>
      </Paper>
    </div>
  );
}
