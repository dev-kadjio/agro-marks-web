import { getLocale, getTranslations } from "next-intl/server";
import { FilterTransitionProvider, PendingRegion } from "@/components/filters/filter-transition";
import { ProductFilterPanel } from "@/components/filters/product-filter-panel";
import { ResultsToolbar } from "@/components/filters/results-toolbar";
import { SortSelect } from "@/components/filters/sort-select";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { buttonClasses } from "@/components/ui/styles";
import type { CategoryId } from "@/domain/category";
import { getPathname, Link } from "@/i18n/navigation";
import { availabilityOptions, mapToRecord, regionOptions } from "@/lib/filters/option-labels";
import { countActiveProductFilters, parseProductFilters, serializeProductFilters } from "@/lib/filters/product-filter-params";
import type { RawSearchParams } from "@/lib/filters/search-params";
import { productService } from "@/services";
import { productSortOptions, type ProductFilterCriteria } from "@/services/filtering/criteria";
import { ProductGrid } from "./product-grid";

interface ProductCatalogProps {
  readonly basePath: string;
  readonly searchParams: Promise<RawSearchParams>;
  readonly lockedCategoryId?: CategoryId;
}

export async function ProductCatalog({ basePath, searchParams, lockedCategoryId }: ProductCatalogProps) {
  const [locale, params] = await Promise.all([getLocale(), searchParams]);
  const filterOptions = await productService.getFilterOptions(locale, { categoryId: lockedCategoryId });
  const producerSlugs = new Set(filterOptions.producers.map((producer) => producer.value));
  const parsed = parseProductFilters(params, producerSlugs);
  const criteria: ProductFilterCriteria = lockedCategoryId ? { ...parsed, categoryId: lockedCategoryId } : parsed;
  const serializeOptions = { omitCategory: Boolean(lockedCategoryId) };

  const [t, results, regions, availability] = await Promise.all([
    getTranslations("filters"),
    productService.searchProducts(locale, criteria),
    regionOptions(filterOptions.regionIds),
    availabilityOptions(),
  ]);
  const hrefWith = (next: ProductFilterCriteria) => `${basePath}${serializeProductFilters(next, serializeOptions)}`;

  return (
    <FilterTransitionProvider>
      <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:items-start">
        <aside className="lg:sticky lg:top-24">
          <ProductFilterPanel
            action={getPathname({ href: basePath, locale })}
            criteria={{ ...criteria, page: results.page }}
            lockCategory={Boolean(lockedCategoryId)}
            options={{ categories: filterOptions.categories, producers: filterOptions.producers, regions, availability }}
          />
        </aside>
        <PendingRegion>
          <ResultsToolbar
            total={results.total}
            hasActiveFilters={countActiveProductFilters(criteria, serializeOptions) > 0}
            resetHref={basePath}
            sort={
              <SortSelect
                id="product-sort"
                value={criteria.sort}
                options={productSortOptions.map((value) => ({ value, label: t(`sortOptions.${value}`) }))}
                queries={mapToRecord(productSortOptions, (sort) => serializeProductFilters({ ...criteria, sort, page: 1 }, serializeOptions))}
              />
            }
          />
          {results.items.length > 0 ? (
            <ProductGrid products={results.items} layout="sidebar" />
          ) : (
            <EmptyState
              title={t("empty.title")}
              description={t("empty.products")}
              action={
                <Link href={basePath} className={buttonClasses({ variant: "secondary" })}>
                  {t("reset")}
                </Link>
              }
            />
          )}
          <Pagination page={results.page} pageCount={results.pageCount} hrefForPage={(page) => hrefWith({ ...criteria, page })} />
        </PendingRegion>
      </div>
    </FilterTransitionProvider>
  );
}
