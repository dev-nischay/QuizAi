// const { isPending, mutate, isError } = useMutation<ApiResponse<{ message: string }>, ApiError>({
//     mutationFn: liveQuiz,
//     onSuccess: () => {
//       nav("/live");
//     },
//     onError: (err) => {
//       setGenericError(err.error); // error:generic error
//     },
//   });

import type { ApiError, ApiResponse, Question } from "@common/contracts";
import { useMutation } from "@tanstack/react-query";
import { submitQuiz } from "../services/postQuiz";
import { liveQuiz } from "../services/liveQuiz";
import { useState } from "react";

export type QuizFormData = {
  title: string;
  questions: Question[];
};

export type QuizResponse = {
  title: string;
  roomCode: string;
};

export const usePublishQuiz = (title: string, questions: Question[]) => {
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
      await submitMutation.mutateAsync({ title, questions });
      await liveMutation.mutateAsync();
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
