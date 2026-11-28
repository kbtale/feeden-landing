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
  class="fdn-footer sticky bottom-0 z-0 -mt-[32px] overflow-hidden bg-off-white pt-[32px] text-obsidian max-stack:relative"
>
  <canvas
    bind:this={canvasEl}
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 h-full w-full"
  ></canvas>

  <div class="relative z-10 fdn-container pt-12 pb-[calc(28px+env(safe-area-inset-bottom,0px))] stack:pt-16 stack:pb-12">
    <p
      aria-hidden="true"
      class="mx-auto text-center font-display text-[clamp(76px,18.5vw,272px)] leading-[0.86] font-bold tracking-[-0.045em] text-obsidian select-none"
      translate="no"
    >
      feeden
    </p>

    <div class="mt-8 flex flex-col items-center justify-center gap-4 text-center font-mono text-[13px] text-obsidian/75 stack:mt-11">
      <div class="flex flex-col items-center justify-center gap-1.5 panel:flex-row panel:flex-wrap panel:gap-x-3">
        <span>© {year} {i18n.t.footer.rights}</span>
        <span class="hidden panel:inline" aria-hidden="true">·</span>
        <span class="inline-flex items-center gap-3">
          <a
            href={KICK_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="underline decoration-obsidian/30 underline-offset-4 transition-colors duration-150 hover:text-fdn-emerald"
            translate="no"
          >
            kick.com/feeden
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={BUILDER_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="underline decoration-obsidian/30 underline-offset-4 transition-colors duration-150 hover:text-fdn-emerald"
          >
            {i18n.t.footer.builtBy}
          </a>
        </span>
      </div>

      <LanguageSwitch variant="light" />
    </div>
  </div>
</footer>
