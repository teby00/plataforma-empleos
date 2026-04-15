import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turempleo | Panel de Administración",
};

export default async function DashboardLayout(
  props: LayoutProps<"/dashboard">,
) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="min-h-screen">{props.children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
