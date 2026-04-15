"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { UserSidebar } from "./user-sidebar";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const data = {
    navMain: [
      {
        title: "Getting Started",
        url: "#",
        items: [
          {
            title: "Inicio",
            url: "/dashboard",
            isActive: pathname === "/dashboard",
          },
          {
            title: "Empleos",
            url: "/dashboard/employements",
            isActive: pathname === "/dashboard/employements",
          },
          {
            title: "Usuarios",
            url: "/dashboard/users",
            isActive: pathname === "/dashboard/users",
          },
          {
            title: "Aplicaciones",
            url: "/dashboard/aplications",
            isActive: pathname === "/dashboard/aplications",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-row gap-1 p-4 items-center">
        <Image src="/logo.webp" alt="Logo" width={40} height={40} />
        <h2 className="text-xl font-bold">Turempleo</h2>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            {/* <SidebarGroupLabel>{item.title}</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url}>
                      <SidebarMenuButton isActive={item.isActive}>
                        {item.title}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarGroup>
          <UserSidebar />
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
