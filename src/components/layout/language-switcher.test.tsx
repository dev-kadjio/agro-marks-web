import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { routerReplace } from "../../../tests/mocks/navigation";
import { renderWithProviders } from "../../../tests/test-utils";
import { LanguageSwitcher } from "./language-switcher";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    routerReplace.mockClear();
    window.history.replaceState(null, "", "/fr/farmers?region=west&page=2");
  });

  it("marks the current language", () => {
    renderWithProviders(<LanguageSwitcher />);
    expect(screen.getByRole("link", { name: "Français (langue actuelle)" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/farmers");
  });

  it("switches locale while keeping the page and its filters", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageSwitcher />);
    await user.click(screen.getByRole("link", { name: "English" }));
    expect(routerReplace).toHaveBeenCalledWith("/farmers?region=west&page=2", { locale: "en", scroll: false });
  });
});
