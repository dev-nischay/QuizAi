// check for all the validation then send data in <name,score>
import { getQuiz } from "../utils/getQuiz.js";
import { isOpen } from "../utils/isOpen.js";
import type { AuthWebSocket } from "../types/ws.types.js";
import { isHost } from "../utils/validateRole.js";
import { wsError } from "../utils/wsError.js";
import { wsSend } from "../utils/wsSend.js";
import type { LeaderBoard } from "../types/ws.types.js";
import type { LeaderboardUpdates } from "../types/server.types.js";
import { broadCastMessage } from "../utils/broadCast.js";
export const leaderboard = (socket: AuthWebSocket) => {
  const { quizId, userId, role } = socket.user;

  const quiz = getQuiz(quizId);

  if (role !== "host" || !isHost(userId, quizId) || !isOpen(socket)) {
    throw new wsError("Unauthorized", true);
  }

  const leaderboard: LeaderBoard[] = [];

  if (quiz.users.size > 0) {
    const users = [...quiz.users.values()];

    for (const user of users) {
      leaderboard.push({ name: user.name, score: user.score });
    }

    // sending leaderboard results to every user

    // sending leaderboard updates to client and users

    const response: LeaderboardUpdates = {
      type: "LEADERBOARD",
      message: "updated values",
      data: leaderboard,
    };

    wsSend(quiz.hostConnection.ws!, response);

    broadCastMessage(quiz, response, { close: false });
    return;
  }
};
