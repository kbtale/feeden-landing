import { afterEach, describe, expect, it, vi } from "vitest";
import { animateCountUp, easeOutCubic } from "./countUp";

describe("countUp animation utility", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("computes cubic ease-out values smoothly", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.8);
  });

  it("animates across requestAnimationFrame steps and completes at target", () => {
    const callbacks: FrameRequestCallback[] = [];
    vi.spyOn(globalThis, "requestAnimationFrame").mockImplementation((cb) => {
      callbacks.push(cb);
      return callbacks.length;
    });
    vi.spyOn(globalThis, "cancelAnimationFrame").mockImplementation(() => {});

    const values: number[] = [];
    const onComplete = vi.fn();

    animateCountUp({
      from: 0,
      to: 1000,
      durationMs: 480,
      onUpdate: (v) => values.push(v),
      onComplete,
    });

    callbacks[0](0);
    callbacks[1](240);
    callbacks[2](480);

    expect(values[0]).toBe(0);
    expect(values[1]).toBeGreaterThan(800);
    expect(values.at(-1)).toBe(1000);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("jumps immediately to target when reduced motion is enabled", () => {
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

    const onUpdate = vi.fn();
    const onComplete = vi.fn();

    animateCountUp({
      from: 0,
      to: 540,
      durationMs: 480,
      onUpdate,
      onComplete,
    });

    expect(onUpdate).toHaveBeenCalledWith(540);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("cancels cleanly before completion", () => {
    const callbacks: FrameRequestCallback[] = [];
    vi.spyOn(globalThis, "requestAnimationFrame").mockImplementation((cb) => {
      callbacks.push(cb);
      return callbacks.length;
    });
    const cancelSpy = vi.spyOn(globalThis, "cancelAnimationFrame").mockImplementation(() => {});

    const onUpdate = vi.fn();
    const stop = animateCountUp({
      from: 0,
      to: 500,
      durationMs: 480,
      onUpdate,
    });

    callbacks[0](0);
    stop();
    callbacks[1]?.(240);

    expect(cancelSpy).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });
});
