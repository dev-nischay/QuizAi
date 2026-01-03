import type { Request, Response, NextFunction } from "express";
import type { createQuizBody } from "../validation/quiz-schema.js";
import type { TQuiz } from "../types/mongo.types.js";
import { Quiz } from "../models/quiz.js";
import type { ApiResponse } from "../types/constants.js";
import mongoose from "mongoose";
import { AppError } from "../utils/appError.js";
import { httpStatus } from "../types/enums.js";
import { QuizMemory } from "../../ws/quiz.memory.js";

export const createQuiz = async (
  req: Request,
  res: Response<ApiResponse<Pick<TQuiz, "title"> & { _id: mongoose.Types.ObjectId }>>,
  next: NextFunction
) => {
  // saving quiz in db
  const { title, questions, quizId } = req.validatedBody as createQuizBody;
  const userId = req.user.id;
  const quiz = await Quiz.create({ title, questions, createdBy: userId });

  // adding quiz to websocket state

  if (QuizMemory.get(quizId)) {
    return next(new AppError(`Room with id ${quizId} already exists`, httpStatus.BadRequest));
  }

  const Quesmap = new Map(
    quiz.questions.map((e) => [
      e._id,
      {
        _id: e._id,
        text: e.text,
        options: e.options,
        correctOptionIndex: e.correctOptionIndex,
      },
    ])
  );

  console.log(Quesmap);

  QuizMemory.set(quizId, {
    host: userId,
    quizId,
    title,
    questions: Quesmap,
    answers: new Map(),
    currentQuestionId: null,
    users: new Map(),
  });

  console.log(QuizMemory);

  return res.json({
    success: true,
    data: {
      _id: quiz._id,
      title,
    },
  });
};

type DeleteQuizResponse = Pick<TQuiz, "title"> & {
  quizId: mongoose.Types.ObjectId;
};

export const deleteQuiz = async (req: Request, res: Response<ApiResponse<DeleteQuizResponse>>, next: NextFunction) => {
  const userId = req.user.id;
  const quizId = new mongoose.Types.ObjectId(req.validatedParams.id);

  const quiz = await Quiz.findOneAndDelete({ createdBy: userId, _id: quizId }, { new: true });

  if (!quiz) {
    return next(new AppError("quiz not found", httpStatus.NotFound));
  }

  return res.json({
    success: true,
    data: {
      quizId,
      title: quiz.title,
    },
  });
};

export const getQuiz = async (req: Request, res: Response, next: NextFunction) => {
  // add response type later
  const userId = req.user.id;

  const quiz = await Quiz.find({ createdBy: userId }).select("-__v");

  if (!quiz) {
    return next(new AppError("quiz not found ", httpStatus.NotFound));
  }

  return res.json({
    success: true,
    ...quiz,
  });
};
