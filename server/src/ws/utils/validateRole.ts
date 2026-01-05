import { QuizMemory } from "../quiz.memory.js";

export const isHost = (hostId: string, quizId: string): boolean => {
  return QuizMemory.get(quizId)?.host === hostId;
};

export const isParticipant = (userId: string, quizId: string): boolean => {
  return QuizMemory.get(quizId)?.users.has(userId) ?? false;
};
