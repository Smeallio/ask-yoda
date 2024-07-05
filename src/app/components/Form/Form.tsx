"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { StyledTextArea } from "@/app/theme/muiTheme";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import axios from "axios";

const Form: React.FC = () => {
  const [formText, setFormText] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/openai", { prompt: formText });
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
        placeholder={"What you want to ask, please tell me?"}
        value={formText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setFormText(e.target.value)
        }
      ></StyledTextArea>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<QuestionAnswerOutlinedIcon />}
        sx={{ textTransform: "none" }}
      >
        ASK YoDA
      </Button>
      {response && (
        <Box mt={2} color={"white"}>
          <Typography variant="body1">{response}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Form;
