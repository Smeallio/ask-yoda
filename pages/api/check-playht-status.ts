import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id } = req.query;

  const apiKey = process.env.PLAYHT_API_KEY;
  const userId = process.env.PLAYHT_USER_ID;

  try {
    const response = await axios.get(
      `https://api.play.ht/api/v2/status/${id}`,
      {
        headers: {
          accept: "application/json",
          AUTHORIZATION: apiKey,
          "X-USER-ID": userId,
        },
      }
    );

    if (response.data.status === "complete") {
      res.status(200).json({ url: response.data.url });
    } else {
      res.status(200).json({ status: response.data.status });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to check audio status" });
  }
};
