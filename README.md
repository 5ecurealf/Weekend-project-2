# Joke Generator App

A web application that generates jokes based on user-selected topics, tones, kinds, and temperatures. Users can also analyze generated jokes.

## Features

- Generate jokes based on different topics, tones, and kinds.
- Adjust the temperature to control joke creativity.
- Analyze jokes to get a detailed

## Tech Stack

- **Frontend**: React, Next.js, TypeScript
- **Backend**: Vercel's `useChat` API

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/5ecurealf/Weekend-project-2.git
   cd joke-lab-app
   ```

2. **Install dependencies**:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Application

1. **Configure the API**:
   configure your model's endpoint to call the right API in joke-lab-app/app/api/chat/route.ts
   ```
   const openai = new OpenAI({
   baseURL: "https://amended-sean-telescope-producing.trycloudflare.com/v1",
   });
   ```
2. **Start the development server**:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).
