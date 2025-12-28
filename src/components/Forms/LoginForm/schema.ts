import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "invalid email address",
    }),
  password: z.string().min(6, "password must be at least 6 character long"),
});
