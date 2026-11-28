import type { Locale } from "../i18n/translations";

export type SocialPlatform = "kick" | "youtube" | "tiktok" | "instagram" | "x" | "discord";

export interface SocialLink {
  id: SocialPlatform;
  name: string;
  handle: string;
  url: string;
  note: Record<Locale, string>;
}

export type VideoCategory = "all" | "challenges" | "gaming" | "reactions";

export interface YouTubeVideoItem {
  code: string;
  videoId: string;
  url: string;
  category: Exclude<VideoCategory, "all">;
  title: string;
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
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@Feeden_";
export const YOUTUBE_CHANNEL_ID = "UCiDN6BPkFD_vZ3GCI-8rphQ";
export const TIKTOK_URL = "https://www.tiktok.com/@feeden_";
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
      es: "Todos los vivos principales: Just Chatting, reacciones, retos y partidas en directo.",
      en: "Every live broadcast: Just Chatting, reactions, challenges, and live gaming.",
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
    url: YOUTUBE_CHANNEL_URL,
    note: {
      es: "Videos largos, la serie de 80 dias por la PS5 y GTA VI, retos y reacciones.",
      en: "Full uploads, the 80-day PS5 and GTA VI challenge series, gaming, and reactions.",
    },
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@feeden_",
    url: TIKTOK_URL,
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
      es: "Avisos de vivo, encuestas y ida y vuelta diario con el chat.",
      en: "Stream pings, polls, and daily back-and-forth with chat.",
    },
  },
  {
    id: "discord",
    name: "Discord",
    handle: "discord.gg/jrHe634FU",
    url: DISCORD_INVITE_URL,
    note: {
      es: "Servidor oficial de la FDN: alertas de vivo, memes y desafios con el chat.",
      en: "Official FDN server for live alerts, memes, and community challenges.",
    },
  },
];

export const YOUTUBE_VIDEOS: readonly YouTubeVideoItem[] = [
  {
    code: "YT-01",
    videoId: "GmKpURtuTog",
    url: "https://www.youtube.com/watch?v=GmKpURtuTog",
    category: "challenges",
    title: "CONSEGUI UNA PLAY 5 PARA JUGAR AL GTA 6",
    tag: { es: "RETO PS5", en: "PS5 GOAL" },
    x: 11,
    y: 24,
  },
  {
    code: "YT-02",
    videoId: "kVeqRK5880Q",
    url: "https://www.youtube.com/watch?v=kVeqRK5880Q",
    category: "challenges",
    title: "Mi Primer trabajo en el RETO | 80 DIAS PS5 y GTA 6",
    tag: { es: "80 DIAS", en: "80 DAYS" },
    x: 87,
    y: 22,
  },
  {
    code: "YT-03",
    videoId: "Fck-cG1A68g",
    url: "https://www.youtube.com/watch?v=Fck-cG1A68g",
    category: "challenges",
    title: "¿Puedo comprar una PS5 y GTA 6 en solo 80 DÍAS?",
    tag: { es: "GTA VI", en: "GTA VI" },
    x: 50,
    y: 8,
  },
  {
    code: "YT-04",
    videoId: "zIUBj6gO5kM",
    url: "https://www.youtube.com/watch?v=zIUBj6gO5kM",
    category: "gaming",
    title: "Nada en este juego tenía sentido... hasta el final",
    tag: { es: "GAMING", en: "GAMING" },
    x: 9,
    y: 62,
  },
  {
    code: "YT-05",
    videoId: "wkz3ympvAMg",
    url: "https://www.youtube.com/watch?v=wkz3ympvAMg",
    category: "gaming",
    title: "Este juego destruye la Tierra en 60 segundos",
    tag: { es: "DESAFIO", en: "CHALLENGE" },
    x: 91,
    y: 58,
  },
  {
    code: "YT-06",
    videoId: "FijWqsAf3p8",
    url: "https://www.youtube.com/watch?v=FijWqsAf3p8",
    category: "reactions",
    title: "REACCION TRAILER RESIDENT EVIL CODE VERONICA",
    tag: { es: "REACCION", en: "REACTION" },
    x: 17,
    y: 89,
  },
  {
    code: "YT-07",
    videoId: "JAk4QBJEENw",
    url: "https://www.youtube.com/watch?v=JAk4QBJEENw",
    category: "reactions",
    title: "EL CHAT ME PASA TIKTOKS MUY EXTRAÑOS",
    tag: { es: "CHAT", en: "CHAT" },
    x: 83,
    y: 89,
  },
];

export const STREAM_GAMES = YOUTUBE_VIDEOS;

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
      es: "Club fan de la comunidad FDN con edits, momentos de reacciones y recortes diarios del stream.",
      en: "FDN fan club page posting edits, reaction moments, and daily stream cuts.",
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
      es: "El punto de encuentro oficial de la comunidad: alertas de vivo, charlas 24/7 y retos FDN.",
      en: "Official FDN community server with live stream alerts, 24/7 chat, and FDN challenges.",
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
