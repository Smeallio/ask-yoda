import Layout from "./layout";
import { Typography } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <main>
        <Typography variant="h1" color="secondary">
          Hello, world!
        </Typography>
      </main>
    </Layout>
  );
};

export default HomePage;
