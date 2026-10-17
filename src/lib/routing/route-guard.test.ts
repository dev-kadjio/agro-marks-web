import { describe, expect, it } from "vitest";
import { createSlugIndex } from "@/repositories/mock/slug-index";
import { checkRoute } from "./route-guard";

const slugs = createSlugIndex({ farmers: ["ferme-a"], products: ["miel-clair"], categories: ["miel"] });

describe("checkRoute", () => {
  it("lets known routes through", () => {
    for (const path of ["/", "/fr", "/en/", "/fr/farmers", "/en/products", "/fr/farmers/ferme-a", "/en/products/miel-clair", "/fr/categories/miel", "/en/about", "/fr/favorites", "/fr/login", "/en/register", "/fr/account"]) {
      expect(checkRoute(path, slugs)).toEqual({ status: "pass" });
    }
  });

  it("leaves unprefixed or unknown-locale paths to the i18n middleware", () => {
    expect(checkRoute("/products", slugs)).toEqual({ status: "pass" });
    expect(checkRoute("/de/foo", slugs)).toEqual({ status: "pass" });
  });

  it("flags unknown slugs and sections as not found in the right locale", () => {
    expect(checkRoute("/fr/farmers/inconnu", slugs)).toEqual({ status: "not-found", locale: "fr" });
    expect(checkRoute("/en/products/xyz", slugs)).toEqual({ status: "not-found", locale: "en" });
    expect(checkRoute("/fr/agriculteurs", slugs)).toEqual({ status: "not-found", locale: "fr" });
    expect(checkRoute("/en/about/team", slugs)).toEqual({ status: "not-found", locale: "en" });
    expect(checkRoute("/fr/farmers/ferme-a/extra", slugs)).toEqual({ status: "not-found", locale: "fr" });
  });

  it("rejects malformed encodings", () => {
    expect(checkRoute("/fr/products/%E0%A4%A", slugs)).toEqual({ status: "bad-request" });
  });
});
