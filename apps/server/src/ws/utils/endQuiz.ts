import type { PhaseUpdate } from "@common/contracts";
import { wsSend } from "./wsSend.js";
import type { QuizRoom } from "../quiz.memory.js";
import type { AuthWebSocket } from "../types/ws.types.js";
import { broadCastMessage } from "./broadCast.js";
import { leaderboard } from "../quiz/leaderBoard.quiz.js";

export const endQuiz = (quiz: QuizRoom, BroadCastText: string, hostSocket: AuthWebSocket) => {
  // sending quiz ended signal to all the users

  wsSend(hostSocket, {
    type: "NOTIFICATION",
    message: BroadCastText,
  });

  // updating current quiz phase
  quiz.phase = "results";

  const closeResponse: PhaseUpdate = {
    type: "PHASE",
    phase: quiz.phase,
  };

  wsSend(hostSocket, closeResponse);
  // send updated  phase to host

  broadCastMessage(quiz, { type: "NOTIFICATION", message: BroadCastText }, { close: false });

  const finalResult = leaderboard(quiz);

  if (finalResult) {
    wsSend(hostSocket, {
      type: "FINAL_RESULT",
      result: finalResult,
    });

    broadCastMessage(
      quiz,
      {
        type: "FINAL_RESULT",
        result: finalResult!,
      },
      { close: false },
    );
  }

  hostSocket.close(1000, JSON.stringify(closeResponse)); // sending updated phase to guests
};
