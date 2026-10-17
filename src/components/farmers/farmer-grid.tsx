import { cn } from "@/lib/cn";
import type { FarmerSummary } from "@/services/view-models";
import { FarmerCard } from "./farmer-card";

const layouts = {
  full: "sm:grid-cols-2 lg:grid-cols-3",
  sidebar: "sm:grid-cols-2 xl:grid-cols-3",
} as const;

export function FarmerGrid({ farmers, layout = "full" }: { farmers: readonly FarmerSummary[]; layout?: keyof typeof layouts }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-6", layouts[layout])}>
      {farmers.map((farmer) => (
        <li key={farmer.id}>
          <FarmerCard farmer={farmer} />
        </li>
      ))}
    </ul>
  );
}
