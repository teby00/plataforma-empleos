import DashboardTable from "@/components/dashboardTable";
import { getUsers } from "./actions";
import FilterNavigation from "@/components/select-filter-navigation";
import { ColumnDef } from "@tanstack/react-table";
import type { User } from "./actions";
export const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Rol" },
  { accessorKey: "emailVerified", header: "¿Verificado?" },
];
export default async function DashboardUserPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const params = await searchParams;

  const users = await getUsers(params.name);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <FilterNavigation />
      <DashboardTable data={users} columns={columns} />
    </div>
  );
}
