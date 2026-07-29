import type { AuthWebSocket } from "../types/ws.types.js";
import { joinRoom } from "../quiz/guestControls/join.quiz.js";
import { submitAnswer } from "../quiz/guestControls/submit.quiz.js";
import { isParticipant } from "../utils/validateRole.js";
import { wsError } from "../utils/wsError.js";
import { leaveQuiz } from "../quiz/guestControls/leave.quiz.js";
export const guestRouter = async (socket: AuthWebSocket, message: any) => {
  const typeRequest = message.type;
  const { userId, quizId, role } = socket.user;

  if (role !== "guest") {
    throw new wsError("unauthorized access", true);
  }

  switch (typeRequest) {
    case "JOIN_ROOM":
      await joinRoom(socket, message);
      break;

    case "SUBMIT_ANSWER":
      if (!isParticipant(userId, quizId)) {
        throw new wsError("Unauthorized Acess", true, 1008);
      }
      await submitAnswer(socket, message);
      break;

    case "LEAVE_ROOM":
      if (!isParticipant(userId, quizId)) {
        throw new wsError("Unauthorized Acess", true, 1008);
      }
      leaveQuiz(socket, message);
      break;

      break;

    default:
      throw new wsError("invalid route", false, 1002);
  }
};

export default guestRouter;
