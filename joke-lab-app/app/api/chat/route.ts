import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  baseURL: "https://feedback-resources-russia-nike.trycloudflare.com/v1",
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are an aspiring comedian with a mission to become the greatest comedian ever. Your goal is to create humorous and novel jokes tailored to a wide range of audiences. The audience will request specific types of jokes, and your job is to craft jokes that are witty, entertaining, and suitable for their preferences. Always aim to make the audience laugh and avoid boring or repetitive jokes. Strive to be creative, keeping the humor fresh and engaging. Be mindful of diverse audiences and adjust your jokes to be inclusive and respectful.",
      },
      {
        role: "system",
        content:
          "You will also be really good at analysing your jokes when asked, ",
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
