export type JoinMessageRequest = {
  type: "JOIN_ROOM";
  name: string;
};

export type StartMessageRequest = {
  type: "START_QUIZ";
};

export type ShowQuestionRequest = {
  type: "SHOW_QUESTION";
  questionId: string;
};

export type SubmitAnswerRequest = {
  type: "SUBMIT_ANSWER";
  questionId: string;
  selectedOptionIndex: 0 | 1 | 2 | 3;
};

export type ShowResultRequest = {
  type: "SHOW_RESULT";
  questionId: string;
};

export type ClientResponse =
  | JoinMessageRequest
  | ShowQuestionRequest
  | SubmitAnswerRequest
  | ShowResultRequest
  | StartMessageRequest;
