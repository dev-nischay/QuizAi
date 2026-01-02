import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { AppError } from "../utils/appError.js";
import { httpStatus } from "../types/enums.js";
export const Validate = (schema: ZodType, source: "body" | "params" | "query" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = req[source];
      const parsed = schema.safeParse(data);

      if (!parsed.success) {
        const readableError = Object.fromEntries(
          parsed.error.issues.map((issue) => [issue.path.join(), issue.message])
        );
        console.log(readableError);

        return next(new AppError("Invalid request schema", httpStatus.BadRequest, readableError));
      }

      if (source === "body") {
        req.validatedBody = parsed.data;
      } else if (source === "params") req.validatedParams = parsed.data as { id: string };
      else req.validatedQuery = parsed.data;

      next();
    } catch (error) {
      return next(error);
    }
  };
};
