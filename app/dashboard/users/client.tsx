"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { CirclePlus } from "@hugeicons/core-free-icons";
import { FormUser } from "@/components/forms/form-user";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { InferSelectModel } from "drizzle-orm";
import { user } from "@/db/schema";
import { useState } from "react";

export function ClientUsers({
  data,
}: {
  data: InferSelectModel<typeof user>[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <div className="flex justify-end">
              <Button>
                <HugeiconsIcon icon={CirclePlus} />
                Agregar
              </Button>
            </div>
          }
        />

        <SheetContent className="max-w-[30%]">
          <SheetHeader>
            <SheetTitle>Agregar Usuario</SheetTitle>
            <SheetDescription>
              Rellena el formulario para agregar un usuario.
            </SheetDescription>
          </SheetHeader>

          <FormUser setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <DataTable columns={columns} data={data} />
    </>
  );
}
