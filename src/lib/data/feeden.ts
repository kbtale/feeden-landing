import type { Locale } from "../i18n/translations";

export type SocialPlatform = "kick" | "youtube" | "tiktok" | "instagram" | "x" | "discord";

export interface SocialLink {
  id: SocialPlatform;
  name: string;
  handle: string;
  url: string;
  note: Record<Locale, string>;
}

export type StreamCategory = "all" | "gaming" | "futbol" | "chat";

export interface StreamLineupItem {
  code: string;
  category: Exclude<StreamCategory, "all">;
  label: Record<Locale, string>;
  tag: Record<Locale, string>;
  x: number;
  y: number;
}

export type CommunityFilter = "all" | "instagram" | "tiktok" | "discord";

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
export const DISCORD_INVITE_URL = "https://discord.gg/jrHe634FU";
export const X_PROFILE_URL = "https://x.com/Feeden_";
export const BUILDER_GITHUB_URL = "https://github.com/kbtale";

export const OFFICIAL_SOCIALS: readonly SocialLink[] = [
  {
    id: "kick",
    name: "Kick",
    handle: "kick.com/feeden",
    url: KICK_URL,
    note: {
      es: "Todos los vivos principales, charlas y partidas en directo.",
      en: "Every live stream, long hangout, and gaming session.",
    },
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@fedenrios",
    url: "https://www.instagram.com/fedenrios",
    note: {
      es: "Historias del dia a dia, avisos antes de prender y backstage.",
      en: "Daily stories, pre-stream pings, and behind-the-scenes updates.",
    },
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "@Feeden_",
    url: "https://www.youtube.com/@Feeden_",
    note: {
      es: "Videos largos, compilados editados y los mejores momentos.",
      en: "Full videos, edited highlights, and standout broadcast moments.",
    },
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@feeden_",
    url: "https://www.tiktok.com/@feeden_",
    note: {
      es: "Recortes cortos, reacciones rapidas y clips virales diarios.",
      en: "Short cuts, quick reactions, and daily viral clips.",
    },
  },
  {
    id: "x",
    name: "X",
    handle: "@Feeden_",
    url: X_PROFILE_URL,
    note: {
      es: "Opiniones de futbol, encuestas y ida y vuelta con el chat.",
      en: "Football takes, polls, and live back-and-forth with chat.",
    },
  },
  {
    id: "discord",
    name: "Discord",
    handle: "discord.gg/jrHe634FU",
    url: DISCORD_INVITE_URL,
    note: {
      es: "Servidor oficial de la FDN: alertas de vivo, memes y torneos.",
      en: "Official FDN server for live alerts, memes, and community events.",
    },
  },
];

export const STREAM_LINEUP: readonly StreamLineupItem[] = [
  {
    code: "FN-01",
    category: "gaming",
    label: { es: "Fortnite en vivo", en: "Live Fortnite" },
    tag: { es: "PARTIDAS", en: "MATCHES" },
    x: 11,
    y: 24,
  },
  {
    code: "FG-02",
    category: "gaming",
    label: { es: "Fall Guys & Caos", en: "Fall Guys Chaos" },
    tag: { es: "SALA FDN", en: "FDN LOBBY" },
    x: 87,
    y: 22,
  },
  {
    code: "CS-03",
    category: "gaming",
    label: { es: "Counter-Strike", en: "Counter-Strike" },
    tag: { es: "RANKEDS", en: "RANKED" },
    x: 9,
    y: 62,
  },
  {
    code: "CR-04",
    category: "gaming",
    label: { es: "Clash Royale & Roblox", en: "Clash Royale & Roblox" },
    tag: { es: "DESAFIOS", en: "CHALLENGES" },
    x: 91,
    y: 58,
  },
  {
    code: "FB-05",
    category: "futbol",
    label: { es: "Debates de futbol", en: "Football debates" },
    tag: { es: "FUTBOL ARG", en: "FOOTBALL" },
    x: 50,
    y: 8,
  },
  {
    code: "RX-06",
    category: "futbol",
    label: { es: "Reacciones & Virales", en: "Reactions & Viral" },
    tag: { es: "EN DIRECTO", en: "LIVE REACT" },
    x: 17,
    y: 89,
  },
  {
    code: "JC-07",
    category: "chat",
    label: { es: "Just Chatting sin filtro", en: "Unfiltered Just Chatting" },
    tag: { es: "COMUNIDAD", en: "HANGOUT" },
    x: 83,
    y: 89,
  },
];

export const STREAM_GAMES = STREAM_LINEUP;

export const COMMUNITY_FILTERS: readonly CommunityFilter[] = [
  "all",
  "instagram",
  "tiktok",
  "discord",
];

export const COMMUNITY_ACCOUNTS: readonly CommunityAccount[] = [
  {
    id: "fdn-clips-ig",
    name: "FDN Clips",
    handle: "@fdn_clips",
    platform: "instagram",
    platformLabel: "Instagram",
    badge: "fan",
    url: "https://www.instagram.com/fdn_clips",
    description: {
      es: "Recortes diarios, momentos picantes del chat y los mejores clips de cada transmision en Kick.",
      en: "Daily cuts, standout chat moments, and top highlights clipped straight from each Kick broadcast.",
    },
  },
  {
    id: "fedenismo-67",
    name: "Fedenismo 67",
    handle: "@fedenismo_67",
    platform: "instagram",
    platformLabel: "Instagram",
    badge: "fan",
    url: "https://www.instagram.com/fedenismo_67",
    description: {
      es: "Fanpage dedicada al universo FDN con edits, memes internos de la comunidad y archivo del stream.",
      en: "Dedicated FDN fanpage covering community edits, inside jokes, and stream archive reels.",
    },
  },
  {
    id: "futbolclubfdn",
    name: "Futbol Club FDN",
    handle: "@futbolclubfdn",
    platform: "instagram",
    platformLabel: "Instagram",
    badge: "fan",
    url: "https://www.instagram.com/futbolclubfdn",
    description: {
      es: "Todo el lado futbolero de Feeden: debates, reacciones a partidos y recortes de cancha.",
      en: "Everything from Feeden's football side: live match reactions, debates, and pitch banter.",
    },
  },
  {
    id: "feedenman-ig",
    name: "Feedenman",
    handle: "@feedenman",
    platform: "instagram",
    platformLabel: "Instagram",
    badge: "fan",
    url: "https://www.instagram.com/feedenman",
    description: {
      es: "Reels, ediciones rapidas y momentos clasicos de Feeden curados por la comunidad.",
      en: "Reels, fast edits, and classic Feeden moments curated by fans.",
    },
  },
  {
    id: "fedenman-tiktok",
    name: "Fedenman TikTok",
    handle: "@fedenman",
    platform: "tiktok",
    platformLabel: "TikTok",
    badge: "fan",
    url: "https://www.tiktok.com/@fedenman",
    description: {
      es: "Clips verticales y compilados cortos para ver el resumen del vivo en segundos.",
      en: "Vertical clips and fast edits capturing each stream in seconds.",
    },
  },
  {
    id: "discord-oficial-fdn",
    name: "Discord Oficial FDN",
    handle: "discord.gg/jrHe634FU",
    platform: "discord",
    platformLabel: "Discord",
    badge: "official",
    url: DISCORD_INVITE_URL,
    description: {
      es: "El punto de encuentro oficial de la comunidad: alertas de vivo, charlas 24/7 y torneos FDN.",
      en: "Official FDN community server with live stream alerts, 24/7 chat, and community tournaments.",
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
