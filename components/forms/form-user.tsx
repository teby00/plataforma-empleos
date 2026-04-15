"use client";

import { rol } from "@/db/schema";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldError,
} from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/app/dashboard/users/schema";
import z from "zod";
import { addUser } from "@/app/dashboard/users/actions";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export function FormUser({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (dataForm: z.infer<typeof userSchema>) => {
    setLoading(true);
    const { data, error } = await addUser(dataForm);

    if (error) {
      toast.error(error);
    } else {
      toast.success(data);
      form.reset();
      setOpen(false);
    }
    setLoading(false);
  };
  return (
    <form className="px-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Nombre
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="checkout-7j9-card-name-43j"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Correo
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="checkout-7j9-card-name-43j"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Contraseña
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="checkout-7j9-card-name-43j"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Rol
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {rol.enumValues.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading && <Spinner data-icon="inline-start" />}
              Agregar
            </Button>
          </FieldGroup>
        </FieldSet>{" "}
      </FieldGroup>
    </form>
  );
}
