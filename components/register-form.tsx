"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertIcon, LoaderCircle } from "@hugeicons/core-free-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { registerSchema } from "@/app/register/schema";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role: "user",
      callbackURL: "http://localhost:3000",
    });

    if (error) {
      form.setError("root.serverError", {
        type: "manual",
        message: error.message,
      });
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="gap-4">
        <div className="flex flex-col items-center gap-1 text-center pb-4">
          <h1 className="text-2xl font-bold">Crea una nueva cuenta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Escribe tu correo y una contraseña segura
          </p>
        </div>

        {form.formState.errors.root?.serverError && (
          <Alert
            variant="destructive"
            className="animate-in fade-in slide-in-from-top-2"
          >
            <HugeiconsIcon
              icon={AlertIcon}
              strokeWidth={2}
              className="size-4"
            />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
              {form.formState.errors.root.serverError.message}
            </AlertDescription>
          </Alert>
        )}

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input
                id="name"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  form.clearErrors("root.serverError");
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Correo</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  form.clearErrors("root.serverError");
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  form.clearErrors("root.serverError");
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">
                Confirmar Contraseña
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  form.clearErrors("root.serverError");
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
          {loading ? "Creando Cuenta..." : "Crear Cuenta"}
        </Button>

        <span className="text-center">
          Ya tienes una cuenta?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Inicia sesión aquí
          </Link>
        </span>
      </FieldGroup>
    </form>
  );
}
