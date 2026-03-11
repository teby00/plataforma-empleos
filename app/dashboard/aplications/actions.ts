import { applicationSchema } from "./schema";
import z from "zod";
import { db } from "@/db";
import { applications } from "@/db/schema";

export type Aplications = z.infer<typeof applicationSchema>;
export async function getAplications(): Promise<Aplications[]> {
  const result = await db.select().from(applications);
  return result.map((aplications) => applicationSchema.parse(aplications));
}
