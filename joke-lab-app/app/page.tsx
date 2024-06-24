"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();
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

  const [analysisResult, setAnalysisResult] = useState("");

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  // Function to handle the API request and process streamed response

  const handleAnalyse = async () => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      setAnalysisResult(""); // Clear previous result

      const response = await fetch("/api/analyse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ joke: lastMessage.content }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let analysisText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        analysisText += decoder.decode(value, { stream: true });
      }

      setAnalysisResult(analysisText);
    }
  };

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
            onClick={() =>
              append({
                role: "user",
                content: `Generate a ${state.kind} joke about ${state.topic} in a ${state.tone} tone with ${state.temperature} temperature.`,
              })
            }
          >
            Generate Joke
          </button>
          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
          >
            {messages[messages.length - 1]?.content}
          </div>

          {/* Button to make API request */}
          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
          >
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAnalyse}
            >
              Analyse Last Message
            </button>
          </div>

          {/* Display the analysis result */}
          {analysisResult && (
            <div className="bg-opacity-25 bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold">Analysis Result</h3>
              <p>{analysisResult}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
