import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import NavbarHarness from "../../test/NavbarHarness.svelte";
import { createUnknownStatus } from "../utils/kickStatus";

describe("Navbar component", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "";
  });

  it("renders Spanish navigation by default and switches cleanly to English", async () => {
    const user = userEvent.setup();
    render(NavbarHarness, { props: { status: createUnknownStatus() } });

    expect(screen.getAllByRole("link", { name: "En Vivo" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Ver en Kick/i }).length).toBeGreaterThan(0);

    const enRadios = screen.getAllByRole("radio", { name: "EN" });
    await user.click(enRadios[0]);

    expect(screen.getAllByRole("link", { name: "Live" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Watch on Kick/i }).length).toBeGreaterThan(0);
    expect(document.documentElement.lang).toBe("en");
  });

  it("opens the mobile navigation drawer and closes with Escape", async () => {
    const user = userEvent.setup();
    render(NavbarHarness, { props: { status: createUnknownStatus() } });

    const menuTrigger = screen.getByRole("button", { name: /Abrir menu de navegacion/i });
    await user.click(menuTrigger);

    expect(await screen.findByText("Menu de Feeden")).toBeTruthy();
    const closeButton = screen.getByRole("button", { name: /Cerrar menu de navegacion/i });
    expect(closeButton).toBeTruthy();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Menu de Feeden")).toBeNull();
  });
});
