import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Please provide a prompt" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
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
        max_tokens: 100,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        timeout: 10000,
      }
    );

    console.log(response.data);

    return NextResponse.json({
      result: response.data.choices[0].message.content,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response: ", error.response?.data);
      return NextResponse.json(
        { error: error.response?.data || "An unknown error occurred" },
        { status: error.response?.status || 500 }
      );
    } else {
      console.error("Unexpected error: ", error);
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
