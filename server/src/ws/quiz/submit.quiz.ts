import { QuizMemory } from "../quiz.memory.js";
import type { AuthWebSocket } from "../ws.types.js";
import type { SubmitAnswerType } from "./quiz.types.js";
import { isOpen } from "../utils/isOpen.js";
export const submitAnswer = (socket: AuthWebSocket, message: SubmitAnswerType) => {
  const { role, quizId, userId } = socket.user;

  try {
    const quiz = QuizMemory.get(quizId);

    if (!quiz?.users.has(userId) || !quiz || !isOpen(socket) || !quiz.questions.has(message.questionId)) {
      return new Error("Unauthorized Acess");
    }

    const currentUser = quiz.users.get(userId);

    if (currentUser?.answeredCurrent) {
      return socket.send(
        JSON.stringify({
          type: "ANSWER_ACK",
          accepted: false,
          reason: "already_answered",
          message: "You already answered this question.",
        })
      );
    }

    const answredMap = new Map<string, number>();
    answredMap.set(userId, message.selectedOptionIndex);
    // check this
    quiz.answers.set(message.questionId, answredMap);

    if (quiz.questions.get(message.questionId)?.correctOptionIndex === message.selectedOptionIndex) {
      currentUser!.score += 1; // increment its value

      return socket.send(
        JSON.stringify({
          type: "ANSWER_ACK",
          accepted: true,
          correct: true,
          yourScore: 1,
          message: "Correct answer!",
        })
      );
    } else {
      return socket.send(
        JSON.stringify({
          type: "ANSWER_ACK",
          accepted: true,
          correct: false,
          yourScore: 0,
          message: "Incorrect answer!",
        })
      );
    }
  } catch (error) {}
};
