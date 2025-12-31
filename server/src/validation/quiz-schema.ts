import { z } from "zod";

export const createQuizSchema = z.object({
  title: z.string().max(1000),
  questions: z.array(
    z.object({
      text: z.string().max(120),
      opitons: z.array(z.string()).length(4),
      correctOptionIndex: z.number().int().max(3),
    })
  ),
});

export const updateQuizSchema = z.object({
  title: z.string().max(1000).optional(),
  questions: z
    .array(
      z.object({
        text: z.string().max(120),
        opitons: z.array(z.string()).length(4),
        correctOptionIndex: z.number().int().max(3),
      })
    )
    .optional(),
});

export const paramsValidator = z.object({
  id: z.string().max(24),
});

export type createQuizBody = z.infer<typeof createQuizSchema>;
export type updateQuizBody = z.infer<typeof updateQuizSchema>;
export type params = z.infer<typeof paramsValidator>;
