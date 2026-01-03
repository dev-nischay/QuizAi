import { WebSocketServer } from "ws";
import type { Server } from "http";
import authenticateWs from "./authenticate.js";
import type { AuthWebSocket } from "./ws.types.js";
import guestRouter from "./router/guest-router.js";
import hostRouter from "./router/host-router.js";
import { QuizMemory } from "./quiz.memory.js";

export const initWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server });
  // assuming room is already created
  wss.on("connection", (socket: AuthWebSocket, req) => {
    try {
      const user = authenticateWs(req);
      socket.user = user;
    } catch {
      socket.close(1008, "Unauthorized");
      return;
    }

    socket.on("message", (data) => {
      if (socket.readyState !== socket.OPEN) {
        return new Error("Socket Connection Failed");
      }

      try {
        const message = JSON.parse(data.toString());

        if (socket.user.role == "guest") guestRouter(socket, message);
        else hostRouter(socket, message);
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
        user && delete user?.ws;
      }
    });
  });
};

// handle reconnect
