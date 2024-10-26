"use client";

import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Layout from "./layout";
import Form from "./components/Form/Form";
import Response from "./components/Response/Response";
import "./globals.scss";

const HomePage: React.FC = () => {
  const [responseData, setResponseData] = useState<string | null>(null);

  const handleResponse = (data: string) => {
    console.log("Data received:", data);
    setResponseData(data);
  };

  console.log(responseData); //REMOVE ME

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
          <Typography
            variant="h1"
            sx={{
              textTransform: "none",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "1.25rem 2.5rem",
              borderRadius: "2rem",
            }}
          >
            want to ask&#8202;, what do you?
          </Typography>
          <Box display="flex" alignItems="center" sx={{ width: "80%" }}>
            <Box
              component="img"
              src="../images/yoda-glow.png"
              alt="YODA"
              position="relative"
              width="35%"
              height="auto"
              mt={2}
              mr={4}
              flexShrink={0}
            />
            {!responseData ? (
              <Form onReceiveResponse={handleResponse} />
            ) : (
              <Response
                yodaResponseText={responseData}
                setResponseData={setResponseData}
              />
            )}
          </Box>
        </Stack>
      </main>
    </Layout>
  );
};

export default HomePage;
