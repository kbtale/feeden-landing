import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import FooterHarness from "../../test/FooterHarness.svelte";

describe("Footer component", () => {
  it("renders procedural canvas, kbtale credit, and live language switcher", async () => {
    const user = userEvent.setup();
    const { container } = render(FooterHarness, { props: { locale: "es" } });

    expect(container.querySelector("canvas")).not.toBeNull();
    expect(screen.getByRole("link", { name: "Hecho por kbtale" }).getAttribute("href")).toBe(
      "https://github.com/kbtale",
    );

    await user.click(screen.getByRole("radio", { name: "EN" }));
    expect(screen.getByRole("link", { name: "Built by kbtale" })).toBeTruthy();
  });
});
