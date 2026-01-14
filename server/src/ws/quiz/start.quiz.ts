import { QuizMemory } from "../quiz.memory.js";
import { getQuiz } from "../utils/getQuiz.js";
import { isOpen } from "../utils/isOpen.js";
import type { AuthWebSocket } from "../ws.types.js";
import { startQuizSchema, type startBody } from "../zod/quizActionsSchema.js";
import { zodParser } from "../zod/zodParser.js";
import { wsError } from "../utils/wsError.js";
import type { StartMessageType } from "./quiz.types.js";

export const startQuiz = async (socket: AuthWebSocket, message: StartMessageType) => {
  const { quizId, role, userId } = socket.user;

  const { type } = zodParser(message, startQuizSchema) as startBody;

  const quiz = getQuiz(quizId);

  if (role !== "host" || quiz?.host !== userId || !quiz || !isOpen(socket)) {
    return new wsError("Unauthorized Acess");
  }

  socket.send(
    JSON.stringify({
      type: "QUIZ_STARTED",
      quizId,
      message: "Quiz is now live",
    })
  );
};
