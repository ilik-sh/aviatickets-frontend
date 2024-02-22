import { ChatState } from "../types/chat.state";
import { createSlice } from "@reduxjs/toolkit";
import { connectToSocket, disconnectFromSocket } from "./chat.actions";

const initialState: ChatState = {
  messages: [],
  connected: false,
  user: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveRecievedMessage(state, { payload }) {
      state.messages.push(payload.message);
    },
    setUser(state, { payload }) {
      state.user = payload.user;
    },
    saveMessages(state, { payload }) {
      state.messages = payload.messages;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectToSocket.fulfilled, (state) => {
      state.connected = true;
    });
    builder.addCase(connectToSocket.rejected, (state) => {
      state.connected = false;
    });
    builder.addCase(connectToSocket.pending, (state) => {
      state.connected = false;
    });
    builder.addCase(disconnectFromSocket.fulfilled, (state) => {
      state.connected = false;
    });
    builder.addCase(disconnectFromSocket.rejected, (state) => {
      state.connected = true;
    });
    builder.addCase(disconnectFromSocket.pending, (state) => {
      state.connected = true;
    });
  },
});

export const { saveRecievedMessage, setUser } = chatSlice.actions;

export default chatSlice.reducer;
