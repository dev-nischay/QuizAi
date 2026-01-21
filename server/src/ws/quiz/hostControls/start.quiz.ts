import { getQuiz } from "../../utils/getQuiz.js";
import type { AuthWebSocket } from "../../types/ws.types.js";
import { startQuizSchema, type startBody } from "../../zod/quizActionsSchema.js";
import { zodParser } from "../../zod/zodParser.js";
import type { StartMessageRequest } from "../../types/client.types.js";
import { wsSend } from "../../utils/wsSend.js";
import { wsError } from "../../utils/wsError.js";
export const startQuiz = async (socket: AuthWebSocket, message: StartMessageRequest) => {
  const { quizId } = socket.user;
  const quiz = getQuiz(quizId);

  if (quiz.hostConnection.ws) {
    throw new wsError("quiz is already started");
  }

  zodParser(message, startQuizSchema) as startBody;

  quiz.hostConnection.ws = socket; // setting host socket

  wsSend(socket, {
    type: "QUIZ_STARTED",
    quizId,
    message: "Quiz is now live",
  });
  return;
};
