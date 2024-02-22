import { ChangeEvent } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { sendMessage } from "../store/chat.actions";
import { useState } from "react";
import { Message } from "aviatickets-submodule/libs/socket/types/message";
import { useForm } from "react-hook-form";
import { chatSelector } from "../store/chat.selectors";
import { authSelector } from "aviatickets-submodule/auth/store/auth.selector";

type Props = {};

export default function MessageInput({}: Props) {
  const dispatch = useAppDispatch();
  const { name, id } = useAppSelector(authSelector);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ text: string }>({
    mode: "onBlur",
    defaultValues: { text: "" },
  });

  const handleSendMessage = (values: { text: string }) => {
    const message: Message = {
      text: values.text,
      sender: id,
      senderName: name,
      reciever: "Sales",
      recieverName: "Sales",
      time: Date.now(),
    };
    dispatch(sendMessage(message));
    reset();
  };

  return (
    <Box
      sx={{
        display: "flex",
        borderTop: "2px solid",
        borderColor: "#858585",
      }}
    >
      <form
        style={{ width: "100%", display: "flex" }}
        onSubmit={handleSubmit(handleSendMessage)}
      >
        <InputBase
          {...register("text")}
          placeholder="Message"
          sx={{
            flexBasis: "100%",
          }}
        />
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </form>
    </Box>
  );
}
