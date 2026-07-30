import type { ClientResponse } from "@common/contracts";
import type { AuthWebSocket } from "../types/ws.types.js";
import { isOpen } from "../utils/isOpen.js";
import { wsError } from "../utils/wsError.js";
import guestRouter from "../router/guest-router.js";
import hostRouter from "../router/host-router.js";
import type { RawData } from "ws";
export const handleMessage = async (socket: AuthWebSocket, raw: RawData) => {
  if (!isOpen(socket)) {
    throw new wsError("Socket Connection Failed", true);
  }

  const string = String(raw);
  const response: ClientResponse = JSON.parse(string);
  switch (socket.user.role) {
    case "guest":
      await guestRouter(socket, response);
      break;

    case "host":
      await hostRouter(socket, response);
      break;

    default:
      throw new wsError("Invalid Role", true, 1002);
  }
};
