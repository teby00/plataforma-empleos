import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.string(),
  emailVerified: z.boolean(),
});
