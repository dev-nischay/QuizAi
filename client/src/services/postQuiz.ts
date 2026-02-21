import type { QuizFormData } from "../components/quiz/quiz.types";
import { api } from "./api";
import { QuizFormData } from "../components/quiz/quiz.types";
export const submitQuiz = async (data: QuizFormData) => {
  const res = await api.post("/api/quiz/");
  return res.data;
};
