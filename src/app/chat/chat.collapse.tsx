import Chat from "./components/chat.component";
import { useState } from "react";
import CollapseButton from "./components/collapseButton.component";

type Props = {};

export default function ChatCollapse({}: Props) {
  const [maximized, setMaximized] = useState(false);

  const handleClick = () => {
    setMaximized((prevMaximized) => !prevMaximized);
  };
  return (
    <div
      style={{
        position: "fixed",
        right: "1em",
        bottom: "1em",
        left: "auto",
      }}
    >
      <div>
        {maximized ? (
          <Chat handleClick={handleClick}></Chat>
        ) : (
          <CollapseButton handleClick={handleClick} />
        )}
      </div>
    </div>
  );
}
