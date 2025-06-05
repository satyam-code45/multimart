import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters")
    .refine(
      (val) =>
        /[a-z]/.test(val) && // lowercase
        /[A-Z]/.test(val) && // uppercase
        /[^a-zA-Z0-9]/.test(val), // special character
      {
        message:
          "Password must include at least one lowercase, one uppercase letter, and one special character",
      }
    ),
  username: z
    .string()
    .min(3, "Username must be atleast 3 character")
    .max(30, "Username must be less than 30 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers and hypens. It must start and end with a letter or number"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive hypens"
    )
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
