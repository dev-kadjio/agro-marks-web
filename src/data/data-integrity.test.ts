import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { locales, type LocalizedText } from "@/domain/locale";
import { categories } from "./categories";
import { farmers } from "./farmers";
import { listPhotoCredits } from "./photos";
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
    for (const collection of [farmers, products, categories]) {
      expect(unique(collection.map((item) => item.id))).toBe(true);
      expect(unique(collection.map((item) => item.slug))).toBe(true);
      collection.forEach((item) => expect(item.slug).toMatch(slugPattern));
    }
  });

  it("references existing farmers and categories", () => {
    const farmerIds = new Set(farmers.map((farmer) => farmer.id));
    const categoryIds = new Set(categories.map((category) => category.id));
    for (const product of products) {
      expect(farmerIds.has(product.farmerId), product.slug).toBe(true);
      expect(categoryIds.has(product.categoryId), product.slug).toBe(true);
    }
    for (const farmer of farmers) {
      expect(products.some((product) => product.farmerId === farmer.id), farmer.slug).toBe(true);
    }
  });

  it("provides every localized field in all locales", () => {
    const entries: { path: string; text: LocalizedText }[] = [];
    collectLocalized({ farmers, products, categories }, "data", entries);
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
