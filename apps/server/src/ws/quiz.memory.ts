import type { AuthWebSocket } from "./types/ws.types.js";
import type { Question, Options } from "@common/contracts";
import type { SocketUser } from "./types/ws.types.js";

export type QuizRoom = {
  host: string;
  phase: "lobby" | "active" | "results" | null;
  hostConnection: {
    name: string;
    ws: AuthWebSocket | null;
  };
  roomCode: string;
  currentQuestionId: string | null;
  title: string;
  questions: Map<string, Question>;
  users: Map<string, SocketUser>;
  answers: Map<string, Map<string, Options>>;
  questionIndex: number;
};

export const QuizMemory = new Map<string, QuizRoom>();
