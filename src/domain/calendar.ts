export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export type Month = (typeof months)[number];

export function isMonth(value: number): value is Month {
  return Number.isInteger(value) && value >= 1 && value <= 12;
}
