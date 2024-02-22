import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import {
  connectToSocket,
  disconnectFromSocket,
} from "app/chat/store/chat.actions";
import { chatSelector } from "app/chat/store/chat.selectors";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./app.routes";
import ErrorBoundaryComp from "./components/error-boundary.comp";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "app/utils/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalStorageKeys } from "enums/local-storage-keys.enum";

function App() {
  return (
    <ErrorBoundaryComp>
      <SnackbarProvider
        maxSnack={5}
        autoHideDuration={5000}
        style={{ fontSize: "16px" }}
      >
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Router>
              <CssBaseline />
              <AppRoutes />
            </Router>
          </LocalizationProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </ErrorBoundaryComp>
  );
}

export default App;
