import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";
import { httpStatus } from "../types/enums.js";
import jwt from "jsonwebtoken";
import type { Payload } from "../../types/global.types.js";
const Secret = process.env.JWT_SECRET;

if (!Secret) {
  console.error("Error in Envoirment Variables");
  process.exitCode = 1;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader?.length === 0) {
    return next(new AppError(" Auth Header not Found ", httpStatus.BadRequest));
  }

  const token = authHeader.split(" ")[1];

  if (!token || token.length === 0) {
    return next(new AppError("Token Not Found ", httpStatus.BadRequest));
  }

  try {
    const decode = jwt.verify(token, Secret as string) as Payload;

    const { userId, username } = decode;
    req.user = { userId, username };

    next();
  } catch (error) {
    console.log(error);
    return next(new AppError("Unauthorized, token missing or invalid", httpStatus.BadRequest));
  }
};
