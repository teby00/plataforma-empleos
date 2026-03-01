import { z } from "zod";

export const descriptionSchema = z.object({
  description: z
    .string()
    .max(255, "La descripción no puede exceder 255 caracteres")
    .optional(),
  image: z.any().optional(),
});
