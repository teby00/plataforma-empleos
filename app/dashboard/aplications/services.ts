import { db } from "@/db";
import { applications, employements, user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getApplications() {
  try {
    const aplicaciones = await db
      .select({
        id: applications.id,
        user: user.name,
        employement: employements.position,
        status: applications.state,
        createdAt: applications.createdAt,
      })
      .from(applications)
      .innerJoin(user, eq(applications.userId, user.id))
      .innerJoin(employements, eq(applications.employementId, employements.id));

    return {
      data: aplicaciones,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      data: [],
      error: "Error al obtener las aplicaciones.",
    };
  }
}
