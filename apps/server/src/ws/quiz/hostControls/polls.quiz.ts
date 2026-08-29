import type { Vote } from "@common/contracts";
import { wsError } from "../../utils/wsError.js";
import type { PollsUpdates } from "@common/contracts";
import { broadCastMessage } from "../../utils/broadCast.js";
import type { QuizRoom } from "../../quiz.memory.js";
import { wsSend } from "../../utils/wsSend.js";

export const PollsUpdate = (quiz: QuizRoom) => {
  const questionId = quiz.currentQuestionId;

  if (!questionId) {
    throw new wsError("question not live yet");
  }

  if (quiz.questions.has(questionId)) {
    const currentAnswers = quiz.answers.get(questionId);

    if (!currentAnswers || currentAnswers === undefined) {
      throw new wsError("question is not attempted till now");
    }

    const votes: Vote[] = [];

    for (const [userId, selectedOptionIndex] of currentAnswers) {
      const user = quiz.users.get(userId);
      const name = user ? user.name : "Unknown User";
      votes.push({ name, selectedOptionIndex });
    }

    // formatting response
    const response: PollsUpdates = {
      type: "POLLS",
      roomCode: quiz.roomCode,
      questionId: questionId,
      votes,
    };

    // broadcasting live votes  to host
    wsSend(quiz.hostConnection.ws, response);

    return votes;
  }
};
