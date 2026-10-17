import type { Product } from "@/domain/product";
import { avocadoProducts } from "./avocados";
import { cerealProducts } from "./cereals-legumes";
import { cocoaCoffeeProducts } from "./cocoa-coffee";
import { fruitProducts } from "./fruits";
import { eggPoultryProducts, honeyProducts } from "./honey-eggs";
import { spiceProducts } from "./spices-condiments";
import { tuberProducts } from "./tubers-plantains";
import { vegetableProducts } from "./vegetables";

export const products: readonly Product[] = [
  ...vegetableProducts,
  ...fruitProducts,
  ...avocadoProducts,
  ...tuberProducts,
  ...cerealProducts,
  ...cocoaCoffeeProducts,
  ...spiceProducts,
  ...honeyProducts,
  ...eggPoultryProducts,
];
