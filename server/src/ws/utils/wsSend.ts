import type { AuthWebSocket } from "../types/ws.types.js";
import type { ServerResponse } from "../types/server.types.js";

export const wsSend = (socket: AuthWebSocket, payload: ServerResponse) => {
  return socket.send(JSON.stringify(payload));
};
