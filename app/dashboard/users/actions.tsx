"use server";
import { db } from "@/db";
import { userSchema } from "@/app/dashboard/users/schema";
import { z } from "zod";
import { user } from "@/db/schema";
import { ilike, or } from "drizzle-orm";
export type User = z.infer<typeof userSchema>;

export async function getUsers(name?: string): Promise<User[]> {
  if (!name) {
    const usersFromDB = await db.select().from(user);
    return usersFromDB.map((user) => userSchema.parse(user));
  }
  const usersFromDB = await db
    .select()
    .from(user)
    .where(or(ilike(user.name, `%${name}%`), ilike(user.email, `%${name}%`)));

  return usersFromDB.map((user) => userSchema.parse(user));
}
