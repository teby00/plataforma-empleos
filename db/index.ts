import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";

const DATABASE_URL = process.env.DATABASE_URL!;

export const db = drizzle(DATABASE_URL, { schema });

export type DrizzleTransaction = Parameters<
  Parameters<typeof db.transaction>[0]
>[0];
