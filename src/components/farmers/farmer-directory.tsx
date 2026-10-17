import { getLocale, getTranslations } from "next-intl/server";
import { FarmerFilterPanel } from "@/components/filters/farmer-filter-panel";
import { FilterTransitionProvider, PendingRegion } from "@/components/filters/filter-transition";
import { ResultsToolbar } from "@/components/filters/results-toolbar";
import { SortSelect } from "@/components/filters/sort-select";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { buttonClasses } from "@/components/ui/styles";
import { getPathname, Link } from "@/i18n/navigation";
import { countActiveFarmerFilters, parseFarmerFilters, serializeFarmerFilters } from "@/lib/filters/farmer-filter-params";
import { mapToRecord, regionOptions, specialtyOptions } from "@/lib/filters/option-labels";
import type { RawSearchParams } from "@/lib/filters/search-params";
import { farmerService } from "@/services";
import { farmerSortOptions } from "@/services/filtering/criteria";
import { FarmerGrid } from "./farmer-grid";

const BASE_PATH = "/farmers";

export async function FarmerDirectory({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const [locale, params] = await Promise.all([getLocale(), searchParams]);
  const criteria = parseFarmerFilters(params);
  const [t, results, filterOptions] = await Promise.all([
    getTranslations("filters"),
    farmerService.searchFarmers(locale, criteria),
    farmerService.getFilterOptions(locale),
  ]);
  const [regions, specialties] = await Promise.all([
    regionOptions(filterOptions.regionIds),
    specialtyOptions(filterOptions.specialtyIds),
  ]);
  const hasActiveFilters = countActiveFarmerFilters(criteria) > 0;
  const current = { ...criteria, page: results.page };

  return (
    <FilterTransitionProvider>
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:items-start">
        <aside className="lg:sticky lg:top-24">
          <FarmerFilterPanel
            action={getPathname({ href: BASE_PATH, locale })}
            criteria={current}
            options={{ regions, specialties, categories: filterOptions.categories }}
          />
        </aside>
        <PendingRegion>
          <ResultsToolbar
            total={results.total}
            hasActiveFilters={hasActiveFilters}
            resetHref={BASE_PATH}
            sort={
              <SortSelect
                id="farmer-sort"
                value={criteria.sort}
                options={farmerSortOptions.map((value) => ({ value, label: t(`sortOptions.${value}`) }))}
                queries={mapToRecord(farmerSortOptions, (sort) => serializeFarmerFilters({ ...criteria, sort, page: 1 }))}
              />
            }
          />
          {results.items.length > 0 ? (
            <FarmerGrid farmers={results.items} layout="sidebar" />
          ) : (
            <EmptyState
              title={t("empty.title")}
              description={t("empty.farmers")}
              action={
                <Link href={BASE_PATH} className={buttonClasses({ variant: "secondary" })}>
                  {t("reset")}
                </Link>
              }
            />
          )}
          <Pagination
            page={results.page}
            pageCount={results.pageCount}
            hrefForPage={(page) => `${BASE_PATH}${serializeFarmerFilters({ ...criteria, page })}`}
          />
        </PendingRegion>
      </div>
    </FilterTransitionProvider>
  );
}
