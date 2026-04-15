"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { userSchema } from "./schema";
import z from "zod";
import { updateTag } from "next/cache";

export async function addUser(data: z.infer<typeof userSchema>) {
  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        ...data,
      },
    });

    updateTag("users");
    return {
      data: "Usuario agregado con exito.",
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: "Error al agregar el usuario.",
    };
  }
}
