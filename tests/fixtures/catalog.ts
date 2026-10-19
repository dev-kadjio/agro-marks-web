import type { ProducerSummary, ProductSummary } from "@/services/view-models";

const photo = { src: "/images/photos/carrots.jpg", width: 1200, height: 800, alt: "" };

export function producerSummary(overrides: Partial<ProducerSummary> & Pick<ProducerSummary, "id" | "farmName">): ProducerSummary {
  return {
    slug: overrides.id,
    type: "farmer",
    producerName: "Producteur",
    tagline: "",
    city: "Dschang",
    regionId: "west",
    specialtyIds: [],
    categoryIds: [],
    featured: false,
    photo,
    whatsappNumber: null,
    searchText: overrides.farmName.toLowerCase(),
    ...overrides,
  };
}

export function productSummary(overrides: Partial<ProductSummary> & Pick<ProductSummary, "id" | "name">): ProductSummary {
  return {
    slug: overrides.id,
    categoryId: "vegetables",
    categorySlug: "vegetables",
    categoryName: "Légumes",
    producer: { id: "producer-1", slug: "farm-1", farmName: "Ferme 1", city: "Dschang", regionId: "west", whatsappNumber: null },
    photo,
    price: { amount: 1000, currency: "XAF" },
    unit: "kg",
    availability: { status: "in-stock" },
    listedAt: "2026-01-01",
    popularity: 50,
    featured: false,
    searchText: overrides.name.toLowerCase(),
    ...overrides,
  };
}
