"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const passwordValue = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      console.log("funciona", data);

      const response = true;

      if (response) {
        router.push("/usermedia");
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Iniciar Sesión
        </h2>

        {/* usuario */}
        <label className="text-sm font-medium text-gray-700">Usuario</label>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("username", {
            required: "El usuario es obligatorio",
            minLength: {
              value: 3,
              message: "Debe tener al menos 3 caracteres",
            },
          })}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        {/* email */}
        <label className="text-sm font-medium text-gray-700">
          Correo Electronico
        </label>
        <input
          type="email"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("email", { required: "El email es obligatorio" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* contraseña */}
        <label className="text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* verificar contraseña */}
        <label className="text-sm font-medium text-gray-700">
          Verificar contraseña
        </label>
        <input
          type="password"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("confirmPassword", {
            required: "Debes confirmar la contraseña",
            validate: (value) =>
              value === passwordValue || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors duration-200 mt-2"
          type="submit"
        >
          Entrar
        </button>

        <a
          href="/register"
          className="text-blue-500 hover:underline text-center"
        >
          ¿No tienes cuenta? Regístrate
        </a>
      </form>
    </div>
  );
}
