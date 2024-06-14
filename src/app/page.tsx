import Layout from "./layout";
import Form from "./components/Form/Form";
import { Box, Stack, Typography } from "@mui/material";
import "./globals.scss";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <main className="main">
        <Stack display={"flex"} alignItems={"center"} maxWidth={500} zIndex={2}>
          <Typography variant="h1" color="secondary">
            You want to say, what do?
          </Typography>
          <Box
            component="img"
            src="../images/yoda-circle.png"
            alt="YODA"
            sx={{ width: "50%", height: "auto", marginTop: 2 }}
          />
          <Form />
        </Stack>
      </main>
    </Layout>
  );
};

export default HomePage;
