import { describe, expect, it } from "vitest";
import { buildSearchText, normalizeText, scoreMatch, tokenize } from "./text-search";

describe("text search", () => {
  it("normalizes accents, case and punctuation", () => {
    expect(normalizeText("  Fèves de CACAO, d'Obala ! ")).toBe("feves de cacao d obala");
  });

  it("tokenizes a query into normalized words", () => {
    expect(tokenize("Poivre  blanc")).toEqual(["poivre", "blanc"]);
    expect(tokenize("   ")).toEqual([]);
  });

  it("scores primary matches higher than secondary matches", () => {
    const searchText = buildSearchText(["Poivre blanc", "White pepper", "Penja"]);
    expect(scoreMatch(["poivre"], "Poivre blanc", searchText)).toBeGreaterThan(scoreMatch(["penja"], "Poivre blanc", searchText));
  });

  it("requires every token to match", () => {
    const searchText = buildSearchText(["Miel clair", "Ngaoundéré"]);
    expect(scoreMatch(["miel", "ngaoundere"], "Miel clair", searchText)).toBeGreaterThan(0);
    expect(scoreMatch(["miel", "cacao"], "Miel clair", searchText)).toBe(0);
  });
});
