import type { PhaseUpdate, StopQuizRequest } from "@common/contracts";
import type { AuthWebSocket } from "../../types/ws.types.js";
import { stopQuizSchema, type stopBody } from "../../zod/quizActionsSchema.js";
import { zodParser } from "../../zod/zodParser.js";
import { broadCastMessage } from "../../utils/broadCast.js";
import { getQuiz } from "../../utils/getQuiz.js";
import type { StopQuizResponse } from "@common/contracts";
import { QuizMemory } from "../../quiz.memory.js";
import { Quiz } from "../../../http/models/quiz.js";
import { wsSend } from "../../utils/wsSend.js";
import { endQuiz } from "../../utils/endQuiz.js";
export const stopQuiz = async (socket: AuthWebSocket, message: StopQuizRequest) => {
  zodParser(message, stopQuizSchema) as stopBody;
  const { quizId } = socket.user;

  const quiz = getQuiz(quizId);
  const hostsocket = quiz.hostConnection.ws!;

  const response: StopQuizResponse = {
    type: "QUIZ_STOPPED",
    message: "quiz ended early by the host",
  };

  endQuiz(quiz, response, hostsocket);

  return;
};
