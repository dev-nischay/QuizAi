import type { ApiError, ApiResponse, Question } from "@common/contracts";
import { useMutation } from "@tanstack/react-query";
import { submitQuiz } from "../services/postQuiz";
import { liveQuiz } from "../services/liveQuiz";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export type QuizFormData = {
  title: string;
  questions: Question[];
};

export type QuizResponse = {
  title: string;
  roomCode: string;
};

export const usePublishQuiz = (title: string, questions: Question[]) => {
  const setRoomCode = useAuthStore((state) => state.setRoomCode);

  const submitMutation = useMutation<ApiResponse<QuizResponse>, ApiError, QuizFormData>({
    mutationFn: submitQuiz,
  });

  const liveMutation = useMutation<ApiResponse<{ message: string }>, ApiError>({
    mutationFn: liveQuiz,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const publishQuiz = async () => {
    try {
      setLoading(true);
      const quiz = await submitMutation.mutateAsync({ title, questions });
      await liveMutation.mutateAsync();

      if (quiz.data?.roomCode) {
        setRoomCode(quiz.data?.roomCode);
      }
    } catch (error) {
      const errMessage = error as ApiError;
      setError(errMessage.error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    publishQuiz,
  };
};
