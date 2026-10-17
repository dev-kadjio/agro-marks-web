import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-forest text-white hover:bg-moss",
  secondary: "border border-line bg-white text-forest hover:border-moss hover:bg-cream",
  ghost: "text-forest hover:bg-cream",
  inverse: "bg-white text-forest hover:bg-cream",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClasses(options: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[options.variant ?? "primary"],
    sizeClasses[options.size ?? "md"],
    options.className,
  );
}

export const fieldClasses =
  "block w-full min-h-11 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted transition-colors hover:border-moss focus-visible:border-forest focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-forest";

export const labelClasses = "mb-1.5 block text-sm font-medium text-ink";

export const cardClasses =
  "group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition-colors duration-200 hover:border-moss";

export const linkClasses =
  "font-medium text-forest underline decoration-line underline-offset-4 transition-colors hover:decoration-forest";
