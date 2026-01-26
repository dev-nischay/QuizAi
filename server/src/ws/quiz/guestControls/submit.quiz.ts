import type { AuthWebSocket } from "../../types/ws.types.js";
import type { SubmitAnswerRequest } from "../../types/client.types.js";
import { getQuiz } from "../../utils/getQuiz.js";
import { wsError } from "../../utils/wsError.js";
import { zodParser } from "../../zod/zodParser.js";
import { submitAnswerSchema, type submitAnswerBody } from "../../zod/quizActionsSchema.js";
import { wsSend } from "../../utils/wsSend.js";
export const submitAnswer = async (socket: AuthWebSocket, message: SubmitAnswerRequest) => {
  const { quizId, userId } = socket.user;

  // const { questionId, selectedOptionIndex } = zodParser(message, submitAnswerSchema) as submitAnswerBody;
  const { selectedOptionIndex } = zodParser(message, submitAnswerSchema) as submitAnswerBody;

  const quiz = getQuiz(quizId);

  const { currentQuestionId } = quiz;
  // if (questionId !== quiz.currentQuestionId) {
  //   throw new wsError("user can only answer to live question", true);
  // }

  // if (!quiz.questions.has(questionId)) {
  //   throw new wsError("question not found", true, 1003);
  // }

  const currentUser = quiz.users.get(userId);

  if (!currentUser || currentUser === undefined) {
    throw new wsError("user not found");
  }

  // ------------ user is valid as well as his data
  // replace current with question if it fails

  if (!currentQuestionId) {
    throw new wsError("question not live yet", false);
  }

  if (!quiz.answers.has(currentQuestionId)) {
    console.log("current question entry not found in answer map cricical ERROR");
    throw new wsError("Internal Server Error kindly submit again", false);
  }

  if (quiz.answers.get(currentQuestionId)?.has(userId)) {
    return wsSend(socket, {
      type: "ANSWER_RESULT",
      accepted: false,
      message: "You have already answered this question.",
      yourScore: currentUser.score,
    });
  }

  const currentQuestionEntry = quiz.answers.get(currentQuestionId);

  if (!currentQuestionEntry || currentQuestionEntry === undefined) {
    throw new wsError("question not found");
  }
  currentQuestionEntry.set(userId, selectedOptionIndex);
  // ^ entry for the user for current question in answeres map

  if (quiz.questions.get(currentQuestionId)?.correctOptionIndex === selectedOptionIndex) {
    currentUser.score += 100; // udpating the score

    return wsSend(socket, {
      type: "ANSWER_RESULT",
      accepted: true,
      correct: true,
      yourScore: currentUser?.score,
      message: "Correct answer!",
    });
  } else {
    return wsSend(socket, {
      type: "ANSWER_RESULT",
      accepted: true,
      correct: false,
      yourScore: currentUser?.score,
      message: "Incorrect answer!",
    });
  }
};
