# Feeden Landing (`feeden-landing`)

Official bilingual (**ES / EN**, Spanish default) landing page for **Feeden (FDN)**, an Argentine Kick streamer (`kick.com/feeden`).

## Features

- **Bilingual ES / EN system:** Argentine Spanish default with an instant `ES | EN` segmented toggle in the navbar, mobile drawer, and footer. Persists selection in `localStorage` and keeps `<html lang>` and document metadata synchronized.
- **Live Kick status & lazy player:** Checks stream status via `/api/kick-status` (Vercel Function with 45s edge cache) with silent fallback to Kick's public API and zero console errors when offline or blocked. The embedded `player.kick.com/feeden` loads progressively via `IntersectionObserver` + `requestIdleCallback` with a direct-link fallback card.
- **Stream Desk & Pillars:** Recessed file-folder tab desk (`Status`, `Games & Vibe`, `Chat & Info`) and an asymmetric `3 + 2` electric-lime Bento grid built on continuous `1px` architectural rails.
- **Community & Fan Clips Hub (`#comunidad`):** Filterable directory for official spaces and fan-created clip/archive accounts across YouTube, TikTok, Instagram/X, and Discord, paired with an accessible `@ui-sdk/svelte` submission dialog.
- **Curtain-Reveal Canvas Footer:** Deterministic Park-Miller LCG procedural `<canvas>` broadcast glyph field and full-width `FEEDEN` wordmark revealed beneath the rounded dark sheet on desktop.

## Stack

- Svelte 5 + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- `@ui-sdk/core` + `@ui-sdk/svelte` (Drawer, Dialog, Tabs, SegmentedControl, Toast)
- Vitest + `@testing-library/svelte` + `jsdom`
- Vercel serverless proxy (`api/kick-status.ts`)

## Local Development

```bash
npm install
npm run dev
```

## Verification Scripts

```bash
npm run check
npm test
npm run build
```

## Adding Fan Clip & Community Accounts

Every official social link and fan-created clip account lives in a single typed file: `src/lib/data/feeden.ts`.

To add a new fan channel, append one object to `COMMUNITY_ACCOUNTS`:

```ts
{
  id: "feeden-clips-tiktok",
  name: "Feeden Clips TT",
  handle: "@feedenclipstt",
  platform: "tiktok",
  platformLabel: "TikTok",
  badge: "fan",
  url: "https://www.tiktok.com/@feedenclipstt",
  description: {
    es: "Recortes verticales diarios de los mejores momentos del vivo.",
    en: "Daily vertical clips covering the best moments from each stream.",
  },
}
```

Supported `platform` values: `"youtube"`, `"tiktok"`, `"social"` (Instagram / X), and `"discord"`. Supported `badge` values: `"fan"` or `"official"`.

## License

MIT
