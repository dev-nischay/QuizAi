import type { Question, Options } from "@common/contracts";
import type { URL } from "url";

import type WebSocket from "ws";

export type Client = {
  userId: string;
  role: "host" | "guest";
  quizId: string;
};

export interface AuthWebSocket extends WebSocket {
  user: Client;
  URL: URL;
}

export type SocketUser = { ws: AuthWebSocket; name: string; score: number };

export type LeaderBoard = {
  name: string;
  score: number;
};
