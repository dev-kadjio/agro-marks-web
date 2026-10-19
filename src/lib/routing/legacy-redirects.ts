const localePattern = ":locale(fr|en)";

const legacyCategorySlugs: Readonly<Record<string, string>> = {
  legumes: "vegetables",
  "tubercules-et-plantains": "food-crops",
  "cereales-et-legumineuses": "cereals-legumes",
  "cacao-et-cafe": "cash-crops",
  "epices-et-condiments": "spices-condiments",
  miel: "beekeeping",
  "oeufs-et-volailles": "poultry-farming",
};

export interface LegacyRedirect {
  readonly source: string;
  readonly destination: string;
  readonly permanent: true;
}

export const legacyRedirects: LegacyRedirect[] = [
  { source: `/${localePattern}/farmers`, destination: "/:locale/producers", permanent: true },
  { source: `/${localePattern}/farmers/:slug`, destination: "/:locale/producers/:slug", permanent: true },
  ...Object.entries(legacyCategorySlugs).map(([from, to]) => ({
    source: `/${localePattern}/categories/${from}`,
    destination: `/:locale/categories/${to}`,
    permanent: true as const,
  })),
];
