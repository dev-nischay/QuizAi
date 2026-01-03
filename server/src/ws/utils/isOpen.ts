import type { AuthWebSocket } from "../ws.types.js";

export const isOpen = (socket: AuthWebSocket): boolean => {
  return socket.readyState === socket.OPEN;
};
