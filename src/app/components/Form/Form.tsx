"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import { StyledTextArea } from "@/app/theme/muiTheme";
import axios from "axios";

const Form: React.FC = () => {
  const [formText, setFormText] = useState("");
  const [response, setResponse] = useState("");

  console.log(formText);
  console.log(response);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      console.log("Sending request to /api/openai with prompt:", formText);
      const res = await axios.post("/api/openai", { prompt: formText });
      console.log("Received response from /api/openai:", res.data);
      setResponse(res.data.result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error: ", error.response?.data);
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <StyledTextArea
        minRows={3}
        maxRows={3}
        placeholder={"What you want to say, please tell me?"}
        value={formText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setFormText(e.target.value)
        }
      ></StyledTextArea>
      <Button type="submit" variant="contained" color="primary">
        Translate
      </Button>

      {response && (
        <Box mt={2}>
          <h2>Response:</h2>

          <p>{response}</p>
        </Box>
      )}
    </Box>
  );
};

export default Form;
