import type { Date, Mongoose } from "mongoose";
import type mongoose from "mongoose";
import type { Question } from "../../types/global.types.js";

export type TQuiz = {
  title: string;
  questions: Question[];
  createdAt?: Date;
  createdBy: mongoose.Types.ObjectId;
};

export type TUser = {
  username: string;
  email: string;
  password: string;
};
