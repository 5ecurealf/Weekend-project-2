"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, setMessages, append, isLoading } = useChat();
  const topics = [
    { emoji: "👨‍💼", value: "Work" },
    { emoji: "🐶", value: "Animals" },
    { emoji: "🍔", value: "Food" },
    { emoji: "📺", value: "Television" },
  ];
  const tones = [
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "😂", value: "Goofy" },
    { emoji: "🧐", value: "Witty" },
    { emoji: "🌑", value: "Dark" },
  ];
  const kinds = [
    { emoji: "🔄", value: "Pun" },
    { emoji: "🚪", value: "Knock-Knock" },
    { emoji: "📖", value: "Story" },
  ];
  const temperatures = [
    { emoji: "🥶", value: "Low" },
    { emoji: "😊", value: "Medium" },
    { emoji: "🔥", value: "High" },
  ];

  const [state, setState] = useState({
    topic: "",
    tone: "",
    kind: "",
    temperature: "",
  });
  const [joke, setJoke] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [canAnalyze, setCanAnalyze] = useState(false);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleGenerateJoke = () => {
    setMessages([]);
    append({
      role: "user",
      content: `Generate a ${state.kind} joke about ${state.topic} in a ${state.tone} tone with ${state.temperature} temperature.`,
    });
    setCanAnalyze(true);
    setAnalysis("");
  };

  const handleAnalyzeJoke = () => {
    append({
      role: "user",
      content: jokeAnalysisPrompt(joke),
    });
    setCanAnalyze(false);
  };

  // Update the joke when a new joke message is received
  if (
    messages.length > 0 &&
    !messages[messages.length - 1]?.content.startsWith("Generate") &&
    !messages[messages.length - 1]?.content.startsWith("Analyze") &&
    joke !== messages[messages.length - 1]?.content
  ) {
    setJoke(messages[messages.length - 1]?.content);
  }
  const filteredMessages = messages.filter(
    (message) =>
      !message.content.startsWith("Generate") &&
      !message.content.startsWith("Analyze")
  );

  const displayMessages = filteredMessages.slice(-2);

  const jokeAnalysisPrompt = (joke: string) => `Analyze the following joke:

"${joke}"

Evaluate the joke based on the following criteria:

 **Funniness**: How funny is the joke on a scale from 1 to 10? Provide an explanation for the rating.
 **Appropriateness**: Is the joke appropriate for a general audience? Consider cultural, social, and age-related sensitivities.
 **Offensiveness**: Does the joke contain any content that could be considered offensive? If so, specify what aspects are offensive and to whom.
 **Clarity**: Is the joke clear and easy to understand, or does it require specific knowledge or context to be funny?
 **Originality**: How original is the joke? Has it been heard before, or does it offer a fresh perspective?
 **Relevance**: Is the joke relevant to the context it is likely to be told in? Does it align well with the selected topic?
 **Tone**: Does the tone of the joke match the intended tone (e.g., sarcastic, goofy, witty, dark)?
 **Structure**: Is the joke well-structured? Does it have a clear setup and punchline?

Provide a detailed analysis based on these criteria.
`;
  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Joke Generator App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the joke by selecting the topic, tone, kind, and
              temperature.
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Topic</h3>
            <div className="flex flex-wrap justify-center">
              {topics.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="topic"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tone</h3>
            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Kind of Joke</h3>
            <div className="flex flex-wrap justify-center">
              {kinds.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="kind"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Temperature</h3>
            <div className="flex flex-wrap justify-center">
              {temperatures.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="temperature"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={
              isLoading ||
              !state.topic ||
              !state.tone ||
              !state.kind ||
              !state.temperature
            }
            onClick={handleGenerateJoke}
          >
            Generate Joke
          </button>
          {displayMessages.map((message, index) => (
            <div
              key={index}
              className="bg-opacity-25 bg-gray-700 rounded-lg p-4 mt-4"
            >
              <p>{message.content}</p>
            </div>
          ))}
          {joke && (
            <>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-4"
                disabled={isLoading || !canAnalyze}
                onClick={handleAnalyzeJoke}
              >
                Analyze Joke
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
