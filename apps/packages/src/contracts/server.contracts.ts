import type { Question, Options } from "../types/global.types.js";

export type Result = {
  name: string;
  selectedOption: Options;
};

export type LeaderBoard = {
  name: string;
  score: number;
};
export type JoinResponse = {
  type: "USER_JOINED";
  quizDetails: { host: string; totalQuestionCount: number; title: string };
  message: string;
};

export type StartResponse = {
  type: "QUIZ_STARTED";
  quizDetails: { host: string; totalQuestionCount: number; title: string };
  quizId: string;
  message: string;
};

export type StopQuizResponse = {
  type: "QUIZ_STOPPED";
  message: string;
};

export type QuestionResponse = Pick<Question, "text" | "options"> & {
  type: "QUESTION";
  quizId: string;
  questionId: string;
  correctOptionIndex?: Options; // only sent to host
};

export type SubmitAnswerResponse = {
  type: "ANSWER_RESULT";
  accepted: boolean;
  correct?: boolean;
  correctAnswerIndex: Options;
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
  users: string[];
};

export type QuizCompleted = {
  type: "QUIZ_COMPLETED";
  message: string;
};

export type GeneralResponse = {
  type: "RESPONSE";
  message: string;
};

export type BroadCast = {
  type: "BROADCAST";
  message: string;
};
export type LeaveResponse = {
  type: "USER_LEFT";
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
  | LobbyUpdates
  | StopQuizResponse
  | BroadCast
  | LeaveResponse;
