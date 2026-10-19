import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../../tests/test-utils";
import { WhatsAppContact } from "./whatsapp-contact";

describe("WhatsAppContact", () => {
  it("links to WhatsApp with the pre-filled message", () => {
    renderWithProviders(
      <WhatsAppContact contact={{ channel: "producer", number: "237699001122" }} message="Bonjour, est-il disponible ?" farmName="Ndop Valley Farm" />,
    );
    const link = screen.getByRole("link", { name: /Discuter sur WhatsApp/ });
    expect(link).toHaveAttribute("href", "https://wa.me/237699001122?text=Bonjour%2C%20est-il%20disponible%20%3F");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("explains when the platform relays the request", () => {
    renderWithProviders(<WhatsAppContact contact={{ channel: "platform", number: "237699001122" }} message="Hi" farmName="Ndop Valley Farm" />, {
      locale: "en",
    });
    expect(screen.getByText(/put you in touch with Ndop Valley Farm/)).toBeInTheDocument();
  });

  it("shows a disabled state with an explanation when no number is configured", () => {
    renderWithProviders(<WhatsAppContact contact={{ channel: "unavailable" }} message="Hi" farmName="Ferme" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText(/pas encore configuré/)).toBeInTheDocument();
  });
});
