# QuizAi

A real-time quiz platform: create quizzes, host live sessions, and join as a player. Built with a React + Vite frontend and Node + Express backend, with WebSockets for live gameplay.

## Features

- **Auth** — Sign up, sign in, JWT-based sessions
- **Quiz builder** — Create quizzes with multiple questions (title, questions, validation)
- **Quiz home** — Dashboard to create or join a quiz
- **Live quiz** — Real-time gameplay over WebSockets (host controls, guest join/submit, lobby, leaderboard)
- **REST API** — Auth and quiz CRUD with validation (Zod) and error handling

## Tech stack

| Layer   | Stack |
|---------|-------|
| **Client** | React 19, TypeScript, Vite, React Router, TanStack Query, Zustand, Axios, Zod, Tailwind CSS, Lucide icons |
| **Server** | Node.js, Express 5, TypeScript, Mongoose, JWT (jsonwebtoken), bcrypt, Zod, WebSockets (ws), CORS, dotenv |

## Project structure

```
QuizAi/
├── client/                 # React + Vite app
│   ├── src/
│   │   ├── components/      # Auth, quiz (build, home, live), globals, layout
│   │   ├── hooks/           # Form submit / validation
│   │   ├── services/        # API calls (auth, quiz)
│   │   ├── store/           # Zustand (e.g. auth)
│   │   ├── validation/      # Zod schemas
│   │   └── App.tsx
│   └── package.json
├── server/                  # Express + WebSocket server
│   ├── src/
│   │   ├── http/            # Routes, controllers, models, middlewares, validation, types
│   │   ├── ws/              # WebSocket server, handlers, quiz logic (lobby, host, guest)
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm (or pnpm/yarn)

## Environment variables

**Server** (e.g. `server/.env`):

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/quizai
JWT_SECRET=your-secret-key
```

**Client** (e.g. `client/.env`):

```env
VITE_API_URL=http://localhost:3000
```

Adjust `PORT` and `VITE_API_URL` if your API runs on another port or host.

## Installation & run

**1. Install dependencies**

```bash
# Server
cd server && npm install

# Client
cd client && npm install
```

**2. Start the server**

From `server/`:

```bash
npm run dev
```

Runs the HTTP server (and WebSocket server on the same port). Ensure MongoDB is running and env vars are set.

**3. Start the client**

From `client/`:

```bash
npm run dev
```

Then open the URL Vite prints (e.g. `http://localhost:5173`).

## API overview

- **Auth** — `POST /api/auth/signup`, `POST /api/auth/signin`, `GET /api/auth/me` (protected).
- **Quiz** — `POST /api/quiz/` (create), `GET /api/quiz/`, `DELETE /api/quiz/:id` (all protected).
- **WebSocket** — Same host/port as HTTP server; used for live quiz (host/guest actions, lobby, results).

## License

ISC
