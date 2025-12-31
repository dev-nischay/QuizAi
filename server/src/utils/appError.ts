import { httpStatus } from "../types/enums.js";

export class AppError extends Error {
  constructor(public message: string, public statusCode: httpStatus, public details?: {}, public isOperational = true) {
    super(message);
  }
}
