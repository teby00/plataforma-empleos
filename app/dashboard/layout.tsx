import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

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
  return <main className="min-h-screen">{props.children}</main>;
}
