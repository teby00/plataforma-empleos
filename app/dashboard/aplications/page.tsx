import { verifySession } from "@/lib/verify-session";
import { getApplications } from "./services";
import { EmptyState } from "@/lib/empty-state";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default async function AplicationsPage() {
  await verifySession();
  const { data, error } = await getApplications();

  if (error) {
    return <EmptyState />;
  }
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Aplicaciones</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
