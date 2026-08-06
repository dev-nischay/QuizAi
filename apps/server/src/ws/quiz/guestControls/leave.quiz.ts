import type { LeaverQuizRequest } from "@common/contracts";
import type { AuthWebSocket } from "../../types/ws.types.js";
import { wsSend } from "../../utils/wsSend.js";
export const leaveQuiz = (socket: AuthWebSocket, message: LeaverQuizRequest) => {
  wsSend(socket, {
    type: "USER_LEFT",
    message: "you are disconnected ",
  });

  wsSend(socket, {
    type: "PHASE",
    phase: null,
  });

  socket.close(1000);
  // cleanup handled in closehandler
};
