import { z } from "zod";

export const accountRoles = ["consumer", "farmer"] as const;

export type AccountRole = (typeof accountRoles)[number];

export type AuthErrorKey =
  | "nameRequired"
  | "emailInvalid"
  | "passwordTooShort"
  | "passwordsMismatch"
  | "roleRequired"
  | "passwordRequired";

const email = z.string().trim().toLowerCase().pipe(z.email("emailInvalid"));

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "nameRequired").max(80, "nameRequired"),
    email,
    role: z.enum(accountRoles, { error: "roleRequired" }),
    city: z.string().trim().max(60).optional().transform((value) => value || undefined),
    password: z.string().min(8, "passwordTooShort").max(128, "passwordTooShort"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "passwordsMismatch" });

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "passwordRequired"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

const errorKeys = new Set<string>(["nameRequired", "emailInvalid", "passwordTooShort", "passwordsMismatch", "roleRequired", "passwordRequired"]);

export function collectErrors<Field extends string>(
  issues: readonly { readonly path: readonly PropertyKey[]; readonly message: string }[],
  fields: readonly Field[],
  fallback: AuthErrorKey,
): Partial<Record<Field, AuthErrorKey>> {
  const errors: Partial<Record<Field, AuthErrorKey>> = {};
  for (const issue of issues) {
    const field = fields.find((candidate) => candidate === issue.path[0]);
    if (field && !errors[field]) {
      errors[field] = errorKeys.has(issue.message) ? (issue.message as AuthErrorKey) : fallback;
    }
  }
  return errors;
}
