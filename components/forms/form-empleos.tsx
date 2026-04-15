"use client";

import { rol, salaryFrequency } from "@/db/schema";
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
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { addUser } from "@/app/dashboard/users/actions";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { employementSchema } from "@/app/dashboard/employements/schema";
import { addEmpleo } from "@/app/dashboard/employements/actions";

const salaryTypes = [
  { value: "fixed", label: "Fijo" },
  { value: "range", label: "Rango" },
];

const salaryFrequencyNames = [
  { value: "hourly", label: "Horario" },
  { value: "weekly", label: "Semanal" },
  { value: "monthly", label: "Mensual" },
  { value: "yearly", label: "Anual" },
];

export function FormEmpleos({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(employementSchema),
    defaultValues: {
      position: "",
      requirements: "",
      responsabilities: "",
      salaryType: "fixed",
      salaryFrequency: "monthly",
    },
  });

  const salaryTypeWatch = useWatch({
    name: "salaryType",
    control: form.control,
  });

  console.log(form.formState.errors);

  const onSubmit = async (dataForm: z.infer<typeof employementSchema>) => {
    setLoading(true);
    const { data, error } = await addEmpleo(dataForm);

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
              name="position"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="empleo-posicion">Posición</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="empleo-posicion"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="responsabilities"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="empleo-responsabilidades">
                    Responsabilidades
                  </FieldLabel>
                  <Textarea
                    {...field}
                    rows={6}
                    aria-invalid={fieldState.invalid}
                    id="empleo-responsabilidades"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="requirements"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="empleo-requisitos">
                    Requisitos
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="empleo-requisitos"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Salario</Label>
                <Controller
                  name="salaryType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="w-40 [&>button]:text-xs [&>button]:py-0"
                    >
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {
                              salaryTypes.find(
                                (item) => item.value === field.value,
                              )?.label
                            }
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="fixed">Fijo</SelectItem>
                            <SelectItem value="range">Rango</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {salaryTypeWatch === "fixed" && (
                <Controller
                  name="salary"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input {...field} aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}

              {salaryTypeWatch === "range" && (
                <div className="flex items-center gap-2">
                  <Controller
                    name="salaryFrom"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input {...field} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="salaryTo"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input {...field} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              )}
            </div>

            <Controller
              name="salaryFrequency"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue>
                        {
                          salaryFrequencyNames.find(
                            (i) => i.value === field.value,
                          )?.label
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(salaryFrequency.enumValues).map(
                          (item) => (
                            <SelectItem key={item} value={item}>
                              {
                                salaryFrequencyNames.find(
                                  (i) => i.value === item,
                                )?.label
                              }
                            </SelectItem>
                          ),
                        )}
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
