import type { AuthFormData } from "../components/auth/auth.types";
import { api } from "./api";

export const loginAccount = async (data: AuthFormData) => {
  const res = await api.post("/api/auth/signin", data);

  return res.data;
};
