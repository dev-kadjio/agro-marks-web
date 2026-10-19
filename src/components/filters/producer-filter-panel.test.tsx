import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { defaultProducerCriteria } from "@/services/filtering/criteria";
import { routerReplace } from "../../../tests/mocks/navigation";
import { renderWithProviders } from "../../../tests/test-utils";
import { FilterTransitionProvider } from "./filter-transition";
import { ProducerFilterPanel, type ProducerFilterPanelOptions } from "./producer-filter-panel";

const options: ProducerFilterPanelOptions = {
  types: [
    { value: "farmer", label: "Agriculteur" },
    { value: "breeder", label: "Éleveur" },
  ],
  regions: [{ value: "centre", label: "Centre", producerTypes: ["farmer", "breeder"], regionIds: ["centre"] }],
  cities: [
    { value: "Mfou", label: "Mfou", producerTypes: ["breeder"], regionIds: ["centre"] },
    { value: "Obala", label: "Obala", producerTypes: ["farmer"], regionIds: ["centre"] },
  ],
  specialties: [
    { value: "cocoa", label: "Cacao", producerTypes: ["farmer"], regionIds: ["centre"] },
    { value: "poultry", label: "Aviculture", producerTypes: ["breeder"], regionIds: ["centre"] },
  ],
  categories: [
    { value: "cash-crops", label: "Cultures de rente", producerTypes: ["farmer"], regionIds: ["centre"] },
    { value: "poultry-farming", label: "Élevage de volailles", producerTypes: ["breeder"], regionIds: ["centre"] },
  ],
};

function renderPanel(criteria = defaultProducerCriteria, locale: "fr" | "en" = "fr", lockCategory = false) {
  return renderWithProviders(
    <FilterTransitionProvider>
      <ProducerFilterPanel action="/fr/producers" criteria={criteria} options={options} lockCategory={lockCategory} />
    </FilterTransitionProvider>,
    { locale },
  );
}

const optionLabels = (select: HTMLElement) => within(select).getAllByRole("option").map((option) => option.textContent);

describe("ProducerFilterPanel", () => {
  beforeEach(() => {
    routerReplace.mockClear();
  });

  it("offers an accessible producer type select using business keys as values", () => {
    renderPanel();
    const select = screen.getByRole("combobox", { name: "Type de producteur" });
    expect(optionLabels(select)).toEqual(["Tous les producteurs", "Agriculteur", "Éleveur"]);
    expect(within(select).getAllByRole("option").map((option) => option.getAttribute("value"))).toEqual(["", "farmer", "breeder"]);
  });

  it("is translated in English", () => {
    renderPanel(defaultProducerCriteria, "en");
    expect(screen.getByRole("combobox", { name: "Producer type" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "All producers" })).toBeInTheDocument();
  });

  it("applies the type while keeping compatible filters and clearing the others", async () => {
    const user = userEvent.setup();
    renderPanel({ ...defaultProducerCriteria, query: "ferme", regionId: "centre", specialtyId: "cocoa" });
    await user.selectOptions(screen.getByRole("combobox", { name: "Type de producteur" }), "breeder");
    expect(routerReplace).toHaveBeenCalledWith("/producers?q=ferme&type=breeder&region=centre", { scroll: false });
  });

  it("only lists specialties, towns and areas that match the selected type", () => {
    renderPanel({ ...defaultProducerCriteria, type: "breeder" });
    expect(optionLabels(screen.getByRole("combobox", { name: "Spécialité" }))).toEqual(["Toutes les spécialités", "Aviculture"]);
    expect(optionLabels(screen.getByRole("combobox", { name: "Ville" }))).toEqual(["Toutes les villes", "Mfou"]);
    expect(optionLabels(screen.getByRole("combobox", { name: "Domaine de production" }))).toEqual(["Tous les domaines", "Élevage de volailles"]);
  });

  it("resets to all producers", async () => {
    const user = userEvent.setup();
    renderPanel({ ...defaultProducerCriteria, type: "farmer" });
    await user.selectOptions(screen.getByRole("combobox", { name: "Type de producteur" }), "");
    expect(routerReplace).toHaveBeenCalledWith("/producers", { scroll: false });
  });

  it("hides the type and area selects when the production area is fixed by the page", () => {
    renderPanel(defaultProducerCriteria, "fr", true);
    expect(screen.queryByRole("combobox", { name: "Type de producteur" })).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox", { name: "Domaine de production" })).not.toBeInTheDocument();
  });
});
