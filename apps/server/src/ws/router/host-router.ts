import type { AuthWebSocket } from "../types/ws.types.js";
import { startQuiz } from "../quiz/hostControls/start.quiz.js";
import { showQuestion } from "../quiz/hostControls/question.quiz.js";
import { stopQuiz } from "../quiz/hostControls/stop.quiz.js";
import { showResult } from "../quiz/hostControls/result.quiz.js";
import type {
  StartQuizRequest,
  ShowQuestionRequest,
  ShowResultRequest,
  StopQuizRequest,
  ClientResponse,
} from "@common/contracts";
import { wsError } from "../utils/wsError.js";
import { isOpen } from "../utils/isOpen.js";
import { isHost } from "../utils/validateRole.js";
import { wsSend } from "../utils/wsSend.js";

type HostRequest = StartQuizRequest | ShowQuestionRequest | ShowResultRequest | StopQuizRequest;

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
      await showResult(socket, message as ShowResultRequest);
      break;

    case "STOP_QUIZ":
      await stopQuiz(socket, message);
      break;

    default:
      throw new wsError("Invalid Route", false, 1002);
  }
};

export default hostRouter;
