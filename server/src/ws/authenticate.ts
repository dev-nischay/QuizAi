import type { IncomingMessage } from "http";
import jwt from "jsonwebtoken";
import { getUrl } from "./utils/parseUrl.js";
import type { Payload } from "../types/global.types.js";
import type { Client } from "./ws.types.js";
import { QuizMemory } from "./quiz.memory.js";

export const HOST = process.env.HOST as string;
const Secret = process.env.JWT_SECRET as string;
if (!HOST || !Secret) {
  console.error("Erorr in Envoirment Variables");
  process.exitCode = 1;
}

export const authenticateWs = (req: IncomingMessage): Client => {
  const parsedUrl = getUrl(req, HOST);
  const token = parsedUrl.searchParams.get("jwtToken");
  const role = parsedUrl.searchParams.get("role");
  const quizId = parsedUrl.searchParams.get("quizId") as string;

  const quiz = QuizMemory.get(quizId);
  if (!token || !role) {
    throw new Error("Invalid or Missing credentials");
  }

  const { userId } = jwt.verify(token, Secret) as Payload;

  if (role !== "host" || "guest") {
    throw new Error("Invalid role");
  }

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  if (role === "host" && quiz.host !== userId) {
    throw new Error("Unauthorized Host");
  }

  return {
    userId,
    role,
    quizId,
  };

  // throws error if valiations fails
};

export default authenticateWs;
