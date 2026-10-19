import { describe, expect, it } from "vitest";
import { categories } from "@/data/categories";
import { producers } from "@/data/producers";
import { products } from "@/data/products";
import { createMockRepositories } from "@/repositories/mock";
import { createInMemoryCategoryRepository, createInMemoryProducerRepository, createInMemoryProductRepository } from "@/repositories/mock/in-memory-repositories";
import { createCategoryService } from "./category-service";
import { defaultProducerCriteria, defaultProductCriteria } from "./filtering/criteria";
import { createProducerService, PRODUCERS_PAGE_SIZE } from "./producer-service";
import { createProductService, PRODUCTS_PAGE_SIZE } from "./product-service";

const repositories = createMockRepositories();
const producerService = createProducerService(repositories);
const productService = createProductService(repositories);
const categoryService = createCategoryService(repositories);

const farmerCount = producers.filter((producer) => producer.type === "farmer").length;
const breederCount = producers.filter((producer) => producer.type === "breeder").length;

describe("producer service", () => {
  it("paginates a directory that mixes farmers and breeders", async () => {
    const page1 = await producerService.searchProducers("fr", defaultProducerCriteria);
    expect(page1.items).toHaveLength(PRODUCERS_PAGE_SIZE);
    expect(page1.total).toBe(producers.length);
    const lastPage = await producerService.searchProducers("fr", { ...defaultProducerCriteria, page: page1.pageCount });
    expect(lastPage.items.length).toBe(producers.length - PRODUCERS_PAGE_SIZE * (page1.pageCount - 1));
    expect(new Set(page1.items.map((producer) => producer.type))).toEqual(new Set(["farmer", "breeder"]));
  });

  it("filters by producer type and keeps the counter accurate", async () => {
    const breeders = await producerService.searchProducers("fr", { ...defaultProducerCriteria, type: "breeder" });
    expect(breeders.total).toBe(breederCount);
    expect(breeders.items.every((producer) => producer.type === "breeder")).toBe(true);
    const farmers = await producerService.searchProducers("fr", { ...defaultProducerCriteria, type: "farmer" });
    expect(farmers.total).toBe(farmerCount);
    expect(breederCount).toBeGreaterThanOrEqual(6);
  });

  it("combines the type filter with region, city and search", async () => {
    const results = await producerService.searchProducers("fr", { ...defaultProducerCriteria, type: "breeder", regionId: "centre" });
    expect(results.items.map((producer) => producer.slug).sort()).toEqual([
      "elevage-du-plateau-de-mfou",
      "pisciculture-des-etangs-de-mbalmayo",
      "poulets-de-chair-de-mbankomo",
    ]);
    const byCity = await producerService.searchProducers("fr", { ...defaultProducerCriteria, type: "breeder", city: "Mbalmayo" });
    expect(byCity.items.map((producer) => producer.slug)).toEqual(["pisciculture-des-etangs-de-mbalmayo"]);
    const search = await producerService.searchProducers("en", { ...defaultProducerCriteria, type: "breeder", query: "tilapia" });
    expect(search.items.map((producer) => producer.slug)).toEqual(["pisciculture-des-etangs-de-mbalmayo"]);
  });

  it("derives production areas from what each producer produces", async () => {
    const results = await producerService.searchProducers("fr", { ...defaultProducerCriteria, categoryId: "beekeeping" });
    expect(results.items.map((producer) => producer.slug)).toEqual(["rucher-du-mont-ngaoundere"]);
    const cattle = await producerService.searchProducers("fr", { ...defaultProducerCriteria, categoryId: "cattle-farming" });
    expect(cattle.items.map((producer) => producer.slug).sort()).toEqual(["ferme-laitiere-de-bambui", "ranch-des-collines-de-meiganga"]);
  });

  it("finds producers through their production names in any language", async () => {
    const results = await producerService.searchProducers("fr", { ...defaultProducerCriteria, query: "white pepper" });
    expect(results.items[0]?.slug).toBe("poivriere-de-la-vallee-du-mungo");
  });

  it("returns a breeder profile with livestock, adapted stages and productions", async () => {
    const profile = await producerService.getProducerProfile("en", "pisciculture-des-etangs-de-mbalmayo");
    expect(profile?.type).toBe("breeder");
    expect(profile?.production.type).toBe("aquaculture");
    expect(profile?.production.stages.map((stage) => stage.key)).toEqual(["pondPreparation", "stocking", "feeding", "waterQuality", "harvest", "postHarvest"]);
    expect(profile?.livestock.map((group) => group.speciesId)).toEqual(["tilapia", "catfish"]);
    expect(profile?.outputs.map((item) => item.name)).toEqual(["Nile tilapia", "Smoked catfish"]);
    expect(profile?.outputs[0]?.categoryName).toBe("Fish farming");
  });

  it("treats the apiary as a breeder with beekeeping stages", async () => {
    const profile = await producerService.getProducerProfile("en", "rucher-du-mont-ngaoundere");
    expect(profile?.type).toBe("breeder");
    expect(profile?.production.stages.map((stage) => stage.key)).toEqual(["apiarySetup", "colonyCare", "harvest", "postHarvest"]);
    expect(profile?.tagline).toMatch(/Savannah honey/);
  });

  it("returns a farmer profile with crop stages and no livestock", async () => {
    const farmer = await producerService.getProducerProfile("fr", "les-jardins-de-soa");
    expect(farmer?.type).toBe("farmer");
    expect(farmer?.production.type).toBe("crop");
    expect(farmer?.livestock).toEqual([]);
    expect(farmer?.outputs.length).toBeGreaterThan(0);
  });

  it("presents the duck farm with its species and productions", async () => {
    const profile = await producerService.getProducerProfile("fr", "canards-de-la-sanaga");
    expect(profile?.livestock.map((group) => group.speciesId)).toEqual(["duck"]);
    expect(profile?.outputs.map((item) => item.name)).toEqual(["Canards de Barbarie", "Canetons"]);
    const poultry = await producerService.searchProducers("fr", { ...defaultProducerCriteria, specialtyId: "broiler-chickens" });
    expect(poultry.items.map((producer) => producer.slug).sort()).toEqual(["ferme-avicole-de-mbanga", "poulets-de-chair-de-mbankomo"]);
  });

  it("does not repeat the cover photo in production stages", async () => {
    const profile = await producerService.getProducerProfile("fr", "domaine-cafeier-de-foumbot");
    expect(profile?.production.stages.some((stage) => stage.photo?.src === profile.photo.src)).toBe(false);
    expect(profile?.production.stages.find((stage) => stage.key === "harvest")?.title).toBe("Cueillette sélective");
  });

  it("omits optional crop stages that are not documented", async () => {
    const profile = await producerService.getProducerProfile("fr", "champs-de-la-benoue");
    expect(profile?.production.stages.map((stage) => stage.key)).not.toContain("irrigation");
    expect(profile?.production.stages[0]?.key).toBe("soilPreparation");
  });

  it("returns null for unknown slugs", async () => {
    expect(await producerService.getProducerProfile("fr", "inconnu")).toBeNull();
    expect(await producerService.listSimilarProducers("fr", "inconnu", 3)).toEqual([]);
  });

  it("suggests similar producers of the same type first", async () => {
    const similar = await producerService.listSimilarProducers("fr", "ranch-des-collines-de-meiganga", 3);
    expect(similar).toHaveLength(3);
    expect(similar.map((producer) => producer.slug)).not.toContain("ranch-des-collines-de-meiganga");
    expect(similar[0]?.slug).toBe("ferme-laitiere-de-bambui");
    expect(similar.every((producer) => producer.type === "breeder")).toBe(true);
  });

  it("exposes facet options scoped by producer type and region", async () => {
    const options = await producerService.getFilterOptions("fr");
    expect(options.types).toEqual(["farmer", "breeder"]);
    const mfou = options.cities.find((city) => city.value === "Mfou");
    expect(mfou).toMatchObject({ producerTypes: ["breeder"], regionIds: ["centre"] });
    const fish = options.specialties.find((specialty) => specialty.value === "fish-farming");
    expect(fish?.producerTypes).toEqual(["breeder"]);
    const scoped = await producerService.getFilterOptions("fr", { categoryId: "beekeeping" });
    expect(scoped.types).toEqual(["breeder"]);
    expect(scoped.regions.map((region) => region.value)).toEqual(["adamawa"]);
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
    expect(product).toMatchObject({ name: "White pepper", categoryName: "Spices and condiments", producer: { slug: "poivriere-de-la-vallee-du-mungo" } });
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
    expect(similar.every((product) => product.categoryId === "beekeeping" && product.slug !== "miel-clair-de-l-adamaoua")).toBe(true);
  });

  it("scopes filter options to a category", async () => {
    const options = await productService.getFilterOptions("fr", { categoryId: "beekeeping" });
    expect(options.producers.map((producer) => producer.value)).toEqual(["rucher-du-mont-ngaoundere"]);
    expect(options.regionIds).toEqual(["adamawa"]);
  });

  it("skips products whose producer or category is missing", async () => {
    const service = createProductService({
      producers: createInMemoryProducerRepository(producers.filter((producer) => producer.id !== "producer-07")),
      products: createInMemoryProductRepository(products),
      categories: createInMemoryCategoryRepository(categories),
    });
    const all = await service.listAllProducts("fr");
    expect(all.some((product) => product.producer.id === "producer-07")).toBe(false);
    expect(await service.getProduct("fr", "miel-clair-de-l-adamaoua")).toBeNull();
  });
});

describe("category service", () => {
  it("counts producers per production area and groups areas by producer type", async () => {
    const list = await categoryService.listCategories("fr");
    expect(list.every((category) => category.producerCount > 0)).toBe(true);
    expect(list.find((category) => category.id === "cattle-farming")).toMatchObject({ producerType: "breeder", producerCount: 2 });
    expect(new Set(list.map((category) => category.producerType))).toEqual(new Set(["farmer", "breeder"]));
  });

  it("returns null for unknown categories", async () => {
    expect(await categoryService.getCategory("fr", "voitures")).toBeNull();
    expect((await categoryService.getCategory("en", "poultry-farming"))?.name).toBe("Poultry farming");
  });
});
