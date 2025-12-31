import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";
import { httpStatus } from "../types/enums.js";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/constants.js";
const secret = process.env.JWT_SECRET;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader?.length === 0) {
    return next(new AppError(" Auth Header not Found ", httpStatus.Unauthorized));
  }

  const token = authHeader.split(" ")[1];

  if (!token || token.length === 0) {
    return next(new AppError("Token Not Found ", httpStatus.NotFound));
  }

  try {
    const decode = jwt.verify(token, secret as string) as JwtPayload;
    req.user = decode;
    next();
  } catch (error) {
    return next(new AppError("Unauthorized, token missing or invalid", httpStatus.Unauthorized));
  }
};
