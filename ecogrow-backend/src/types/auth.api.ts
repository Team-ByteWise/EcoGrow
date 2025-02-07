import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
});
export type SignupRequest = z.infer<typeof signupSchema>;

export const loginRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const authResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.number(),
    email: z.string(),
    username: z.string(),
  }),
});
export type AuthResponse = z.infer<typeof authResponseSchema>;
