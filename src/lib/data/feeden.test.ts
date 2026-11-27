import { describe, expect, it } from "vitest";
import {
  CHANNEL_SLUG,
  COMMUNITY_ACCOUNTS,
  COMMUNITY_FILTERS,
  filterCommunityAccounts,
  KICK_EMBED_URL,
  KICK_URL,
  OFFICIAL_SOCIALS,
  STREAM_GAMES,
} from "./feeden";

describe("feeden data integrity", () => {
  it("defines canonical Kick URLs for feeden", () => {
    expect(CHANNEL_SLUG).toBe("feeden");
    expect(KICK_URL).toBe("https://kick.com/feeden");
    expect(KICK_EMBED_URL).toContain("player.kick.com/feeden");
  });

  it("has unique official socials with valid HTTPS links", () => {
    const ids = OFFICIAL_SOCIALS.map((social) => social.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const social of OFFICIAL_SOCIALS) {
      expect(social.url.startsWith("https://")).toBe(true);
      expect(social.handle.length).toBeGreaterThan(0);
    }
  });

  it("includes bilingual stream games roster", () => {
    expect(STREAM_GAMES.length).toBeGreaterThanOrEqual(7);
    for (const game of STREAM_GAMES) {
      expect(game.code).toMatch(/^\d{2}$/);
      expect(game.label.es.length).toBeGreaterThan(0);
      expect(game.label.en.length).toBeGreaterThan(0);
    }
  });

  it("pre-seeds community accounts with valid bilingual descriptions and filters accurately", () => {
    const ids = COMMUNITY_ACCOUNTS.map((account) => account.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("la-feedeneta-clips");
    expect(ids).toContain("fdn-clips");
    expect(ids).toContain("discord-oficial-fdn");

    for (const account of COMMUNITY_ACCOUNTS) {
      expect(account.url.startsWith("https://")).toBe(true);
      expect(account.description.es.includes("\u2014")).toBe(false);
      expect(account.description.en.includes("\u2014")).toBe(false);
    }

    expect(filterCommunityAccounts(COMMUNITY_ACCOUNTS, "all")).toHaveLength(
      COMMUNITY_ACCOUNTS.length,
    );
    expect(filterCommunityAccounts(COMMUNITY_ACCOUNTS, "youtube")).toHaveLength(2);
    expect(filterCommunityAccounts(COMMUNITY_ACCOUNTS, "discord")).toHaveLength(1);
    expect(filterCommunityAccounts(COMMUNITY_ACCOUNTS, "tiktok")).toHaveLength(0);
    expect(COMMUNITY_FILTERS).toContain("all");
  });
});
