import type { AuthWebSocket } from "../ws.types.js";
import { isParticipant } from "../utils/validateRole.js";
import { joinRoom } from "../quiz/join.quiz.js";
import { submitAnswer } from "../quiz/submit.quiz.js";
export const guestRouter = (socket: AuthWebSocket, message: any) => {
  const typeResponse = message.type;
  const { quizId, userId } = socket.user;

  try {
    switch (typeResponse) {
      case "JOIN_ROOM":
        joinRoom(socket, message);
        break;

      case "SUBMIT_ANSWER":
        if (!isParticipant(userId, quizId)) {
          return socket.send(JSON.stringify({ type: "error", message: "Unauthorized" }));
        }
        submitAnswer(socket, message);
        break;

      case "LEAVE_ROOM":
        if (!isParticipant(userId, quizId)) {
          return socket.send(JSON.stringify({ type: "error", message: "Unauthorized" }));
        }
        console.log("QUIZ STARTED");
        break;

      default:
        console.log("Error response not valid");
    }
  } catch (error) {}
};

export default guestRouter;
