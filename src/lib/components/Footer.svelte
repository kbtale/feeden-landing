<script lang="ts">
  import { BUILDER_GITHUB_URL, KICK_URL } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import { mountBroadcastCanvas } from "../utils/broadcastCanvas";
  import LanguageSwitch from "./LanguageSwitch.svelte";

  const i18n = getI18n();
  const year = new Date().getFullYear();

  let canvasEl = $state<HTMLCanvasElement | null>(null);

  $effect(() => {
    if (!canvasEl) {
      return;
    }
    return mountBroadcastCanvas(canvasEl);
  });
</script>

<footer
  class="fdn-footer sticky bottom-0 z-0 -mt-[36px] overflow-hidden bg-off-white pt-[36px] text-obsidian max-stack:relative"
>
  <canvas
    bind:this={canvasEl}
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 h-full w-full"
  ></canvas>

  <div class="relative z-10 fdn-container pt-14 pb-[calc(28px+env(safe-area-inset-bottom,0px))] stack:pt-20 stack:pb-10">
    <div class="flex flex-col items-start justify-between gap-6 border-b border-obsidian/15 pb-8 panel:flex-row panel:items-center">
      <div class="space-y-1.5 font-mono text-xs text-obsidian/80">
        <p>© {year} {i18n.t.footer.rights}</p>
        <p class="flex flex-wrap items-center gap-x-3 gap-y-1">
          <a
            href={KICK_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="underline decoration-obsidian/35 underline-offset-4 transition-colors duration-150 hover:text-fdn-emerald"
            translate="no"
          >
            kick.com/feeden
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={BUILDER_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="underline decoration-obsidian/35 underline-offset-4 transition-colors duration-150 hover:text-fdn-emerald"
          >
            {i18n.t.footer.builtBy}
          </a>
        </p>
      </div>

      <div class="flex items-center gap-3">
        <span class="font-mono text-xs tracking-[0.06em] text-obsidian/70 uppercase">
          {i18n.t.footer.switchLabel}
        </span>
        <LanguageSwitch variant="light" />
      </div>
    </div>

    <div class="pt-8 stack:pt-10" aria-hidden="true">
      <svg
        viewBox="0 0 1200 200"
        class="block h-auto w-full text-obsidian"
        fill="currentColor"
        role="presentation"
      >
        <text
          x="600"
          y="174"
          text-anchor="middle"
          font-family="'Barlow Condensed', 'Arial Narrow', sans-serif"
          font-weight="700"
          font-size="232"
          letter-spacing="18"
          textLength="1180"
          lengthAdjust="spacingAndGlyphs"
        >
          FEEDEN
        </text>
      </svg>
    </div>
  </div>
</footer>

<style>
  @media (max-width: 879px) {
    .fdn-footer {
      padding-bottom: max(0px, calc(100lvh - 100svh));
    }
  }
</style>
