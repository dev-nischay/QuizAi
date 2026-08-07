import type { AuthWebSocket } from "../types/ws.types.js";
import type { ServerResponse } from "@common/contracts";
import WebSocket from "ws";

export const wsSend = (socket: AuthWebSocket | null | undefined, payload: ServerResponse) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    return socket.send(JSON.stringify(payload));
  }
};
