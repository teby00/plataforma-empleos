"use client";

import { ColumnDef } from "@tanstack/react-table";
import { InferSelectModel } from "drizzle-orm";
import { employements } from "@/db/schema";

type Empleo = InferSelectModel<typeof employements>;

export const columns: ColumnDef<Empleo>[] = [
  {
    accessorKey: "position",
    header: "Posición",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Creación",
    cell: ({ cell }) => <span>{cell.getValue()?.toLocaleDateString()}</span>,
  },
  {
    accessorKey: "company",
    header: "Empresa",
  },
  {
    accessorKey: "user",
    header: "Creado por",
  },
];
