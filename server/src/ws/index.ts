import { WebSocketServer } from "ws";
import type { Server } from "http";
import authenticateWs from "./authenticate.js";
import type { AuthWebSocket } from "./ws.types.js";
import playerRouter from "./router/guest-router.js";
import hostRouter from "./router/host-router.js";
import { QuizMemory } from "./quiz.memory.js";
import type { ClientResponse } from "./quiz/quiz.types.js";
import { isOpen } from "./utils/isOpen.js";
import { statusLogger } from "./utils/statusLogger.js";
export const initWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server });
  // assuming room is already created
  wss.on("connection", (socket: AuthWebSocket, req) => {
    try {
      const user = authenticateWs(req);
      socket.user = user;
      statusLogger(socket);
    } catch (error) {
      if (error instanceof Error) {
        socket.close(1008, error.message);
      }
      console.log(error);
      return;
    }

    socket.on("message", (data: ClientResponse) => {
      statusLogger(socket);

      if (!isOpen(socket)) {
        throw new Error("Socket Connection Failed");
      }

      try {
        const message: ClientResponse = JSON.parse(String(data));

        if (socket.user.role === "guest") {
          return playerRouter(socket, message);
        } else return hostRouter(socket, message);
      } catch (error) {
        console.log(`Message Handler Error ${error}`);
        socket.send(JSON.stringify({ error: "Message cannot be sent" }));
      }
    });

    socket.on("close", () => {
      const { quizId, userId } = socket.user;

      const quiz = QuizMemory.get(quizId);
      if (quiz) {
        const user = quiz?.users.get(userId);
        if (user) {
          user && delete user?.ws;
        }
      }
    });
  });
};

// handle reconnect
