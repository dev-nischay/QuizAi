import { api } from "./api";

export const checkQuiz = async (data: { roomCode: string }) => {
  const res = await api.post("api/quiz/check", { roomCode: data.roomCode });
  return res.data;
};
