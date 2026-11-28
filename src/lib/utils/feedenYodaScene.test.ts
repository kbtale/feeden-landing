import { describe, expect, it } from "vitest";
import { clamp01, computeMorphParameters, smoothstep } from "./feedenYodaScene";

describe("feedenYodaScene scroll morph math", () => {
  it("clamps invalid and out-of-range inputs safely", () => {
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(2.4)).toBe(1);
    expect(clamp01(Number.NaN)).toBe(0);
    expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5, 4);
  });

  it("starts in Feeden streamer pose at progress 0", () => {
    const start = computeMorphParameters(0);
    expect(start.rotationY).toBe(0);
    expect(start.headphoneScale).toBe(1);
    expect(start.earScale).toBe(0);
    expect(start.ringScale).toBe(0);
    expect(start.eyeGlow).toBe(0);
  });

  it("rotates full 360 deg and completes FDN Yoda morph at progress 1", () => {
    const end = computeMorphParameters(1);
    expect(end.rotationY).toBeCloseTo(Math.PI * 2, 5);
    expect(end.headphoneScale).toBe(0);
    expect(end.earScale).toBe(1);
    expect(end.ringScale).toBe(1);
    expect(end.eyeGlow).toBe(1);
    expect(end.cloakLift).toBe(1);
  });

  it("transitions monotonically through mid-scroll", () => {
    const mid = computeMorphParameters(0.5);
    expect(mid.rotationY).toBeGreaterThan(0);
    expect(mid.rotationY).toBeLessThan(Math.PI * 2);
    expect(mid.earScale).toBeGreaterThan(0);
    expect(mid.earScale).toBeLessThan(1);
  });
});
