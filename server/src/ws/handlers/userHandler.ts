import type { IncomingMessage } from "http";
import type { AuthWebSocket } from "../types/ws.types.js";
import authenticateWs from "../authenticate.js";
import { isOpen } from "../utils/isOpen.js";
import { wsError } from "../utils/wsError.js";

export const handleUser = async (socket: AuthWebSocket, req: IncomingMessage) => {
  if (!isOpen(socket)) throw new wsError("Socket not open");

  const user = authenticateWs(req);
  socket.user = user;
};
