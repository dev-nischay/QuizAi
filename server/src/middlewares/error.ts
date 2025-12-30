import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../utils/appError.js";
import { type ApiError } from "../types/constants.js";
import { httpStatus } from "../types/enums.js";

export const error: ErrorRequestHandler = (err: unknown, req: Request, res: Response<ApiError>) => {
  if (err instanceof AppError) {
    const statusCode = err.statusCode || 500;

    console.log(`expected Error:${err.message} \n stack ${err.stack} `);

    return res.status(statusCode).json({
      success: false,
      error: err.message,
    });
  }

  if (err instanceof Error) {
    console.log(`Unexpected Error:${err.message} \n stack ${err.stack} `);

    return res.status(httpStatus.InternalServerError).json({
      success: false,
      error: "Something Went Wrong try again later",
    });
  }
};
