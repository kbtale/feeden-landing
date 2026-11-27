import { describe, expect, it, vi } from "vitest";
import {
  computeCanvasSize,
  createPrng,
  DEFAULT_CANVAS_SEED,
  drawBroadcastField,
  MAX_CANVAS_PIXELS,
} from "./broadcastCanvas";

describe("broadcastCanvas deterministic PRNG and renderer", () => {
  it("produces deterministic Park-Miller LCG sequences in [0, 1)", () => {
    const first = createPrng(DEFAULT_CANVAS_SEED);
    const second = createPrng(DEFAULT_CANVAS_SEED);

    const seqA = Array.from({ length: 12 }, () => first());
    const seqB = Array.from({ length: 12 }, () => second());

    expect(seqA).toEqual(seqB);
    for (const value of seqA) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it("caps canvas backing pixel count to MAX_CANVAS_PIXELS on high-DPR displays", () => {
    const standard = computeCanvasSize(1200, 400, 2);
    expect(standard.pixelWidth).toBe(2400);
    expect(standard.pixelHeight).toBe(800);
    expect(standard.pixelWidth * standard.pixelHeight).toBeLessThanOrEqual(
      MAX_CANVAS_PIXELS,
    );

    const huge = computeCanvasSize(3840, 2160, 3);
    expect(huge.pixelWidth * huge.pixelHeight).toBeLessThanOrEqual(
      MAX_CANVAS_PIXELS + 8000,
    );
    expect(huge.scale).toBeLessThan(3);
  });

  it("draws pixel-snapped grid lines and glyphs onto a 2d context", () => {
    const stroke = vi.fn();
    const moveTo = vi.fn();
    const lineTo = vi.fn();
    const mockCtx = {
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo,
      lineTo,
      closePath: vi.fn(),
      stroke,
      arc: vi.fn(),
      strokeRect: vi.fn(),
      strokeStyle: "",
      lineWidth: 1,
    } as unknown as CanvasRenderingContext2D;

    const canvas = document.createElement("canvas");
    vi.spyOn(canvas, "getContext").mockReturnValue(mockCtx);
    vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue({
      width: 600,
      height: 300,
      top: 0,
      left: 0,
      bottom: 300,
      right: 600,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    const drawn = drawBroadcastField(canvas, { cellSize: 60, dpr: 2 });
    expect(drawn).toBe(true);
    expect(stroke).toHaveBeenCalled();
    expect(moveTo).toHaveBeenCalledWith(0.5, 0);
    expect(lineTo).toHaveBeenCalledWith(0.5, 300);
  });
});
