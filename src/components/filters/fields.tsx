import type { ChangeEvent, InputHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { fieldClasses, labelClasses } from "@/components/ui/styles";
import { cn } from "@/lib/cn";
import type { Option } from "@/services/view-models";

interface SelectFieldProps<T extends string> {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly value: T | undefined;
  readonly placeholder?: string;
  readonly options: readonly Option<T>[];
  readonly onChange?: (value: T | undefined) => void;
}

export function SelectField<T extends string>({ id, name, label, value, placeholder, options, onChange }: SelectFieldProps<T>) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const next = options.find((option) => option.value === event.target.value);
    onChange?.(next?.value);
  }

  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          {...(onChange ? { value: value ?? "", onChange: handleChange } : { defaultValue: value ?? "" })}
          className={cn(fieldClasses, "appearance-none pr-9")}
        >
          {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
      </div>
    </div>
  );
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> {
  readonly id: string;
  readonly label: string;
}

export function TextField({ id, label, ...inputProps }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input id={id} className={fieldClasses} {...inputProps} />
    </div>
  );
}
