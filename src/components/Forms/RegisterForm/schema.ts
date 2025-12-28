import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(3, "username must be at least 3 character long"),
    email: z
      .string()
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "invalid email address",
      }),
    password: z.string().min(6, "password must be at least 6 character long"),
    confirmPassword: z
      .string()
      .min(6, "you must confirm your password with at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ["confirmPassword"],
  });
