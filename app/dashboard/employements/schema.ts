import z from "zod";

export const employementSchema = z.object({
  position: z.string().nonempty(),
  responsabilities: z.string().nonempty(),
  requirements: z.string().nonempty(),
  salary: z.string().optional(),
  salaryType: z.enum(["fixed", "range"]),
  salaryFrequency: z.enum(["hourly", "weekly", "monthly", "yearly"]),
  salaryFrom: z.string().optional(),
  salaryTo: z.string().optional(),
});
