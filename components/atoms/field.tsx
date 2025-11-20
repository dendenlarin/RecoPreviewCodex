import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Field({
  id,
  label,
  description,
  type = "text",
  defaultValue,
  onChange
}: {
  id: string;
  label: string;
  description?: string;
  type?: string;
  defaultValue?: string | number | boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {description ? <span className="text-[11px] text-white/50">{description}</span> : null}
      </div>
      <Input
        id={id}
        defaultValue={String(defaultValue ?? "")}
        type={type}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
