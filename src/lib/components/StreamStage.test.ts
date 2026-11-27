import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import StreamStageHarness from "../../test/StreamStageHarness.svelte";

describe("StreamStage component", () => {
  it("switches folder desk tabs via click and keyboard arrows", async () => {
    const user = userEvent.setup();
    const onCopyChannel = vi.fn();

    render(StreamStageHarness, {
      props: {
        locale: "es",
        status: {
          state: "live",
          isLive: true,
          title: "Noche de Fortnite y futbol",
          category: "Fortnite",
          viewers: 950,
          startedAt: null,
          checkedAt: Date.now(),
        },
        onCopyChannel,
        forceEmbedFallback: true,
      },
    });

    expect(screen.getByText("Noche de Fortnite y futbol")).toBeTruthy();

    const gamesTab = screen.getByRole("tab", { name: "Juegos & Vibe" });
    await user.click(gamesTab);
    expect(screen.getByText("FORTNITE")).toBeTruthy();
    expect(screen.getByText("REACCIONES & FUTBOL")).toBeTruthy();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("CODIGOS DEL CHAT")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Entrar al Discord FDN/i })).toBeTruthy();
  });
});
