import type { AuthWebSocket } from "../ws.types.js";
import { getQuiz } from "../utils/getQuiz.js";
export const handleClose = (socket: AuthWebSocket) => {
  const { quizId, userId } = socket.user;
  const quiz = getQuiz(quizId);
  if (quiz?.users.size! > 0) {
    const user = quiz?.users.get(userId);
    if (user) {
      user && delete user?.ws;
    }
  }
};
// needs to be tested
