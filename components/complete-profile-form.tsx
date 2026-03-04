"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { descriptionSchema } from "@/app/register/complete-profile/schema";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { LoaderCircle } from "@hugeicons/core-free-icons";
import CompleteProfileDescription from "@/app/register/complete-profile/actions";

type DescriptionFormData = z.infer<typeof descriptionSchema>;

export function CompleteProfileForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);

  const form = useForm<DescriptionFormData>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (data: DescriptionFormData) => {
    setLoading(true);

    try {
      const result = await CompleteProfileDescription(data);

      if (!result?.success) {
        form.setError("root.serverError", {
          type: "manual",
          message: "No se pudo actualizar la descripción",
        });
      }
    } catch (err) {
      console.error("Update profile error:", err);

      form.setError("root.serverError", {
        type: "manual",
        message: "Ocurrió un error inesperado. Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/40 p-6">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
        <form
          className={cn("flex flex-col gap-6", className)}
          onSubmit={form.handleSubmit(onSubmit)}
          {...props}
        >
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Agrega una descripción</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Escribe una breve descripción sobre ti
              </p>
            </div>

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Descripción</FieldLabel>

                  <Textarea
                    id="description"
                    placeholder="Cuéntanos algo interesante..."
                    aria-invalid={fieldState.invalid}
                    className="min-h-28 resize-none"
                    {...field}
                    value={field.value ?? ""}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading && (
                <HugeiconsIcon
                  icon={LoaderCircle}
                  strokeWidth={2}
                  className="size-4 animate-spin"
                />
              )}
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
