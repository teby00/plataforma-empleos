"use client";

import { ColumnDef } from "@tanstack/react-table";
import { InferEnum, InferSelectModel } from "drizzle-orm";
import { user, rol } from "@/db/schema";
import { Badge } from "@/components/ui/badge";

type Usuario = InferSelectModel<typeof user>;

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ getValue }) => {
      const value = getValue() as InferEnum<typeof rol>;
      return <Badge variant="outline">{value}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Registro",
    cell: ({ getValue }) => {
      const value = getValue() as Date;
      return value.toLocaleDateString();
    },
  },
];
