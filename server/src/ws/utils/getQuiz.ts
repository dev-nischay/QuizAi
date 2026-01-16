import { QuizMemory } from "../quiz.memory.js";
import type { QuizRoom } from "../types/ws.types.js";
import { wsError } from "./wsError.js";
export const getQuiz = (quizId: string): QuizRoom => {
  if (typeof quizId === "string" && QuizMemory.has(quizId)) {
    const quiz = QuizMemory.get(quizId);

    if (!quiz || quiz === undefined) {
      throw new wsError("quiz not found ");
    }

    return quiz;
  } else throw new wsError("Invalid quiz Id");
};
