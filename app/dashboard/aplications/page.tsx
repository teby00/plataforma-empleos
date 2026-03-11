"use server";
import DashboardTable from "@/components/dashboardTable";
import { Aplications, getAplications } from "./actions";
export default async function AplicationsPage() {
  const aplicationsData = await getAplications();
  return (
    <div>
      <DashboardTable data={aplicationsData} columns={columns} />
    </div>
  );
}
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Aplications>[] = [
  { accessorKey: "userId", header: "Usuario" },
  { accessorKey: "employementId", header: "Empleo" },
  { accessorKey: "state", header: "Estado" },
  { accessorKey: "createdAt", header: "Creado" },
  { accessorKey: "updatedAt", header: "Actualizado" },
];
