import Image from "next/image";
import { useTranslations } from "next-intl";
import { brand } from "@/config/brand";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const sizes = {
  header: { image: "h-14 w-auto sm:h-16", pixels: "56px", text: "text-sm sm:text-base", showName: true },
  footer: { image: "h-40 w-auto", pixels: "136px", text: "text-lg", showName: false },
} as const;

export function Logo({ variant = "header", eager = false }: { variant?: keyof typeof sizes; eager?: boolean }) {
  const t = useTranslations("navigation");
  const size = sizes[variant];
  return (
    <Link href="/" aria-label={t("homeLink")} className="inline-flex shrink-0 items-center gap-3 rounded-md">
      <Image
        src={brand.logo.src}
        alt=""
        width={brand.logo.width}
        height={brand.logo.height}
        sizes={size.pixels}
        loading={eager ? "eager" : "lazy"}
        className={cn("rounded-md", size.image)}
      />
      {size.showName ? (
        <span aria-hidden="true" className={cn("font-semibold tracking-wide text-forest", size.text)}>
          {brand.name}
        </span>
      ) : null}
    </Link>
  );
}
