import { DataTable } from "@/components/ui/data-table";
import { getEmpleos } from "./services";
import { columns } from "./columns";
import { EmptyState } from "@/lib/empty-state";
import { ClientEmpleos } from "./client";

export default async function EmpleosPage() {
  const { data, error } = await getEmpleos();

  if (error) {
    return <EmptyState />;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Empleos</h1>
        <ClientEmpleos />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
