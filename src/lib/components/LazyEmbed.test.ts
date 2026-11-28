import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import LazyEmbedHarness from "../../test/LazyEmbedHarness.svelte";

describe("LazyEmbed component", () => {
  it("shows loading skeleton with direct Kick link before intersection", () => {
    render(LazyEmbedHarness, {
      props: {
        src: "https://player.kick.com/feeden?autoplay=false&muted=true",
        title: "Kick Player",
        fallbackUrl: "https://kick.com/feeden",
      },
    });

    expect(screen.getByText(/Cargando reproductor de Kick/i)).toBeTruthy();
    const link = screen.getByRole("link", { name: /Abrir kick\.com\/feeden/i });
    expect(link.getAttribute("href")).toBe("https://kick.com/feeden");
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("mounts iframe immediately when immediate prop is set", () => {
    render(LazyEmbedHarness, {
      props: {
        src: "https://player.kick.com/feeden?autoplay=false&muted=true",
        title: "Kick Player",
        fallbackUrl: "https://kick.com/feeden",
        immediate: true,
      },
    });

    const iframe = screen.getByTitle("Kick Player");
    expect(iframe.tagName).toBe("IFRAME");
    expect(iframe.getAttribute("src")).toContain("player.kick.com/feeden");
  });

  it("renders accessible bilingual fallback card when embed is blocked", () => {
    render(LazyEmbedHarness, {
      props: {
        locale: "en",
        src: "https://player.kick.com/feeden?autoplay=false&muted=true",
        title: "Kick Player",
        fallbackUrl: "https://kick.com/feeden",
        forceFallback: true,
      },
    });

    expect(screen.getByText(/Watch directly on Kick/i)).toBeTruthy();
    const link = screen.getByRole("link", { name: /Open kick\.com\/feeden/i });
    expect(link.getAttribute("href")).toBe("https://kick.com/feeden");
  });
});
