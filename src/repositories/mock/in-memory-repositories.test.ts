import { describe, expect, it } from "vitest";
import { createMockRepositories } from ".";

const repositories = createMockRepositories();

describe("mock repositories", () => {
  it("find producers by slug and id", async () => {
    const producer = await repositories.producers.findBySlug("les-jardins-de-soa");
    expect(producer?.id).toBe("producer-05");
    expect(producer?.type).toBe("farmer");
    expect(await repositories.producers.findById("producer-05")).toBe(producer);
    expect(await repositories.producers.findBySlug("inconnu")).toBeNull();
  });

  it("find products by slug, producer and category", async () => {
    expect((await repositories.products.findBySlug("poivre-blanc-de-penja"))?.producerId).toBe("producer-03");
    const producerProducts = await repositories.products.findByProducerId("producer-03");
    expect(producerProducts.every((product) => product.producerId === "producer-03")).toBe(true);
    const honey = await repositories.products.findByCategoryId("beekeeping");
    expect(honey.length).toBeGreaterThan(0);
    expect(honey.every((product) => product.categoryId === "beekeeping")).toBe(true);
    expect(await repositories.products.findBySlug("xyz")).toBeNull();
  });

  it("find produced items for farmers and breeders", async () => {
    const farmerItems = await repositories.producedItems.findByProducerId("producer-03");
    expect(farmerItems.length).toBeGreaterThan(0);
    const breederItems = await repositories.producedItems.findByProducerId("producer-17");
    expect(breederItems.map((item) => item.categoryId)).toEqual(["pig-farming", "pig-farming"]);
  });

  it("find categories by slug and id", async () => {
    expect((await repositories.categories.findBySlug("beekeeping"))?.id).toBe("beekeeping");
    expect((await repositories.categories.findById("fish-farming"))?.producerType).toBe("breeder");
    expect(await repositories.categories.findBySlug("voitures")).toBeNull();
  });

  it("exposes editorial images and photo credits", async () => {
    expect(await repositories.media.findEditorialImage("hero")).not.toBeNull();
    expect((await repositories.media.listPhotoCredits()).length).toBeGreaterThan(50);
  });
});
