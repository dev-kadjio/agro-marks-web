import { z } from "zod";

export const contactSubjects = ["general", "farmer", "partnership", "other"] as const;

export type ContactSubject = (typeof contactSubjects)[number];

export type ContactErrorKey =
  | "nameRequired"
  | "nameTooLong"
  | "emailInvalid"
  | "subjectRequired"
  | "messageTooShort"
  | "messageTooLong"
  | "consentRequired";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "nameRequired").max(80, "nameTooLong"),
  email: z.string().trim().pipe(z.email("emailInvalid")),
  subject: z.enum(contactSubjects, { error: "subjectRequired" }),
  message: z.string().trim().min(20, "messageTooShort").max(2000, "messageTooLong"),
  consent: z.literal(true, { error: "consentRequired" }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = keyof ContactInput;

export type ContactErrors = Partial<Record<ContactField, ContactErrorKey>>;

const fallbackErrors: Record<ContactField, ContactErrorKey> = {
  name: "nameRequired",
  email: "emailInvalid",
  subject: "subjectRequired",
  message: "messageTooShort",
  consent: "consentRequired",
};

const errorKeys = new Set<string>(Object.values(fallbackErrors).concat(["nameTooLong", "messageTooLong"]));

function isContactErrorKey(value: string): value is ContactErrorKey {
  return errorKeys.has(value);
}

function isContactField(value: PropertyKey | undefined): value is ContactField {
  return typeof value === "string" && value in fallbackErrors;
}

export function validateContact(input: Record<ContactField, unknown>):
  | { readonly success: true; readonly data: ContactInput }
  | { readonly success: false; readonly errors: ContactErrors } {
  const result = contactSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (isContactField(field) && !errors[field]) {
      errors[field] = isContactErrorKey(issue.message) ? issue.message : fallbackErrors[field];
    }
  }
  return { success: false, errors };
}
