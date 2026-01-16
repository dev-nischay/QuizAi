import type { AuthWebSocket } from "../types/ws.types.js";

export const isOpen = (socket: AuthWebSocket): boolean => {
  return socket.readyState === socket.OPEN;
};
