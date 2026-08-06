import type { StopQuizResponse, PhaseUpdate, ServerResponse, QuizCompleted } from "@common/contracts";
import { wsSend } from "./wsSend.js";
import type { QuizRoom } from "../quiz.memory.js";
import type { AuthWebSocket } from "../types/ws.types.js";
import { broadCastMessage } from "./broadCast.js";

export const endQuiz = (quiz: QuizRoom, response: StopQuizResponse | QuizCompleted, hostSocket: AuthWebSocket) => {
  // sending quiz ended signal to all the users

  wsSend(hostSocket, response);

  broadCastMessage(quiz, response, { close: false });

  // updating current quiz phase
  quiz.phase = "results";

  const closeResponse: PhaseUpdate = {
    type: "PHASE",
    phase: quiz.phase,
  };

  wsSend(hostSocket, closeResponse);
  // send updated  phase to host

  hostSocket.close(1000, JSON.stringify(closeResponse)); // sending updated phase to guests
};
