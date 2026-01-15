// USER_JOINED;
// QUESTION;
// ANSWER_RESULT;
// LEADERBOARD;
// QUIZ_ENDED;
// ERROR;
import type { Questions } from "../../types/global.types.js";
export type JoinResponse = {
  type: "USER_JOINED";
  message: string;
};

export type StartResponse = {
  type: "QUIZ_STARTED";
  message: string;
};

export type QuestionResponse = Pick<Questions, "text" | "options"> & {
  type: "QUESTION";
  quizId: string;
  questionId: string;
};

export type ServerResponse = {};
