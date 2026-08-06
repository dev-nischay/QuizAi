import type { IncomingMessage } from "http";
import type { AuthWebSocket } from "../types/ws.types.js";
import authenticateWs from "../authenticate.js";
import { isOpen } from "../utils/isOpen.js";
import { wsError } from "../utils/wsError.js";
import { getUrl } from "../utils/parseUrl.js";

export const handleUser = (socket: AuthWebSocket, req: IncomingMessage) => {
  if (!isOpen(socket)) throw new wsError("Socket not open");
  const url = getUrl(req);
  socket.URL = url;
  const user = authenticateWs(req);
  socket.user = user;
};
