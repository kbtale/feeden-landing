import { render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import LiveStatusPillHarness from "../../test/LiveStatusPillHarness.svelte";
import { createUnknownStatus } from "../utils/kickStatus";

describe("LiveStatusPill component", () => {
  it("displays live badge and viewer count in Spanish and English", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });

    const liveStatus = {
      state: "live" as const,
      isLive: true,
      title: "VIVO FDN",
      category: "Fortnite",
      viewers: 1250,
      startedAt: null,
      checkedAt: Date.now(),
    };

    const { unmount } = render(LiveStatusPillHarness, {
      props: { locale: "es", status: liveStatus },
    });

    expect(screen.getByText("En vivo")).toBeTruthy();
    expect(screen.getByText(/1[.,]250 viewers/i)).toBeTruthy();
    unmount();

    render(LiveStatusPillHarness, {
      props: { locale: "en", status: liveStatus },
    });

    expect(screen.getByText("Live")).toBeTruthy();
    expect(screen.getByText(/1,250 viewers/i)).toBeTruthy();
  });

  it("displays checking and offline states", () => {
    const { unmount } = render(LiveStatusPillHarness, {
      props: { locale: "es", status: createUnknownStatus(), checking: true },
    });
    expect(screen.getByText("Verificando")).toBeTruthy();
    unmount();

    render(LiveStatusPillHarness, {
      props: { locale: "en", status: createUnknownStatus(), checking: false },
    });
    expect(screen.getByText("Offline")).toBeTruthy();
  });
});
