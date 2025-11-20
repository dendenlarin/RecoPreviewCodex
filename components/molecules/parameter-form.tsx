"use client";

import { useEffect, useMemo, useState } from "react";
import { Field } from "@/components/atoms/field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type { ApiParameter } from "@/data/operations";

export type ParameterValues = Record<string, string>;

export function ParameterForm({
  parameters,
  onSubmit,
  loading
}: {
  parameters: ApiParameter[];
  onSubmit: (values: ParameterValues) => void;
  loading?: boolean;
}) {
  const defaults = useMemo(() => {
    const base: ParameterValues = {};
    parameters.forEach((p) => {
      base[p.name] = Array.isArray(p.defaultValue)
        ? (p.defaultValue as Array<string | number>).join(",")
        : String(p.defaultValue ?? "");
    });
    return base;
  }, [parameters]);

  const [values, setValues] = useState<ParameterValues>(defaults);

  useEffect(() => {
    setValues(defaults);
  }, [defaults]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  const updateValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const booleanFields = parameters.filter((p) => typeof p.defaultValue === "boolean");
  const stringFields = parameters.filter((p) => typeof p.defaultValue !== "boolean");

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {stringFields.map((parameter) => (
        <Field
          key={parameter.name}
          id={parameter.name}
          label={parameter.name}
          description={parameter.description}
          defaultValue={values[parameter.name]}
          onChange={(value) => updateValue(parameter.name, value)}
        />
      ))}

      {booleanFields.map((parameter) => (
        <div key={parameter.name} className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label className="capitalize" htmlFor={parameter.name}>
              {parameter.name}
            </Label>
            {parameter.description ? <span className="text-[11px] text-white/50">{parameter.description}</span> : null}
          </div>
          <Select
            id={parameter.name}
            value={values[parameter.name]}
            onChange={(event) => updateValue(parameter.name, event.target.value)}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
        </div>
      ))}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Генерируем..." : "Получить рекомендации"}
      </Button>
    </form>
  );
}
