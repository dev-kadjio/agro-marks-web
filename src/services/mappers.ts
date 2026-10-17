import type { Category } from "@/domain/category";
import type { Farmer } from "@/domain/farmer";
import type { Locale } from "@/domain/locale";
import type { ImageAsset } from "@/domain/media";
import type { ProductionProcess, ProductionStep } from "@/domain/production";
import { isCurrentlyAvailable, type Product } from "@/domain/product";
import { normalizeWhatsAppNumber } from "@/lib/whatsapp";
import { buildSearchText } from "./filtering/text-search";
import { allTranslations, localize } from "./localization";
import type {
  CategoryDetail,
  CategorySummary,
  FarmerProfile,
  FarmerSummary,
  PhotoView,
  ProductDetail,
  ProductionStageKey,
  ProductionStageView,
  ProductSummary,
} from "./view-models";

export function toPhotoView(image: ImageAsset, locale: Locale): PhotoView {
  return { src: image.src, width: image.width, height: image.height, alt: localize(image.alt, locale) };
}

export function toFarmerSummary(farmer: Farmer, farmerProducts: readonly Product[], locale: Locale): FarmerSummary {
  const categoryIds = [...new Set(farmerProducts.map((product) => product.categoryId))];
  return {
    id: farmer.id,
    slug: farmer.slug,
    farmName: farmer.farmName,
    producerName: farmer.producerName,
    tagline: localize(farmer.tagline, locale),
    city: farmer.location.city,
    regionId: farmer.location.regionId,
    specialtyIds: farmer.specialtyIds,
    categoryIds,
    productCount: farmerProducts.length,
    hasAvailableProducts: farmerProducts.some((product) => isCurrentlyAvailable(product.availability)),
    featured: farmer.featured,
    photo: toPhotoView(farmer.coverImage, locale),
    whatsappNumber: normalizeWhatsAppNumber(farmer.whatsappNumber),
    searchText: buildSearchText([
      farmer.farmName,
      farmer.producerName,
      farmer.location.city,
      ...farmer.specialtyIds,
      ...allTranslations(farmer.tagline),
      ...allTranslations(farmer.presentation),
      ...farmerProducts.flatMap((product) => allTranslations(product.name)),
    ]),
  };
}

function toStage(key: ProductionStageKey, step: ProductionStep | undefined, locale: Locale): ProductionStageView[] {
  if (!step) {
    return [];
  }
  const stage: ProductionStageView = {
    key,
    title: localize(step.title, locale),
    description: localize(step.description, locale),
  };
  return [step.image ? { ...stage, photo: toPhotoView(step.image, locale) } : stage];
}

export function toProductionStages(process: ProductionProcess, locale: Locale): ProductionStageView[] {
  switch (process.type) {
    case "crop":
      return [
        ...toStage("soilPreparation", process.soilPreparation, locale),
        ...toStage("sowingOrPlanting", process.sowingOrPlanting, locale),
        ...toStage("cropCare", process.cropCare, locale),
        ...toStage("irrigation", process.irrigation, locale),
        ...toStage("cropProtection", process.cropProtection, locale),
        ...toStage("harvest", process.harvest, locale),
        ...toStage("postHarvest", process.postHarvest, locale),
      ];
    case "livestock":
      return [
        ...toStage("housing", process.housing, locale),
        ...toStage("feeding", process.feeding, locale),
        ...toStage("animalHealth", process.animalHealth, locale),
        ...toStage("collection", process.collection, locale),
        ...toStage("postHarvest", process.postHarvest, locale),
      ];
    case "beekeeping":
      return [
        ...toStage("apiarySetup", process.apiarySetup, locale),
        ...toStage("colonyCare", process.colonyCare, locale),
        ...toStage("harvest", process.harvest, locale),
        ...toStage("postHarvest", process.postHarvest, locale),
      ];
  }
}

export function toFarmerProfile(farmer: Farmer, farmerProducts: readonly Product[], locale: Locale): FarmerProfile {
  return {
    ...toFarmerSummary(farmer, farmerProducts, locale),
    presentation: localize(farmer.presentation, locale),
    story: localize(farmer.story, locale),
    practiceIds: farmer.practiceIds,
    commitments: farmer.commitments.map((commitment) => localize(commitment, locale)),
    productionType: farmer.production.type,
    production: toProductionStages(farmer.production, locale).map((stage) =>
      stage.photo?.src === farmer.coverImage.src ? { key: stage.key, title: stage.title, description: stage.description } : stage,
    ),
    gallery: farmer.gallery.map((image) => toPhotoView(image, locale)),
    foundedYear: farmer.foundedYear,
    areaHectares: farmer.areaHectares,
  };
}

export function toProductSummary(
  product: Product,
  farmer: Farmer,
  category: Category,
  locale: Locale,
): ProductSummary {
  return {
    id: product.id,
    slug: product.slug,
    name: localize(product.name, locale),
    categoryId: product.categoryId,
    categorySlug: category.slug,
    categoryName: localize(category.name, locale),
    farmer: {
      id: farmer.id,
      slug: farmer.slug,
      farmName: farmer.farmName,
      city: farmer.location.city,
      regionId: farmer.location.regionId,
      whatsappNumber: normalizeWhatsAppNumber(farmer.whatsappNumber),
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
      farmer.farmName,
      farmer.location.city,
    ]),
  };
}

export function toProductDetail(product: Product, farmer: Farmer, category: Category, locale: Locale): ProductDetail {
  return {
    ...toProductSummary(product, farmer, category, locale),
    description: localize(product.description, locale),
    gallery: [product.image, ...product.gallery]
      .filter((image, index, all) => all.findIndex((candidate) => candidate.src === image.src) === index)
      .map((image) => toPhotoView(image, locale)),
    harvestMonths: product.harvestMonths,
  };
}

export function toCategorySummary(category: Category, productCount: number, locale: Locale): CategorySummary {
  return {
    id: category.id,
    slug: category.slug,
    name: localize(category.name, locale),
    summary: localize(category.summary, locale),
    photo: toPhotoView(category.image, locale),
    productCount,
  };
}

export function toCategoryDetail(category: Category, productCount: number, locale: Locale): CategoryDetail {
  return {
    ...toCategorySummary(category, productCount, locale),
    introduction: localize(category.introduction, locale),
  };
}
