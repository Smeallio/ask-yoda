"use client";

import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Layout from "./layout";
import Form from "./components/Form/Form";
import Response from "./components/Response/Response";
import LoadingSkeleton from "./components/LoadingSkeleton/LoadingSkeleton";
import axios from "axios";
import "./globals.scss";

const HomePage: React.FC = () => {
  const [responseData, setResponseData] = useState<string | null>(null);
  const [audioResponseUrl, setAudioResponseUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFormSubmit = async (prompt: string) => {
    setLoading(true);
    try {
      // First API call to OpenAI
      const openAiResponse = await axios.post("/api/openai", { prompt });
      const yodaResponseText = openAiResponse.data.result;
      setResponseData(yodaResponseText);

      // Second API call to PlayHT
      const playHtResponse = await axios.post("/api/playht", {
        text: yodaResponseText,
        voice:
          "s3://voice-cloning-zero-shot/565f48a1-c14b-4d9a-85c3-1fa33f337afe/original/manifest.json",
        output_format: "mp3",
        voice_engine: "PlayHT2.0",
        speed: 0.8,
      });

      // Extracting URL from PlayHT response
      console.log(playHtResponse.data);
      const audioUrl = getUrlFromResponse(playHtResponse.data);
      setAudioResponseUrl(audioUrl);
    } catch (error) {
      console.error("Error during API calls:", error);
    } finally {
      setLoading(false); // End loading after both API calls are complete
    }
  };

  const getUrlFromResponse = (response: string): string | null => {
    try {
      const lines = response.split("\n");
      for (const line of lines) {
        if (line.startsWith("data:")) {
          const trimmedLine = line.replace("data: ", "");
          const data = JSON.parse(trimmedLine);
          if (data.stage === "complete") {
            return data.url;
          }
        }
      }
    } catch (error) {
      console.error("Error parsing response:", error);
    }
    return null;
  };

  // const handleResponse = (data: string) => {
  //   setResponseData(data);
  // };

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
            {loading ? (
              <LoadingSkeleton />
            ) : !responseData ? (
              <Form onFormSubmit={handleFormSubmit} />
            ) : (
              <Response
                yodaResponseText={responseData}
                audioResponseUrl={audioResponseUrl}
                resetData={() => {
                  setResponseData(null);
                  setAudioResponseUrl(null);
                }}
              />
            )}
          </Box>
        </Stack>
      </main>
    </Layout>
  );
};

export default HomePage;
