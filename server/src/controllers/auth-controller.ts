import type { Request, Response, NextFunction } from "express";
import type { loginBody, signupBody } from "../validation/auth-schema.js";
import type { ApiResponse, JwtPayload } from "../types/constants.js";
import { User } from "../models/user.js";
import { AppError } from "../utils/appError.js";
import { httpStatus } from "../types/enums.js";
import bcrypt from "bcrypt";
import type { TUser } from "../types/mongo.types.js";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export const createAccount = async (req: Request, res: Response<ApiResponse<TUser>>, next: NextFunction) => {
  const { password, email, ...restData } = req.validatedBody as signupBody;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("User with this email already exists", httpStatus.BadRequest));
  }

  const hashPass = await bcrypt.hash(password, 10);

  await User.create({
    ...restData,
    password: hashPass,
    email,
  });

  return res.json({
    success: true,
    data: {
      ...restData,
      email,
      password,
    },
  });
};

export const loginAccount = async (
  req: Request,
  res: Response<ApiResponse<Pick<TUser, "email" & "password">>>,
  next: NextFunction
) => {
  const { email, password } = req.validatedBody as loginBody;
  const userExits = await User.findOne({ email });

  if (!userExits) {
    return next(new AppError("user not found", httpStatus.NotFound));
  }

  const compare = await bcrypt.compare(password, userExits.password);

  if (!compare) {
    return next(new AppError("incorrect password", httpStatus.Unauthorized));
  }

  if (secret) {
    const payload = jwt.sign(
      <JwtPayload>{
        id: userExits._id,
      },
      secret
    );

    return res.json({
      success: true,
      data: { token: payload },
    });
  } else {
    return next(new AppError("Secret not applied", httpStatus.InternalServerError));
  }
};

export const getAccount = async (req: Request, res: Response<ApiResponse<TUser>>, next: NextFunction) => {
  const userId = req.user.id;

  const userInfo = (await User.findOne({ _id: userId }).select("username  email ")) as TUser;

  if (!userInfo) {
    return next(new AppError("Unauthorized, user not found", httpStatus.BadRequest));
  }

  return res.json({
    success: true,
    data: userInfo,
  });
};
