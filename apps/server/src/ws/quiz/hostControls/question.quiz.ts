import type { AuthWebSocket } from "../../types/ws.types.js";
import type { ShowQuestionRequest } from "@common/contracts";
import { type showQuestionBody, showQuestionSchema } from "../../zod/quizActionsSchema.js";
import { zodParser } from "../../zod/zodParser.js";
import { getQuiz } from "../../utils/getQuiz.js";
import { wsError } from "../../utils/wsError.js";
import { QuizMemory } from "../../quiz.memory.js";
import type { QuestionResponse, QuizCompleted } from "@common/contracts";
import { Quiz } from "../../../http/models/quiz.js";
import { leaderboard } from "../leaderBoard.quiz.js";
import { broadCastMessage } from "../../utils/broadCast.js";
import { wsSend } from "../../utils/wsSend.js";
export const showQuestion = async (socket: AuthWebSocket, message: ShowQuestionRequest) => {
  zodParser(message, showQuestionSchema) as showQuestionBody;

  const { quizId, userId } = socket.user;

  const quiz = getQuiz(quizId);

  if (!quiz.hostConnection.ws) {
    throw new wsError("host must start quiz first to continue");
  }

  if (quiz.questions && quiz.questions.size > 0) {
    const questions = [...quiz.questions.values()];

    if (quiz.questionIndex >= questions.length) {
      const hostsocket = quiz.hostConnection.ws;

      leaderboard(quiz);
      const response: QuizCompleted = {
        type: "QUIZ_COMPLETED",
        message: "quiz is finished",
      };
      wsSend(hostsocket, response);
      hostsocket?.close(1000, JSON.stringify(response));
      return;
    }

    let currentQuestion = questions[quiz.questionIndex];

    if (!currentQuestion) throw new wsError("Question not found", true);
    quiz.questionIndex++;

    console.log(`Currently Showing Question${currentQuestion.text}`);

    quiz.currentQuestionId = currentQuestion._id;

    // formatting response
    const response: QuestionResponse = {
      type: "QUESTION",
      quizId,
      questionId: currentQuestion._id,
      text: currentQuestion.text,
      options: currentQuestion.options,
    };

    // creating current question entry in answered map
    quiz.answers.set(currentQuestion._id, new Map());

    // sending current live question to host
    wsSend(socket, {
      type: "QUESTION",
      quizId,
      questionId: currentQuestion._id,
      text: currentQuestion.text,
      options: currentQuestion.options,
      correctOptionIndex: currentQuestion.correctOptionIndex,
    });
    // broadcasting current question to all the users
    broadCastMessage(quiz, response, { close: false });
  }
  leaderboard(quiz);
  console.log(quiz.questionIndex);
  return;
};
