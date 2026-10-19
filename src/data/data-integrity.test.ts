import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { locales, type LocalizedText } from "@/domain/locale";
import { productionStages } from "@/domain/production";
import { categories } from "./categories";
import { listPhotoCredits } from "./photos";
import { producedItems } from "./productions";
import { livestockProductions } from "./productions/livestock";
import { producers } from "./producers";
import { products } from "./products";

function collectLocalized(value: unknown, path: string, out: { path: string; text: LocalizedText }[]): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectLocalized(item, `${path}[${index}]`, out));
  } else if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.fr === "string") {
      out.push({ path, text: record as LocalizedText });
      return;
    }
    Object.entries(record).forEach(([key, child]) => collectLocalized(child, `${path}.${key}`, out));
  }
}

const unique = (values: readonly string[]) => new Set(values).size === values.length;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe("mock data integrity", () => {
  it("uses unique ids and readable slugs", () => {
    for (const collection of [producers, products, categories]) {
      expect(unique(collection.map((item) => item.id))).toBe(true);
      expect(unique(collection.map((item) => item.slug))).toBe(true);
      collection.forEach((item) => expect(item.slug).toMatch(slugPattern));
    }
    expect(unique(producedItems.map((item) => item.id))).toBe(true);
  });

  it("uses English category slugs", () => {
    categories.forEach((category) => expect(category.slug).toBe(category.id));
  });

  it("includes both farmers and enough breeders to exercise the filters", () => {
    const breeders = producers.filter((producer) => producer.type === "breeder");
    expect(producers.some((producer) => producer.type === "farmer")).toBe(true);
    expect(breeders.length).toBeGreaterThanOrEqual(6);
    expect(new Set(breeders.map((breeder) => breeder.production.type))).toEqual(new Set(["livestock", "beekeeping", "aquaculture"]));
  });

  it("matches each producer type with a suitable production process", () => {
    for (const producer of producers) {
      if (producer.type === "farmer") {
        expect(producer.production.type, producer.slug).toBe("crop");
      } else {
        expect(producer.production.type, producer.slug).not.toBe("crop");
        expect(producer.livestock.length, producer.slug).toBeGreaterThan(0);
      }
      const allowed: readonly string[] = productionStages[producer.production.type];
      const stages = producer.production.steps.map((step) => step.stage);
      expect(unique(stages), producer.slug).toBe(true);
      stages.forEach((stage) => expect(allowed, producer.slug).toContain(stage));
    }
  });

  it("references existing producers and categories", () => {
    const producerIds = new Set(producers.map((producer) => producer.id));
    const categoriesById = new Map(categories.map((category) => [category.id, category]));
    const producerTypes = new Map(producers.map((producer) => [producer.id, producer.type]));
    for (const item of producedItems) {
      expect(producerIds.has(item.producerId), item.id).toBe(true);
      expect(categoriesById.get(item.categoryId)?.producerType, item.id).toBe(producerTypes.get(item.producerId));
    }
    for (const producer of producers) {
      expect(producedItems.some((item) => item.producerId === producer.id), producer.slug).toBe(true);
    }
    for (const category of categories) {
      expect(producedItems.some((item) => item.categoryId === category.id), category.slug).toBe(true);
    }
  });

  it("keeps livestock productions out of the priced catalogue", () => {
    const productIds = new Set(products.map((product) => product.id));
    livestockProductions.forEach((item) => expect(productIds.has(item.id)).toBe(false));
    livestockProductions.forEach((item) => expect(item).not.toHaveProperty("price"));
  });

  it("provides every localized field in all locales", () => {
    const entries: { path: string; text: LocalizedText }[] = [];
    collectLocalized({ producers, products, categories, livestockProductions }, "data", entries);
    expect(entries.length).toBeGreaterThan(300);
    const missing = entries.filter(({ text }) => locales.some((locale) => !text[locale]?.trim())).map(({ path }) => path);
    expect(missing).toEqual([]);
  });

  it("keeps prices positive and dates valid", () => {
    for (const product of products) {
      expect(product.price.amount).toBeGreaterThan(0);
      expect(Number.isNaN(Date.parse(product.listedAt))).toBe(false);
      expect(product.popularity).toBeGreaterThanOrEqual(0);
    }
  });

  it("only references photos that exist locally", () => {
    const credits = listPhotoCredits();
    for (const credit of credits) {
      expect(existsSync(join(process.cwd(), "public", credit.src)), credit.src).toBe(true);
      expect(credit.license.length).toBeGreaterThan(0);
    }
  });
});
