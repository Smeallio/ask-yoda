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
  const [responseData, setResponseData] = useState<string>("");

  useEffect(() => {
    // Check if the cookie is already set; if not, initialize it to 0
    if (!Cookies.get("question_count")) {
      Cookies.set("question_count", "0", { expires: 1 }); // Initialize to 0
    }
  }, []);

  const handleFormSubmit = async (prompt: string) => {
    // Set max question count per day to 3
    const questionCount = parseInt(Cookies.get("question_count") || "0", 10);
    if (questionCount >= 3) {
      setResponseData(
        "Nosy, you are. Many questions, you ask. Old and weary, Yoda grows. Answer more, I will, tomorrow perhaps."
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
      // First API call to OpenAI
      const openAiResponse = await axios.post("/api/openai", { prompt });
      const yodaResponseText = openAiResponse.data.result;
      setResponseData(yodaResponseText);
      setTextLoading(false);
    } catch (error) {
      console.error("Error during API calls:", error);
    }
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
                resetData={() => {
                  setResponseData("");
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
