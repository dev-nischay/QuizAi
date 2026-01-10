export type JoinMessageType = {
  type: "JOIN_ROOM";
  name: string;
};

export type StartMessageType = {
  type: "START_QUIZ";
};

export type ShowQuestionType = {
  type: "SHOW_QUESTION";
  questionId: string;
};

export type SubmitAnswerType = {
  type: "SUBMIT_ANSWER";
  questionId: string;
  selectedOptionIndex: 0 | 1 | 2 | 3;
};

export type ShowResultType = {
  type: "SHOW_RESULT";
  questionId: string;
};

export type ClientResponse =
  | JoinMessageType
  | ShowQuestionType
  | ShowQuestionType
  | SubmitAnswerType
  | ShowResultType
  | StartMessageType;
