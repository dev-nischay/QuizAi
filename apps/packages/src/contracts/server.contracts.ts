import type { Question, Options } from "../types/global.types.js";

export type Vote = {
  name: string;
  selectedOptionIndex: Options;
};

export type PollsUpdates = {
  type: "POLLS";
  roomCode: string;
  questionId: string;
  votes: Vote[];
};

export type LeaderBoard = {
  name: string;
  score: number;
};
// later

export type JoinResponse = {
  type: "USER_JOINED";
  quizDetails: { host: string; totalQuestionCount: number; title: string; roomCode: string };
  message: string;
};

export type FinalResult = {
  type: "FINAL_RESULT";
  result: LeaderBoard[];
};

export type StartResponse = {
  type: "QUIZ_STARTED";
  quizDetails: { host: string; totalQuestionCount: number; title: string; roomCode: string };
  quizId: string;
  message: string;
};

export type QuestionResponse = Pick<Question, "text" | "options"> & {
  type: "QUESTION";
  quizId: string;
  questionId: string;
  correctOptionIndex?: Options; // only sent to host
  currentQuestionIndex: number;
};

export type SubmitAnswerResponse = {
  type: "ANSWER_RESULT";
  accepted: boolean;
  correct?: boolean;
  correctAnswerIndex: Options;
  yourScore: number;
  message: string;
};

export type ServerError = {
  type: "ERROR";
  error: string;
  details?: {};
};

export type LeaderboardUpdates = {
  type: "LEADERBOARD";
  message: string;
  data: LeaderBoard[];
};

export type LobbyUpdates = {
  type: "LOBBY";
  users: string[];
};

export type Notification = {
  type: "NOTIFICATION";
  message: string;
};

export type PhaseUpdate = {
  type: "PHASE";
  phase: "lobby" | "active" | "results" | null;
};

export type ServerResponse =
  | JoinResponse
  | StartResponse
  | QuestionResponse
  | SubmitAnswerResponse
  | PollsUpdates
  | ServerError
  | LeaderboardUpdates
  | LobbyUpdates
  | PhaseUpdate
  | Notification
  | FinalResult;
