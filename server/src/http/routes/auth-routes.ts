import { Router } from "express";
const authRouter = Router();
import { Validate } from "../middlewares/validator.js";
import { auth } from "../middlewares/auth.js";
import { loginSchema, signupSchema } from "../validation/auth-schema.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { loginAccount, createAccount, getAccount } from "../controllers/auth-controller.js";

authRouter.post("/signup", Validate(signupSchema), asyncHandler(createAccount));
authRouter.post("/signin", Validate(loginSchema), asyncHandler(loginAccount));

authRouter.use(auth);

authRouter.get("/me", asyncHandler(getAccount));
export default authRouter;
