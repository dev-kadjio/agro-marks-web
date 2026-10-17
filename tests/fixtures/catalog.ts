import type { FarmerSummary, ProductSummary } from "@/services/view-models";

const photo = { src: "/images/photos/carrots.jpg", width: 1200, height: 800, alt: "" };

export function farmerSummary(overrides: Partial<FarmerSummary> & Pick<FarmerSummary, "id" | "farmName">): FarmerSummary {
  return {
    slug: overrides.id,
    producerName: "Producteur",
    tagline: "",
    city: "Dschang",
    regionId: "west",
    specialtyIds: [],
    categoryIds: [],
    productCount: 1,
    hasAvailableProducts: true,
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
    categorySlug: "legumes",
    categoryName: "Légumes",
    farmer: { id: "farmer-1", slug: "farm-1", farmName: "Ferme 1", city: "Dschang", regionId: "west", whatsappNumber: null },
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
