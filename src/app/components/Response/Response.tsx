import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ResponseProps } from "@/app/interfaces/ResponseProps";
import axios from "axios";

const Response: React.FC<ResponseProps> = ({ yodaResponseText }) => {
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [requestId, setRequestId] = useState<string | null>(null);

  const startAudioGeneration = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/playht", {
        text: yodaResponseText,
        voice:
          "s3://voice-cloning-zero-shot/34070329-d070-4390-b9c3-239a5504d31b/original/manifest.json",
        output_format: "mp3",
        voice_engine: "PlayHT2.0",
      });

      console.log(data);

      setRequestId(data.id);
    } catch (error) {
      console.error("Error starting audio generation:", error);
      setLoading(false);
    }
  };

  const pollStatus = async (id: string) => {
    const interval = setInterval(async () => {
      try {
        const { data } = await axios.get(`/api/check-playht-status?id=${id}`);

        console.log("ping");

        if (data.url) {
          setAudioUrl(data.url);
          setLoading(false);
          clearInterval(interval);
        } else {
          console.log("Status: ", data.status);
        }
      } catch (error) {
        console.error("error polling status: ", error);
        clearInterval(interval);
      }
    }, 3000);
  };

  useEffect(() => {
    startAudioGeneration();
  }, [yodaResponseText]);

  useEffect(() => {
    if (requestId) {
      pollStatus(requestId);
    }
  }, [requestId]);

  console.log(requestId);

  return (
    <Box display="flex" alignItems="center" mt={2} color={"white"}>
      <Box
        component="img"
        src="../images/yoda-glow.png"
        alt="YODA"
        position="relative"
        bottom="0"
        width="50%"
        height="auto"
        mt={2}
        mr={4}
        flexShrink={0}
      />
      <Typography
        variant="body1"
        sx={{
          backgroundColor: "white",
          color: "black",
          padding: "1rem",
          borderRadius: "10px",
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
      {loading ? (
        <p>Loading audio....</p>
      ) : ( 
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      )}
    </Box>
  );
};

export default Response;
