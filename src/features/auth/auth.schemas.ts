import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Enter your email address."),
  password: z.string().min(8, "Your password must be at least 8 characters."),
});

export type LoginInput = z.infer<typeof loginSchema>;
