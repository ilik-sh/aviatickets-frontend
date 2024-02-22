import { createRoot } from "react-dom/client";
import App from "App";
import "./index.css";
import store from "./store";
import { SocketClient } from "aviatickets-submodule/libs/socket/socket.client";
import { Provider } from "react-redux";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
const socketClient = new SocketClient();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

export { socketClient };
