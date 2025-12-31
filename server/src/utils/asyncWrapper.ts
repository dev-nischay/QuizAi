import type { Request, Response, NextFunction } from "express";
import type { TUser } from "../types/mongo.types.js";

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      return fn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

// see why using void fixed the return type error
