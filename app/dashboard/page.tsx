import DashboardTable from "@/components/dashboardTable";
import { getUsers } from "./actions";

export default async function DashboardPage() {
  const users = await getUsers();
  return (
    <div className="w-full max-w-4xl mx-auto">
      <DashboardTable data={users} />
    </div>
  );
}
