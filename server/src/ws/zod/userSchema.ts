import z from "zod";

export const connectUserSchema = z.object({
  userId: z.string().max(25, "invalid user Id"),
  role: z.union([z.literal("host"), z.literal("guest")]),
  quizId: z.string().max(25),
});

export type userBody = z.infer<typeof connectUserSchema>;
