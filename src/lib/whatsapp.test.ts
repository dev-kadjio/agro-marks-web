import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, normalizeWhatsAppNumber, resolveWhatsAppContact } from "./whatsapp";

describe("whatsapp", () => {
  it("normalizes international numbers", () => {
    expect(normalizeWhatsAppNumber("+237 6 99 00 11 22")).toBe("237699001122");
    expect(normalizeWhatsAppNumber("00237-699-00-11-22")).toBe("237699001122");
  });

  it("rejects invalid or missing numbers", () => {
    expect(normalizeWhatsAppNumber(undefined)).toBeNull();
    expect(normalizeWhatsAppNumber("")).toBeNull();
    expect(normalizeWhatsAppNumber("0699")).toBeNull();
    expect(normalizeWhatsAppNumber("+237 abc")).toBeNull();
  });

  it("builds a wa.me link with an encoded message", () => {
    expect(buildWhatsAppUrl("237699001122", "Bonjour, « Miel » & co ?")).toBe(
      "https://wa.me/237699001122?text=Bonjour%2C%20%C2%AB%20Miel%20%C2%BB%20%26%20co%20%3F",
    );
  });

  it("prefers the producer, then the platform", () => {
    expect(resolveWhatsAppContact("237611111111", "237622222222")).toEqual({ channel: "producer", number: "237611111111" });
    expect(resolveWhatsAppContact(null, "237622222222")).toEqual({ channel: "platform", number: "237622222222" });
    expect(resolveWhatsAppContact(null, null)).toEqual({ channel: "unavailable" });
  });
});
