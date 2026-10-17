import type { ReactNode } from "react";
import { Container } from "./container";

interface PageHeaderProps {
  readonly title: string;
  readonly intro?: string;
  readonly breadcrumbs?: ReactNode;
  readonly children?: ReactNode;
}

export function PageHeader({ title, intro, breadcrumbs, children }: PageHeaderProps) {
  return (
    <div className="border-b border-line bg-cream">
      <Container className="py-10 sm:py-14">
        {breadcrumbs}
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
        {intro ? <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p> : null}
        {children}
      </Container>
    </div>
  );
}
