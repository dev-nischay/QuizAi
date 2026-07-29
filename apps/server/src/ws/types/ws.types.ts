import type { Question, Options } from "@common/contracts";
import type WebSocket from "ws";

export type Client = {
  userId: string;
  role: "host" | "guest";
  quizId: string;
};

export interface AuthWebSocket extends WebSocket {
  user: Client;
}

export type SocketUser = { ws: AuthWebSocket; name: string; score: number };

export type Result = {
  name: string;
  selectedOption: Options;
};

export type LeaderBoard = {
  name: string;
  score: number;
};
