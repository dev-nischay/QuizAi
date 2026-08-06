import type { Date, Mongoose } from "mongoose";
import type mongoose from "mongoose";
import type { Question } from "@common/contracts";

export type GameState = "waiting" | "in_progress" | "ended";

export type TQuiz = {
  title: string;
  gameState: GameState;
  roomCode: string;
  questions: Question[];
  createdAt?: Date;
  createdBy: mongoose.Types.ObjectId;
};

export type TUser = {
  username: string;
  email: string;
  password: string;
};
