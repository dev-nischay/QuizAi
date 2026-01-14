import { isOpen } from "../utils/isOpen.js";
import type { AuthWebSocket } from "../ws.types.js";
import type { ShowQuestionType } from "./quiz.types.js";
import { type showQuestionBody, showQuestionSchema } from "../zod/quizActionsSchema.js";
import { zodParser } from "../zod/zodParser.js";
import { getQuiz } from "../utils/getQuiz.js";
import { isHost } from "../utils/validateRole.js";
import { wsError } from "../utils/wsError.js";

export const showQuestion = async (socket: AuthWebSocket, message: ShowQuestionType) => {
  const { questionId } = zodParser(message, showQuestionSchema) as showQuestionBody;

  const { quizId, role, userId } = socket.user;

  const quiz = getQuiz(quizId);

  if (role !== "host" || !isHost(userId, quizId) || !isOpen(socket)) {
    throw new wsError("Unauthorized user");
  }

  if (quiz.questions.size > 0) {
    const currentQuestion = quiz.questions.get(questionId);
    console.log(currentQuestion);
    if (!currentQuestion) throw new wsError("Question not found");

    const response = JSON.stringify({
      type: "QUESTION",
      quizId,
      questionId: currentQuestion._id,
      text: currentQuestion.text,
      options: currentQuestion.options,
    });

    for (const { ws } of quiz.users.values()) {
      if (ws?.readyState === ws?.OPEN) {
        ws?.send(response);
      }
    }
  }
};
