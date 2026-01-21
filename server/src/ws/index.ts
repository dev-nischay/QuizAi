import { WebSocketServer, type RawData } from "ws";
import type { Server } from "http";
import type { AuthWebSocket } from "./types/ws.types.js";
import { handleError } from "./handlers/errorHandler.js";
import { handleUser } from "./handlers/userHandler.js";
import { handleMessage } from "./handlers/messageHandler.js";
import { handleClose } from "./handlers/closeHandler.js";
export const initWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server });
  wss.on("connection", async (socket: AuthWebSocket, req) => {
    try {
      handleUser(socket, req);
    } catch (error) {
      await handleError(socket, error);
    }

    socket.on("message", async (rawData: RawData) => {
      try {
        await handleMessage(socket, rawData);
      } catch (error) {
        await handleError(socket, error);
      }
    });

    socket.on("close", async () => {
      try {
        await handleClose(socket);
      } catch (error) {
        await handleError(socket, error);
      }
    });
  });
};
