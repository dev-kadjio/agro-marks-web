import { describe, expect, it } from "vitest";
import { createMockRepositories } from ".";

const repositories = createMockRepositories();

describe("mock repositories", () => {
  it("find farmers by slug and id", async () => {
    const farmer = await repositories.farmers.findBySlug("les-jardins-de-soa");
    expect(farmer?.id).toBe("farmer-05");
    expect(await repositories.farmers.findById("farmer-05")).toBe(farmer);
    expect(await repositories.farmers.findBySlug("inconnu")).toBeNull();
  });

  it("find products by slug, farmer and category", async () => {
    expect((await repositories.products.findBySlug("poivre-blanc-de-penja"))?.farmerId).toBe("farmer-03");
    const farmerProducts = await repositories.products.findByFarmerId("farmer-03");
    expect(farmerProducts.every((product) => product.farmerId === "farmer-03")).toBe(true);
    const honey = await repositories.products.findByCategoryId("honey");
    expect(honey.length).toBeGreaterThan(0);
    expect(honey.every((product) => product.categoryId === "honey")).toBe(true);
    expect(await repositories.products.findBySlug("xyz")).toBeNull();
  });

  it("find categories by slug and id", async () => {
    expect((await repositories.categories.findBySlug("miel"))?.id).toBe("honey");
    expect((await repositories.categories.findById("honey"))?.slug).toBe("miel");
    expect(await repositories.categories.findBySlug("voitures")).toBeNull();
  });

  it("exposes editorial images and photo credits", async () => {
    expect(await repositories.media.findEditorialImage("hero")).not.toBeNull();
    expect((await repositories.media.listPhotoCredits()).length).toBeGreaterThan(50);
  });
});
