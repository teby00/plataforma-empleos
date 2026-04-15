"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "./ui/badge";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown, Logout, User02Icon } from "@hugeicons/core-free-icons";

function UserComp() {
  const { data: session } = authClient.useSession();

  return (
    <>
      <div className="p-2 bg-muted-foreground/20 rounded-lg group-data-[collapsible=icon]:p-1">
        <HugeiconsIcon icon={User02Icon} />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight gap-1">
        <span className="truncate font-sm pl-1">{session?.user.name}</span>
        <Badge variant="outline" className="w-fit text-[10px]">
          {session?.user.role}
        </Badge>
      </div>
    </>
  );
}

export function UserSidebar() {
  const router = useRouter();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <UserComp />
                <HugeiconsIcon icon={ArrowDown} />
              </SidebarMenuButton>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="center"
            sideOffset={8}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal flex gap-1">
                <UserComp />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                render={
                  <button
                    onClick={async () => {
                      await authClient.signOut();
                      router.refresh();
                    }}
                    type="submit"
                    className="w-full"
                  >
                    <HugeiconsIcon icon={Logout} />
                    Cerrar Sesión
                  </button>
                }
                className="cursor-pointer gap-2 [&>svg]:size-4 hover:bg-muted-foreground/20"
              />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
