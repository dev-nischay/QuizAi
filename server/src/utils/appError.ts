import type { httpStatus } from "../types/constants.js";

export class AppError extends Error {
  constructor(public message: string, public statusCode: httpStatus, public isOperational = true) {
    super(message);
  }
}
