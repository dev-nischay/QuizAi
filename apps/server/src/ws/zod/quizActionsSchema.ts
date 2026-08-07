import z from "zod";

export const joinQuizSchema = z.object({
  type: z.literal("JOIN_QUIZ"),
  name: z.string().max(16, "name cannot be more than 16 char"),
});

export const startQuizSchema = z.object({
  type: z.literal("START_QUIZ"),
});

export const showQuestionSchema = z.object({
  type: z.literal("SHOW_QUESTION"),
});

export const submitAnswerSchema = z.object({
  type: z.literal("SUBMIT_ANSWER"),
  // questionId: z.string().max(24, "invalid question Id"),
  selectedOptionIndex: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
});

export const showResultSchema = z.object({
  type: z.literal("SHOW_RESULT"),
});

export const stopQuizSchema = z.object({
  type: z.literal("STOP_QUIZ"),
});

export type joinBody = z.infer<typeof joinQuizSchema>;
export type startBody = z.infer<typeof startQuizSchema>;
export type showQuestionBody = z.infer<typeof showQuestionSchema>;
export type submitAnswerBody = z.infer<typeof submitAnswerSchema>;
export type resultBody = z.infer<typeof showResultSchema>;
export type stopBody = z.infer<typeof stopQuizSchema>;
