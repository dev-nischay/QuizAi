import { z } from "zod";

export const createQuizSchema = z.object({
  title: z.string().max(1000),
  quizId: z.string().max(6),
  questions: z.array(
    z.object({
      text: z.string().max(120),
      options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
      correctOptionIndex: z.union(
        [z.literal(0), z.literal(1), z.literal(2), z.literal(3)],
        "options cannot be more than 4"
      ),
    })
  ),
});

export const updateQuizSchema = z.object({
  title: z.string().max(1000).optional(),
  questions: z
    .array(
      z.object({
        text: z.string().max(120),
        options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
        correctOptionIndex: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
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
