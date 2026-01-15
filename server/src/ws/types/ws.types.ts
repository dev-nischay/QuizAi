import type { Questions } from "../../types/global.types.js";
import type WebSocket from "ws";

export type Client = {
  userId: string;
  role: "host" | "guest";
  quizId: string;
};

export interface AuthWebSocket extends WebSocket {
  user: Client;
}

export type SocketUser = { ws?: AuthWebSocket; name: string; score: number; answeredCurrent: boolean };

export type QuizRoom = {
  host: string;
  quizId: string;
  currentQuestionId: string;
  title: string;
  questions: Map<string, Questions>;
  users: Map<string, SocketUser>;
  answers: Map<string, Map<string, 0 | 1 | 2 | 3>>;
};

export type Result = {
  name: string;
  selectedOption: 0 | 1 | 2 | 3;
};
