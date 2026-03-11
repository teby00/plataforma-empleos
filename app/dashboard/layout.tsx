import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Sidebar from "@/components/sidebar";
export const metadata: Metadata = {
  title: "Turempleo | Panel de Administración",
};

export default async function DashboardLayout(
  props: LayoutProps<"/dashboard">,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    notFound();
  }
  return (
    <div>
      <Sidebar />
      <main className="ml-64 min-h-screen p-6">{props.children}</main>
    </div>
  );
}
