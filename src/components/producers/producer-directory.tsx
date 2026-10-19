import { getLocale, getTranslations } from "next-intl/server";
import { FilterTransitionProvider, PendingRegion } from "@/components/filters/filter-transition";
import { ProducerFilterPanel } from "@/components/filters/producer-filter-panel";
import { ResultsToolbar } from "@/components/filters/results-toolbar";
import { SortSelect } from "@/components/filters/sort-select";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { buttonClasses } from "@/components/ui/styles";
import type { CategoryId } from "@/domain/category";
import { getPathname, Link } from "@/i18n/navigation";
import { pruneOutOfScope } from "@/lib/filters/facet-scope";
import { facetOptions, mapToRecord, producerTypeOptions } from "@/lib/filters/option-labels";
import { countActiveProducerFilters, parseProducerFilters, serializeProducerFilters } from "@/lib/filters/producer-filter-params";
import type { RawSearchParams } from "@/lib/filters/search-params";
import { producerService } from "@/services";
import { producerSortOptions } from "@/services/filtering/criteria";
import { ProducerGrid } from "./producer-grid";

interface ProducerDirectoryProps {
  readonly basePath: string;
  readonly searchParams: Promise<RawSearchParams>;
  readonly lockedCategoryId?: CategoryId;
}

export async function ProducerDirectory({ basePath, searchParams, lockedCategoryId }: ProducerDirectoryProps) {
  const [locale, params] = await Promise.all([getLocale(), searchParams]);
  const scope = lockedCategoryId ? { categoryId: lockedCategoryId } : undefined;
  const [t, tRegions, tSpecialties, filterOptions] = await Promise.all([
    getTranslations("filters"),
    getTranslations("regions"),
    getTranslations("specialties"),
    producerService.getFilterOptions(locale, scope),
  ]);
  const [types, regions, cities, specialties] = await Promise.all([
    producerTypeOptions(filterOptions.types),
    facetOptions(filterOptions.regions, (id) => tRegions(id)),
    facetOptions(filterOptions.cities, (city) => city),
    facetOptions(filterOptions.specialties, (id) => tSpecialties(id)),
  ]);
  const options = { types, regions, cities, specialties, categories: filterOptions.categories };
  const parsed = parseProducerFilters(params, new Set(cities.map((city) => city.value)));
  const criteria = pruneOutOfScope(lockedCategoryId ? { ...parsed, type: undefined, categoryId: lockedCategoryId } : parsed, options);
  const paramOptions = { omitCategory: lockedCategoryId !== undefined };
  const results = await producerService.searchProducers(locale, criteria);
  const hasActiveFilters = countActiveProducerFilters(criteria, paramOptions) > 0;
  const current = { ...criteria, page: results.page };

  return (
    <FilterTransitionProvider>
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:items-start">
        <aside className="lg:sticky lg:top-24">
          <ProducerFilterPanel
            action={getPathname({ href: basePath, locale })}
            criteria={current}
            options={options}
            lockCategory={paramOptions.omitCategory}
          />
        </aside>
        <PendingRegion>
          <ResultsToolbar
            total={results.total}
            hasActiveFilters={hasActiveFilters}
            resetHref={basePath}
            sort={
              <SortSelect
                id="producer-sort"
                value={criteria.sort}
                options={producerSortOptions.map((value) => ({ value, label: t(`sortOptions.${value}`) }))}
                queries={mapToRecord(producerSortOptions, (sort) => serializeProducerFilters({ ...criteria, sort, page: 1 }, paramOptions))}
              />
            }
          />
          {results.items.length > 0 ? (
            <ProducerGrid producers={results.items} layout="sidebar" />
          ) : (
            <EmptyState
              title={t("empty.title")}
              description={t("empty.producers")}
              action={
                <Link href={basePath} className={buttonClasses({ variant: "secondary" })}>
                  {t("reset")}
                </Link>
              }
            />
          )}
          <Pagination
            page={results.page}
            pageCount={results.pageCount}
            hrefForPage={(page) => `${basePath}${serializeProducerFilters({ ...criteria, page }, paramOptions)}`}
          />
        </PendingRegion>
      </div>
    </FilterTransitionProvider>
  );
}
