import { Message } from "aviatickets-submodule/libs/socket/types/message";
import { Paper, styled } from "@mui/material";
import { useAppSelector } from "hooks/redux.hooks";
import { authReducer } from "aviatickets-submodule/auth/store/auth.slice";
import { authSelector } from "aviatickets-submodule/auth/store/auth.selector";

type Props = {
  message: Message;
};

const FullWidth = styled("div")({
  width: "100%",
  display: "flex",
});

export default function MessageItem({ message }: Props) {
  return (
    <FullWidth
      style={
        message.sender !== "Sales"
          ? {
              flexDirection: "row-reverse",
            }
          : {
              flexDirection: "row",
            }
      }
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#42a5f5",
          justifyContent: "space-between",
          maxWidth: "80%",
          padding: "5px",
        }}
      >
        <span>{message.text}</span>
      </Paper>
    </FullWidth>
  );
}
