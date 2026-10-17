import { describe, expect, it } from "vitest";
import { allTranslations, localize } from "./localization";

describe("localize", () => {
  it("returns the requested translation", () => {
    expect(localize({ fr: "Miel", en: "Honey" }, "en")).toBe("Honey");
  });

  it("falls back to French when a translation is missing or empty", () => {
    expect(localize({ fr: "Ndolé" }, "en")).toBe("Ndolé");
    expect(localize({ fr: "Ndolé", en: "  " }, "en")).toBe("Ndolé");
  });

  it("lists every available translation", () => {
    expect(allTranslations({ fr: "Miel", en: "Honey" })).toEqual(["Miel", "Honey"]);
  });
});
