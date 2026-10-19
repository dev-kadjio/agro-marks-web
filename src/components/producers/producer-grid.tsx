import { cn } from "@/lib/cn";
import type { ProducerSummary } from "@/services/view-models";
import { ProducerCard } from "./producer-card";

const layouts = {
  full: "sm:grid-cols-2 lg:grid-cols-3",
  sidebar: "sm:grid-cols-2 xl:grid-cols-3",
} as const;

export function ProducerGrid({ producers, layout = "full" }: { producers: readonly ProducerSummary[]; layout?: keyof typeof layouts }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-6", layouts[layout])}>
      {producers.map((producer) => (
        <li key={producer.id}>
          <ProducerCard producer={producer} />
        </li>
      ))}
    </ul>
  );
}
