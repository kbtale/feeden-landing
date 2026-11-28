import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import LiveAndVibeSlabHarness from "../../test/LiveAndVibeSlabHarness.svelte";

describe("LiveAndVibeSlab component", () => {
  it("switches between Live on Kick and FDN Community slab modes", async () => {
    const user = userEvent.setup();
    render(LiveAndVibeSlabHarness, { props: { locale: "es" } });

    expect(screen.getByText("Para ver el vivo sin vueltas.")).toBeTruthy();

    const communitySwitch = screen.getByRole("button", { name: "Comunidad FDN" });
    await user.click(communitySwitch);

    expect(screen.getByText("Para seguir en la FDN 24/7.")).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /Entrar al Discord/i }).length).toBeGreaterThan(0);
  });
});
