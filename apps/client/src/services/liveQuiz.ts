import { api } from "./api";

export const liveQuiz = async () => {
  const res = await api.put("api/quiz/live");
  return res.data;
};
