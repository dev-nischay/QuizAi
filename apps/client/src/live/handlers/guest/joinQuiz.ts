import type { JoinQuizRequest } from "@common/contracts";

export const joinQuiz = (name: string): JoinQuizRequest => {
  return {
    type: "JOIN_QUIZ",
    name,
  };
};
