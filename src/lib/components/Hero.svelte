<script lang="ts">
  import { KICK_URL } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import { animateCountUp } from "../utils/countUp";
  import { formatViewerCount, type KickStreamStatus } from "../utils/kickStatus";
  import LiveStatusPill from "./LiveStatusPill.svelte";
  import SocialIcons from "./SocialIcons.svelte";

  interface Props {
    status: KickStreamStatus;
    checking?: boolean;
    onCopyChannel: () => void;
  }

  let { status, checking = false, onCopyChannel }: Props = $props();
  const i18n = getI18n();

  let copied = $state(false);
  let displayedViewers = $state(0);

  $effect(() => {
    const target = status.isLive ? status.viewers : 0;
    const stop = animateCountUp({
      from: displayedViewers,
      to: target,
      durationMs: 480,
      onUpdate: (value) => {
        displayedViewers = value;
      },
    });
    return stop;
  });

  const viewerLabel = $derived(
    displayedViewers === 1
      ? i18n.t.status.viewersSingular
      : i18n.t.status.viewersPlural,
  );

  const formattedViewers = $derived(
    formatViewerCount(displayedViewers, i18n.locale),
  );

  function handleCopy() {
    onCopyChannel();
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 1800);
  }
</script>

<section
  id="inicio"
  class="fdn-container pt-[calc(var(--nav-height)+40px)] pb-14 stack:pt-[calc(var(--nav-height)+68px)] stack:pb-20"
>
  <div class="grid grid-cols-1 gap-10 stack:grid-cols-[minmax(0,1.22fr)_minmax(0,0.85fr)] stack:items-center stack:gap-12">
    <div class="min-w-0">
      <div class="fdn-hero-enter flex flex-wrap items-center gap-3">
        <span class="inline-block h-2.5 w-2.5 shrink-0 bg-fdn-lime" aria-hidden="true"></span>
        <p class="fdn-eyebrow text-fdn-lime">
          {#if status.isLive}
            {i18n.t.hero.eyebrowLive}
            {#if status.viewers > 0}
              <span class="fdn-tabular text-off-white">
                · {formattedViewers} {viewerLabel}
              </span>
            {/if}
          {:else}
            {i18n.t.hero.eyebrowOffline}
          {/if}
        </p>
      </div>

      <h1 class="fdn-hero-enter mt-5 font-display text-[clamp(46px,6.25vw,90px)] leading-[0.98] font-bold tracking-[-0.015em] text-off-white">
        {i18n.t.hero.headline}
      </h1>

      <p class="fdn-hero-enter-delay-1 mt-6 max-w-[46ch] text-base leading-[1.55] text-body-ink stack:text-lg">
        {i18n.t.hero.standfirst}
      </p>

      <div class="fdn-hero-enter-delay-2 mt-8 flex flex-col gap-3 panel:flex-row panel:flex-wrap">
        <a
          href={KICK_URL}
          target="_blank"
          rel="noopener noreferrer"
          class="fdn-btn-primary w-full panel:w-auto"
        >
          <SocialIcons name="kick" size={16} />
          <span>{i18n.t.hero.primaryCta}</span>
          <SocialIcons name="arrow-up-right" size={15} />
        </a>

        <a
          href="#en-vivo"
          class="fdn-btn-outline w-full panel:w-auto"
        >
          <span>{i18n.t.hero.secondaryCta}</span>
        </a>
      </div>
    </div>

    <aside class="fdn-hero-enter-delay-1 min-w-0 border border-rule-strong bg-surface-700">
      <div class="flex items-center justify-between gap-3 border-b border-rule-strong bg-surface-900 px-4 py-3">
        <span class="font-mono text-xs tracking-[0.08em] text-muted-ink uppercase" translate="no">
          FDN // CH-01
        </span>
        <LiveStatusPill {status} {checking} compact />
      </div>

      <div class="fdn-telemetry-grid flex items-center justify-center border-b border-rule-strong px-6 py-8 stack:py-10">
        <img
          src="/logo-fdn.webp"
          alt={i18n.t.hero.logoAlt}
          width="220"
          height="220"
          fetchpriority="high"
          class="h-44 w-44 object-contain stack:h-52 stack:w-52"
        />
      </div>

      <dl class="grid grid-cols-2 divide-x divide-rule-strong border-b border-rule-strong">
        <div class="min-w-0 p-4">
          <dt class="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
            {i18n.t.hero.telemetryStatus}
          </dt>
          <dd class="mt-1 font-mono text-sm font-medium {status.isLive ? 'text-fdn-lime' : 'text-off-white'}">
            {status.isLive ? i18n.t.hero.telemetryLiveValue : i18n.t.hero.telemetryOfflineValue}
          </dd>
        </div>

        <div class="min-w-0 p-4">
          <dt class="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
            {i18n.t.hero.telemetryChannel}
          </dt>
          <dd class="mt-1 truncate font-mono text-sm text-off-white" translate="no">
            kick.com/feeden
          </dd>
        </div>
      </dl>

      <div class="border-b border-rule-strong p-4">
        <p class="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
          {i18n.t.hero.telemetryCategory}
        </p>
        <p class="mt-1 break-words text-sm font-medium text-off-white">
          {#if status.isLive && status.title}
            {status.title}
            {#if status.category}
              <span class="font-mono text-xs text-fdn-lime"> · {status.category}</span>
            {/if}
          {:else if status.isLive && status.category}
            {status.category}
          {:else}
            {i18n.t.hero.telemetryDefaultCategory}
          {/if}
        </p>
      </div>

      <div class="p-3">
        <button
          type="button"
          onclick={handleCopy}
          class="fdn-btn-outline w-full justify-between px-4"
        >
          <span>{copied ? i18n.t.hero.copiedLink : i18n.t.hero.copyLink}</span>
          <SocialIcons name={copied ? "check" : "copy"} size={15} />
        </button>
      </div>
    </aside>
  </div>
</section>

<style>
  .fdn-telemetry-grid {
    background-color: var(--color-obsidian);
    background-image:
      linear-gradient(to right, rgba(42, 53, 72, 0.32) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(42, 53, 72, 0.32) 1px, transparent 1px);
    background-size: 28px 28px;
  }
</style>
