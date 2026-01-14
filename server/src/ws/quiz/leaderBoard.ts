// check for all the validation then send data in <userId||name,score>
import { QuizMemory } from "../quiz.memory.js";
import { getQuiz } from "../utils/getQuiz.js";
import { isOpen } from "../utils/isOpen.js";
import type { AuthWebSocket } from "../ws.types.js";
import { isHost } from "../utils/validateRole.js";
import { wsError } from "../utils/wsError.js";

export const leaderboard = (socket: AuthWebSocket) => {
  const { quizId, userId, role } = socket.user;

  const quiz = getQuiz(quizId);

  if (role !== "host" || !isHost(userId, quizId) || !isOpen(socket)) {
    throw new wsError("Unauthorized");
  }

  const leaderboard = [];

  if (quiz.users.size > 0) {
    const users = [...quiz.users.values()];

    for (const user of users) {
      leaderboard.push({ name: user.name, score: user.score });
    }

    const response = JSON.stringify({
      type: "leaderboard",
      message: "regular update",
      data: leaderboard,
    });

    // sending leaderboard results to every user
    for (const { ws } of users) {
      if (ws?.readyState === ws?.OPEN) {
        ws?.send(response);
      }
    }
  }
};
