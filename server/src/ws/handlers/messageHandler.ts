import type { ClientResponse } from "../quiz/quiz.types.js";
import type { AuthWebSocket } from "../ws.types.js";
import { isOpen } from "../utils/isOpen.js";
import { wsError } from "../utils/wsError.js";
import guestRouter from "../router/guest-router.js";
import hostRouter from "../router/host-router.js";
export const handleMessage = (socket: AuthWebSocket, raw: any) => {
  if (!isOpen(socket)) {
    throw new wsError("Socket Connection Failed");
  }

  const response: ClientResponse = JSON.parse(String(raw));
  switch (socket.user.role) {
    case "guest":
      guestRouter(socket, response);
      break;

    case "host":
      hostRouter(socket, response);
      break;

    default:
      socket.close(1002, "Invalid role");
      break;
  }
};
