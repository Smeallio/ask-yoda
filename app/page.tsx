"use client";

import { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Form from "./components/Form/Form";
import Response from "./components/Response/Response";
import LoadingSkeleton from "./components/LoadingSkeleton/LoadingSkeleton";
import axios from "axios";
import Cookies from "js-cookie";

const HomePage: React.FC = () => {
  const [textLoading, setTextLoading] = useState<boolean>(false);
  const [audioLoading, setAudioLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<string>("");
  const [audioResponseUrl, setAudioResponseUrl] = useState<string | null>("");
  const [showTextOnly, setShowTextOnly] = useState<boolean>(false);

  useEffect(() => {
    // Check if the cookie is already set; if not, initialize it to 0
    if (!Cookies.get("question_count")) {
      Cookies.set("question_count", "0", { expires: 1 }); // Initialize to 0
    }
  }, []);

  const handleFormSubmit = async (prompt: string) => {
    const questionCount = parseInt(Cookies.get("question_count") || "0", 10);

    console.log("Question count: ", questionCount);

    if (questionCount >= 3) {
      setResponseData(
        "Nosy, you are. Many questions, you ask. Old and weary, Yoda grows. Answer more, I will, tomorrow perhaps."
      );
      setAudioResponseUrl(
        "https://peregrine-results.s3.amazonaws.com/pigeon/Dlvkc2GyztgdhTmtZ2_0.mp3"
      );
      return;
    }

    setTextLoading(true);
    try {
      // Increment question count and set it in the cookie with 24-hour expiration
      const newQuestionCount = questionCount + 1;
      Cookies.set("question_count", newQuestionCount.toString(), {
        expires: 1, // 1 day
      });
      console.log("Cookie set:", Cookies.get("question_count")); // Check cookie value

      // First API call to OpenAI
      const openAiResponse = await axios.post("/api/openai", { prompt });
      const yodaResponseText = openAiResponse.data.result;
      console.log(yodaResponseText);
      setResponseData(yodaResponseText);
      setTextLoading(false);
      setAudioLoading(true);

      // Start a timeout to display text only if audio is delayed
      const timeoutId = setTimeout(() => {
        setShowTextOnly(true);
        console.log("Time out started: ", timeoutId);
      }, 60000); // 60-second delay before showing text-only fallback

      // Second API call to PlayHT
      const playHtResponse = await axios.post("/api/playht", {
        text: yodaResponseText,
        voice:
          "s3://voice-cloning-zero-shot/37499fc2-c2c8-490f-a3f7-de463d72216a/original/manifest.json",
        output_format: "mp3",
        voice_engine: "PlayHT2.0",
        speed: 0.8,
      });

      // Extract URL from PlayHT response
      console.log(playHtResponse.data);
      const audioUrl = getUrlFromResponse(playHtResponse.data);
      setAudioResponseUrl(audioUrl);
      setAudioLoading(false);

      // Clear the timeout if the audio URL is received before 30 seconds
      if (audioUrl) {
        clearTimeout(timeoutId);
        setShowTextOnly(false); // Reset the text-only flag if audio URL arrives
        console.log("Time out cleared: ", timeoutId);
      }
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
          padding: { xs: "2rem 2rem 0", md: "3rem 5rem 0" },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textTransform: "none",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            padding: "1.25rem 2.5rem",
            borderRadius: "2rem",
          }}
        >
          want to ask&#8202;, what do you?
        </Typography>
        <Grid
          container
          direction={{ xs: "column-reverse", md: "row" }}
          wrap="nowrap"
          alignItems="center"
          justifyContent="flex-start"
          width="100%"
          maxWidth={{ xs: "32rem", md: "none" }}
        >
          <Grid
            item
            display="flex"
            justifyContent={{ xs: "center", md: "flex-end" }}
            alignItems="flex-end"
            width={{ xs: "80%", md: "40%" }}
          >
            <Box
              component="img"
              src="../images/yoda-glow.png"
              alt="YODA"
              position="relative"
              maxHeight={{
                xs: "15rem",
                sm: "20rem",
                md: "22.5rem",
                lg: "25rem",
              }}
              mt={2}
              mr={{ xs: 0, md: 4 }}
              flexShrink={0}
            />
          </Grid>
          <Grid
            item
            display="flex"
            justifyContent="center"
            width={{ xs: "100%", md: "50%" }}
          >
            {textLoading ? (
              <LoadingSkeleton
                width={100}
                height={10}
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
          </Grid>
        </Grid>
      </Stack>
    </main>
  );
};

export default HomePage;
