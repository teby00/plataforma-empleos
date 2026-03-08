import DashboardTable from "@/components/dashboardTable";
import { getUsers } from "./actions";
import FilterNavigation from "@/components/select-filter-navigation";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const params = await searchParams;

  const users = await getUsers(params.name);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <FilterNavigation />
      <DashboardTable data={users} />
    </div>
  );
}
