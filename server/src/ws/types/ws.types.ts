import type { Question } from "../../types/global.types.js";
import type WebSocket from "ws";
import type { Options } from "../../types/global.types.js";
export type Client = {
  userId: string;
  role: "host" | "guest";
  quizId: string;
};

export interface AuthWebSocket extends WebSocket {
  user: Client;
}

export type SocketUser = { ws: AuthWebSocket; name: string; score: number };

export type QuizRoom = {
  host: string;
  hostConnection: {
    name: string;
    ws: AuthWebSocket | null;
  };
  quizId: string;
  currentQuestionId: string | null;
  title: string;
  questions: Map<string, Question>;
  users: Map<string, SocketUser>;
  answers: Map<string, Map<string, Options>>;
};

export type Result = {
  name: string;
  selectedOption: Options;
};

export type LeaderBoard = {
  name: string;
  score: number;
};
