// returns the no. of people in the current quiz

import type { LobbyUpdates } from "@common/contracts";
import type { QuizRoom } from "../quiz.memory.js";

import { broadCastMessage } from "../utils/broadCast.js";
import { wsSend } from "../utils/wsSend.js";

export const lobbyUpdates = (quiz: QuizRoom) => {
  const users = [...quiz.users.values()].map((user) => user.name);

  const response: LobbyUpdates = {
    type: "LOBBY",
    users,
  };
  wsSend(quiz.hostConnection.ws!, response);

  return broadCastMessage(quiz, response, { close: false });
};
