import z from "zod";

export const userSchema = z.object({
  name: z.string().nonempty("El nombre es requerido"),
  email: z.email("Ingrese un correo válido").nonempty("El correo es requerido"),
  password: z.string().nonempty("La contraseña es requerida"),
  role: z.enum(["user", "admin", "superadmin"], "El rol es requerido"),
});
