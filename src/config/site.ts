const fallbackUrl = "http://localhost:3000";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl;
  try {
    return new URL(raw).origin;
  } catch {
    return fallbackUrl;
  }
}

export const siteConfig = {
  url: resolveSiteUrl(),
  heroImage: "/images/photos/sorting-produce.jpg",
} as const;
