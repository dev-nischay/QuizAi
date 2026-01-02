import type mongoose from "mongoose";
import type { JwtPayload } from "jsonwebtoken";
export type ApiResponse<T> = {
  success: true;
  message?: string;
  data?: T;
};

export type ApiError = {
  success: false;
  error: string;
  details?: {};
};

export interface Payload extends JwtPayload {
  id: string;
}
