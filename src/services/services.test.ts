import { describe, expect, it } from "vitest";
import { createMockRepositories } from "@/repositories/mock";
import { createInMemoryCategoryRepository, createInMemoryFarmerRepository, createInMemoryProductRepository } from "@/repositories/mock/in-memory-repositories";
import { categories } from "@/data/categories";
import { farmers } from "@/data/farmers";
import { products } from "@/data/products";
import { createCategoryService } from "./category-service";
import { createFarmerService, FARMERS_PAGE_SIZE } from "./farmer-service";
import { defaultFarmerCriteria, defaultProductCriteria } from "./filtering/criteria";
import { createProductService, PRODUCTS_PAGE_SIZE } from "./product-service";

const repositories = createMockRepositories();
const farmerService = createFarmerService(repositories);
const productService = createProductService(repositories);
const categoryService = createCategoryService(repositories);

describe("farmer service", () => {
  it("paginates the directory", async () => {
    const page1 = await farmerService.searchFarmers("fr", defaultFarmerCriteria);
    expect(page1.items).toHaveLength(FARMERS_PAGE_SIZE);
    expect(page1.total).toBe(farmers.length);
    const page2 = await farmerService.searchFarmers("fr", { ...defaultFarmerCriteria, page: 2 });
    expect(page2.items).toHaveLength(farmers.length - FARMERS_PAGE_SIZE);
  });

  it("derives categories and availability from products", async () => {
    const results = await farmerService.searchFarmers("fr", { ...defaultFarmerCriteria, categoryId: "honey" });
    expect(results.items.map((farmer) => farmer.slug)).toEqual(["rucher-du-mont-ngaoundere"]);
  });

  it("finds farmers through their product names in any language", async () => {
    const results = await farmerService.searchFarmers("fr", { ...defaultFarmerCriteria, query: "white pepper" });
    expect(results.items[0]?.slug).toBe("poivriere-de-la-vallee-du-mungo");
  });

  it("returns a localized profile with ordered production stages", async () => {
    const profile = await farmerService.getFarmerProfile("en", "rucher-du-mont-ngaoundere");
    expect(profile?.productionType).toBe("beekeeping");
    expect(profile?.production.map((stage) => stage.key)).toEqual(["apiarySetup", "colonyCare", "harvest", "postHarvest"]);
    expect(profile?.tagline).toMatch(/Savannah honey/);
  });

  it("does not repeat the cover photo in production stages", async () => {
    const profile = await farmerService.getFarmerProfile("fr", "domaine-cafeier-de-foumbot");
    expect(profile?.production.some((stage) => stage.photo?.src === profile.photo.src)).toBe(false);
    expect(profile?.production.find((stage) => stage.key === "harvest")?.title).toBe("Cueillette sélective");
  });

  it("omits optional crop stages that are not documented", async () => {
    const profile = await farmerService.getFarmerProfile("fr", "champs-de-la-benoue");
    expect(profile?.production.map((stage) => stage.key)).not.toContain("irrigation");
    expect(profile?.production[0]?.key).toBe("soilPreparation");
  });

  it("returns null for unknown slugs", async () => {
    expect(await farmerService.getFarmerProfile("fr", "inconnu")).toBeNull();
    expect(await farmerService.listSimilarFarmers("fr", "inconnu", 3)).toEqual([]);
  });

  it("suggests similar farmers without the current one", async () => {
    const similar = await farmerService.listSimilarFarmers("fr", "les-jardins-de-soa", 3);
    expect(similar).toHaveLength(3);
    expect(similar.map((farmer) => farmer.slug)).not.toContain("les-jardins-de-soa");
  });
});

describe("product service", () => {
  it("paginates and filters the catalogue", async () => {
    const page = await productService.searchProducts("fr", defaultProductCriteria);
    expect(page.items).toHaveLength(PRODUCTS_PAGE_SIZE);
    expect(page.total).toBe(products.length);
    const fruits = await productService.searchProducts("fr", { ...defaultProductCriteria, categoryId: "fruits", sort: "price-asc" });
    expect(fruits.items.every((product) => product.categoryId === "fruits")).toBe(true);
    const prices = fruits.items.map((product) => product.price.amount);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("returns localized product details", async () => {
    const product = await productService.getProduct("en", "poivre-blanc-de-penja");
    expect(product).toMatchObject({ name: "White pepper", categoryName: "Spices and condiments", farmer: { slug: "poivriere-de-la-vallee-du-mungo" } });
    expect(await productService.getProduct("en", "xyz")).toBeNull();
  });

  it("lists seasonal products for a month", async () => {
    const seasonal = await productService.listSeasonalProducts("fr", 10, 20);
    expect(seasonal.length).toBeGreaterThan(0);
    for (const summary of seasonal) {
      const product = products.find((candidate) => candidate.id === summary.id);
      expect(product?.harvestMonths).toContain(10);
    }
  });

  it("lists similar products in the same category", async () => {
    const similar = await productService.listSimilarProducts("fr", "miel-clair-de-l-adamaoua", 4);
    expect(similar.every((product) => product.categoryId === "honey" && product.slug !== "miel-clair-de-l-adamaoua")).toBe(true);
  });

  it("scopes filter options to a category", async () => {
    const options = await productService.getFilterOptions("fr", { categoryId: "honey" });
    expect(options.farmers.map((farmer) => farmer.value)).toEqual(["rucher-du-mont-ngaoundere"]);
    expect(options.regionIds).toEqual(["adamawa"]);
  });

  it("skips products whose farmer or category is missing", async () => {
    const service = createProductService({
      farmers: createInMemoryFarmerRepository(farmers.filter((farmer) => farmer.id !== "farmer-07")),
      products: createInMemoryProductRepository(products),
      categories: createInMemoryCategoryRepository(categories),
    });
    const all = await service.listAllProducts("fr");
    expect(all.some((product) => product.farmer.id === "farmer-07")).toBe(false);
    expect(await service.getProduct("fr", "miel-clair-de-l-adamaoua")).toBeNull();
  });
});

describe("category service", () => {
  it("counts products per category", async () => {
    const list = await categoryService.listCategories("fr");
    expect(list.reduce((sum, category) => sum + category.productCount, 0)).toBe(products.length);
  });

  it("returns null for unknown categories", async () => {
    expect(await categoryService.getCategory("fr", "voitures")).toBeNull();
    expect((await categoryService.getCategory("en", "miel"))?.name).toBe("Honey and hive products");
  });
});
