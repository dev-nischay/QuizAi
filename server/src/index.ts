import "dotenv/config";
import express from "express";
import { logger } from "./middlewares/logger.js";
import authRouter from "./routes/auth-routes.js";
import { error } from "./middlewares/error.js";
import { connectDb } from "./utils/connectDb.js";
import { AppError } from "./utils/appError.js";
import { httpStatus } from "./types/enums.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(logger);
app.use("/api/auth/", authRouter); // auth routes
// app.use("/api/quiz/"); // quiz  cruds route

app.use((req, res, next) => {
  return next(new AppError("Route not found", httpStatus.NotFound));
});

app.use(error);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`server running on port ${PORT}`);
});
