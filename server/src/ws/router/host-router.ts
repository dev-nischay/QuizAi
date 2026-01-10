import type { AuthWebSocket } from "../ws.types.js";
import { startQuiz } from "../quiz/start.quiz.js";
import { joinRoom } from "../quiz/join.quiz.js";
import { showQuestion } from "../quiz/question.quiz.js";
import type { ClientResponse } from "../quiz/quiz.types.js";
export const hostRouter = (socket: AuthWebSocket, message: ClientResponse) => {
  const typeResponse = message.type;

  switch (typeResponse) {
    case "START_QUIZ":
      startQuiz(socket, message);
      break;

    case "SHOW_QUESTION":
      showQuestion(socket, message);
      break;

    case "SHOW_RESULT":
      console.log("DISPLAY RESULT");
      break;

    default:
      console.log("Error response not valid");
  }
};

export default hostRouter;
