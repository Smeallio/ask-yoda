"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import { StyledTextArea } from "@/app/theme/muiTheme";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { FormProps } from "@/app/interfaces/FormProps";

const Form: React.FC<FormProps> = ({ onFormSubmit }) => {
  const [formText, setFormText] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFormSubmit(formText);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      color="white"
      width="100%"
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
        sx={{
          textTransform: "none",
          width: { xs: "100%", md: "25rem", lg: "30rem" },
        }}
      >
        ask yoda{" "}
      </Button>
    </Box>
  );
};

export default Form;
