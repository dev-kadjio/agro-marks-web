const WHATSAPP_NUMBER = /^[1-9]\d{7,14}$/;

export function normalizeWhatsAppNumber(raw: string | null | undefined): string | null {
  if (!raw) {
    return null;
  }
  const digits = raw.replace(/[\s().-]/g, "").replace(/^\+/, "").replace(/^00/, "");
  return WHATSAPP_NUMBER.test(digits) ? digits : null;
}

export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export type WhatsAppContact =
  | { readonly channel: "producer"; readonly number: string }
  | { readonly channel: "platform"; readonly number: string }
  | { readonly channel: "unavailable" };

export function resolveWhatsAppContact(producerNumber: string | null, platformNumber: string | null): WhatsAppContact {
  if (producerNumber) {
    return { channel: "producer", number: producerNumber };
  }
  if (platformNumber) {
    return { channel: "platform", number: platformNumber };
  }
  return { channel: "unavailable" };
}
