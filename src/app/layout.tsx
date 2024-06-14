import { ReactNode } from "react";
import { Container, Box } from "@mui/material";
import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/muiTheme";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Yoda Translator",
  description: "Enter some text and we'll repeat that back to you in Yoda",
  icons: {
    icon: "/favicon.ico",
  },
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <Box
            component={"section"}
            sx={{
              minHeight: "100vh",
              minWidth: "100vw",
              display: "flex",
              justifyContent: "center",
              backgroundImage: "url(/images/dagobah.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                zIndex: 1,
              }}
            />
            <Container maxWidth={false}>{children}</Container>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
