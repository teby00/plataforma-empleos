import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().nonempty("El nombre es requerido"),
    email: z.email("El correo electrónico no es válido"),
    password: z
      .string()
      .nonempty("La contraseña es requerida")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .nonempty("La contraseña de confirmación es requerida")
      .min(6, "La contraseña de confirmación debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
