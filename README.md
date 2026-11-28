# Feeden Landing (`feeden-landing`)

Official bilingual (**ES / EN**, Spanish default) landing page for **Feeden (FDN)**, an Argentine Kick streamer (`kick.com/feeden`).

## Features

- **Scroll-Morphing 3D Sculpture:** Borderless interactive Three.js 3D sculpture of Feeden that rotates and smoothly morphs into the iconic FDN Yoda mascot as you scroll from the hero into the live rotation stage, with interactive mode switching and graceful fallback when WebGL is unavailable.
- **Bilingual ES / EN system:** Argentine Spanish default with an instant `ES | EN` segmented toggle in the navbar, mobile drawer, and footer. Persists selection in `localStorage` and synchronizes `<html lang>` and document metadata.
- **Live Kick status & lazy player:** Checks stream status via `/api/kick-status` (Vercel Function with 45s edge cache) with silent fallback to Kick's public API and zero console errors. Embedded `player.kick.com/feeden` loads progressively via `IntersectionObserver` + `requestIdleCallback` with a direct fallback card.
- **Editorial Color-Blocked Slabs:** Continuous `1px` architectural rails framing tactile manila folder tabs, dual-theme Live/Community split slab, minimalist `3 + 2` FDN lime Bento grid, `50 / 50` Community Hub, warm-paper official socials slab, and a `72 / 28` Closing CTA.
- **Curtain-Reveal Procedural Canvas Footer:** Deterministic Park-Miller LCG `<canvas>` blueprint grid + broadcast glyph field and monumental edge-to-edge `feeden` wordmark revealed beneath the rounded dark sheet on desktop.

## Stack

- Svelte 5 + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Three.js (3D Feeden-to-Yoda scroll morph sculpture)
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

## Managing Official Links & Fanbase Accounts

All official links and fanbase accounts live in `src/lib/data/feeden.ts`.

To add a new fanpage or clip channel, append an object to `COMMUNITY_ACCOUNTS`:

```ts
{
  id: "new-fanpage",
  name: "FDN Fan Account",
  handle: "@fdnfan",
  platform: "instagram",
  platformLabel: "Instagram",
  badge: "fan",
  url: "https://www.instagram.com/fdnfan",
  description: {
    es: "Recortes diarios de los mejores momentos del vivo.",
    en: "Daily clips covering standout moments from each stream.",
  },
}
```

Supported `platform` values: `"instagram"`, `"tiktok"`, and `"discord"`. Supported `badge` values: `"fan"` or `"official"`.

## License

MIT
