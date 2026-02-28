import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("El correo electrónico no es válido"),
  password: z.string().nonempty("La contraseña es requerida"),
  rememberMe: z.boolean(),
});
