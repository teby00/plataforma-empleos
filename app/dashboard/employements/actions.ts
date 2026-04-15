"use server";

import z from "zod";
import { employementSchema } from "./schema";
import { db } from "@/db";
import { employements, salaryType } from "@/db/schema";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { InferEnum } from "drizzle-orm";
import { updateTag } from "next/cache";

export async function addEmpleo(data: z.infer<typeof employementSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  try {
    await db.insert(employements).values({
      position: data.position,
      responsabilities: data.responsabilities,
      requirements: data.requirements,
      salary:
        data.salaryType === "fixed" ? parseFloat(data.salary ?? "0") : null,
      salaryFrom:
        data.salaryType === "range" ? parseFloat(data.salaryFrom ?? "0") : null,
      salaryTo:
        data.salaryType === "range" ? parseFloat(data.salaryTo ?? "0") : null,
      salaryType: data.salaryType as "fixed" | "range",
      salaryFrequency: data.salaryFrequency as
        | "hourly"
        | "weekly"
        | "monthly"
        | "yearly",
      userId: session.user.id,
      company: "Turempleo",
      remote: false,
      active: true,
    });

    updateTag("employements");
    return { data: "Empleo agregado correctamente", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "Error al agregar empleo" };
  }
}
