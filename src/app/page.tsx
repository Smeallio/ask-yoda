"use client";

import { useState } from "react";
import { Stack } from "@mui/material";
import Layout from "./layout";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Response from "./components/Response/Response";
import "./globals.scss";

const HomePage: React.FC = () => {
  const [responseData, setResponseData] = useState<string | null>(null);

  const handleResponse = (data: string) => {
    setResponseData(data);
  };

  console.log(responseData);

  return (
      <Layout>
        <main className="main">
          <Stack
            display={"flex"}
            alignItems={"center"}
            maxWidth={600}
            zIndex={2}
          >
            <Header />
            <Form onReceiveResponse={handleResponse} />
            {responseData && <Response response={responseData} />}
          </Stack>
        </main>
      </Layout>
  );
};

export default HomePage;
