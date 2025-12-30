import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";
import { httpStatus } from "../types/enums.js";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;
const Verify = (token: string) => {
  return new Promise((resolve, reject) => {
    if (secret) {
      jwt.verify(token, secret as string, (err, payload) => {
        err ? reject(err) : resolve(payload);
      });
    } else {
      return console.log("Secret Not found");
    }
  });
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader?.length === 0) {
    return next(new AppError(" AUthor Header not Found ", httpStatus.Unauthorized));
  }

  const token = authHeader.split(" ")[1];

  if (!token || token.length === 0) {
    return next(new AppError("Token Not Found ", httpStatus.NotFound));
  }

  try {
    const decode = (await Verify(token)) as { id: string; role: "admin" | "user" }; // add jwt payload type

    if (!decode) {
      return next(new AppError("Invalid Token", httpStatus.Unauthorized));
    }

    req.user = decode;
    next();
  } catch (error) {
    return next(new AppError("Something went wrong ", httpStatus.InternalServerError));
  }
};
