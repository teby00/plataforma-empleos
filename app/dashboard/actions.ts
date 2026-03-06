"use server";
import { db } from "@/db";
import { userSchema } from "./schema";
import { z } from "zod";

type User = z.infer<typeof userSchema>;

export async function getUsers(): Promise<User[]> {
  const usersFromDB = await db.query.user.findMany();

  return usersFromDB.map((user) => userSchema.parse(user));
}
