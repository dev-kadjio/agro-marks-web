"use client";

import { createContext, useContext, useTransition, type ReactNode } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

interface FilterTransitionValue {
  readonly isPending: boolean;
  navigate(query: string): void;
}

const FilterTransitionContext = createContext<FilterTransitionValue | null>(null);

export function FilterTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const value: FilterTransitionValue = {
    isPending,
    navigate(query) {
      startTransition(() => {
        router.replace(`${pathname}${query}`, { scroll: false });
      });
    },
  };

  return <FilterTransitionContext.Provider value={value}>{children}</FilterTransitionContext.Provider>;
}

export function useFilterTransition(): FilterTransitionValue {
  const context = useContext(FilterTransitionContext);
  if (!context) {
    throw new Error("useFilterTransition must be used within FilterTransitionProvider");
  }
  return context;
}

export function PendingRegion({ children, className }: { children: ReactNode; className?: string }) {
  const { isPending } = useFilterTransition();
  return (
    <div aria-busy={isPending} className={cn("transition-opacity duration-200", isPending && "opacity-60", className)}>
      {children}
    </div>
  );
}
