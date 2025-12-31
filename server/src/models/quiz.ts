import mongoose from "mongoose";
const Schema = mongoose.Schema;
import type { TQuiz } from "../types/mongo.types.js";

const quizSchema = new Schema<TQuiz>({
  title: {
    type: String,
    required: true,
  },

  questions: [
    {
      text: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        validate: {
          validator: (v: string[]) => v.length === 4,
          message: "Options cannot be more than 4",
        },
        required: true,
      },
      correctOptionIndex: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: new Date().toISOString(),
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export const Quiz = mongoose.model<TQuiz>("quiz", quizSchema);
