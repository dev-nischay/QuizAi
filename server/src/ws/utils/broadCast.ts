import type { ServerResponse } from "../types/server.types.js";
import type { QuizRoom } from "../types/ws.types.js";
import { wsSend } from "./wsSend.js";
import { wsError } from "./wsError.js";

export type CloseSockets = {
  close: boolean;
  message?: string;
};

export const broadCastMessage = (quiz: QuizRoom, response: ServerResponse, closeSocket: CloseSockets) => {
  const { close } = closeSocket;

  for (const { ws } of quiz.users.values()) {
    if (ws && ws.readyState === ws.OPEN) {
      wsSend(ws, response);

      if (close) {
        ws.close(1000, closeSocket.message);
      }
    } else {
      throw new wsError("socket not open", true);
    }
  }
};
