import { Container, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/muiTheme";
import { LayoutProps } from "./interfaces/LayoutProps";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Ask Yoda</title>
        <meta
          name="description"
          content="Got a question on your mind? Why not ask the wise and powerful Yoda for some advice?"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <Box
            component={"section"}
            className="test"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              height: "100%",
              minHeight: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.25)",
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
