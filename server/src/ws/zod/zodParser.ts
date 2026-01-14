import { wsError } from "../utils/wsError.js";
import { type ZodType } from "zod";

export const zodParser = (rawData: object, zodSchema: ZodType) => {
  const result = zodSchema.safeParse(rawData);

  if (result.error) {
    const readableError = Object.fromEntries(result.error.issues.map((issue) => [issue.path.join(), issue.message]));

    throw new wsError("Incorrect or Invalid feilds", 1003, readableError);
  }

  return result.data;
};
