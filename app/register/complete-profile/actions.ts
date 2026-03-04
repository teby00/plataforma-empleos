"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { descriptionSchema } from "./schema";
import { z } from "zod";

export default async function CompleteProfileDescription(
  data: z.infer<typeof descriptionSchema>,
) {
  const session = await auth.api.getSession();

  if (!session) {
    throw new Error("No session");
  }

  const parsed = descriptionSchema.parse(data);

  await db
    .update(user)
    .set({ description: parsed.description })
    .where(eq(user.id, session.user.id));

  return { success: true };
}
