import type { StopQuizRequest } from "@common/contracts";
import type { AuthWebSocket } from "../../types/ws.types.js";
import { stopQuizSchema, type stopBody } from "../../zod/quizActionsSchema.js";
import { zodParser } from "../../zod/zodParser.js";
import { getQuiz } from "../../utils/getQuiz.js";
import { endQuiz } from "../../utils/endQuiz.js";
export const stopQuiz = async (socket: AuthWebSocket, message: StopQuizRequest) => {
  zodParser(message, stopQuizSchema) as stopBody;
  const { quizId } = socket.user;

  const quiz = getQuiz(quizId);
  const hostsocket = quiz.hostConnection.ws!;

  endQuiz(quiz, "The host ended the quiz early. Showing final results...", hostsocket);

  return;
};
