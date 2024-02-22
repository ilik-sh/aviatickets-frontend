import { Message } from "aviatickets-submodule/libs/socket/types/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { socketClient } from "index";

export const connectToSocket = createAsyncThunk(
  "connectToSocket",
  async function () {
    return await socketClient.connect();
  }
);

export const disconnectFromSocket = createAsyncThunk(
  "disconnectFromSocket",

  async function () {
    return await socketClient.disconnect();
  }
);

export const sendMessage = createAsyncThunk(
  "sendMessage",
  async function (message: Message) {
    return await socketClient.emit("sendMessage", message);
  }
);

export const getMessageHistory = createAsyncThunk(
  "getMessageHistory",
  async function (_, { dispatch }) {
    return await socketClient.on("messageHistory", (messages: Message[]) => {
      dispatch({
        type: "chat/saveMessages",
        payload: { messages },
      });
    });
  }
);

export const recieveMessage = createAsyncThunk(
  "recieveMessage",
  async function (_, { getState, dispatch }) {
    return await socketClient.on("newMessage", (receivedMessage: Message) => {
      dispatch({
        type: "chat/saveRecievedMessage",
        payload: { message: receivedMessage },
      });
    });
  }
);
