import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ResponseProps } from "@/app/interfaces/ResponseProps";
import axios from "axios";

const Response: React.FC<ResponseProps> = ({ response }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const { data } = await axios.post("/api/playht", {
          text: response,
          voice:
            "s3://voice-cloning-zero-shot/34070329-d070-4390-b9c3-239a5504d31b/original/manifest.json",
          output_format: "mp3",
          voice_engine: "PlayHT2.0",
        });

        setAudioUrl(data.audioUrl);
      } catch (error) {
        console.error("Error fetching audio from Play.ht:", error);
      }
    };

    if (response) {
      fetchAudio();
    }
  }, [response]);

  console.log(audioUrl);

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
        {response}
      </Typography>
    </Box>
  );
};

export default Response;
