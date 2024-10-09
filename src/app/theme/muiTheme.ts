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

const starJediHol = localFont({
  src: [
    {
      path: "../../../public/font/Starjhol.ttf",
    },
  ],
});

// const textLight = "#FFF";
// const textDark = "#000";

let theme = createTheme({
  palette: {
    primary: {
      main: "#ABC178",
    },
    secondary: {
      main: "#71E03B",
    },
    text: {
      light: "#FFF",
      dark: "#000",
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h1: {
      fontFamily: starJedi.style.fontFamily,
      fontSize: "3rem",
      color: theme.palette.text.light,
      textAlign: "center",
      lineHeight: "3.5rem",
    },
    body1: {
      fontFamily: starJedi.style.fontFamily,
      fontSize: "1rem",
      color: theme.palette.text.light,
      textAlign: "center",
      textTransform: "lowercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: starJedi.style.fontFamily,
          fontSize: "1.25rem",
          width: "15rem",
          "&:hover": {
            color: theme.palette.text.light,
          },
        },
      },
    },
  },
});

// Can the below be added into the above?

export const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
  fontSize: "1.125rem",
  width: "27rem",
  margin: "1.5rem",
  padding: "0.5rem",
  borderRadius: "0.5rem",

  "&:focus": {
    outline: "none",
    borderColor: theme.palette.secondary.main,
    boxShadow: `0 0 1.5rem 0.5rem ${theme.palette.secondary.main}`,
  },
}));

export default theme;
