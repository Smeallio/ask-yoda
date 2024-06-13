"use client";

import { createTheme, lineHeight, textAlign } from "@mui/system";
import localFont from "@next/font/local";
import { text } from "stream/consumers";

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
  },
});

export default theme;
