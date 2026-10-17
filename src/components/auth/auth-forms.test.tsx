import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { routerPush } from "../../../tests/mocks/navigation";
import { renderWithProviders } from "../../../tests/test-utils";
import { AccountView } from "./account-view";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

describe("auth forms", () => {
  beforeEach(() => routerPush.mockClear());

  it("validates the registration form", async () => {
    const user = userEvent.setup();
    renderWithProviders(<RegisterForm />);
    await user.type(screen.getByLabelText("Mot de passe"), "court");
    await user.type(screen.getByLabelText("Confirmer le mot de passe"), "autre");
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));
    expect(screen.getByLabelText("Adresse e-mail")).toHaveAccessibleDescription("Veuillez saisir une adresse e-mail valide.");
    expect(screen.getByText("Le mot de passe doit contenir au moins 8 caractères.")).toBeInTheDocument();
    expect(routerPush).not.toHaveBeenCalled();
  });

  it("registers, shows the profile, signs out and signs back in", async () => {
    const user = userEvent.setup();
    const { unmount } = renderWithProviders(<RegisterForm />);
    await user.type(screen.getByLabelText("Nom complet"), "Awa Ndiaye");
    await user.type(screen.getByLabelText("Adresse e-mail"), "Awa@Example.com");
    await user.selectOptions(screen.getByLabelText("Je suis"), "farmer");
    await user.type(screen.getByLabelText("Mot de passe"), "motdepasse");
    await user.type(screen.getByLabelText("Confirmer le mot de passe"), "motdepasse");
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));
    expect(routerPush).toHaveBeenCalledWith("/account");
    unmount();

    const account = renderWithProviders(<AccountView />);
    expect(screen.getByRole("heading", { name: "Bonjour Awa Ndiaye" })).toBeInTheDocument();
    expect(screen.getByText("awa@example.com")).toBeInTheDocument();
    expect(screen.getAllByText("Agriculteur").length).toBeGreaterThan(0);
    await user.click(screen.getByRole("button", { name: "Se déconnecter" }));
    expect(screen.getByRole("heading", { name: "Vous n'êtes pas connecté" })).toBeInTheDocument();
    account.unmount();

    renderWithProviders(<LoginForm />);
    await user.type(screen.getByLabelText("Adresse e-mail"), "awa@example.com");
    await user.type(screen.getByLabelText("Mot de passe"), "mauvais-mdp");
    await user.click(screen.getByRole("button", { name: "Se connecter" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Adresse e-mail ou mot de passe incorrect.");
    await user.clear(screen.getByLabelText("Mot de passe"));
    await user.type(screen.getByLabelText("Mot de passe"), "motdepasse");
    await user.click(screen.getByRole("button", { name: "Se connecter" }));
    expect(routerPush).toHaveBeenCalledWith("/account");
  });
});
