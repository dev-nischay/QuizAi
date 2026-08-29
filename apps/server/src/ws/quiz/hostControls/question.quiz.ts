import type { AuthWebSocket } from "../../types/ws.types.js";
import type { PhaseUpdate, ShowQuestionRequest } from "@common/contracts";
import { type showQuestionBody, showQuestionSchema } from "../../zod/quizActionsSchema.js";
import { zodParser } from "../../zod/zodParser.js";
import { getQuiz } from "../../utils/getQuiz.js";
import { wsError } from "../../utils/wsError.js";
import type { QuestionResponse } from "@common/contracts";
import { leaderboard } from "../leaderBoard.quiz.js";
import { broadCastMessage } from "../../utils/broadCast.js";
import { wsSend } from "../../utils/wsSend.js";
import { endQuiz } from "../../utils/endQuiz.js";
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

      endQuiz(quiz, "Quiz ended. Showing final results...", hostsocket);

      return;
    } // quiz finished

    let currentQuestion = questions[quiz.questionIndex];

    if (!currentQuestion) throw new wsError("Question not found", true);

    console.log(`Currently Showing Question${currentQuestion.text}`);

    quiz.currentQuestionId = currentQuestion._id;

    // formatting response
    const response: QuestionResponse = {
      type: "QUESTION",
      quizId,
      questionId: currentQuestion._id,
      text: currentQuestion.text,
      options: currentQuestion.options,
      currentQuestionIndex: quiz.questionIndex,
    };

    // creating current question entry in answered map
    quiz.answers.set(currentQuestion._id, new Map());

    // updating the quiz phase to active for ui synchronization

    quiz.phase = "active";

    // sending current live question to host
    wsSend(socket, {
      type: "QUESTION",
      quizId,
      questionId: currentQuestion._id,
      text: currentQuestion.text,
      options: currentQuestion.options,
      correctOptionIndex: currentQuestion.correctOptionIndex,
      currentQuestionIndex: quiz.questionIndex,
    });

    // broadcasting current question to all the users
    broadCastMessage(quiz, response, { close: false });

    // updating leaderboard
    leaderboard(quiz);

    // sending updated phase to both host and users on the intial question
    if (quiz.questionIndex == 0) {
      const phaseUpdate: PhaseUpdate = {
        type: "PHASE",
        phase: quiz.phase,
      };
      wsSend(socket, phaseUpdate);

      broadCastMessage(quiz, phaseUpdate, { close: false });
    }

    quiz.questionIndex++;
  }
  console.log(quiz.questionIndex);
  return;
};
