import type { Request, Response, NextFunction } from "express";
import type { checkQuizBody, createQuizBody, Question } from "@common/contracts";
import type { TQuiz } from "../types/mongo.types.js";
import { Quiz } from "../models/quiz.js";
import type { ApiResponse } from "@common/contracts";
import mongoose, { Mongoose } from "mongoose";
import { AppError } from "../utils/appError.js";
import { httpStatus } from "../types/enums.js";
import { QuizMemory } from "../../ws/quiz.memory.js";
import { generateRoomCode } from "../utils/generateCode.js";
export const createQuiz = async (
  req: Request,
  res: Response<ApiResponse<Pick<TQuiz, "title" | "roomCode">>>,
  next: NextFunction,
) => {
  // saving quiz in db

  const { title, questions } = req.validatedBody as createQuizBody;
  const { userId } = req.user;
  const roomCode = generateRoomCode();

  const inProgressQuiz = await Quiz.findOne({ createdBy: userId, gameState: "in_progress" });

  if (inProgressQuiz) {
    return next(new AppError("Finish your current quiz before creating a new one", httpStatus.Conflict));
  }

  const isWaitingQuiz = await Quiz.findOne({ createdBy: userId, gameState: "waiting" });

  if (isWaitingQuiz) {
    return next(new AppError("previous quiz must be finished before creating a new one", httpStatus.Conflict));
  }

  const quiz = await Quiz.create({ title, questions, createdBy: userId, roomCode, gameState: "waiting" });

  console.log(`creating room with id ${roomCode}`);
  // adding quiz to websocket state

  if (QuizMemory.has(roomCode)) {
    return next(new AppError(`Room with id ${roomCode} is already live`, httpStatus.Conflict));
  }

  return res.json({
    success: true,
    data: {
      title,
      roomCode,
    },
    message: `Room with code ${roomCode} is created`,
  });
};

export const liveQuiz = async (req: Request, res: Response<ApiResponse<{ message: string }>>, next: NextFunction) => {
  const { userId, username } = req.user;

  console.log(userId);
  const inProgressQuiz = await Quiz.findOne({ createdBy: userId, gameState: "in_progress" });
  if (inProgressQuiz) {
    return next(new AppError("Finish your current quiz before starting a new one", httpStatus.Conflict));
  }

  const objectId = new mongoose.Types.ObjectId(userId);

  const quiz = await Quiz.findOneAndUpdate(
    { createdBy: objectId, gameState: "waiting" },
    { $set: { gameState: "in_progress" } },
    { returnDocument: "after" },
  );

  console.log(quiz);

  if (!quiz) return next(new AppError("quiz not found", httpStatus.BadRequest));

  const { title, roomCode } = quiz;

  if (QuizMemory.has(roomCode)) {
    return next(new AppError(`Room with id ${roomCode} is already live`, httpStatus.Conflict));
  }

  const Quesmap = new Map(
    quiz.questions.map((e) => [
      String(e._id),
      {
        _id: String(e._id),
        text: e.text,
        options: e.options,
        correctOptionIndex: e.correctOptionIndex,
      },
    ]),
  );

  QuizMemory.set(roomCode, {
    host: userId,
    phase: null,
    hostConnection: {
      name: username,
      ws: null,
    },
    roomCode,
    title,
    questions: Quesmap,
    answers: new Map(),
    currentQuestionId: null,
    users: new Map(),
    questionIndex: 0,
  });
  console.log(QuizMemory);

  return res.json({ success: true, message: `Room with code: ${roomCode} is now live` });
};

type DeleteQuizResponse = Pick<TQuiz, "title"> & {
  quizId: mongoose.Types.ObjectId;
};

export const deleteQuiz = async (req: Request, res: Response<ApiResponse<DeleteQuizResponse>>, next: NextFunction) => {
  const userId = req.user.userId;
  const quizId = new mongoose.Types.ObjectId(req.validatedParams.id);

  const quiz = await Quiz.findOneAndDelete({ createdBy: userId, _id: quizId }, { new: true });

  if (!quiz) {
    return next(new AppError("quiz not found", httpStatus.BadRequest));
  }

  return res.json({
    success: true,
    data: {
      quizId,
      title: quiz.title,
    },
  });
};

export const checkQuiz = async (req: Request, res: Response, next: NextFunction) => {
  // add response type later
  const { roomCode } = req.validatedBody as checkQuizBody;

  const quiz = await Quiz.findOne({ roomCode }).select("_id gameState");
  const quizInMemory = QuizMemory.get(roomCode);

  if (!quiz) {
    return next(new AppError("quiz not found ", httpStatus.BadRequest));
  }

  if (quiz.gameState === "ended") {
    return next(new AppError("The quiz you're trying to join has ended ", httpStatus.BadRequest));
  }

  if (!quizInMemory || quizInMemory.phase !== "lobby") {
    if (!quizInMemory || !quizInMemory.phase) {
      return next(new AppError("Host has not started the quiz yet", httpStatus.BadRequest));
    }
    if (quizInMemory.phase === "active") {
      return next(new AppError("The quiz has already started", httpStatus.BadRequest));
    }
    if (quizInMemory.phase === "results") {
      return next(new AppError("The quiz has ended", httpStatus.BadRequest));
    }
  }

  return res.json({
    success: true,
    message: `Joining room with id ${roomCode} `,
    data: quiz,
  });
};

export const testQuiz = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name;

  if (name !== "nischay") {
    return next(new AppError("invalid user", httpStatus.Unauthorized));
  }

  const quiz = {
    title: "Marvel Cinematic Universe Quiz",
    roomCode: "MCU01",
    questions: [
      {
        _id: "q1",
        text: "Who is known as the God of Thunder?",
        options: ["Loki", "Thor", "Odin", "Heimdall"],
        correctOptionIndex: 1,
      },
      {
        _id: "q2",
        text: "Which Infinity Stone is housed inside the Tesseract?",
        options: ["Mind Stone", "Power Stone", "Space Stone", "Time Stone"],
        correctOptionIndex: 2,
      },
      {
        _id: "q3",
        text: "What is the real name of Iron Man?",
        options: ["Steve Rogers", "Bruce Banner", "Tony Stark", "Clint Barton"],
        correctOptionIndex: 2,
      },
      {
        _id: "q4",
        text: "Who says the famous line 'I can do this all day'?",
        options: ["Captain America", "Black Panther", "Spider-Man", "Falcon"],
        correctOptionIndex: 0,
      },
      {
        _id: "q5",
        text: "Which Avenger is a master of the mystic arts?",
        options: ["Vision", "Doctor Strange", "Ant-Man", "Star-Lord"],
        correctOptionIndex: 1,
      },
      {
        _id: "q6",
        text: "Who collected all six Infinity Stones and snapped his fingers?",
        options: ["Ultron", "Thanos", "Loki", "Red Skull"],
        correctOptionIndex: 1,
      },
    ] as Question[],
  };

  const quizId = "123456";

  const userId = req.user.userId;
  const username = req.user.username;

  const Quesmap = new Map(
    quiz.questions.map((e) => [
      String(e._id),
      {
        _id: String(e._id),
        text: e.text,
        options: e.options,
        correctOptionIndex: e.correctOptionIndex,
      },
    ]),
  );

  QuizMemory.set(quizId, {
    host: userId,
    phase: null,
    hostConnection: {
      name: username,
      ws: null,
    },
    roomCode: quiz.roomCode,
    title: quiz.title,
    questions: Quesmap,
    answers: new Map(),
    currentQuestionId: null,
    users: new Map(),
    questionIndex: 0,
  });

  console.log(QuizMemory);

  return res.json({
    success: true,
    data: {
      title: quiz.title,
    },
    message: `Room with id ${quizId} is created`,
  });
};
