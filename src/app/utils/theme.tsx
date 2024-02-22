import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    // background: {
    //   default: '#f6f7f9'
    // },
    // primary: {
    //   light: "#757ce8",
    //   main: "#58a7ff",
    //   dark: "#002884",
    //   contrastText: "#fff",
    // },
    // secondary: {
    //   light: "#ff7961",
    //   main: "#f44336",
    //   dark: "#ba000d",
    //   contrastText: "#000",
    // },
  },
  components: {
    MuiButton: {
      // styleOverrides: {
      //   root: {
      //     borderRadius: "20px",
      //     textTransform: "none",
      //   },
      // },
    },
  },
});

export default responsiveFontSizes(theme);
