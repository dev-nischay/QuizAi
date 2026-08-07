import type { AuthWebSocket } from "../../types/ws.types.js";
import type { ShowResultRequest } from "@common/contracts";
import type { Result } from "../../types/ws.types.js";
import { getQuiz } from "../../utils/getQuiz.js";
import { zodParser } from "../../zod/zodParser.js";
import { showResultSchema, type resultBody } from "../../zod/quizActionsSchema.js";
import { wsError } from "../../utils/wsError.js";
import type { ShowResultResponse } from "@common/contracts";
import { broadCastMessage } from "../../utils/broadCast.js";

export const showResult = (socket: AuthWebSocket, message: ShowResultRequest) => {
  const { quizId } = socket.user;

  zodParser(message, showResultSchema);

  const quiz = getQuiz(quizId);
  const questionId = quiz.currentQuestionId;

  if (!quiz.hostConnection.ws) {
    throw new wsError("host must start quiz first to continue");
  }
  if (!questionId) {
    throw new wsError("question not live yet");
  }

  if (quiz.questions.has(questionId)) {
    const currentAnswers = quiz.answers.get(questionId);

    if (!currentAnswers || currentAnswers === undefined) {
      throw new wsError("question is not attempted till now");
    }

    const results: Result[] = [];

    for (const [userId, selectedOption] of currentAnswers) {
      const user = quiz.users.get(userId);
      const name = user ? user.name : "Unknown User";
      results.push({ name, selectedOption });
    }

    // formatting response
    const response: ShowResultResponse = {
      type: "RESULT",
      quizId: socket.user.quizId,
      questionId: questionId,
      results,
    };

    // broadcasting results poll to every user
    broadCastMessage(quiz, response, { close: false });
    return;
  }
};
