import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Container } from "./container";

interface SectionProps {
  readonly id?: string;
  readonly title: string;
  readonly description?: string;
  readonly action?: { readonly href: string; readonly label: string };
  readonly tone?: "white" | "cream";
  readonly children: ReactNode;
  readonly className?: string;
}

export function Section({ id, title, description, action, tone = "white", children, className }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("py-14 sm:py-20", tone === "cream" ? "bg-cream" : "bg-white", className)}
    >
      <Container>
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {title}
            </h2>
            {description ? <p className="mt-3 text-base leading-relaxed text-muted">{description}</p> : null}
          </div>
          {action ? (
            <Link
              href={action.href}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium text-forest underline-offset-4 hover:underline"
            >
              {action.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
