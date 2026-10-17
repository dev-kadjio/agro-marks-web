import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/styles";
import { Link } from "@/i18n/navigation";

interface CallToActionProps {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly label: string;
}

export function CallToAction({ title, description, href, label }: CallToActionProps) {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-14 sm:py-20">
      <Container>
        <div className="flex flex-col items-start gap-6 rounded-card bg-forest px-6 py-10 text-white sm:px-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="max-w-2xl">
            <h2 id="cta-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/85">{description}</p>
          </div>
          <Link href={href} className={buttonClasses({ variant: "inverse", size: "lg", className: "shrink-0" })}>
            {label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
