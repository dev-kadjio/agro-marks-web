import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../tests/test-utils";
import { ContactForm } from "./contact-form";

describe("ContactForm", () => {
  it("reports validation errors and links them to fields", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Vérifier et envoyer" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Le formulaire contient 5 erreurs.");
    expect(screen.getByRole("alert")).toHaveFocus();
    const email = screen.getByLabelText(/Adresse e-mail/);
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription("Veuillez saisir une adresse e-mail valide.");
  });

  it("confirms a valid message without pretending to send it", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />, { locale: "en" });
    await user.type(screen.getByLabelText(/Full name/), "Awa Ndiaye");
    await user.type(screen.getByLabelText(/Email address/), "awa@example.com");
    await user.selectOptions(screen.getByLabelText(/Subject/), "farmer");
    await user.type(screen.getByLabelText(/^Message/), "I would like to present my cocoa farm in Obala.");
    await user.click(screen.getByLabelText(/I agree/));
    await user.click(screen.getByRole("button", { name: "Check and send" }));

    expect(screen.getByRole("status")).toHaveTextContent("it has not been sent");
    expect(screen.getByRole("status")).toHaveFocus();
  });
});
