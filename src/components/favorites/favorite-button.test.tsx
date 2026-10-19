import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../tests/test-utils";
import { FavoriteButton } from "./favorite-button";
import { FavoritesLink } from "./favorites-link";
import { createFavoritesStore } from "./favorites-store";

describe("FavoriteButton", () => {
  it("adds and removes a favourite with an accessible pressed state", async () => {
    const user = userEvent.setup();
    const store = createFavoritesStore(window.localStorage);
    renderWithProviders(
      <>
        <FavoriteButton kind="product" id="product-037" name="Poivre blanc" />
        <FavoritesLink />
      </>,
      { store },
    );

    const button = screen.getByRole("button", { name: "Ajouter Poivre blanc aux favoris" });
    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);
    expect(screen.getByRole("button", { name: "Retirer Poivre blanc des favoris" })).toHaveAttribute("aria-pressed", "true");
    expect(store.getSnapshot().product).toEqual(["product-037"]);
    expect(screen.getByRole("link", { name: "Favoris (1 élément)" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Retirer Poivre blanc des favoris" }));
    expect(store.getSnapshot().product).toEqual([]);
  });

  it("is translated in English", () => {
    renderWithProviders(<FavoriteButton kind="producer" id="producer-01" name="Ndop Valley Farm" variant="labelled" />, { locale: "en" });
    expect(screen.getByRole("button", { name: "Add to favourites" })).toBeInTheDocument();
  });
});
