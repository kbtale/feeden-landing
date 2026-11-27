import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import StreamPillarsHarness from "../../test/StreamPillarsHarness.svelte";

describe("StreamPillars component", () => {
  it("renders all five asymmetric bento pillars in ES and EN", () => {
    const { unmount } = render(StreamPillarsHarness, {
      props: { locale: "es" },
    });

    expect(screen.getByText("Gaming en vivo")).toBeTruthy();
    expect(screen.getByText("Reacciones y futbol")).toBeTruthy();
    expect(screen.getByText("Just Chatting y humor")).toBeTruthy();
    expect(screen.getByText("Eventos y torneos FDN")).toBeTruthy();
    expect(screen.getByText("Comunidad 24/7")).toBeTruthy();
    unmount();

    render(StreamPillarsHarness, { props: { locale: "en" } });
    expect(screen.getByText("Live gaming")).toBeTruthy();
    expect(screen.getByText("24/7 community clips")).toBeTruthy();
  });
});
