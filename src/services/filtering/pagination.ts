import type { Paginated } from "../view-models";

export function paginate<T>(items: readonly T[], requestedPage: number, pageSize: number): Paginated<T> {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, Math.trunc(requestedPage) || 1), pageCount);
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total,
    page,
    pageCount,
    pageSize,
  };
}
