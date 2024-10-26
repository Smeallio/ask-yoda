import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ResponseProps } from "@/app/interfaces/ResponseProps";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import axios from "axios";

const Response: React.FC<ResponseProps> = ({
  yodaResponseText,
  setResponseData,
}) => {
  const [audioResponse, setAudioResponse] = useState<string | undefined>(
    undefined
  );
  const [audioResponseUrl, setAudioResponseUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const startAudioGeneration = async (text: string) => {
    try {
      setLoading(true);
      console.log("Starting audio generation...");
      const { data } = await axios.post("/api/playht", {
        text,
        voice:
          "s3://voice-cloning-zero-shot/565f48a1-c14b-4d9a-85c3-1fa33f337afe/original/manifest.json",
        output_format: "mp3",
        voice_engine: "PlayHT2.0",
        speed: 0.8,
      });

      console.log(data);
      setAudioResponse(data);
    } catch (error) {
      console.error("Error starting audio generation:", error);
      setLoading(false);
    }
  };

  const getUrlFromResponse = (
    response: string,
    currentUrl: string | null
  ): string | null => {
    try {
      const lines = response.split("\n");
      for (const line of lines) {
        if (line.startsWith("data:")) {
          const trimmedLine = line.replace("data: ", "");
          try {
            const data = JSON.parse(trimmedLine);
            console.log(data);
            if (data.stage === "complete") {
              return data.url;
            }
          } catch (jsonError) {
            console.log("Non-JSON data received: ", trimmedLine);
          }
        }
      }
    } catch (error) {
      console.error("Error parsing response:", error);
    }
    return currentUrl;
  };

  useEffect(() => {
    if (yodaResponseText) {
      startAudioGeneration(yodaResponseText);
    }
  }, [yodaResponseText]);

  useEffect(() => {
    if (audioResponse) {
      const url = getUrlFromResponse(audioResponse, audioResponseUrl);
      setAudioResponseUrl(url);
    }
  }, [audioResponse]);

  useEffect(() => {
    if (audioResponseUrl) {
      setLoading(false);
    }
  }, [audioResponseUrl]);

  console.log("Yoda Response Text: ", yodaResponseText);
  console.log(audioResponse);
  console.log(audioResponseUrl);
  console.log("hello");

  return (
    <Box display="flex" flexDirection="column" sx={{ maxWidth: "30rem" }}>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <Typography
            variant="body1"
            sx={{
              backgroundColor: "white",
              color: "black",
              padding: "1rem",
              borderRadius: "0.5rem",
              display: "inline-block",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "25%",
                width: 0,
                height: 0,
                border: "3rem solid transparent",
                borderRightColor: "white",
                borderTopLeftRadius: "15%",
                borderLeft: 0,
                borderTop: 0,
                marginTop: 0,
                marginLeft: "-3rem",
              },
            }}
          >
            {yodaResponseText}
          </Typography>
          <Box my={4}>
            {audioResponseUrl && (
              <audio controls style={{ width: "100%", height: "40px" }}>
                <source src={audioResponseUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", width: "30rem" }}
            onClick={() => setResponseData(null)}
          >
            ask another question{" "}
          </Button>
        </>
      )}
    </Box>
  );
};

export default Response;
