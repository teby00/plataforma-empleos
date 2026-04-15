"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export function EmptyState() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={Alert} />
        </EmptyMedia>
        <EmptyTitle>Ha ocurrido un error!</EmptyTitle>
        <EmptyDescription>
          Hemos encontrado un error al cargar los datos.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          {isRefreshing && <Spinner data-icon="inline-start" />}
          Intentar de nuevo
        </Button>
      </EmptyContent>
    </Empty>
  );
}
