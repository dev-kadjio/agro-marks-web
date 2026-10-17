import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../../tests/test-utils";
import { Carousel } from "./carousel";

describe("Carousel", () => {
  it("renders labelled slides and visible controls", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    globalThis.ResizeObserver = class {
      observe() {}
      disconnect() {}
      unobserve() {}
    };
    const scrollBy = vi.fn();
    Element.prototype.scrollBy = scrollBy;

    renderWithProviders(
      <Carousel
        label="Produits vedettes"
        slides={[
          { key: "a", content: <p>Miel</p> },
          { key: "b", content: <p>Poivre</p> },
        ]}
      />,
    );

    expect(screen.getByRole("region", { name: "Produits vedettes" })).toBeInTheDocument();
    expect(screen.getByLabelText("1 sur 2")).toHaveTextContent("Miel");
    expect(screen.getByRole("button", { name: "Produits précédents" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Produits suivants" }));
    fireEvent.keyDown(screen.getByRole("list"), { key: "ArrowRight" });
    expect(scrollBy).toHaveBeenCalledTimes(2);
    expect(scrollBy).toHaveBeenLastCalledWith(expect.objectContaining({ behavior: "auto" }));
  });
});
