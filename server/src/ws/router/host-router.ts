import type { AuthWebSocket } from "../types/ws.types.js";
import { startQuiz } from "../quiz/hostControls/start.quiz.js";
import { showQuestion } from "../quiz/hostControls/question.quiz.js";
import type { ClientResponse } from "../types/client.types.js";
import { wsError } from "../utils/wsError.js";
import { isOpen } from "../utils/isOpen.js";
import { isHost } from "../utils/validateRole.js";
import { wsSend } from "../utils/wsSend.js";
export const hostRouter = async (socket: AuthWebSocket, message: ClientResponse) => {
  const typeResponse = message.type;
  const { role, quizId, userId } = socket.user;

  if (!isOpen) {
    throw new wsError("socket not open", true);
  }

  if (role !== "host" || !isHost(userId, quizId)) {
    throw new wsError("Unauthorized Acess", true);
  }

  switch (typeResponse) {
    case "START_QUIZ":
      await startQuiz(socket, message);
      break;

    case "SHOW_QUESTION":
      await showQuestion(socket, message);
      break;

    case "SHOW_RESULT":
      wsSend(socket, {
        type: "RESPONSE",
        message: "This feature will be available soon",
      });
      break;

    default:
      throw new wsError("Invalid Route", false, 1002);
  }
};

export default hostRouter;
