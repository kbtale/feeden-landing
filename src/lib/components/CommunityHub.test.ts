import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CommunityHubHarness from "../../test/CommunityHubHarness.svelte";

describe("CommunityHub and SubmitChannelDialog", () => {
  it("filters community accounts by platform and shows bilingual empty state", async () => {
    const user = userEvent.setup();
    render(CommunityHubHarness, { props: { locale: "es" } });

    expect(screen.getByText("La Feedeneta Clips")).toBeTruthy();
    expect(screen.getByText("FDN Clips")).toBeTruthy();
    expect(screen.getByText("Discord Oficial FDN")).toBeTruthy();

    await user.click(screen.getByRole("tab", { name: "YouTube" }));
    expect(screen.getByText("La Feedeneta Clips")).toBeTruthy();
    expect(screen.queryByText("Discord Oficial FDN")).toBeNull();

    await user.click(screen.getByRole("tab", { name: "Discord" }));
    expect(screen.getByText("Discord Oficial FDN")).toBeTruthy();
    expect(screen.queryByText("La Feedeneta Clips")).toBeNull();

    await user.click(screen.getByRole("tab", { name: "TikTok" }));
    expect(
      screen.getByText(/Todavia no hay cuentas cargadas en esta plataforma/i),
    ).toBeTruthy();
  });

  it("opens SubmitChannelDialog, copies template, and closes with Escape", async () => {
    const user = userEvent.setup();
    const onCopyTemplate = vi.fn();

    render(CommunityHubHarness, {
      props: { locale: "en", onCopyTemplate },
    });

    const openBtn = screen.getByRole("button", {
      name: /Submit your clip channel/i,
    });
    await user.click(openBtn);

    expect(await screen.findByText("Submit a fan clip channel")).toBeTruthy();

    const copyBtn = screen.getByRole("button", { name: /Copy template/i });
    await user.click(copyBtn);
    expect(onCopyTemplate).toHaveBeenCalledTimes(1);
    expect(onCopyTemplate.mock.calls[0][0]).toContain("Account name:");

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Submit a fan clip channel")).toBeNull();
  });

  it("handles worst-case long fan account names and handles cleanly", () => {
    render(CommunityHubHarness, {
      props: {
        locale: "es",
        accounts: [
          {
            id: "worst-case-fan",
            name: "Archivo Historico Completo de Debates Futboleros y Recortes FDN",
            handle: "@archivohistoricocompletodelafeedenetaoficial2026",
            platform: "youtube",
            platformLabel: "YouTube",
            badge: "fan",
            url: "https://www.youtube.com/@feeden",
            description: {
              es: "Recopilaciones extendidas con titulos muy largos para comprobar ajuste limpio en pantallas chicas.",
              en: "Extended compilations with long descriptions to ensure graceful wrapping on narrow viewports.",
            },
          },
        ],
      },
    });

    expect(
      screen.getByText(
        "Archivo Historico Completo de Debates Futboleros y Recortes FDN",
      ),
    ).toBeTruthy();
  });
});
