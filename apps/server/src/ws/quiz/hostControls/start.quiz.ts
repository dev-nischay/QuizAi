import { getQuiz } from "../../utils/getQuiz.js";
import type { AuthWebSocket } from "../../types/ws.types.js";
import { startQuizSchema, type startBody } from "../../zod/quizActionsSchema.js";
import { zodParser } from "../../zod/zodParser.js";
import type { StartQuizRequest } from "@common/contracts";
import { wsSend } from "../../utils/wsSend.js";
import { wsError } from "../../utils/wsError.js";
export const startQuiz = async (socket: AuthWebSocket, message: StartQuizRequest) => {
  const { quizId } = socket.user;
  const quiz = getQuiz(quizId);

  if (quiz.hostConnection.ws) {
    throw new wsError("quiz is already started");
  }

  zodParser(message, startQuizSchema) as startBody;

  quiz.hostConnection.ws = socket; // setting host socket

  console.log("quiz started by host");

  const totalQuestionCount = quiz.questions.size;

  quiz.phase = "lobby";

  wsSend(socket, {
    type: "QUIZ_STARTED",
    quizId,
    message: "Quiz is now live",
    quizDetails: { host: quiz.hostConnection.name, totalQuestionCount, title: quiz.title },
  });

  wsSend(socket, {
    type: "NOTIFICATION",
    message: `Room ${quizId} created `,
  });

  wsSend(socket, {
    type: "PHASE",
    phase: quiz.phase,
  });

  return;
};
