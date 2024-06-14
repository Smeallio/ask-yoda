"use client";

import { useState } from "react";
import { Box, Button, TextareaAutosize } from "@mui/material";
import axios from 'axios';

const Form: React.FC = () => {
  const [formText, setFormText] = useState("");

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
        const response = await axios.post(
            `/api?text=${formText}`, {
            headers: {
                "X-Funtranslations-Api-Secret": process.env.NEXT_PUBLIC_YODA_API_KEY,
            },
        })
        console.log(response.data);
    } catch (error) {
        console.log("Error: ", error) }
    };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      display={"flex"}
      flexDirection={"column"}
    >
      <TextareaAutosize
        minRows={3}
        maxRows={3}
        placeholder={"What do you want to say, please tell me?"}
        value={formText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormText(e.target.value)}
      ></TextareaAutosize>
      <Button type="submit" variant="contained" color="primary">Translate</Button>
    </Box>
  );
};

export default Form;
