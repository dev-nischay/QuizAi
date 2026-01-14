import { QuizMemory } from "../quiz.memory.js";
import type { AuthWebSocket } from "../ws.types.js";
import type { SubmitAnswerType } from "./quiz.types.js";
import { isOpen } from "../utils/isOpen.js";
import { getQuiz } from "../utils/getQuiz.js";
import { wsError } from "../utils/wsError.js";
import { zodParser } from "../zod/zodParser.js";
import { isParticipant } from "../utils/validateRole.js";
import { submitAnswerSchema, type submitAnswerBody } from "../zod/quizActionsSchema.js";
export const submitAnswer = async (socket: AuthWebSocket, message: SubmitAnswerType) => {
  const { role, quizId, userId } = socket.user;

  const { questionId, selectedOptionIndex } = zodParser(message, submitAnswerSchema) as submitAnswerBody;

  const quiz = getQuiz(quizId);

  if (!isParticipant(userId, questionId) || !isOpen(socket) || !quiz.questions.has(questionId)) {
    return new wsError("Unauthorized Acess");
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
  answredMap.set(userId, selectedOptionIndex);
  // check this
  quiz.answers.set(questionId, answredMap);

  currentUser!.answeredCurrent = true; // remove not operator later

  if (quiz.questions.get(questionId)?.correctOptionIndex === selectedOptionIndex) {
    currentUser!.score += 100; // increment its value

    return socket.send(
      JSON.stringify({
        type: "ANSWER_ACK",
        accepted: true,
        correct: true,
        yourScore: currentUser?.score,
        message: "Correct answer!",
      })
    );
  } else {
    return socket.send(
      JSON.stringify({
        type: "ANSWER_ACK",
        accepted: true,
        correct: false,
        yourScore: currentUser?.score,
        message: "Incorrect answer!",
      })
    );
  }
};
