import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { producerSummary, productSummary } from "../../../tests/fixtures/catalog";
import { renderWithProviders } from "../../../tests/test-utils";
import { createFavoritesStore } from "./favorites-store";
import { FavoritesView } from "./favorites-view";

const products = [productSummary({ id: "p1", name: "Miel clair" }), productSummary({ id: "p2", name: "Ndolé frais" })];
const producers = [producerSummary({ id: "f1", farmName: "Rucher du mont Ngaoundéré", type: "breeder" })];

describe("FavoritesView", () => {
  it("shows an explicit empty state", () => {
    renderWithProviders(<FavoritesView products={products} producers={producers} />);
    expect(screen.getByRole("heading", { name: "Aucun favori pour le moment" })).toBeInTheDocument();
  });

  it("only shows the product section when products were saved", () => {
    const store = createFavoritesStore(window.localStorage);
    store.toggle("producer", "f1");
    renderWithProviders(<FavoritesView products={products} producers={producers} />, { store });
    expect(screen.getByRole("heading", { name: "Producteurs (1)" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Produits/ })).not.toBeInTheDocument();
  });

  it("lists saved items and can clear them", async () => {
    const user = userEvent.setup();
    const store = createFavoritesStore(window.localStorage);
    store.toggle("product", "p2");
    store.toggle("producer", "f1");
    renderWithProviders(<FavoritesView products={products} producers={producers} />, { store });

    expect(screen.getByRole("heading", { name: "Produits (1)" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ndolé frais" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Miel clair" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Producteurs (1)" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Rucher du mont Ngaoundéré" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Vider les favoris" }));
    expect(screen.getByRole("heading", { name: "Aucun favori pour le moment" })).toBeInTheDocument();
  });
});
