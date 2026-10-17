export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function tokenize(query: string): string[] {
  return normalizeText(query)
    .split(" ")
    .filter((token) => token.length > 0);
}

export function buildSearchText(parts: readonly string[]): string {
  return normalizeText(parts.join(" "));
}

export function scoreMatch(tokens: readonly string[], primaryText: string, searchText: string): number {
  if (tokens.length === 0) {
    return 0;
  }
  const primary = normalizeText(primaryText);
  let score = 0;
  for (const token of tokens) {
    if (primary.includes(token)) {
      score += primary.split(" ").some((word) => word.startsWith(token)) ? 4 : 3;
    } else if (searchText.includes(token)) {
      score += 1;
    } else {
      return 0;
    }
  }
  return score;
}
