import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { productSummary } from "../../../tests/fixtures/catalog";
import { renderWithProviders } from "../../../tests/test-utils";
import { FarmerProductsExplorer } from "./farmer-products-explorer";

const products = [
  productSummary({ id: "cocoa", name: "Fèves de cacao", categoryId: "cocoa-coffee", categoryName: "Cacao et café", price: { amount: 3500, currency: "XAF" } }),
  productSummary({ id: "plantain", name: "Plantain", categoryId: "tubers-plantains", categoryName: "Tubercules et plantains", price: { amount: 4000, currency: "XAF" } }),
  productSummary({
    id: "macabo",
    name: "Macabo",
    categoryId: "tubers-plantains",
    categoryName: "Tubercules et plantains",
    price: { amount: 500, currency: "XAF" },
    availability: { status: "out-of-season", nextSeasonMonth: 7 },
  }),
];

const productNames = () =>
  within(screen.getByRole("list", { name: "" }))
    .queryAllByRole("heading")
    .map((heading) => heading.textContent);

describe("FarmerProductsExplorer", () => {
  it("combines category, availability and sort filters", async () => {
    const user = userEvent.setup();
    renderWithProviders(<FarmerProductsExplorer products={products} />);
    expect(screen.getByRole("status")).toHaveTextContent("3 résultats");

    await user.selectOptions(screen.getByLabelText("Catégorie de produits"), "tubers-plantains");
    expect(screen.getByRole("status")).toHaveTextContent("2 résultats");

    await user.selectOptions(screen.getByLabelText("Trier par"), "price-asc");
    expect(productNames()).toEqual(["Macabo", "Plantain"]);

    await user.selectOptions(screen.getByLabelText("Disponibilité"), "available");
    expect(productNames()).toEqual(["Plantain"]);

    await user.selectOptions(screen.getByLabelText("Disponibilité"), "pre-order");
    expect(screen.getByRole("heading", { name: "Aucun résultat" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Réinitialiser les filtres" }));
    expect(screen.getByRole("status")).toHaveTextContent("3 résultats");
  });
});
