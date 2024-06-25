import Layout from "./layout";
import Header from "./components/Header/Header"
import Form from "./components/Form/Form";
import { Stack } from "@mui/material";
import "./globals.scss";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <main className="main">
        <Stack display={"flex"} alignItems={"center"} maxWidth={500} zIndex={2}>
          <Header />
          <Form />
        </Stack>
      </main>
    </Layout>
  );
};

export default HomePage;
