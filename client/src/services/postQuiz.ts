import type { QuizFormData } from "../components/quiz/quiz.types";
import { api } from "./api";
export const submitQuiz = async (data: QuizFormData) => {
  const res = await api.post("/api/quiz/", data);
  return res.data;
};
