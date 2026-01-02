import type { Date, Mongoose } from "mongoose";
import type mongoose from "mongoose";

export type Questions = {
  text: string;
  options: string[];
  correctOptionIndex: 0 | 1 | 2 | 3;
};

export type TQuiz = {
  title: string;
  questions: Questions[];
  createdAt?: Date;
  createdBy: mongoose.Types.ObjectId;
};

export type TUser = {
  username: string;
  email: string;
  password: string;
};
