import { Container, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/muiTheme";
import { LayoutProps } from "./interfaces/LayoutProps";
import "./globals.scss";

// export const metadata = {
//   title: "Yoda Translator",
//   description: "Enter some text and we'll repeat that back to you in Yoda",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        {" "}
        <title>Yoda Translator</title>
        <meta
          name="description"
          content="Enter some text and we'll repeat that back to you in Yoda"
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
              // minHeight: "100vh",
              // minWidth: "100vw",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // position: "absolute",
              // top: 0,
              // left: 0,
              width: "100%",
              height: "100vh",
              // maxHeight: "100vh",
              // backgroundImage: "url(/images/dagobah.jpeg)",
              // backgroundSize: "cover",
              // backgroundPosition: "center center",
              // backgroundRepeat: "no-repeat",
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              // backgroundBlendMode: "multiply",
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
