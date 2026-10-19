import type { Category, CategoryId } from "@/domain/category";
import type { Locale } from "@/domain/locale";
import type { ImageAsset } from "@/domain/media";
import type { ProducedItem } from "@/domain/produced-item";
import type { Producer } from "@/domain/producer";
import type { ProductionProcess } from "@/domain/production";
import type { Product } from "@/domain/product";
import { normalizeWhatsAppNumber } from "@/lib/whatsapp";
import { buildSearchText } from "./filtering/text-search";
import { allTranslations, localize } from "./localization";
import type {
  CategoryDetail,
  CategorySummary,
  PhotoView,
  ProducedItemView,
  ProducerProfile,
  ProducerSummary,
  ProductDetail,
  ProductionView,
  ProductSummary,
} from "./view-models";

export function toPhotoView(image: ImageAsset, locale: Locale): PhotoView {
  return { src: image.src, width: image.width, height: image.height, alt: localize(image.alt, locale) };
}

export function toProducerSummary(producer: Producer, items: readonly ProducedItem[], locale: Locale): ProducerSummary {
  return {
    id: producer.id,
    slug: producer.slug,
    type: producer.type,
    farmName: producer.farmName,
    producerName: producer.producerName,
    tagline: localize(producer.tagline, locale),
    city: producer.location.city,
    regionId: producer.location.regionId,
    specialtyIds: producer.specialtyIds,
    categoryIds: [...new Set(items.map((item) => item.categoryId))],
    featured: producer.featured,
    photo: toPhotoView(producer.coverImage, locale),
    whatsappNumber: normalizeWhatsAppNumber(producer.whatsappNumber),
    searchText: buildSearchText([
      producer.farmName,
      producer.producerName,
      producer.location.city,
      ...producer.specialtyIds,
      ...allTranslations(producer.tagline),
      ...allTranslations(producer.presentation),
      ...items.flatMap((item) => allTranslations(item.name)),
      ...(producer.type === "breeder" ? producer.livestock.map((group) => group.speciesId) : []),
    ]),
  };
}

export function toProductionView(process: ProductionProcess, coverSrc: string, locale: Locale): ProductionView {
  return {
    type: process.type,
    stages: process.steps.map((step) => {
      const stage = { key: step.stage, title: localize(step.title, locale), description: localize(step.description, locale) };
      return step.image && step.image.src !== coverSrc ? { ...stage, photo: toPhotoView(step.image, locale) } : stage;
    }),
  };
}

export function toProducedItemView(item: ProducedItem, category: Category, locale: Locale): ProducedItemView {
  return {
    id: item.id,
    name: localize(item.name, locale),
    description: localize(item.description, locale),
    categoryId: item.categoryId,
    categoryName: localize(category.name, locale),
    photo: toPhotoView(item.image, locale),
    harvestMonths: item.harvestMonths,
  };
}

export function toProducerProfile(
  producer: Producer,
  items: readonly ProducedItem[],
  categoriesById: ReadonlyMap<CategoryId, Category>,
  locale: Locale,
): ProducerProfile {
  return {
    ...toProducerSummary(producer, items, locale),
    presentation: localize(producer.presentation, locale),
    story: localize(producer.story, locale),
    practiceIds: producer.practiceIds,
    commitments: producer.commitments.map((commitment) => localize(commitment, locale)),
    production: toProductionView(producer.production, producer.coverImage.src, locale),
    livestock:
      producer.type === "breeder"
        ? producer.livestock.map((group) => ({ speciesId: group.speciesId, description: localize(group.description, locale) }))
        : [],
    outputs: items.flatMap((item) => {
      const category = categoriesById.get(item.categoryId);
      return category ? [toProducedItemView(item, category, locale)] : [];
    }),
    gallery: producer.gallery.map((image) => toPhotoView(image, locale)),
    foundedYear: producer.foundedYear,
    areaHectares: producer.areaHectares,
  };
}

export function toProductSummary(product: Product, producer: Producer, category: Category, locale: Locale): ProductSummary {
  return {
    id: product.id,
    slug: product.slug,
    name: localize(product.name, locale),
    categoryId: product.categoryId,
    categorySlug: category.slug,
    categoryName: localize(category.name, locale),
    producer: {
      id: producer.id,
      slug: producer.slug,
      farmName: producer.farmName,
      city: producer.location.city,
      regionId: producer.location.regionId,
      whatsappNumber: normalizeWhatsAppNumber(producer.whatsappNumber),
    },
    photo: toPhotoView(product.image, locale),
    price: product.price,
    unit: product.unit,
    availability: product.availability,
    listedAt: product.listedAt,
    popularity: product.popularity,
    featured: product.featured,
    searchText: buildSearchText([
      ...allTranslations(product.name),
      ...allTranslations(product.description),
      ...allTranslations(category.name),
      producer.farmName,
      producer.location.city,
    ]),
  };
}

export function toProductDetail(product: Product, producer: Producer, category: Category, locale: Locale): ProductDetail {
  return {
    ...toProductSummary(product, producer, category, locale),
    description: localize(product.description, locale),
    gallery: [product.image, ...product.gallery]
      .filter((image, index, all) => all.findIndex((candidate) => candidate.src === image.src) === index)
      .map((image) => toPhotoView(image, locale)),
    harvestMonths: product.harvestMonths,
  };
}

export function toCategorySummary(category: Category, producerCount: number, locale: Locale): CategorySummary {
  return {
    id: category.id,
    slug: category.slug,
    producerType: category.producerType,
    name: localize(category.name, locale),
    summary: localize(category.summary, locale),
    photo: toPhotoView(category.image, locale),
    producerCount,
  };
}

export function toCategoryDetail(category: Category, producerCount: number, locale: Locale): CategoryDetail {
  return {
    ...toCategorySummary(category, producerCount, locale),
    introduction: localize(category.introduction, locale),
  };
}
