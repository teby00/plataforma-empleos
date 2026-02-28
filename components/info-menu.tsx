import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookIcon,
  InformationCircleFreeIcons,
  LifebuoyIcon,
  Message,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function InfoMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label="Open edit menu"
            className="size-8 rounded-full shadow-none"
            size="icon"
            variant="ghost"
          />
        }
      >
        <HugeiconsIcon
          icon={InformationCircleFreeIcons}
          aria-hidden="true"
          className="text-muted-foreground"
          size={16}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        <DropdownMenuLabel>Need help?</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
          render={<a href="#" />}
        >
          <HugeiconsIcon
            icon={BookIcon}
            aria-hidden="true"
            className="opacity-60"
            size={16}
          />
          Documentation
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
          render={<a href="#" />}
        >
          <HugeiconsIcon
            icon={LifebuoyIcon}
            aria-hidden="true"
            className="opacity-60"
            size={16}
          />
          Support
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
          render={<a href="#" />}
        >
          <HugeiconsIcon
            icon={Message}
            aria-hidden="true"
            className="opacity-60"
            size={16}
          />
          Contact us
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
