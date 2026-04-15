import { db } from "@/db";
import { cacheTag } from "next/cache";

export async function getUsers() {
  "use cache";
  cacheTag("users");
  try {
    const users = await db.query.user.findMany();

    return {
      data: users,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      data: [],
      error: "Error al obtener los usuarios.",
    };
  }
}
