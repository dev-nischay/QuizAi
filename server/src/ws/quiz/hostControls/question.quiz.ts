import type { AuthWebSocket } from "../../types/ws.types.js";
import type { ShowQuestionRequest } from "../../types/client.types.js";
import { type showQuestionBody, showQuestionSchema } from "../../zod/quizActionsSchema.js";
import { zodParser } from "../../zod/zodParser.js";
import { getQuiz } from "../../utils/getQuiz.js";
import { wsError } from "../../utils/wsError.js";
import { increment, QuizMemory } from "../../quiz.memory.js";
import { CounterMemory } from "../../quiz.memory.js";
import type { QuestionResponse, QuizCompleted } from "../../types/server.types.js";
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

    if (CounterMemory >= questions.length) {
      const hostsocket = quiz.hostConnection.ws;

      leaderboard(socket);
      const response: QuizCompleted = {
        type: "QUIZ_COMPLETED",
        message: "quiz is finished",
      };

      broadCastMessage(quiz, response, { close: true, message: "quiz ended" });
      hostsocket?.close(1000, "quiz is finished");

      QuizMemory.delete(quizId); // quiz removed from memory
      await Quiz.findOneAndDelete({ createdBy: userId });
      return; // quiz removed from db
    }

    let currentQuestion = questions[CounterMemory];

    if (!currentQuestion) throw new wsError("Question not found", true);
    increment();

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
    wsSend(socket, response);
    // broadcasting current question to all the users
    broadCastMessage(quiz, response, { close: false });
  }
  leaderboard(socket);
  console.log(CounterMemory);
  return;
};
