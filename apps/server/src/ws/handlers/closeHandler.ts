import type { AuthWebSocket } from "../types/ws.types.js";
import { getQuiz } from "../utils/getQuiz.js";
import { Quiz } from "../../http/models/quiz.js";
import { QuizMemory } from "../quiz.memory.js";
import type { QuizRoom } from "../quiz.memory.js";
import { broadCastMessage } from "../utils/broadCast.js";
import type { Notification } from "@common/contracts";
import { lobbyUpdates } from "../quiz/lobby.quiz.js";
import jwt from "jsonwebtoken";
const Secret = process.env.JWT_SECRET as string;
import { leaderboard } from "../quiz/leaderBoard.quiz.js";
import type { PhaseUpdate } from "@common/contracts";
export const handleClose = async (socket: AuthWebSocket, details: { code: number; reason: string }) => {
  if (socket.user) {
    const { quizId, userId, role } = socket.user;

    if (!QuizMemory.has(quizId)) {
      console.log(`Quiz with code ${quizId} has already been cleaned up or does not exist.`);
      return;
    }

    const quiz: QuizRoom = getQuiz(quizId);
    switch (role) {
      case "guest":
        const user = quiz?.users.get(userId);
        if (quiz?.users.size > 0 && quiz.hostConnection.ws) {
          quiz.users.delete(userId);
          quiz.answers.delete(userId);
          lobbyUpdates(quiz);
          leaderboard(quiz);
          console.log(`user : ${user?.name} left quiz :${quizId}`);
          return; // for guest leaving but quiz is running
        } else if (quiz?.users.size > 1) {
          quiz.users.delete(userId);
          console.log(`${user?.name} has been removed `);
          return; // kicking user one by one after the host has left
        } else {
          console.log(`${user?.name} last member has been removed `);
          QuizMemory.delete(quizId);
          await Quiz.findOneAndUpdate({ createdBy: quiz.host, gameState: "in_progress" }, { gameState: "ended" });
          console.log("quiz removed from memory closure handled gracefully");
          // room is removed when the last user disconnects
        }
        break;

      case "host":
        if (quiz.host === userId) {
          quiz.hostConnection.ws = null;
          let hostDisconnectedClosure: null | Notification = null;

          if (!details || details.reason.length == 0) {
            console.log("termination handled");

            (JSON.stringify(
              (hostDisconnectedClosure = {
                type: "NOTIFICATION",
                message: "The host has been disconnected. Showing final results...",
              }),
            ),
              broadCastMessage(quiz, hostDisconnectedClosure, { close: false }));

            quiz.phase = "results";

            const closeResponse: PhaseUpdate = {
              type: "PHASE",
              phase: quiz.phase,
            };
            broadCastMessage(quiz, closeResponse, { close: true, message: "quiz ended" }); // kick guest's out one by one

            return;
            // if host disconnects abrubtly
          } // for room termination due to host disconnected

          const response = JSON.parse(details.reason ?? hostDisconnectedClosure);

          // handle this later

          broadCastMessage(quiz, response, { close: true, message: "quiz ended" }); // kick guest's out one by one
          console.log("host disconnected closing room ....");

          if (quiz.users.size < 1) {
            console.log("deletetion ran");
            QuizMemory.delete(quizId);
            await Quiz.findOneAndUpdate({ roomCode: quizId }, { gameState: "ended" });
            return;
          } // host disconnects when room is empty
        }
        break;
    }
  } else {
    const url = socket.URL;
    const token = url.searchParams.get("jwtToken");
    if (token) {
      let user = jwt.verify(token, Secret);

      console.log(`Unauthorised user with id ${String(user)} `);
    } else {
      console.log("unkown user ", url);
    }
  }
};
// needs to be tested
