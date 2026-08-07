// check for all the validation then send data in <name,score>
import { wsSend } from "../utils/wsSend.js";
import type { LeaderBoard } from "../types/ws.types.js";
import type { LeaderboardUpdates } from "@common/contracts";
import { broadCastMessage } from "../utils/broadCast.js";
import type { QuizRoom } from "../quiz.memory.js";
export const leaderboard = (quiz: QuizRoom) => {
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
    return leaderboard;
  }
};
