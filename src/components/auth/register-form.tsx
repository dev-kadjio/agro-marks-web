"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { buttonClasses, fieldClasses } from "@/components/ui/styles";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { accountRoles, collectErrors, registerSchema, type AuthErrorKey } from "@/lib/validation/auth";
import { useAuth } from "./auth-provider";
import { FormField } from "./form-field";

const fields = ["name", "email", "role", "city", "password", "confirmPassword"] as const;
type Field = (typeof fields)[number];

export function RegisterForm() {
  const t = useTranslations("auth");
  const { register } = useAuth();
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<Record<Field, AuthErrorKey>>>({});
  const [formError, setFormError] = useState<"emailTaken" | "storageUnavailable" | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parsed = registerSchema.safeParse(Object.fromEntries(fields.map((field) => [field, data.get(field) ?? ""])));
    setFormError(null);
    if (!parsed.success) {
      setErrors(collectErrors(parsed.error.issues, fields, "nameRequired"));
      return;
    }
    setErrors({});
    setPending(true);
    const result = await register(parsed.data);
    setPending(false);
    if (result.ok) {
      router.push("/account");
    } else {
      setFormError(result.error === "emailTaken" ? "emailTaken" : "storageUnavailable");
    }
  }

  const error = (field: Field) => (errors[field] ? t(`errors.${errors[field]}`) : undefined);

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      {formError ? (
        <p role="alert" className="rounded-lg border border-danger p-3 text-sm text-danger">
          {t(`errors.${formError}`)}
        </p>
      ) : null}
      <FormField id="register-name" name="name" label={t("fields.name")} autoComplete="name" error={error("name")} />
      <FormField id="register-email" name="email" type="email" label={t("fields.email")} autoComplete="email" error={error("email")} />
      <FormField id="register-role" label={t("fields.role")} error={error("role")}>
        <select
          id="register-role"
          name="role"
          defaultValue="consumer"
          aria-invalid={Boolean(errors.role)}
          className={cn(fieldClasses, errors.role && "border-danger")}
        >
          {accountRoles.map((role) => (
            <option key={role} value={role}>
              {t(`roles.${role}`)}
            </option>
          ))}
        </select>
      </FormField>
      <FormField id="register-city" name="city" label={t("fields.city")} autoComplete="address-level2" maxLength={60} />
      <FormField
        id="register-password"
        name="password"
        type="password"
        label={t("fields.password")}
        autoComplete="new-password"
        hint={t("passwordHint")}
        error={error("password")}
      />
      <FormField
        id="register-confirm"
        name="confirmPassword"
        type="password"
        label={t("fields.confirmPassword")}
        autoComplete="new-password"
        error={error("confirmPassword")}
      />
      <button type="submit" disabled={pending} className={buttonClasses({ size: "lg", className: "w-full" })}>
        {pending ? t("pending") : t("register.submit")}
      </button>
      <p className="text-center text-sm text-muted">
        {t("register.hasAccount")}{" "}
        <Link href="/login" className="font-medium text-forest underline-offset-4 hover:underline">
          {t("login.title")}
        </Link>
      </p>
    </form>
  );
}
