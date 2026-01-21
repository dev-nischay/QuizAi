// returns the no. of people in the current quiz

import type { LobbyUpdates } from "../types/server.types.js";
import type { QuizRoom } from "../types/ws.types.js";
import { broadCastMessage } from "../utils/broadCast.js";
import { wsSend } from "../utils/wsSend.js";

export const lobbyUpdates = (quiz: QuizRoom) => {
  const userCount = quiz.users.size;
  const response: LobbyUpdates = {
    type: "LOBBY",
    userCount,
  };
  wsSend(quiz.hostConnection.ws!, response);

  return broadCastMessage(quiz, response, { close: false });
};
