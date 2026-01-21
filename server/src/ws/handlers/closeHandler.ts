import type { AuthWebSocket } from "../types/ws.types.js";
import { getQuiz } from "../utils/getQuiz.js";
import { isHost } from "../utils/validateRole.js";
import { wsError } from "../utils/wsError.js";
import { wsSend } from "../utils/wsSend.js";
import { Quiz } from "../../http/models/quiz.js";
import { QuizMemory } from "../quiz.memory.js";
export const handleClose = async (socket: AuthWebSocket) => {
  const { quizId, userId } = socket.user;
  const quiz = getQuiz(quizId);

  if (quiz.host === userId) {
    quiz.hostConnection.ws = null;

    for (const user of quiz.users.values()) {
      wsSend(user.ws, {
        type: "Response",
        message: "host has been disconnected\n redirecting to join page",
      });

      console.log("ran");
      user.ws.close(1000, "quiz ended"); // quiz ended due to host disconnection
    }
    QuizMemory.delete(quizId);
    await Quiz.findOneAndDelete({ createdBy: userId });
    console.log("host disconnected room is closed");
    return;
  }

  if (quiz?.users.has(userId) && quiz?.users.size > 0) {
    const user = quiz?.users.get(userId);
    quiz.users.delete(userId);
    quiz.answers.delete(userId);
    console.log(`user : ${user?.name} left quiz :${quizId}`);
  } else {
    throw new wsError(`unkown user, userId:${userId}`, true, 1008);
  }
};
// needs to be tested
