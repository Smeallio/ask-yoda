"use client";

import { createTheme, styled } from "@mui/material/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import localFont from "next/font/local";

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
    body1: {
      fontFamily: starJedi.style.fontFamily,
      fontSize: "1rem",
      color: "#FFF",
      textAlign: "center",
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: starJedi.style.fontFamily,
          fontSize: "1.25rem",
          width: "15rem",
          "&:hover": {
            color: "white",
          },
        },
      },
    },
  },
});

// Can the below be added into the above? 

export const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
  width: "25rem",
  margin: "1.5rem",
  padding: "0.5rem",
  borderRadius: "0.5rem",
}));

export default theme;
