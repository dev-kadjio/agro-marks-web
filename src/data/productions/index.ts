import type { ProducedItem } from "@/domain/produced-item";
import { products } from "../products";
import { livestockProductions } from "./livestock";

export const producedItems: readonly ProducedItem[] = [...products, ...livestockProductions];
