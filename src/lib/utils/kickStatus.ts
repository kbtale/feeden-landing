import { CHANNEL_SLUG } from "../data/feeden";
import type { Locale } from "../i18n/translations";

export type StreamState = "live" | "offline" | "unknown";

export interface KickStreamStatus {
  state: StreamState;
  isLive: boolean;
  title: string | null;
  category: string | null;
  viewers: number;
  startedAt: string | null;
  checkedAt: number;
}

export interface FetchKickStatusOptions {
  slug?: string;
  proxyUrl?: string | null;
  directUrl?: string | null;
  timeoutMs?: number;
  fetchFn?: typeof fetch;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
}

function asCleanString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asNonNegativeInt(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 0;
  }
  return Math.max(0, Math.round(value));
}

export function createUnknownStatus(checkedAt = Date.now()): KickStreamStatus {
  return {
    state: "unknown",
    isLive: false,
    title: null,
    category: null,
    viewers: 0,
    startedAt: null,
    checkedAt,
  };
}

export function parseKickChannelPayload(
  payload: unknown,
  checkedAt = Date.now(),
): KickStreamStatus {
  const root = asRecord(payload);
  if (!root) {
    return createUnknownStatus(checkedAt);
  }

  if (root.state === "live" || root.state === "offline" || root.state === "unknown") {
    const isLive = root.state === "live" && root.isLive !== false;
    return {
      state: root.state,
      isLive,
      title: isLive ? asCleanString(root.title) : null,
      category: isLive ? asCleanString(root.category) : null,
      viewers: isLive ? asNonNegativeInt(root.viewers) : 0,
      startedAt: isLive ? asCleanString(root.startedAt) : null,
      checkedAt:
        typeof root.checkedAt === "number" && Number.isFinite(root.checkedAt)
          ? root.checkedAt
          : checkedAt,
    };
  }

  if (!("livestream" in root)) {
    return createUnknownStatus(checkedAt);
  }

  if (root.livestream === null) {
    return {
      state: "offline",
      isLive: false,
      title: null,
      category: null,
      viewers: 0,
      startedAt: null,
      checkedAt,
    };
  }

  const stream = asRecord(root.livestream);
  if (!stream) {
    return createUnknownStatus(checkedAt);
  }

  const isLive = stream.is_live !== false;
  if (!isLive) {
    return {
      state: "offline",
      isLive: false,
      title: null,
      category: null,
      viewers: 0,
      startedAt: null,
      checkedAt,
    };
  }

  let category: string | null = null;
  if (Array.isArray(stream.categories) && stream.categories.length > 0) {
    const firstCategory = asRecord(stream.categories[0]);
    category = asCleanString(firstCategory?.name);
  } else {
    const singleCategory = asRecord(stream.category);
    category = asCleanString(singleCategory?.name);
  }

  return {
    state: "live",
    isLive: true,
    title: asCleanString(stream.session_title) ?? asCleanString(stream.title),
    category,
    viewers: asNonNegativeInt(stream.viewer_count ?? stream.viewers),
    startedAt: asCleanString(stream.created_at) ?? asCleanString(stream.start_time),
    checkedAt,
  };
}

async function fetchJsonWithTimeout(
  url: string,
  timeoutMs: number,
  fetchFn: typeof fetch,
): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchFn(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchKickStatus(
  options: FetchKickStatusOptions = {},
): Promise<KickStreamStatus> {
  const slug = options.slug ?? CHANNEL_SLUG;
  const timeoutMs = options.timeoutMs ?? 5000;
  const fetchFn = options.fetchFn ?? globalThis.fetch;

  if (typeof fetchFn !== "function") {
    return createUnknownStatus();
  }

  const endpoints: string[] = [];
  if (options.proxyUrl !== null) {
    endpoints.push(options.proxyUrl ?? `/api/kick-status?channel=${encodeURIComponent(slug)}`);
  }
  if (options.directUrl !== null) {
    endpoints.push(options.directUrl ?? `https://kick.com/api/v2/channels/${encodeURIComponent(slug)}`);
  }

  for (const endpoint of endpoints) {
    const payload = await fetchJsonWithTimeout(endpoint, timeoutMs, fetchFn);
    if (payload !== null) {
      const parsed = parseKickChannelPayload(payload);
      if (parsed.state !== "unknown") {
        return parsed;
      }
    }
  }

  return createUnknownStatus();
}

export function formatViewerCount(count: number, locale: Locale): string {
  const safe = asNonNegativeInt(count);
  return new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US").format(safe);
}
