import type { AuthWebSocket } from "../../types/ws.types.js";
import type { JoinMessageRequest } from "../../types/client.types.js";
import { getQuiz } from "../../utils/getQuiz.js";
import { wsError } from "../../utils/wsError.js";
import { joinQuizSchema, type joinBody } from "../../zod/quizActionsSchema.js";
import { zodParser } from "../../zod/zodParser.js";
import { wsSend } from "../../utils/wsSend.js";
import { lobbyUpdates } from "../lobby.quiz.js";
export const joinRoom = async (socket: AuthWebSocket, message: JoinMessageRequest) => {
  const { name } = zodParser(message, joinQuizSchema) as joinBody;

  const { userId, quizId, role } = socket.user;

  if (role === "host") {
    throw new wsError("Invalid Route");
  }

  const quiz = getQuiz(quizId);

  if (!quiz.hostConnection.ws) {
    throw new wsError("quiz must be live to join");
  }

  quiz.users.set(userId, {
    ws: socket,
    name,
    score: 0,
  });

  console.log(`user: ${message.name} joined room:${quizId}`);
  lobbyUpdates(quiz);

  wsSend(socket, { type: "USER_JOINED", message: `room joined with id ${quizId}` });
};
