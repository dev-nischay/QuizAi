import type { AuthWebSocket } from "../types/ws.types.js";
import { getQuiz } from "../utils/getQuiz.js";
import { wsError } from "../utils/wsError.js";
import { Quiz } from "../../http/models/quiz.js";
import { QuizMemory } from "../quiz.memory.js";
import type { GeneralResponse } from "../types/server.types.js";
import { broadCastMessage } from "../utils/broadCast.js";
import { lobbyUpdates } from "../quiz/lobby.quiz.js";
export const handleClose = async (socket: AuthWebSocket) => {
  const { quizId, userId } = socket.user;
  const quiz = getQuiz(quizId);

  if (quiz.host === userId) {
    quiz.hostConnection.ws = null;

    const response: GeneralResponse = {
      type: "RESPONSE",
      message: "host has been disconnected\n redirecting to join page",
    };

    broadCastMessage(quiz, response, { close: true, message: "quiz ended abrubtly due to host disconnection" });
    QuizMemory.delete(quizId);
    await Quiz.findOneAndDelete({ createdBy: userId });
    console.log("host disconnected room is closed");
    return;
  }

  if (quiz?.users.has(userId) && quiz?.users.size > 0) {
    const user = quiz?.users.get(userId);
    quiz.users.delete(userId);
    quiz.answers.delete(userId);
    lobbyUpdates(quiz);
    console.log(`user : ${user?.name} left quiz :${quizId}`);
  } else {
    throw new wsError(`unkown user, userId:${userId}`, true, 1008);
  }
};
// needs to be tested
