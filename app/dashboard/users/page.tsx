import { verifySession } from "@/lib/verify-session";
import { ClientUsers } from "./client";
import { getUsers } from "./services";
import { EmptyState } from "@/lib/empty-state";

export default async function UsersPage() {
  await verifySession();
  const { data, error } = await getUsers();

  if (error) {
    return <EmptyState state={true} />;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuarios</h1>
      </div>
      <ClientUsers data={data} />
    </div>
  );
}
