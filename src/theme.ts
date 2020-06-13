import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#DB1544",
    },
    secondary: {
      main: "#250032",
    },
    background: {
      // paper: "#190022",
      // default: "#1C131F",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  overrides: {
    MuiButton: {
      contained: { boxShadow: "none" },
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      marginBottom: "24px",
    },
    h2: {
      fontSize: "1.5rem",
      marginBottom: "18px",
    },
    h3: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.3rem",
      lineHeight: "1.8rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: "1.6rem",
      maxWidth: "400px",
      marginBottom: "8px",
    },
    body2: {
      fontSize: "0.9rem",
      maxWidth: "400px",
    },
    button: {
      textTransform: "initial",
      fontWeight: 700,
    },
    caption: {
      lineHeight: "0.9rem",
      fontSize: "0.8rem",
      color: "#696969",
    },
  },
  shape: { borderRadius: 10 },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#DB1544",
    },
    secondary: {
      main: "#250032",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    h1: {
      fontSize: "3rem",
      marginBottom: "24px",
    },
    h2: {
      fontSize: "1.5rem",
      marginBottom: "18px",
    },
    h3: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.3rem",
      lineHeight: "1.8rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: "1.6rem",
      maxWidth: "400px",
      marginBottom: "8px",
    },
    body2: {
      fontSize: "0.9rem",
      maxWidth: "400px",
    },
    button: {
      textTransform: "initial",
      fontWeight: 500,
    },
    caption: {
      lineHeight: "0.9rem",
      fontSize: "0.8rem",
      color: "#696969",
    },
  },
  shape: { borderRadius: 10 },
});
