import type { Options } from "../types/global.types.js";
export type JoinQuizRequest = {
  type: "JOIN_QUIZ";
  name: string;
};

export type StartQuizRequest = {
  type: "START_QUIZ";
};

export type ShowQuestionRequest = {
  type: "SHOW_QUESTION";
};

export type StopQuizRequest = {
  type: "STOP_QUIZ";
};

export type SubmitAnswerRequest = {
  type: "SUBMIT_ANSWER";
  selectedOptionIndex: Options;
};

export type ShowResultRequest = {
  type: "SHOW_RESULT";
};

export type LeaverQuizRequest = {
  type: "LEAVE_QUIZ";
};

export type ClientResponse =
  | JoinQuizRequest
  | ShowQuestionRequest
  | SubmitAnswerRequest
  | ShowResultRequest
  | StartQuizRequest
  | StopQuizRequest
  | LeaverQuizRequest;
