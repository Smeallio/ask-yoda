import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "POST") {
    try {
      const { text, voice, output_format, voice_engine } = req.body;

      const response = await axios.post(
        "https://api.play.ht/api/v2/tts",
        { text, voice, output_format, voice_engine },
        {
          headers: {
            accept: "text/event-stream",
            "content-type": "application/json",
            AUTHORIZATION: process.env.PLAYHT_API_KEY,
            "X-USER-ID": process.env.PLAYHT_USER_ID,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error calling Play.ht API:",
          error?.response?.data || error.message
        );
        res.status(500).json({ error: "Failed to synthesize speech" });
      } else {
        console.error("Unexpected error: ", error);
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
