"use client";

import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Form from "./components/Form/Form";
import Response from "./components/Response/Response";
import LoadingSkeleton from "./components/LoadingSkeleton/LoadingSkeleton";
import axios from "axios";
import "./globals.scss";

const HomePage: React.FC = () => {
  const [textLoading, setTextLoading] = useState<boolean>(false);
  const [audioLoading, setAudioLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<string>("");
  const [audioResponseUrl, setAudioResponseUrl] = useState<string | null>("");
  const [showTextOnly, setShowTextOnly] = useState<boolean>(false);

  const handleFormSubmit = async (prompt: string) => {
    setTextLoading(true);
    try {
      // First API call to OpenAI
      const openAiResponse = await axios.post("/api/openai", { prompt });
      const yodaResponseText = openAiResponse.data.result;
      setResponseData(yodaResponseText);
      setTextLoading(false);
      setAudioLoading(true);

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
      setAudioLoading(false);

      // // Start a timeout to display text only if audio is delayed
      // setTimeout(() => {
      //   if (!audioResponseUrl) {
      //     setShowTextOnly(true);
      //   }
      // }, 30000); // 30-second delay before showing text-only fallback
    } catch (error) {
      console.error("Error during API calls:", error);
    }
  };

  const getUrlFromResponse = (response: string): string | null => {
    try {
      const lines = response.split("\n");
      for (const line of lines) {
        // Process only lines with "data: "
        if (line.startsWith("data:")) {
          const trimmedLine = line.replace("data: ", "").trim();

          // Skip if trimmedLine is not valid JSON (e.g., ping events)
          if (!trimmedLine.startsWith("{")) continue;

          const data = JSON.parse(trimmedLine);
          console.log(data);
          // Check for stage "complete" and return the URL
          if (data.stage === "complete" && data.url) {
            return data.url;
          }
        }
      }
    } catch (error) {
      console.error("Error parsing response:", error);
    }
    return null;
  };

  console.log(responseData);
  console.log(audioResponseUrl);
  console.log(showTextOnly);

  return (
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
          {textLoading ? (
            <LoadingSkeleton
              width="30rem"
              height="15rem"
              message="Yoda is thinking..."
            />
          ) : responseData ? (
            <Response
              yodaResponseText={responseData}
              audioLoading={audioLoading}
              audioResponseUrl={showTextOnly ? null : audioResponseUrl}
              resetData={() => {
                setResponseData("");
                setAudioResponseUrl(null);
                setShowTextOnly(false);
              }}
            />
          ) : (
            <Form onFormSubmit={handleFormSubmit} />
          )}
        </Box>
      </Stack>
    </main>
  );
};

export default HomePage;
