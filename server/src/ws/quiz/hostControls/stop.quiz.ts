import type { StopQuizRequest } from "../../types/client.types.js";
import type { AuthWebSocket } from "../../types/ws.types.js";
import { stopQuizSchema, type stopBody } from "../../zod/quizActionsSchema.js";
import { zodParser } from "../../zod/zodParser.js";
import { broadCastMessage } from "../../utils/broadCast.js";
import { getQuiz } from "../../utils/getQuiz.js";
import type { StopQuizResponse } from "../../types/server.types.js";
import { QuizMemory } from "../../quiz.memory.js";
import { Quiz } from "../../../http/models/quiz.js";
export const stopQuiz = async (socket: AuthWebSocket, message: StopQuizRequest) => {
  zodParser(message, stopQuizSchema) as stopBody;
  const { userId, quizId } = socket.user;

  const quiz = getQuiz(quizId);
  const hostsocket = quiz.hostConnection.ws;

  const response: StopQuizResponse = {
    type: "QUIZ_STOPPED",
    message: "quiz stopped early by host",
  };

  broadCastMessage(quiz, response, { close: true, message: "quiz ended early by the host" });
  hostsocket?.close(1000, "quiz is finished");

  QuizMemory.delete(quizId); // quiz removed from memory
  await Quiz.findOneAndDelete({ createdBy: userId });
  return;
};
