import { IconButton } from "@mui/material";
import React from "react";
import { Chat } from "@mui/icons-material";

type Props = {
  handleClick: () => void;
};

export default function CollapseButton({ handleClick }: Props) {
  return (
    <IconButton
      onClick={handleClick}
      sx={{
        backgroundColor: "#42a5f5",
        padding: "10px",
      }}
    >
      <Chat></Chat>
    </IconButton>
  );
}
