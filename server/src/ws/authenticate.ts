import type { IncomingMessage } from "http";
import jwt from "jsonwebtoken";
import { getUrl } from "./utils/parseUrl.js";
import type { Payload } from "../types/global.types.js";
import type { Client } from "./ws.types.js";
import { getQuiz } from "./utils/getQuiz.js";
import { connectUserSchema } from "./zod/userSchema.js";
import type { userBody } from "./zod/userSchema.js";
const Secret = process.env.JWT_SECRET as string;
import { zodParser } from "./zod/zodParser.js";
import { wsError } from "./utils/wsError.js";

if (!Secret) {
  console.error("Erorr in Envoirment Variables");
  process.exitCode = 1;
}

export const authenticateWs = (req: IncomingMessage): Client => {
  const parsedUrl = getUrl(req);
  const token = String(parsedUrl.searchParams.get("jwtToken"));
  const role = String(parsedUrl.searchParams.get("role")).trim();
  const quizId = String(parsedUrl.searchParams.get("quizId"));

  const quiz = getQuiz(quizId);

  if (!token || !role) {
    throw new wsError("Invalid or Missing credentials", 1003);
  }

  const { userId } = jwt.verify(token, Secret) as Payload;

  const result = zodParser({ userId, role, quizId }, connectUserSchema) as userBody;

  if (role === "host" && String(quiz.host).trim() !== userId) {
    throw new wsError("Unauthorized Host", 1008);
  }

  return result;
};

export default authenticateWs;
