"use client";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { userSchema } from "@/app/dashboard/schema";
import { z } from "zod";

type User = z.infer<typeof userSchema>;

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Rol" },
  { accessorKey: "emailVerified", header: "¿Verificado?" },
];

export default function DashboardTable({ data }: { data: User[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="text-left px-4 py-3 font-semibold text-gray-700 border-b"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody className="bg-white">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50 transition-colors">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-4 py-3 border-b text-gray-600">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
