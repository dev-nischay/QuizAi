import "dotenv/config";
import express from "express";
import { logger } from "./http/middlewares/logger.js";
import authRouter from "./http/routes/auth-routes.js";
import { error } from "./http/middlewares/error.js";
import { AppError } from "./http/utils/appError.js";
import { httpStatus } from "./http/types/enums.js";
import { quizRouter } from "./http/routes/quiz-routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/api/auth/", authRouter);
app.use("/api/quiz/", quizRouter);

app.use((req, res, next) => {
  return next(new AppError("Route not found", httpStatus.NotFound));
});

app.use(error);

export default app;
