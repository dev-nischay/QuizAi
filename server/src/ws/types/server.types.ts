// USER_JOINED;
// QUESTION;
// ANSWER_RESULT;
// LEADERBOARD;
// QUIZ_ENDED;
// ERROR;
import type { Questions } from "../../types/global.types.js";
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

export type QuestionResponse = Pick<Questions, "text" | "options"> & {
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
  type: "Error";
  error: string;
  details?: {};
};

export type LeaderboardUpdates = {
  type: "LEADERBOARD";
  message: string;
  data: LeaderBoard[];
};

export type ServerResponse =
  | JoinResponse
  | StartResponse
  | QuestionResponse
  | SubmitAnswerResponse
  | ShowResultResponse
  | ServerError
  | LeaderboardUpdates;
