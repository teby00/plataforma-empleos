import { rol } from "@/db/schema";
import { InferEnum } from "drizzle-orm";

export type Application = {
  id: string;
  user: string;
  employement: string;
  status: InferEnum<typeof rol>;
  createdAt: Date;
};
