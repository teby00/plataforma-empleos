"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { DashboardBrowsingIcon, LogoutIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserMenu({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="h-auto p-0 hover:bg-transparent" variant="ghost" />
        }
      >
        <Avatar>
          <AvatarImage alt="Profile image" src="/origin/avatar.jpg" />
          <AvatarFallback>KK</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="truncate font-medium text-foreground text-sm">
              {name}
            </span>
            <span className="truncate font-normal text-muted-foreground text-xs">
              {email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer">
              <HugeiconsIcon
                icon={DashboardBrowsingIcon}
                aria-hidden="true"
                className="opacity-60"
                size={16}
              />
              <span>Panel de administración</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => {
              await authClient.signOut();
              router.refresh();
            }}
          >
            <HugeiconsIcon
              icon={LogoutIcon}
              aria-hidden="true"
              className="opacity-60"
              size={16}
            />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
