// same model for admin and users
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import type { TUser } from "../types/mongo.types.js";

const userSchema = new Schema<TUser>({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model<TUser>("user", userSchema);
