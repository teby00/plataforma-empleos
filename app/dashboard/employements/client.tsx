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
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { InferSelectModel } from "drizzle-orm";
import { user } from "@/db/schema";
import { useState } from "react";
import { FormEmpleos } from "@/components/forms/form-empleos";

export function ClientEmpleos({
  data,
}: {
  data: InferSelectModel<typeof user>[];
}) {
  const [open, setOpen] = useState(false);
  return (
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

      <SheetContent className="min-w-[40%]">
        <SheetHeader>
          <SheetTitle>Agregar Empleo</SheetTitle>
          <SheetDescription>
            Rellena el formulario para agregar una oferta de empleo.
          </SheetDescription>
        </SheetHeader>

        <FormEmpleos setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
