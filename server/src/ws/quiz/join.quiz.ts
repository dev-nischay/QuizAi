import { QuizMemory } from "../quiz.memory.js";
import type { AuthWebSocket } from "../ws.types.js";
import { isOpen } from "../utils/isOpen.js";
import type { JoinMessageType } from "./quiz.types.js";
import { getQuiz } from "../utils/getQuiz.js";
import { wsError } from "../utils/wsError.js";
import { joinQuizSchema, type joinBody } from "../zod/quizActionsSchema.js";
import { zodParser } from "../zod/zodParser.js";

export const joinRoom = async (socket: AuthWebSocket, message: JoinMessageType) => {
  const { name } = zodParser(message, joinQuizSchema) as joinBody;

  const { userId, quizId } = socket.user;

  if (!isOpen(socket)) {
    throw new wsError("Socket is not Open");
  }
  const quiz = getQuiz(quizId);

  quiz.users.set(userId, {
    ws: socket,
    name,
    score: 0,
    answeredCurrent: false,
  });

  console.log(`user: ${message.name} joined room:${quizId}`);
};
