import type { AuthWebSocket } from "../ws.types.js";
import type { ShowResultType } from "./quiz.types.js";
import { QuizMemory } from "../quiz.memory.js";
import { isOpen } from "../utils/isOpen.js";
import { getQuiz } from "../utils/getQuiz.js";
import { zodParser } from "../zod/zodParser.js";
import { showResultSchema, type showQuestionBody } from "../zod/quizActionsSchema.js";
import { wsError } from "../utils/wsError.js";
export const showResult = (socket: AuthWebSocket, message: ShowResultType) => {
  const { quizId, role, userId } = socket.user;

  const { questionId } = zodParser(message, showResultSchema) as showQuestionBody;

  const quiz = getQuiz(quizId);

  if (role !== "host" || quiz?.host !== userId || !quiz || !isOpen(socket)) {
    throw new wsError("Unauthorized Acess");
  }

  // broadcast message

  if (quiz.questions.has(questionId)) {
    const resultsData = new Map<string, boolean>([]);
    const correctAnswer = quiz.questions.get(questionId)?.correctOptionIndex;

    const broadCast = JSON.stringify({
      type: "RESULT",
      quizId: socket.user.quizId,
      questionId: questionId,

      // results:{[correctAnswer!]:{[]}}
    });

    for (const { ws } of quiz.users.values()) {
      if (ws?.OPEN === ws?.readyState) {
        ws!.send(broadCast);
      }
    }
  }
};

// this will send per-question result to admin as user will get immiediate correct/response
