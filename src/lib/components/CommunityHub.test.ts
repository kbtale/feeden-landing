import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CommunityHubHarness from "../../test/CommunityHubHarness.svelte";

describe("CommunityHub and SubmitChannelDialog", () => {
  it("filters verified community accounts by Instagram, TikTok, and Discord", async () => {
    const user = userEvent.setup();
    render(CommunityHubHarness, { props: { locale: "es" } });

    expect(screen.getByText("Fedenismo 67")).toBeTruthy();
    expect(screen.getByText("FDN Clips")).toBeTruthy();
    expect(screen.getByText("Futbol Club FDN")).toBeTruthy();
    expect(screen.getByText("Feedenman")).toBeTruthy();
    expect(screen.getByText("Fedenman TikTok")).toBeTruthy();
    expect(screen.getByText("Discord Oficial FDN")).toBeTruthy();

    await user.click(screen.getByRole("tab", { name: "Instagram" }));
    expect(screen.getByText("Fedenismo 67")).toBeTruthy();
    expect(screen.queryByText("Fedenman TikTok")).toBeNull();
    expect(screen.queryByText("Discord Oficial FDN")).toBeNull();

    await user.click(screen.getByRole("tab", { name: "TikTok" }));
    expect(screen.getByText("Fedenman TikTok")).toBeTruthy();
    expect(screen.queryByText("Fedenismo 67")).toBeNull();

    await user.click(screen.getByRole("tab", { name: "Discord" }));
    expect(screen.getByText("Discord Oficial FDN")).toBeTruthy();
    expect(screen.queryByText("Fedenman TikTok")).toBeNull();
  });

  it("opens SubmitChannelDialog, copies template, and closes with Escape", async () => {
    const user = userEvent.setup();
    const onCopyTemplate = vi.fn();

    render(CommunityHubHarness, {
      props: { locale: "en", onCopyTemplate },
    });

    const openBtn = screen.getByRole("button", {
      name: /Submit your page/i,
    });
    await user.click(openBtn);

    expect(await screen.findByText("Submit a community account")).toBeTruthy();

    const copyBtn = screen.getByRole("button", { name: /Copy template/i });
    await user.click(copyBtn);
    expect(onCopyTemplate).toHaveBeenCalledTimes(1);
    expect(onCopyTemplate.mock.calls[0][0]).toContain("Account name:");

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Submit a community account")).toBeNull();
  });

  it("renders empty state when no accounts match a platform", async () => {
    const user = userEvent.setup();
    render(CommunityHubHarness, {
      props: {
        locale: "es",
        accounts: [],
      },
    });

    await user.click(screen.getByRole("tab", { name: "TikTok" }));
    expect(
      screen.getByText(/Todavia no hay cuentas en esta categoria/i),
    ).toBeTruthy();
  });
});
