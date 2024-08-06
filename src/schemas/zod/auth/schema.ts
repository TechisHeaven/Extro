import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .min(1, "Email must be included")
    .email(),
});
