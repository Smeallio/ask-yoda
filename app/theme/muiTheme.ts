"use client";

import { createTheme, styled } from "@mui/material/styles";
import { Skeleton, TextareaAutosize, Typography } from "@mui/material";
import { borderBottom, borderRightColor, keyframes } from "@mui/system";
import localFont from "next/font/local";

const starJedi = localFont({
  src: [
    {
      path: "../../public/font/Starjedi.ttf",
    },
  ],
});

let theme = createTheme({
  palette: {
    primary: {
      main: "#ABC178",
    },
    secondary: {
      main: "#71E03B",
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h1: {
      fontFamily: starJedi.style.fontFamily,
      fontSize: "3rem",
      color: "#FFF",
      textAlign: "center",
      lineHeight: "3.75rem",
      [theme.breakpoints.down("lg")]: {
        fontSize: "2.25rem",
        lineHeight: "2.75rem",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1.75rem",
        lineHeight: "2.25rem",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.25rem",
        lineHeight: "1.5rem",
      },
    },
    body1: {
      fontFamily: starJedi.style.fontFamily,
      fontSize: "1rem",
      color: "#FFF",
      textAlign: "center",
      textTransform: "lowercase",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75rem",
        lineHeight: "1.125rem",
      },
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
            color: "#FFF",
          },
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          [theme.breakpoints.down("sm")]: {
            fontSize: "1rem",
          },
        },
      },
    },
  },
});

// Can the below be added into the above?

export const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
  boxSizing: "border-box",
  fontSize: "1.125rem",
  width: "30rem",
  margin: "1.5rem 0rem",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.secondary.main,
    boxShadow: `0 0 1.5rem 0.5rem ${theme.palette.secondary.main}`,
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.9325rem",
    width: "25rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.9325rem",
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
    width: "100%",
  },
}));

export const StyledSpeechBubble = styled(Typography)(({ theme }) => ({
  backgroundColor: "white",
  color: "black",
  padding: "1rem",
  borderRadius: "0.5rem",
  display: "inline-block",
  position: "relative",
  marginTop: "2rem",
  marginBottom: 0,
  "&::after": {
    content: '""',
    position: "absolute",
    left: "60%",
    bottom: "-2rem",
    width: 0,
    height: 0,
    border: "2rem solid transparent",
    borderTop: "1rem solid transparent",
    borderBottom: "1rem solid transparent",
    borderTopColor: "white",
  },
  [theme.breakpoints.up("md")]: {
    position: "relative",
    marginTop: 0,
    marginBottom: "2rem",
    "&::after": {
      content: '""',
      position: "absolute",
      left: "-2rem",
      top: "20%",
      width: 0,
      height: 0,
      border: "2rem solid transparent",
      borderTop: "1rem solid transparent",
      borderBottom: "1rem solid transparent",
      borderRightColor: "white",
      borderLeft: 0,
    },
  },
}));

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export const StyledLoadingSkeleton = styled(Skeleton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "0.5rem",
  animation: `${pulse} 2s infinite`,
}));

export default theme;
