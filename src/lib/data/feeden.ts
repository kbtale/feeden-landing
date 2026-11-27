import type { Locale } from "../i18n/translations";

export type SocialPlatform = "kick" | "youtube" | "tiktok" | "instagram" | "x" | "discord";

export interface SocialLink {
  id: SocialPlatform;
  name: string;
  handle: string;
  url: string;
}

export interface StreamGame {
  code: string;
  label: Record<Locale, string>;
}

export type CommunityFilter = "all" | "youtube" | "tiktok" | "social" | "discord";

export type CommunityPlatform = Exclude<CommunityFilter, "all">;

export interface CommunityAccount {
  id: string;
  name: string;
  handle: string;
  platform: CommunityPlatform;
  platformLabel: string;
  badge: "official" | "fan";
  url: string;
  description: Record<Locale, string>;
}

export const CHANNEL_SLUG = "feeden";
export const KICK_URL = `https://kick.com/${CHANNEL_SLUG}`;
export const KICK_EMBED_URL = `https://player.kick.com/${CHANNEL_SLUG}?autoplay=false&muted=true`;
export const DISCORD_INVITE_URL = "https://discord.gg/feeden";
export const X_PROFILE_URL = "https://x.com/feeden";
export const BUILDER_GITHUB_URL = "https://github.com/kbtale";

export const OFFICIAL_SOCIALS: readonly SocialLink[] = [
  {
    id: "kick",
    name: "Kick",
    handle: "kick.com/feeden",
    url: KICK_URL,
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "@feeden",
    url: "https://www.youtube.com/@feeden",
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@feeden",
    url: "https://www.tiktok.com/@feeden",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@feeden",
    url: "https://www.instagram.com/feeden",
  },
  {
    id: "x",
    name: "X",
    handle: "@feeden",
    url: X_PROFILE_URL,
  },
  {
    id: "discord",
    name: "Discord",
    handle: "FDN Server",
    url: DISCORD_INVITE_URL,
  },
];

export const STREAM_GAMES: readonly StreamGame[] = [
  { code: "01", label: { es: "FORTNITE", en: "FORTNITE" } },
  { code: "02", label: { es: "FALL GUYS", en: "FALL GUYS" } },
  { code: "03", label: { es: "COUNTER-STRIKE", en: "COUNTER-STRIKE" } },
  { code: "04", label: { es: "CLASH ROYALE", en: "CLASH ROYALE" } },
  { code: "05", label: { es: "ROBLOX", en: "ROBLOX" } },
  { code: "06", label: { es: "REACCIONES & FUTBOL", en: "REACTIONS & FOOTBALL" } },
  { code: "07", label: { es: "JUST CHATTING", en: "JUST CHATTING" } },
];

export const COMMUNITY_FILTERS: readonly CommunityFilter[] = [
  "all",
  "youtube",
  "tiktok",
  "social",
  "discord",
];

export const COMMUNITY_ACCOUNTS: readonly CommunityAccount[] = [
  {
    id: "la-feedeneta-clips",
    name: "La Feedeneta Clips",
    handle: "@lafeedenetaclips",
    platform: "youtube",
    platformLabel: "YouTube",
    badge: "fan",
    url: "https://www.youtube.com/results?search_query=La+Feedeneta+Clips+Feeden",
    description: {
      es: "Canal fan con los mejores recortes diarios, reacciones y momentos virales de cada vivo de Feeden.",
      en: "Fan-run channel uploading daily clips, reactions, and viral highlights from every Feeden broadcast.",
    },
  },
  {
    id: "fdn-clips",
    name: "FDN Clips",
    handle: "@fdnclips",
    platform: "youtube",
    platformLabel: "YouTube",
    badge: "fan",
    url: "https://www.youtube.com/results?search_query=FDN+Clips+Feeden",
    description: {
      es: "Archivo de highlights, debates de futbol y jugadas de la comunidad FDN editadas al instante.",
      en: "Highlight archive covering football debates, gaming clutches, and standout FDN community moments.",
    },
  },
  {
    id: "discord-oficial-fdn",
    name: "Discord Oficial FDN",
    handle: "discord.gg/feeden",
    platform: "discord",
    platformLabel: "Discord",
    badge: "official",
    url: DISCORD_INVITE_URL,
    description: {
      es: "Punto de encuentro oficial de la FDN: avisos de vivo, memes, torneos de la comunidad y envio de clips.",
      en: "Official FDN headquarters for live alerts, community tournaments, memes, and clip submissions.",
    },
  },
];

export function filterCommunityAccounts(
  accounts: readonly CommunityAccount[],
  filter: CommunityFilter,
): readonly CommunityAccount[] {
  if (filter === "all") {
    return accounts;
  }
  return accounts.filter((account) => account.platform === filter);
}
