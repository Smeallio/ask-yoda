import { ReactNode } from "react";
import { Container, Box } from "@mui/material";
import type { Metadata } from "next";
import { ThemeProvider } from "@mui/system";
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
            sx={{
              minHeight: "100vh",
              minWidth: "100vw",
              display: "flex",
              backgroundImage: "url(/images/dagobah.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Container maxWidth={false}>{children}</Container>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
