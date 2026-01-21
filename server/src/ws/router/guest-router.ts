import type { AuthWebSocket } from "../types/ws.types.js";
import { joinRoom } from "../quiz/guestControls/join.quiz.js";
import { submitAnswer } from "../quiz/guestControls/submit.quiz.js";
import { isParticipant } from "../utils/validateRole.js";
import { isOpen } from "../utils/isOpen.js";
import { wsError } from "../utils/wsError.js";
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
        throw new wsError("Unauthrized Acess", true, 1008);
      }
      await submitAnswer(socket, message);
      break;

    case "LEAVE_ROOM":
      console.log("will be added soon");
      // for now just disconnect the socket to leave room
      break;

    default:
      throw new wsError("invalid route", false, 1002);
  }
};

export default guestRouter;
