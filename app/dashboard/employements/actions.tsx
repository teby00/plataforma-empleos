import { employementSchema } from "./shema";
import z from "zod";
import { db } from "@/db";
import { employements } from "@/db/schema";

export type Employement = z.infer<typeof employementSchema>;
export async function getEmployements(): Promise<Employement[]> {
  const result = await db.select().from(employements);
  return result.map((employement) => employementSchema.parse(employement));
}
