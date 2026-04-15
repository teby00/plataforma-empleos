"use client";

import { ColumnDef } from "@tanstack/react-table";
import { InferEnum } from "drizzle-orm";
import { rol } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Application } from "./types";

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },

  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ getValue }) => {
      const value = getValue() as InferEnum<typeof rol>;
      return <Badge variant="outline">{value}</Badge>;
    },
  },
  {
    accessorKey: "user",
    header: "Usuario",
  },
  {
    accessorKey: "employement",
    header: "Empleo",
    cell: ({ getValue }) => {
      const value = getValue() as Date;
      return value.toLocaleDateString();
    },
  },
];
