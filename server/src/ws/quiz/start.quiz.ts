import { QuizMemory } from "../quiz.memory.js";
import { isOpen } from "../utils/isOpen.js";
import type { AuthWebSocket } from "../ws.types.js";

import type { StartMessageType } from "./quiz.types.js";

export const startQuiz = (socket: AuthWebSocket, message: StartMessageType) => {
  const { quizId, role, userId } = socket.user;

  try {
    const quiz = QuizMemory.get(quizId);

    if (role !== "host" || quiz?.host !== userId || !quiz || !isOpen(socket)) {
      return new Error("Unauthorized Acess");
    }

    socket.send(
      JSON.stringify({
        type: "QUIZ_STARTED",
        quizId,
        message: "Quiz is now live",
      })
    );
  } catch (error) {
    console.error(error);
    return socket.send(
      JSON.stringify({
        type: "ERROR",
        success: false,
        message: "Invalid quizId or unauthorized",
      })
    );
  }
};
