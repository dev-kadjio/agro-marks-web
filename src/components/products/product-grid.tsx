import { cn } from "@/lib/cn";
import type { ProductSummary } from "@/services/view-models";
import { ProductCard } from "./product-card";

const layouts = {
  full: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  sidebar: "sm:grid-cols-2 xl:grid-cols-3",
} as const;

export function ProductGrid({ products, layout = "full" }: { products: readonly ProductSummary[]; layout?: keyof typeof layouts }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-5", layouts[layout])}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
