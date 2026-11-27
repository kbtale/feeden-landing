export const DEFAULT_CANVAS_SEED = 23;
export const MAX_CANVAS_PIXELS = 4_000_000;

export type BroadcastGlyph =
  | "play"
  | "signal"
  | "reticle"
  | "dpad"
  | "diamond"
  | "bolt"
  | "ring";

export const BROADCAST_GLYPHS: readonly BroadcastGlyph[] = [
  "play",
  "signal",
  "reticle",
  "dpad",
  "diamond",
  "bolt",
  "ring",
];

export interface CanvasSizeResult {
  pixelWidth: number;
  pixelHeight: number;
  scale: number;
}

export function createPrng(seed = DEFAULT_CANVAS_SEED): () => number {
  let state = Math.abs(Math.floor(seed)) % 2147483647;
  if (state <= 0) {
    state = DEFAULT_CANVAS_SEED;
  }
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

export function computeCanvasSize(
  cssWidth: number,
  cssHeight: number,
  dpr: number,
  maxPixels = MAX_CANVAS_PIXELS,
): CanvasSizeResult {
  const safeW = Math.max(1, cssWidth);
  const safeH = Math.max(1, cssHeight);
  const safeDpr = Math.max(1, dpr);
  const desiredPixels = safeW * safeDpr * safeH * safeDpr;
  const scale =
    desiredPixels > maxPixels
      ? Math.sqrt(maxPixels / (safeW * safeH))
      : safeDpr;

  return {
    pixelWidth: Math.max(1, Math.round(safeW * scale)),
    pixelHeight: Math.max(1, Math.round(safeH * scale)),
    scale,
  };
}

function drawGlyph(
  ctx: CanvasRenderingContext2D,
  glyph: BroadcastGlyph,
  cx: number,
  cy: number,
  radius: number,
) {
  ctx.beginPath();
  switch (glyph) {
    case "play":
      ctx.moveTo(cx - radius * 0.5, cy - radius * 0.65);
      ctx.lineTo(cx + radius * 0.7, cy);
      ctx.lineTo(cx - radius * 0.5, cy + radius * 0.65);
      ctx.closePath();
      ctx.stroke();
      break;
    case "signal":
      ctx.arc(cx, cy, radius * 0.22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.62, -Math.PI * 0.35, Math.PI * 0.35);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.62, Math.PI * 0.65, Math.PI * 1.35);
      ctx.stroke();
      break;
    case "reticle":
      ctx.moveTo(cx - radius * 0.75, cy);
      ctx.lineTo(cx + radius * 0.75, cy);
      ctx.moveTo(cx, cy - radius * 0.75);
      ctx.lineTo(cx, cy + radius * 0.75);
      ctx.stroke();
      break;
    case "dpad":
      ctx.strokeRect(cx - radius * 0.25, cy - radius * 0.7, radius * 0.5, radius * 1.4);
      ctx.strokeRect(cx - radius * 0.7, cy - radius * 0.25, radius * 1.4, radius * 0.5);
      break;
    case "diamond":
      ctx.moveTo(cx, cy - radius * 0.72);
      ctx.lineTo(cx + radius * 0.72, cy);
      ctx.lineTo(cx, cy + radius * 0.72);
      ctx.lineTo(cx - radius * 0.72, cy);
      ctx.closePath();
      ctx.stroke();
      break;
    case "bolt":
      ctx.moveTo(cx + radius * 0.15, cy - radius * 0.75);
      ctx.lineTo(cx - radius * 0.45, cy + radius * 0.05);
      ctx.lineTo(cx + radius * 0.05, cy + radius * 0.05);
      ctx.lineTo(cx - radius * 0.15, cy + radius * 0.75);
      ctx.lineTo(cx + radius * 0.45, cy - radius * 0.05);
      ctx.lineTo(cx - radius * 0.05, cy - radius * 0.05);
      ctx.closePath();
      ctx.stroke();
      break;
    case "ring":
      ctx.arc(cx, cy, radius * 0.65, 0, Math.PI * 2);
      ctx.stroke();
      break;
  }
}

export interface DrawBroadcastFieldOptions {
  seed?: number;
  cellSize?: number;
  dpr?: number;
}

export function drawBroadcastField(
  canvas: HTMLCanvasElement,
  options: DrawBroadcastFieldOptions = {},
): boolean {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return false;
  }

  const rect = canvas.getBoundingClientRect();
  const cssWidth = rect.width || canvas.clientWidth || 1200;
  const cssHeight = rect.height || canvas.clientHeight || 420;
  const dpr =
    options.dpr ?? (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);

  const computedCell =
    options.cellSize ??
    (typeof window !== "undefined"
      ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--grid-cell")) || 60
      : 60);

  const cellSize = Math.max(24, computedCell);
  const { pixelWidth, pixelHeight, scale } = computeCanvasSize(cssWidth, cssHeight, dpr);

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }

  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  ctx.strokeStyle = "rgba(8, 12, 18, 0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath();

  const cols = Math.ceil(cssWidth / cellSize);
  const rows = Math.ceil(cssHeight / cellSize);

  for (let col = 0; col <= cols; col++) {
    const x = Math.floor(col * cellSize) + 0.5;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, cssHeight);
  }

  for (let row = 0; row <= rows; row++) {
    const y = Math.floor(row * cellSize) + 0.5;
    ctx.moveTo(0, y);
    ctx.lineTo(cssWidth, y);
  }

  ctx.stroke();

  const rand = createPrng(options.seed ?? DEFAULT_CANVAS_SEED);
  const glyphRadius = Math.max(7, cellSize * 0.22);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const roll = rand();
      const glyphIndex = Math.floor(rand() * BROADCAST_GLYPHS.length);
      const toneRoll = rand();

      if (roll > 0.28) {
        continue;
      }

      const cx = col * cellSize + cellSize / 2;
      const cy = row * cellSize + cellSize / 2;

      ctx.strokeStyle =
        toneRoll < 0.24 ? "rgba(13, 159, 103, 0.36)" : "rgba(8, 12, 18, 0.16)";
      ctx.lineWidth = 1.25;

      drawGlyph(ctx, BROADCAST_GLYPHS[glyphIndex], cx, cy, glyphRadius);
    }
  }

  return true;
}

export function mountBroadcastCanvas(
  canvas: HTMLCanvasElement,
  options: DrawBroadcastFieldOptions = {},
): () => void {
  drawBroadcastField(canvas, options);

  if (typeof ResizeObserver !== "function") {
    return () => {};
  }

  let frameId = 0;
  const scheduleDraw = () => {
    if (frameId && typeof cancelAnimationFrame === "function") {
      cancelAnimationFrame(frameId);
    }
    if (typeof requestAnimationFrame === "function") {
      frameId = requestAnimationFrame(() => {
        drawBroadcastField(canvas, options);
      });
    } else {
      drawBroadcastField(canvas, options);
    }
  };

  const observer = new ResizeObserver(scheduleDraw);
  observer.observe(canvas);

  return () => {
    observer.disconnect();
    if (frameId && typeof cancelAnimationFrame === "function") {
      cancelAnimationFrame(frameId);
    }
  };
}
