export interface CountUpOptions {
  from: number;
  to: number;
  durationMs?: number;
  onUpdate: (value: number) => void;
  onComplete?: () => void;
  respectReducedMotion?: boolean;
}

export function easeOutCubic(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return 1 - Math.pow(1 - clamped, 3);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function animateCountUp(options: CountUpOptions): () => void {
  const from = Number.isFinite(options.from) ? Math.round(options.from) : 0;
  const to = Number.isFinite(options.to) ? Math.round(options.to) : 0;
  const durationMs = options.durationMs ?? 480;
  const respectReduced = options.respectReducedMotion ?? true;

  if (
    from === to ||
    durationMs <= 0 ||
    (respectReduced && prefersReducedMotion()) ||
    typeof requestAnimationFrame !== "function"
  ) {
    options.onUpdate(to);
    options.onComplete?.();
    return () => {};
  }

  let frameId = 0;
  let cancelled = false;
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (cancelled) {
      return;
    }
    if (startTime === null) {
      startTime = timestamp;
    }
    const elapsed = timestamp - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    const eased = easeOutCubic(progress);
    const current = Math.round(from + (to - from) * eased);
    options.onUpdate(current);

    if (progress < 1) {
      frameId = requestAnimationFrame(step);
    } else {
      options.onUpdate(to);
      options.onComplete?.();
    }
  };

  frameId = requestAnimationFrame(step);

  return () => {
    cancelled = true;
    if (frameId && typeof cancelAnimationFrame === "function") {
      cancelAnimationFrame(frameId);
    }
  };
}
