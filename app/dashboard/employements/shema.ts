import z from "zod";

export const employementSchema = z.object({
  id: z.string(),
  userId: z.string(),
  company: z.string(),
  remote: z.boolean(),
  active: z.boolean(),
  position: z.string(),
  description: z.string(),
  salary: z.string().transform((val) => Number(val)),
  createdAt: z.date(),
  updatedAt: z.date(),
});
