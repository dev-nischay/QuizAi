import type { AuthWebSocket } from "../types/ws.types.js";
import { getQuiz } from "../utils/getQuiz.js";
import { Quiz } from "../../http/models/quiz.js";
import { QuizMemory } from "../quiz.memory.js";
import type { QuizRoom } from "../quiz.memory.js";
import type { StopQuizResponse } from "@common/contracts";
import { broadCastMessage } from "../utils/broadCast.js";
import { lobbyUpdates } from "../quiz/lobby.quiz.js";
import { leaderboard } from "../quiz/leaderBoard.quiz.js";
export const handleClose = async (socket: AuthWebSocket, details: { code: number; reason: string }) => {
  const { quizId, userId, role } = socket.user;
  const quiz: QuizRoom = getQuiz(quizId);

  if (quizId.length > 0 && userId.length > 0) {
    switch (role) {
      case "guest":
        if (quiz?.users.has(userId) && quiz?.users.size > 0 && quiz.hostConnection.ws) {
          const user = quiz?.users.get(userId);
          quiz.users.delete(userId);
          quiz.answers.delete(userId);
          lobbyUpdates(quiz);
          leaderboard(quiz);
          console.log(`user : ${user?.name} left quiz :${quizId}`);
          return;
        } else {
          // socket.user.quizId = "";
          // socket.user.userId = "";

          QuizMemory.delete(quizId);
          await Quiz.findOneAndDelete({ createdBy: userId });
          console.log("quiz removed from memory closure handled gracefully");
          return;
        }
        break;

      case "host":
        if (quiz.host === userId) {
          quiz.hostConnection.ws = null;

          const response: StopQuizResponse = {
            type: "QUIZ_STOPPED",
            message: "host has been disconnected\n redirecting to join page",
          };

          broadCastMessage(quiz, response, { close: true, message: "quiz ended abrubtly due to host disconnection" });
          console.log("host disconnected closing room ....");
          return;
        }
        break;

      default:
        break;
    }
  } else {
  }
};

// needs to be tested

// normal closure (quiz ended early / completed ) , unexpected closure (host disconnected)
