import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import StreamPillarsHarness from "../../test/StreamPillarsHarness.svelte";

describe("StreamPillars component", () => {
  it("renders all five clickable asymmetric bento CTA pillars in ES and EN", () => {
    const { unmount } = render(StreamPillarsHarness, {
      props: { locale: "es" },
    });

    expect(screen.getByRole("link", { name: /Gaming en vivo/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Reacciones y virales/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Just Chatting y humor/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Desafios y retos/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Comunidad 24\/7/i })).toBeTruthy();
    unmount();

    render(StreamPillarsHarness, { props: { locale: "en" } });
    expect(screen.getByRole("link", { name: /Live gaming/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Challenges & dares/i })).toBeTruthy();
  });
});
