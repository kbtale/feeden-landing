import { CHANNEL_SLUG } from "../src/lib/data/feeden";
import {
  createUnknownStatus,
  parseKickChannelPayload,
} from "../src/lib/utils/kickStatus";

const UPSTREAM_TIMEOUT_MS = 4500;

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const rawChannel = url.searchParams.get("channel") ?? CHANNEL_SLUG;
  const slug = /^[a-zA-Z0-9_-]{2,40}$/.test(rawChannel) ? rawChannel : CHANNEL_SLUG;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(
      `https://kick.com/api/v2/channels/${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "feeden-landing/1.0",
        },
        signal: controller.signal,
      },
    );

    if (!upstream.ok) {
      return Response.json(createUnknownStatus(), {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      });
    }

    const data: unknown = await upstream.json();
    const status = parseKickChannelPayload(data);

    return Response.json(status, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=45, stale-while-revalidate=60",
      },
    });
  } catch {
    return Response.json(createUnknownStatus(), {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } finally {
    clearTimeout(timer);
  }
}
