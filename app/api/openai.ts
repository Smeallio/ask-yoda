import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Please provide a prompt" });
  }

  try {
    // console.log("Sending request to Open API with prompt: ", prompt);

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        max_tokens: 75,
        temperature: 0.5,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant who replies to people in a way that resembles the character Yoda from Star Wars",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.status(200).json({ result: response.data.choices[0].message.content });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response: ", error.response?.data);
      res
        .status(error.response?.status || 500)
        .json({ error: error.response?.data || "An unknown error occurred" });
    } else {
      console.error("Unexpected error: ", error);
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export default handler;
