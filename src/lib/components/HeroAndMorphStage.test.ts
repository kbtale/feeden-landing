import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import HeroAndMorphStageHarness from "../../test/HeroAndMorphStageHarness.svelte";

describe("HeroAndMorphStage component", () => {
  it("switches YouTube tabs, toggles 3D Feeden/FDN mode, and copies channel link", async () => {
    const user = userEvent.setup();
    const onCopyChannel = vi.fn();

    render(HeroAndMorphStageHarness, {
      props: {
        locale: "es",
        status: {
          state: "live",
          isLive: true,
          title: "Just Chatting, Reacciones y Retos",
          category: "Just Chatting",
          viewers: 640,
          startedAt: null,
          checkedAt: Date.now(),
        },
        onCopyChannel,
      },
    });

    expect(screen.getByText("Prendé el stream, sumate a la FDN.")).toBeTruthy();

    await user.click(screen.getByRole("tab", { name: "Retos" }));
    expect(screen.getByText("CONSEGUI UNA PLAY 5 PARA JUGAR AL GTA 6")).toBeTruthy();
    expect(screen.queryByText("EL CHAT ME PASA TIKTOKS MUY EXTRAÑOS")).toBeNull();

    const fdnModeBtn = screen.getAllByRole("button", { name: "Modo FDN" })[0];
    await user.click(fdnModeBtn);
    expect(fdnModeBtn.getAttribute("aria-pressed")).toBe("true");

    await user.click(screen.getByRole("button", { name: /Copiar Kick/i }));
    expect(onCopyChannel).toHaveBeenCalledTimes(1);
  });
});
