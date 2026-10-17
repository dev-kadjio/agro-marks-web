"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonClasses, fieldClasses, labelClasses } from "@/components/ui/styles";
import { cn } from "@/lib/cn";
import { contactSubjects, validateContact, type ContactErrors, type ContactField } from "@/lib/validation/contact";

type Status = "editing" | "valid";

const fieldOrder: readonly ContactField[] = ["name", "email", "subject", "message", "consent"];

export function ContactForm() {
  const t = useTranslations("forms");
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("editing");
  const [submissions, setSubmissions] = useState(0);

  useEffect(() => {
    if (submissions === 0) return;
    (status === "valid" ? successRef : summaryRef).current?.focus();
  }, [submissions, status]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = validateContact({
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
      consent: data.get("consent") === "on",
    });
    setSubmissions((count) => count + 1);
    if (result.success) {
      setErrors({});
      setStatus("valid");
      return;
    }
    setErrors(result.errors);
  }

  function reset() {
    formRef.current?.reset();
    setErrors({});
    setStatus("editing");
    setSubmissions(0);
  }

  const errorCount = fieldOrder.filter((field) => errors[field]).length;
  const describedBy = (field: ContactField, hint?: string) =>
    [errors[field] ? `${field}-error` : null, hint ?? null].filter(Boolean).join(" ") || undefined;
  const errorText = (field: ContactField) => {
    const key = errors[field];
    return key ? (
      <p id={`${field}-error`} className="mt-1.5 text-sm text-danger">
        {t(`errors.${key}`)}
      </p>
    ) : null;
  };
  const required = <span className="text-muted"> ({t("required")})</span>;

  if (status === "valid") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-card border border-line bg-white p-6 focus:outline-none">
        <CircleCheck aria-hidden="true" className="size-6 text-forest" />
        <h2 className="mt-3 text-lg font-semibold text-ink">{t("success.title")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t("success.text")}</p>
        <button type="button" onClick={reset} className={buttonClasses({ variant: "secondary", className: "mt-5" })}>
          {t("success.reset")}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-5 rounded-card border border-line bg-white p-5 sm:p-8">
      {errorCount > 0 ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg border border-danger p-4 focus:outline-none">
          <p className="text-sm font-medium text-danger">{t("errorSummary", { count: errorCount })}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-danger">
            {fieldOrder.map((field) => {
              const key = errors[field];
              return key ? (
                <li key={field}>
                  <a href={`#contact-${field}`} className="underline">
                    {t(`errors.${key}`)}
                  </a>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            {t("name")}
            {required}
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            maxLength={120}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={cn(fieldClasses, errors.name && "border-danger")}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            {t("email")}
            {required}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={cn(fieldClasses, errors.email && "border-danger")}
          />
          {errorText("email")}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClasses}>
          {t("subject")}
          {required}
        </label>
        <select
          id="contact-subject"
          name="subject"
          defaultValue=""
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy("subject")}
          className={cn(fieldClasses, errors.subject && "border-danger")}
        >
          <option value="">{t("subjectPlaceholder")}</option>
          {contactSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {t(`subjects.${subject}`)}
            </option>
          ))}
        </select>
        {errorText("subject")}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          {t("message")}
          {required}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={2200}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", "contact-message-hint")}
          className={cn(fieldClasses, "py-2.5", errors.message && "border-danger")}
        />
        <p id="contact-message-hint" className="mt-1.5 text-xs text-muted">
          {t("messageHint")}
        </p>
        {errorText("message")}
      </div>

      <div>
        <label htmlFor="contact-consent" className="flex cursor-pointer gap-3 text-sm leading-relaxed text-ink">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 size-5 shrink-0 accent-forest"
          />
          <span>
            {t("consent")}
            {required}
          </span>
        </label>
        {errorText("consent")}
      </div>

      <button type="submit" className={buttonClasses({ size: "lg", className: "w-full sm:w-auto" })}>
        {t("submit")}
      </button>
    </form>
  );
}
