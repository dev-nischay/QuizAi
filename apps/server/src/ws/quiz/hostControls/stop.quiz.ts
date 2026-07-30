import type { StopQuizRequest } from "@common/contracts";
import type { AuthWebSocket } from "../../types/ws.types.js";
import { stopQuizSchema, type stopBody } from "../../zod/quizActionsSchema.js";
import { zodParser } from "../../zod/zodParser.js";
import { broadCastMessage } from "../../utils/broadCast.js";
import { getQuiz } from "../../utils/getQuiz.js";
import type { StopQuizResponse } from "@common/contracts";
import { QuizMemory } from "../../quiz.memory.js";
import { Quiz } from "../../../http/models/quiz.js";
import { wsSend } from "../../utils/wsSend.js";
export const stopQuiz = async (socket: AuthWebSocket, message: StopQuizRequest) => {
  zodParser(message, stopQuizSchema) as stopBody;
  const { quizId } = socket.user;

  const quiz = getQuiz(quizId);
  const hostsocket = quiz.hostConnection.ws!;

  const response: StopQuizResponse = {
    type: "QUIZ_STOPPED",
    message: "quiz stopped early by host",
  };

  wsSend(hostsocket, response);
  hostsocket.close(1000, JSON.stringify(response));
  return;
};
