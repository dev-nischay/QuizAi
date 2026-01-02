import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string({
      error: "Username is required",
    })
    .min(3, "Username must be at least 3 characters long")
    .max(16, "Username must be at most 16 characters long"),

  email: z.email("Invalid email address"),

  password: z
    .string({
      error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long")
    .max(24, "Password must be at most 24 characters long"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(24, "Password must be at most 24 characters long"),
});

export type signupBody = z.infer<typeof signupSchema>;
export type loginBody = z.infer<typeof loginSchema>;
