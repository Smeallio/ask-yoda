"use client";

import { createTheme } from "@mui/material/styles";
import localFont from "@next/font/local";

const starJedi = localFont({
  src: [
    {
      path: "../../../public/font/Starjedi.ttf",
    },
  ],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#ABC178",
    },
    secondary: {
      main: "#FFF",
    },
  },
  typography: {
    h1: {
      fontFamily: starJedi.style.fontFamily,
      fontSize: "3rem",
      color: "#FFF",
      textAlign: "center",
      lineHeight: "3.5rem",
    },
    button: {
        fontFamily: starJedi.style.fontFamily,
    }
  }
});

export default theme;
