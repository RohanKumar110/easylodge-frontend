import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .regex(/^[A-Za-z ]+$/, "Name can only contain alphabets and spaces"),

  email: z.email("Invalid Email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .regex(/^(?=.*\d).{8,16}$/, "Password must contain at least one number"),
});

export const signInSchema = z.object({
  email: z.email("Invalid Email"),
  password: z.string().min(1, "Password is required"),
});
