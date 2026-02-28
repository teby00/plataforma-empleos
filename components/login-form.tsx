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
import { loginSchema } from "@/app/login/schema";
import z from "zod";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertIcon, LoaderCircle } from "@hugeicons/core-free-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { authClient } from "@/lib/auth-client";
import { Checkbox } from "./ui/checkbox";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      callbackURL: "/",
    });

    if (error) {
      form.setError("root.serverError", {
        type: "manual",
        message: error.message,
      });
    }
    setLoading(false);
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Inicia sesión en tu cuenta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Escribe tu correo y contraseña para acceder a tu cuenta
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
          name="rememberMe"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} orientation="horizontal">
              <Checkbox
                id="rememberMe"
                aria-invalid={fieldState.invalid}
                checked={field.value}
                onCheckedChange={(e) => {
                  field.onChange(e);
                  form.clearErrors("root.serverError");
                }}
              />
              <FieldLabel htmlFor="rememberMe">Recordarme</FieldLabel>
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
          {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
        </Button>

        <span className="text-center">
          No tienes una cuenta?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Regístrate aquí
          </Link>
        </span>
      </FieldGroup>
    </form>
  );
}
