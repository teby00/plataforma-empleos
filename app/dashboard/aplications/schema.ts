import z from "zod";
const applicationStateEnum = z.enum(["pending", "approved", "rejected"]);

export const applicationSchema = z.object({
  id: z.string(),
  userId: z.string().min(1, "userId es obligatorio"),
  employementId: z.string().min(1, "employementId es obligatorio"),
  state: applicationStateEnum.default("pending"),
  createdAt: z
    .date()
    .default(() => new Date())
    .refine(
      (date) => !isNaN(date.getTime()),
      "createdAt debe ser una fecha válida"
    ),
  updatedAt: z
    .date()
    .default(() => new Date())
    .refine(
      (date) => !isNaN(date.getTime()),
      "updatedAt debe ser una fecha válida"
    ),
});
