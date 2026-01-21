import type { Question } from "../../types/global.types.js";
import type { LeaderBoard, Result } from "./ws.types.js";
export type JoinResponse = {
  type: "USER_JOINED";
  message: string;
};

export type StartResponse = {
  type: "QUIZ_STARTED";
  quizId: string;
  message: string;
};

export type QuestionResponse = Pick<Question, "text" | "options"> & {
  type: "QUESTION";
  quizId: string;
  questionId: string;
};

export type SubmitAnswerResponse = {
  type: "ANSWER_RESULT";
  accepted: boolean;
  correct?: boolean;
  yourScore: number;
  message: string;
};

export type ShowResultResponse = {
  type: "RESULT";
  quizId: string;
  questionId: string;
  results: Result[];
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
  userCount: number;
};

export type QuizCompleted = {
  type: "QUIZ_COMPLETED";
  message: string;
};

export type GeneralResponse = {
  type: "RESPONSE";
  message: string;
};

export type ServerResponse =
  | JoinResponse
  | StartResponse
  | QuestionResponse
  | SubmitAnswerResponse
  | ShowResultResponse
  | ServerError
  | LeaderboardUpdates
  | QuizCompleted
  | GeneralResponse
  | LobbyUpdates;
