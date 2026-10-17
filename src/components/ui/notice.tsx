import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

export function Notice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex gap-3 rounded-lg border border-line bg-white p-4 text-sm leading-relaxed text-muted", className)}>
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
      <span>{children}</span>
    </p>
  );
}
