import { QuizMemory } from "../quiz.memory.js";
import { isOpen } from "../utils/isOpen.js";
import type { AuthWebSocket, SocketUser } from "../ws.types.js";
import type { ShowQuestionType } from "./quiz.types.js";

export const showQuestion = (socket: AuthWebSocket, message: ShowQuestionType) => {
  try {
    const { quizId, role, userId } = socket.user;

    const quiz = QuizMemory.get(quizId);

    if (role !== "host" || !quiz || quiz.host !== userId || !isOpen(socket)) {
      throw new Error("Unauthorized");
    }

    if (quiz.questions.size > 0) {
      const currentQuestion = quiz.questions.get(message.questionId);
      if (!currentQuestion) throw new Error("Question not found");

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
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      socket.send(
        JSON.stringify({
          type: "Error",
          message: error.message,
        })
      );
    }
  }
};
