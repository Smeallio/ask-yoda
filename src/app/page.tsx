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
          display="flex"
          alignItems="center"
          margin="0 auto"
          maxWidth={1000}
          zIndex={2}
          sx={{
            backgroundImage: "url(/images/dagobah.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            border: 3,
            borderColor: "white",
            borderRadius: "5rem",
            padding: "3rem 5rem 0",
          }}
        >
          {!responseData ? (
            <>
              <Header />
              <Form onReceiveResponse={handleResponse} />
            </>
          ) : (
            <Response yodaResponseText={responseData} />
          )}
        </Stack>
      </main>
    </Layout>
  );
};

export default HomePage;
