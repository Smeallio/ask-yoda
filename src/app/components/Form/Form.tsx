"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import { StyledTextArea } from "@/app/theme/muiTheme";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { FormProps } from "@/app/interfaces/FormProps";
import axios from "axios";

const Form: React.FC<FormProps> = ({ onReceiveResponse }) => {
  const [formText, setFormText] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/openai", { prompt: formText });
      onReceiveResponse(res.data.result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error: ", error.response?.data);
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };

  // console.log(response);

  return (
    <Box display="flex" alignItems="center" sx={{ width: "80%" }}>
      <Box
        component="img"
        src="../images/yoda-glow.png"
        alt="YODA"
        position="relative"
        bottom="0"
        width="35%"
        height="auto"
        mt={2}
        mr={4}
        flexShrink={0}
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={2}
        color="white"
      >
        <StyledTextArea
          minRows={5}
          maxRows={5}
          placeholder="Your question here, please type..."
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
          sx={{ textTransform: "none", width: "28rem" }}
        >
          ask yoda{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
