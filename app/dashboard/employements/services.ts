import { db } from "@/db";
import { employements, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getEmpleos() {
  "use cache";
  cacheTag("employements");
  try {
    const empleos = await db
      .select({
        position: employements.position,
        createdAt: employements.createdAt,
        company: employements.company,
        user: user.name,
      })
      .from(employements)
      .innerJoin(user, eq(user.id, employements.userId));

    return {
      data: empleos,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      data: [],
      error: "Error al obtener los empleos.",
    };
  }
}
