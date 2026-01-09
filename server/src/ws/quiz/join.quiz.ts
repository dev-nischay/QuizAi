import { QuizMemory } from "../quiz.memory.js";
import type { AuthWebSocket } from "../ws.types.js";
import { isOpen } from "../utils/isOpen.js";
import type { JoinMessageType } from "./quiz.types.js";

export const joinRoom = (socket: AuthWebSocket, message: JoinMessageType) => {
  const { userId, quizId } = socket.user;

  if (!isOpen(socket)) {
    throw new Error("Socket is not Open");
  }

  // add  strictness in run time
  try {
    const quiz = QuizMemory.get(quizId);

    if (quiz === undefined || !quiz) {
      throw new Error("Quiz not found");
    }

    quiz.users.set(userId, {
      ws: socket,
      name: message.name,
      score: 0,
      answeredCurrent: false,
    });
  } catch (error) {
    error instanceof Error ? socket.send(error.message) : console.log(error);
  }
};
