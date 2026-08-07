import { socketService } from "./socket-client";
import { startQuiz } from "./handlers/host/startQuiz";
import { joinQuiz } from "./handlers/guest/joinQuiz";
import { useState } from "react";

export const useSocket = (quizData: {
  token: string;
  role: "host" | "guest" | null;
  quizId: string | null;
  username: string;
}) => {
  const { token, role, quizId, username } = quizData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function connect() {
    try {
      setLoading(true);
      await socketService.connect(token, role!, quizId!);

      if (role === "host") {
        socketService.sendMessage(startQuiz());
      } else if (role === "guest") {
        socketService.sendMessage(joinQuiz(username));
      }
    } catch (error) {
      error instanceof Error ? setError(error.message) : console.warn(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    connect,
    error,
  };
};
