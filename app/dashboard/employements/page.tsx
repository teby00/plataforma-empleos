import DashboardTable from "@/components/dashboardTable";
import { getEmployements } from "./actions";
import { ColumnDef } from "@tanstack/react-table";
import type { Employement } from "./actions";
export default async function EmployementsPage() {
  const employements = await getEmployements();
  return (
    <div>
      <DashboardTable data={employements} columns={columns} />
    </div>
  );
}
export const columns: ColumnDef<Employement>[] = [
  { accessorKey: "company", header: "Empresa" },
  { accessorKey: "position", header: "Posición" },
  { accessorKey: "salary", header: "Salario" },
  { accessorKey: "remote", header: "Remoto" },
  { accessorKey: "active", header: "Activo" },
  { accessorKey: "createdAt", header: "Creado" },
];
