import { describe, expect, it, vi } from "vitest";
import fr from "../messages/fr.json";

vi.mock("server-only", () => ({}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));
vi.mock("next-intl/server", () => {
  function translator(namespace?: string) {
    return (key: string, values?: Record<string, string | number>) => {
      const path = [namespace, key].filter(Boolean).join(".");
      const message = path.split(".").reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], fr);
      const text = typeof message === "string" ? message : path;
      return text.replace(/\{(\w+)\}/g, (_, name: string) => String(values?.[name] ?? ""));
    };
  }
  return {
    getLocale: async () => "fr",
    getTranslations: async (namespace?: string) => translator(namespace),
    getFormatter: async () => ({ number: (value: number) => String(value) }),
  };
});

const farmerPage = await import("@/app/[locale]/(site)/farmers/[slug]/page");
const productPage = await import("@/app/[locale]/(site)/products/[slug]/page");
const categoryPage = await import("@/app/[locale]/(site)/categories/[slug]/page");
const sitemap = (await import("@/app/sitemap")).default;

const props = <T extends Record<string, string>>(params: T) => ({
  params: Promise.resolve({ locale: "fr", ...params }),
  searchParams: Promise.resolve({}),
});

describe("dynamic pages", () => {
  it("generate static params for every slug", async () => {
    expect(await farmerPage.generateStaticParams()).toContainEqual({ slug: "les-jardins-de-soa" });
    expect(await productPage.generateStaticParams()).toContainEqual({ slug: "poivre-blanc-de-penja" });
    expect(await categoryPage.generateStaticParams()).toContainEqual({ slug: "miel" });
  });

  it("call notFound for unknown slugs", async () => {
    await expect(farmerPage.default(props({ slug: "inconnu" }))).rejects.toThrow("NEXT_NOT_FOUND");
    await expect(productPage.default(props({ slug: "inconnu" }))).rejects.toThrow("NEXT_NOT_FOUND");
    await expect(categoryPage.default(props({ slug: "inconnu" }))).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("render known slugs", async () => {
    await expect(farmerPage.default(props({ slug: "les-jardins-de-soa" }))).resolves.toBeTruthy();
    await expect(productPage.default(props({ slug: "poivre-blanc-de-penja" }))).resolves.toBeTruthy();
  });

  it("build canonical and hreflang metadata", async () => {
    const metadata = await farmerPage.generateMetadata(props({ slug: "les-jardins-de-soa" }));
    expect(metadata.title).toBe("Les Jardins de Soa — Soa");
    expect(metadata.alternates?.canonical).toBe("http://localhost:3000/fr/farmers/les-jardins-de-soa");
    expect(metadata.alternates?.languages).toMatchObject({
      fr: "http://localhost:3000/fr/farmers/les-jardins-de-soa",
      en: "http://localhost:3000/en/farmers/les-jardins-de-soa",
      "x-default": "http://localhost:3000/fr/farmers/les-jardins-de-soa",
    });
    const missing = await productPage.generateMetadata(props({ slug: "inconnu" }));
    expect(missing.robots).toMatchObject({ index: false });
  });
});

describe("sitemap", () => {
  it("lists every public page in both languages with alternates", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);
    expect(urls).toContain("http://localhost:3000/fr");
    expect(urls).toContain("http://localhost:3000/en/products/poivre-blanc-de-penja");
    expect(urls.some((url) => url.includes("/favorites"))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
    expect(entries.every((entry) => entry.alternates?.languages && "en" in entry.alternates.languages)).toBe(true);
  });
});
