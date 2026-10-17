import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonClasses } from "@/components/ui/styles";
import { buildWhatsAppUrl, type WhatsAppContact as Contact } from "@/lib/whatsapp";

interface WhatsAppContactProps {
  readonly contact: Contact;
  readonly message: string;
  readonly farmName: string;
}

export function WhatsAppContact({ contact, message, farmName }: WhatsAppContactProps) {
  const t = useTranslations("whatsapp");

  if (contact.channel === "unavailable") {
    return (
      <div className="space-y-2">
        <span aria-disabled="true" className={buttonClasses({ size: "lg", className: "cursor-not-allowed opacity-50" })}>
          <MessageCircle aria-hidden="true" className="size-5" />
          {t("cta")}
        </span>
        <p className="text-xs leading-relaxed text-muted">{t("unavailable")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <a
        href={buildWhatsAppUrl(contact.number, message)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses({ size: "lg" })}
      >
        <MessageCircle aria-hidden="true" className="size-5" />
        {t("cta")}
        <span className="sr-only">{t("opensExternally")}</span>
      </a>
      <p className="text-xs leading-relaxed text-muted">
        {contact.channel === "farmer" ? t("farmerNote") : t("platformNote", { farm: farmName })}
      </p>
    </div>
  );
}
