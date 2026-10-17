import { describe, expect, it } from "vitest";
import { validateContact } from "./contact";

const valid = {
  name: "Awa Ndiaye",
  email: "awa@example.com",
  subject: "farmer",
  message: "Bonjour, je souhaite présenter mon exploitation de cacao.",
  consent: true,
};

describe("validateContact", () => {
  it("accepts a complete message", () => {
    expect(validateContact(valid)).toMatchObject({ success: true });
  });

  it("returns one translated error key per invalid field", () => {
    const result = validateContact({ name: " ", email: "awa@", subject: "spam", message: "court", consent: false });
    expect(result).toEqual({
      success: false,
      errors: {
        name: "nameRequired",
        email: "emailInvalid",
        subject: "subjectRequired",
        message: "messageTooShort",
        consent: "consentRequired",
      },
    });
  });

  it("handles missing values from FormData", () => {
    const result = validateContact({ name: null, email: null, subject: null, message: null, consent: false });
    expect(result.success).toBe(false);
  });

  it("limits the message length", () => {
    expect(validateContact({ ...valid, message: "a".repeat(2001) })).toMatchObject({ errors: { message: "messageTooLong" } });
  });
});
