import type { AuthWebSocket } from "../ws.types.js";
import type { ShowResultType } from "./quiz.types.js";
import { QuizMemory } from "../quiz.memory.js";
import { isOpen } from "../utils/isOpen.js";
export const showResult = (socket: AuthWebSocket, message: ShowResultType) => {
  const { quizId, role, userId } = socket.user;

  try {
    const quiz = QuizMemory.get(quizId);

    if (role !== "host" || quiz?.host !== userId || !quiz || !isOpen(socket)) {
      return new Error("Unauthorized Acess");
    }

    // broadcast message

    if (quiz.questions.has(message.questionId)) {
      const resultsData = new Map<string, boolean>([]);
      const correctAnswer = quiz.questions.get(message.questionId)?.correctOptionIndex;

      const broadCast = JSON.stringify({
        type: "RESULT",
        quizId: socket.user.quizId,
        questionId: message.questionId,

        // results:{[correctAnswer!]:{[]}}
      });

      for (const { ws } of quiz.users.values()) {
        if (ws?.OPEN === ws?.readyState) {
          ws!.send(broadCast);
        }
      }
    }
  } catch (err) {}
};

// this will send per-question result to admin as user will get immiediate correct/response
