import { describe, expect, it, vi } from "vitest";
import {
  fetchKickStatus,
  formatViewerCount,
  parseKickChannelPayload,
} from "./kickStatus";

describe("kickStatus parser and fetcher", () => {
  it("parses an active Kick v2 livestream payload", () => {
    const result = parseKickChannelPayload(
      {
        slug: "feeden",
        livestream: {
          is_live: true,
          session_title: "Rankeds y debate futbolero",
          viewer_count: 1420,
          created_at: "2026-11-27T18:00:00Z",
          categories: [{ name: "Just Chatting" }],
        },
      },
      1000,
    );

    expect(result).toEqual({
      state: "live",
      isLive: true,
      title: "Rankeds y debate futbolero",
      category: "Just Chatting",
      viewers: 1420,
      startedAt: "2026-11-27T18:00:00Z",
      checkedAt: 1000,
    });
  });

  it("parses an offline Kick payload when livestream is null", () => {
    const result = parseKickChannelPayload({ slug: "feeden", livestream: null }, 2000);
    expect(result.state).toBe("offline");
    expect(result.isLive).toBe(false);
    expect(result.viewers).toBe(0);
    expect(result.title).toBeNull();
  });

  it("handles malformed or non-object JSON safely as unknown", () => {
    expect(parseKickChannelPayload(null).state).toBe("unknown");
    expect(parseKickChannelPayload("bad").state).toBe("unknown");
    expect(parseKickChannelPayload([]).state).toBe("unknown");
    expect(parseKickChannelPayload({ unexpected: true }).state).toBe("unknown");
  });

  it("falls back from failing proxy to direct Kick endpoint", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response("server error", { status: 500 }))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            livestream: {
              is_live: true,
              session_title: "Torneo FDN",
              viewer_count: 890,
              categories: [{ name: "Fortnite" }],
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );

    const status = await fetchKickStatus({
      fetchFn: fetchMock,
      timeoutMs: 1000,
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(status.state).toBe("live");
    expect(status.title).toBe("Torneo FDN");
    expect(status.viewers).toBe(890);
    expect(status.category).toBe("Fortnite");
  });

  it("returns silent unknown fallback on CORS error or timeout", async () => {
    const corsErrorFetch = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Failed to fetch"));
    const corsStatus = await fetchKickStatus({ fetchFn: corsErrorFetch, timeoutMs: 200 });
    expect(corsStatus.state).toBe("unknown");
    expect(corsStatus.isLive).toBe(false);

    const abortingFetch = vi.fn<typeof fetch>().mockImplementation(
      (_input, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
        }),
    );

    const timeoutStatus = await fetchKickStatus({
      fetchFn: abortingFetch,
      directUrl: null,
      timeoutMs: 20,
    });
    expect(timeoutStatus.state).toBe("unknown");
  });

  it("formats viewer counts per locale", () => {
    expect(formatViewerCount(1450, "en")).toBe("1,450");
    expect(formatViewerCount(1450, "es")).toMatch(/^1[.,]450$/);
    expect(formatViewerCount(-5, "en")).toBe("0");
  });
});
