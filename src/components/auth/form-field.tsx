import type { InputHTMLAttributes, ReactNode } from "react";
import { fieldClasses, labelClasses } from "@/components/ui/styles";
import { cn } from "@/lib/cn";

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
  readonly hint?: string;
  readonly children?: ReactNode;
}

export function FormField({ id, label, error, hint, children, ...inputProps }: FormFieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      {children ?? (
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(fieldClasses, error && "border-danger")}
          {...inputProps}
        />
      )}
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
