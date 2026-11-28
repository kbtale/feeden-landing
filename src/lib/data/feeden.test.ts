import { describe, expect, it } from "vitest";
import {
  CHANNEL_SLUG,
  COMMUNITY_ACCOUNTS,
  COMMUNITY_FILTERS,
  DISCORD_INVITE_URL,
  filterCommunityAccounts,
  KICK_EMBED_URL,
  KICK_URL,
  OFFICIAL_SOCIALS,
  X_PROFILE_URL,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_VIDEOS,
} from "./feeden";

describe("feeden data integrity", () => {
  it("defines canonical verified official URLs for Feeden", () => {
    expect(CHANNEL_SLUG).toBe("feeden");
    expect(KICK_URL).toBe("https://kick.com/feeden");
    expect(KICK_EMBED_URL).toContain("player.kick.com/feeden");
    expect(YOUTUBE_CHANNEL_URL).toBe("https://www.youtube.com/@Feeden_");
    expect(DISCORD_INVITE_URL).toBe("https://discord.gg/jrHe634FU");
    expect(X_PROFILE_URL).toBe("https://x.com/Feeden_");
  });

  it("has all six verified official socials with valid HTTPS links", () => {
    const ids = OFFICIAL_SOCIALS.map((social) => social.id);
    expect(new Set(ids).size).toBe(6);
    const urls = OFFICIAL_SOCIALS.map((social) => social.url);
    expect(urls).toContain("https://www.instagram.com/fedenrios");
    expect(urls).toContain("https://www.youtube.com/@Feeden_");
    expect(urls).toContain("https://www.tiktok.com/@feeden_");
    expect(urls).toContain("https://x.com/Feeden_");
    expect(urls).toContain("https://discord.gg/jrHe634FU");
    for (const social of OFFICIAL_SOCIALS) {
      expect(social.url.startsWith("https://")).toBe(true);
      expect(social.handle.length).toBeGreaterThan(0);
    }
  });

  it("includes verified YouTube videos with spatial callout coordinates", () => {
    expect(YOUTUBE_VIDEOS.length).toBe(7);
    for (const item of YOUTUBE_VIDEOS) {
      expect(item.url.startsWith("https://www.youtube.com/watch?v=")).toBe(true);
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.tag.es.length).toBeGreaterThan(0);
      expect(item.tag.en.length).toBeGreaterThan(0);
      expect(item.x).toBeGreaterThan(0);
      expect(item.x).toBeLessThan(100);
      expect(item.y).toBeGreaterThan(0);
      expect(item.y).toBeLessThan(100);
    }
  });

  it("contains all verified fanbase accounts and filters accurately", () => {
    const urls = COMMUNITY_ACCOUNTS.map((account) => account.url);
    expect(urls).toContain("https://www.instagram.com/fedenismo_67");
    expect(urls).toContain("https://www.instagram.com/fdn_clips");
    expect(urls).toContain("https://www.instagram.com/futbolclubfdn");
    expect(urls).toContain("https://www.instagram.com/feedenman");
    expect(urls).toContain("https://www.tiktok.com/@fedenman");
    expect(urls).toContain("https://discord.gg/jrHe634FU");

    for (const account of COMMUNITY_ACCOUNTS) {
      expect(account.url.startsWith("https://")).toBe(true);
      expect(account.description.es.includes("\u2014")).toBe(false);
      expect(account.description.en.includes("\u2014")).toBe(false);
    }

    expect(filterCommunityAccounts(COMMUNITY_ACCOUNTS, "all")).toHaveLength(6);
    expect(filterCommunityAccounts(COMMUNITY_ACCOUNTS, "instagram")).toHaveLength(4);
    expect(filterCommunityAccounts(COMMUNITY_ACCOUNTS, "tiktok")).toHaveLength(1);
    expect(filterCommunityAccounts(COMMUNITY_ACCOUNTS, "discord")).toHaveLength(1);
    expect(COMMUNITY_FILTERS).toContain("all");
  });
});
