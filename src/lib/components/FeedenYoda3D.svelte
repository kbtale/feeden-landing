<script lang="ts">
  import type { StreamLineupItem } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import type { FeedenYodaController } from "../utils/feedenYodaScene";

  interface Props {
    progress: number;
    callouts?: readonly StreamLineupItem[];
    activeCode?: string | null;
    showCallouts?: boolean;
  }

  let {
    progress,
    callouts = [],
    activeCode = null,
    showCallouts = false,
  }: Props = $props();

  const i18n = getI18n();

  let frameEl = $state<HTMLElement | null>(null);
  let canvasEl = $state<HTMLCanvasElement | null>(null);
  let controller = $state<FeedenYodaController | null>(null);
  let webglAvailable = $state(true);

  $effect(() => {
    if (!canvasEl) {
      return;
    }
    const targetCanvas = canvasEl;
    let cancelled = false;
    let instance: FeedenYodaController | null = null;

    void import("../utils/feedenYodaScene").then(({ mountFeedenYodaScene }) => {
      if (cancelled) {
        return;
      }
      instance = mountFeedenYodaScene(targetCanvas, progress);
      if (!instance) {
        webglAvailable = false;
        return;
      }
      controller = instance;
      webglAvailable = true;
    });

    return () => {
      cancelled = true;
      instance?.dispose();
      controller = null;
    };
  });

  $effect(() => {
    controller?.setTargetProgress(progress);
  });

  $effect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!controller || !frameEl) {
        return;
      }
      const rect = frameEl.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      controller.setPointer(nx, ny);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  });
</script>

<figure
  bind:this={frameEl}
  aria-label={i18n.t.a11y.canvas3dLabel}
  class="relative m-0 aspect-square w-full max-w-[540px] select-none"
>
  {#if webglAvailable}
    <canvas
      bind:this={canvasEl}
      aria-hidden="true"
      class="block h-full w-full"
    ></canvas>
  {:else}
    <div class="flex h-full w-full items-center justify-center p-8">
      <img
        src="/logo-fdn.webp"
        alt={i18n.t.hero.logoAlt}
        width="320"
        height="320"
        fetchpriority="high"
        class="h-64 w-64 object-contain transition-transform duration-300"
        style:transform={`rotate(${Math.round(progress * 12)}deg) scale(${0.92 + progress * 0.1})`}
      />
    </div>
  {/if}

  {#if showCallouts && callouts.length > 0}
    <div class="pointer-events-none absolute inset-0 hidden stack:block" aria-hidden="true">
      {#each callouts as item (item.code)}
        {@const isActive = activeCode === item.code}
        <span
          class="absolute -translate-x-1/2 -translate-y-1/2 rounded-[3px] px-2 py-1 font-mono text-[11px] leading-none tracking-[0.04em] whitespace-nowrap transition-[opacity,transform,background-color,color] duration-200 {isActive
            ? 'z-10 scale-105 bg-fdn-lime text-obsidian'
            : 'bg-surface-900/95 text-off-white/90'}"
          style:left={`${item.x}%`}
          style:top={`${item.y}%`}
          style:opacity={Math.min(1, Math.max(0, (progress - 0.55) / 0.35))}
        >
          {item.tag[i18n.locale]}
        </span>
      {/each}
    </div>
  {/if}
</figure>
