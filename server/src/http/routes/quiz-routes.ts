import Router from "express";
export const quizRouter = Router();
import { Validate } from "../middlewares/validator.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { createQuizSchema, updateQuizSchema, paramsValidator } from "../validation/quiz-schema.js";
import { createQuiz, deleteQuiz, getQuiz } from "../controllers/quiz-controller.js";
import { auth } from "../middlewares/auth.js";
quizRouter.use(auth);
quizRouter.post("/", Validate(createQuizSchema), asyncHandler(createQuiz));
quizRouter.delete("/:id", Validate(paramsValidator, "params"), asyncHandler(deleteQuiz));
// quizRouter.post("/:id/questions/",Validate(updateQuizSchema),asyncHandler()); update a quiz
quizRouter.get("/", asyncHandler(getQuiz));
