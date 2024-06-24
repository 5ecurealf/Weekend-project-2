import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  baseURL: "https://feedback-resources-russia-nike.trycloudflare.com/v1",
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { joke } = await req.json();

  // Evaluate the joke
  const evaluationResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are an AI designed to evaluate jokes based on their humor, appropriateness, and potential offensiveness.",
      },
      {
        role: "user",
        content: `Evaluate the following joke: ${joke}\n\nCriteria:\n1. Is it funny? (Yes/No)\n2. Is it appropriate? (Yes/No)\n3. Is it offensive? (Yes/No)\n4. Provide a brief explanation for each criterion.`,
      },
    ],
  });

  const stream = OpenAIStream(evaluationResponse);
  return new StreamingTextResponse(stream);
}
