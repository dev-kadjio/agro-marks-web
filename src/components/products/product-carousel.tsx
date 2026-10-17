import { Carousel } from "@/components/ui/carousel";
import type { ProductSummary } from "@/services/view-models";
import { ProductCard } from "./product-card";

export function ProductCarousel({ label, products }: { label: string; products: readonly ProductSummary[] }) {
  return (
    <Carousel
      label={label}
      slides={products.map((product) => ({ key: product.id, content: <ProductCard product={product} /> }))}
    />
  );
}
