"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { buttonClasses } from "@/components/ui/styles";
import { Link, useRouter } from "@/i18n/navigation";
import { collectErrors, loginSchema, type AuthErrorKey } from "@/lib/validation/auth";
import { useAuth } from "./auth-provider";
import { FormField } from "./form-field";

const fields = ["email", "password"] as const;
type Field = (typeof fields)[number];

export function LoginForm() {
  const t = useTranslations("auth");
  const { login } = useAuth();
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<Record<Field, AuthErrorKey>>>({});
  const [formError, setFormError] = useState<"invalidCredentials" | "storageUnavailable" | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parsed = loginSchema.safeParse({ email: data.get("email") ?? "", password: data.get("password") ?? "" });
    setFormError(null);
    if (!parsed.success) {
      setErrors(collectErrors(parsed.error.issues, fields, "passwordRequired"));
      return;
    }
    setErrors({});
    setPending(true);
    const result = await login(parsed.data);
    setPending(false);
    if (result.ok) {
      router.push("/account");
    } else {
      setFormError(result.error === "invalidCredentials" ? "invalidCredentials" : "storageUnavailable");
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
      <FormField id="login-email" name="email" type="email" label={t("fields.email")} autoComplete="email" error={error("email")} />
      <FormField
        id="login-password"
        name="password"
        type="password"
        label={t("fields.password")}
        autoComplete="current-password"
        error={error("password")}
      />
      <button type="submit" disabled={pending} className={buttonClasses({ size: "lg", className: "w-full" })}>
        {pending ? t("pending") : t("login.submit")}
      </button>
      <p className="text-center text-sm text-muted">
        {t("login.noAccount")}{" "}
        <Link href="/register" className="font-medium text-forest underline-offset-4 hover:underline">
          {t("register.title")}
        </Link>
      </p>
    </form>
  );
}
