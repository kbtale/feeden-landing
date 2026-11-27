<script lang="ts">
  import { getI18n } from "../i18n/store.svelte";
  import { animateCountUp } from "../utils/countUp";
  import { formatViewerCount, type KickStreamStatus } from "../utils/kickStatus";

  interface Props {
    status: KickStreamStatus;
    checking?: boolean;
    compact?: boolean;
  }

  let { status, checking = false, compact = false }: Props = $props();
  const i18n = getI18n();

  let displayedViewers = $state(0);

  $effect(() => {
    const target = status.isLive ? status.viewers : 0;
    const start = displayedViewers;
    const stop = animateCountUp({
      from: start,
      to: target,
      durationMs: 480,
      onUpdate: (value) => {
        displayedViewers = value;
      },
    });
    return stop;
  });

  const viewerWord = $derived(
    displayedViewers === 1
      ? i18n.t.status.viewersSingular
      : i18n.t.status.viewersPlural,
  );
  const formattedViewers = $derived(
    formatViewerCount(displayedViewers, i18n.locale),
  );
</script>

<div
  class="inline-flex shrink-0 items-center gap-2 border px-2.5 py-1.5 font-mono text-xs font-medium tracking-[0.06em] uppercase whitespace-nowrap {status.isLive
    ? 'border-fdn-lime bg-surface-900 text-fdn-lime'
    : 'border-rule-strong bg-surface-900 text-muted-ink'}"
  aria-live="polite"
>
  <span
    class="inline-block h-2 w-2 shrink-0 {status.isLive
      ? 'bg-fdn-lime motion-safe:animate-pulse'
      : checking
        ? 'bg-muted-ink'
        : 'bg-rule-strong'}"
    aria-hidden="true"
  ></span>

  {#if checking}
    <span>{i18n.t.status.checking}</span>
  {:else if status.isLive}
    <span>{i18n.t.status.live}</span>
    {#if !compact && status.viewers > 0}
      <span class="text-rule-strong" aria-hidden="true">·</span>
      <span class="fdn-tabular text-off-white">
        {formattedViewers}
        {viewerWord}
      </span>
    {/if}
  {:else}
    <span>{i18n.t.status.offline}</span>
  {/if}
</div>
