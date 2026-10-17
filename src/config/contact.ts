import { normalizeWhatsAppNumber } from "@/lib/whatsapp";

export const contactConfig = {
  platformWhatsAppNumber: normalizeWhatsAppNumber(process.env.AGRO_MARKS_WHATSAPP_NUMBER),
} as const;
