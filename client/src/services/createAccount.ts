import type { AuthFormData } from "../components/auth/auth.types";
import { api } from "./api";

export const createAccount = async (data: AuthFormData) => {
  const res = await api.post("/api/auth/signup", data);

  return res.data;
};
