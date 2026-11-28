<script lang="ts">
  import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/svelte/tabs";
  import {
    KICK_URL,
    STREAM_LINEUP,
    type StreamCategory,
  } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import { animateCountUp } from "../utils/countUp";
  import { formatViewerCount, type KickStreamStatus } from "../utils/kickStatus";
  import FeedenYoda3D from "./FeedenYoda3D.svelte";
  import SocialIcons from "./SocialIcons.svelte";

  interface Props {
    status: KickStreamStatus;
    onCopyChannel: () => void;
  }

  let { status, onCopyChannel }: Props = $props();
  const i18n = getI18n();

  const categories: readonly StreamCategory[] = ["all", "gaming", "futbol", "chat"];

  let corridorEl = $state<HTMLDivElement | null>(null);
  let stageEl = $state<HTMLElement | null>(null);
  let mobileModelEl = $state<HTMLDivElement | null>(null);
  let scrollProgress = $state(0);
  let mobileProgress = $state(1);
  let manualOverride = $state<number | null>(null);
  let activeCategory = $state<StreamCategory>("all");
  let hoveredCode = $state<string | null>(STREAM_LINEUP[0].code);
  let displayedViewers = $state(0);

  const effectiveProgress = $derived(
    manualOverride !== null ? manualOverride : scrollProgress,
  );

  const mobileEffectiveProgress = $derived(
    manualOverride !== null ? manualOverride : mobileProgress,
  );

  const fdnModeActive = $derived(effectiveProgress >= 0.55);
  const mobileFdnActive = $derived(mobileEffectiveProgress >= 0.55);

  const filteredLineup = $derived(
    activeCategory === "all"
      ? STREAM_LINEUP
      : STREAM_LINEUP.filter((item) => item.category === activeCategory),
  );

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

  $effect(() => {
    if (typeof window === "undefined" || !corridorEl || !stageEl) {
      return;
    }

    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      if (!corridorEl || !stageEl) {
        return;
      }
      const corridorRect = corridorEl.getBoundingClientRect();
      const stageRect = stageEl.getBoundingClientRect();
      const startY = corridorRect.top + window.scrollY;
      const targetY = stageRect.top + window.scrollY - 96;
      const span = Math.max(240, targetY - startY);
      const raw = (window.scrollY - startY) / span;
      scrollProgress = Math.min(1, Math.max(0, raw));

      if (mobileModelEl) {
        const mRect = mobileModelEl.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const mRaw = (vh * 0.78 - mRect.top) / Math.max(180, vh * 0.42);
        mobileProgress = Math.min(1, Math.max(0, mRaw));
      }
    };

    const onScroll = () => {
      if (manualOverride !== null) {
        manualOverride = null;
      }
      if (!rafId) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  });

  function selectMorphMode(mode: "streamer" | "fdn") {
    manualOverride = mode === "fdn" ? 1 : 0;
  }

  function handleCategoryChange(next: string | null) {
    if (next && categories.includes(next as StreamCategory)) {
      activeCategory = next as StreamCategory;
    }
  }

  const viewerWord = $derived(
    displayedViewers === 1
      ? i18n.t.status.viewersSingular
      : i18n.t.status.viewersPlural,
  );
  const formattedViewers = $derived(
    formatViewerCount(displayedViewers, i18n.locale),
  );
</script>

<div bind:this={corridorEl} class="relative">
  <div class="fdn-container grid grid-cols-1 stack:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] stack:gap-10">
    <div class="min-w-0">
      <section
        id="inicio"
        class="flex flex-col justify-center pt-[calc(var(--nav-height)+44px)] pb-10 stack:min-h-[calc(100svh-var(--nav-height))] stack:pt-[calc(var(--nav-height)+48px)] stack:pb-20"
      >
        {#if status.isLive}
          <p class="fdn-hero-enter mb-4 inline-flex items-center gap-2 font-mono text-[13px] text-fdn-lime">
            <span class="inline-block h-2 w-2 rounded-full bg-fdn-lime motion-safe:animate-pulse" aria-hidden="true"></span>
            <span>{i18n.t.hero.liveLinePrefix}</span>
            {#if status.viewers > 0}
              <span class="fdn-tabular text-off-white">
                · {formattedViewers} {viewerWord}
              </span>
            {/if}
          </p>
        {/if}

        <h1 class="fdn-hero-enter max-w-[11ch] font-display text-[clamp(48px,6.1vw,88px)] leading-[1.03] font-bold tracking-[-0.025em] text-off-white">
          {i18n.t.hero.headline}
        </h1>

        <p class="fdn-hero-enter-delay-1 mt-4 max-w-[460px] text-base leading-[1.48] text-body-ink">
          {i18n.t.hero.standfirst}
        </p>

        <div class="fdn-hero-enter-delay-2 mt-7 flex flex-wrap items-center gap-4">
          <a
            href={KICK_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="fdn-btn-primary w-full panel:w-[214px]"
          >
            <span>{i18n.t.hero.primaryCta}</span>
          </a>

          <a
            href="#en-vivo"
            class="font-mono text-xs text-muted-ink underline decoration-rule-strong underline-offset-4 transition-colors duration-150 hover:text-fdn-lime"
          >
            {i18n.t.hero.scrollHint}
          </a>
        </div>
      </section>

      <div bind:this={mobileModelEl} class="my-4 flex flex-col items-center stack:hidden">
        <div class="w-full max-w-[320px]">
          <FeedenYoda3D
            progress={mobileEffectiveProgress}
            callouts={filteredLineup}
            activeCode={hoveredCode}
            showCallouts={false}
          />
        </div>
        <div
          role="group"
          aria-label={i18n.t.a11y.morphModeSwitcher}
          class="mt-3 inline-flex h-[32px] items-center rounded-full border border-off-white/15 bg-surface-900 p-[3px]"
        >
          <button
            type="button"
            aria-pressed={!mobileFdnActive}
            onclick={() => selectMorphMode("streamer")}
            class="inline-flex h-[24px] cursor-pointer items-center rounded-full px-3.5 font-mono text-[11px] leading-none transition-colors duration-150 {!mobileFdnActive
              ? 'bg-off-white/12 text-off-white'
              : 'text-muted-ink'}"
          >
            {i18n.t.morphStage.modeStreamer}
          </button>
          <button
            type="button"
            aria-pressed={mobileFdnActive}
            onclick={() => selectMorphMode("fdn")}
            class="inline-flex h-[24px] cursor-pointer items-center rounded-full px-3.5 font-mono text-[11px] leading-none transition-colors duration-150 {mobileFdnActive
              ? 'border border-fdn-lime/40 bg-fdn-lime/15 text-fdn-lime'
              : 'text-muted-ink'}"
          >
            {i18n.t.morphStage.modeFdn}
          </button>
        </div>
        <p class="mt-2 font-mono text-[11px] text-muted-ink">
          {mobileFdnActive
            ? i18n.t.morphStage.morphCaptionFdn
            : i18n.t.morphStage.morphCaptionStreamer}
        </p>
      </div>

      <section
        id="en-vivo"
        bind:this={stageEl}
        class="pt-10 pb-16 stack:pt-20 stack:pb-28"
      >
        <p class="fdn-eyebrow text-fdn-lime">{i18n.t.morphStage.eyebrow}</p>
        <h2 class="mt-3 max-w-[14ch] font-display text-[clamp(32px,3.1vw,46px)] leading-[1.08] font-bold tracking-[-0.02em] text-off-white">
          {i18n.t.morphStage.heading}
        </h2>
        <p class="mt-3 max-w-[42ch] text-base leading-[1.45] text-body-ink">
          {i18n.t.morphStage.subheading}
        </p>

        <div class="mt-8 max-w-[460px]">
          <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
            <TabsList
              aria-label={i18n.t.a11y.streamDeskTabs}
              class="flex items-end gap-[2px]"
            >
              {#each categories as category (category)}
                <TabsTab
                  value={category}
                  class="inline-flex h-[24px] cursor-pointer items-center rounded-t-[5px] border-0 bg-surface-900 px-3 pt-px font-mono text-[11px] leading-none font-normal text-off-white/45 transition-colors duration-150 hover:bg-surface-700 hover:text-off-white/80 data-selected:bg-surface-400 data-selected:font-medium data-selected:text-off-white"
                >
                  {i18n.t.morphStage.tabs[category]}
                </TabsTab>
              {/each}
            </TabsList>

            <div class="rounded-b-[4px] rounded-tr-[4px] bg-surface-400 p-5">
              <div class="flex flex-wrap items-center justify-between gap-3 pb-4">
                <span class="font-mono text-[11px] tracking-[0.06em] text-off-white/85 uppercase">
                  {i18n.t.morphStage.cardHeader}
                </span>

                <div
                  role="group"
                  aria-label={i18n.t.a11y.morphModeSwitcher}
                  class="inline-flex h-[25px] items-center rounded-full border border-off-white/15 bg-surface-900/60 p-[2px]"
                >
                  <button
                    type="button"
                    aria-pressed={!fdnModeActive}
                    onclick={() => selectMorphMode("streamer")}
                    class="inline-flex h-[19px] cursor-pointer items-center rounded-full px-2.5 font-mono text-[11px] leading-none tracking-[0.02em] transition-colors duration-150 {!fdnModeActive
                      ? 'bg-off-white/12 text-off-white'
                      : 'text-muted-ink hover:text-off-white'}"
                  >
                    {i18n.t.morphStage.modeStreamer}
                  </button>
                  <button
                    type="button"
                    aria-pressed={fdnModeActive}
                    onclick={() => selectMorphMode("fdn")}
                    class="inline-flex h-[19px] cursor-pointer items-center rounded-full px-2.5 font-mono text-[11px] leading-none tracking-[0.02em] transition-colors duration-150 {fdnModeActive
                      ? 'border border-fdn-lime/40 bg-fdn-lime/15 text-fdn-lime'
                      : 'text-muted-ink hover:text-off-white'}"
                  >
                    {i18n.t.morphStage.modeFdn}
                  </button>
                </div>
              </div>

              {#each categories as category (category)}
                {@const rows =
                  category === "all"
                    ? STREAM_LINEUP
                    : STREAM_LINEUP.filter((item) => item.category === category)}
                <TabsPanel value={category}>
                  <ul class="divide-y divide-off-white/8 border-y border-off-white/8">
                    {#each rows as item (item.code)}
                      {@const active = hoveredCode === item.code}
                      <li>
                        <button
                          type="button"
                          onmouseenter={() => {
                            hoveredCode = item.code;
                          }}
                          onfocus={() => {
                            hoveredCode = item.code;
                          }}
                          onclick={() => {
                            hoveredCode = item.code;
                            manualOverride = 1;
                          }}
                          class="relative flex h-[32px] w-full cursor-pointer items-center justify-between gap-3 px-2 text-left font-mono text-[12px] transition-colors duration-150 {active
                            ? 'bg-off-white/[0.04] text-off-white'
                            : 'text-body-ink/75 hover:text-off-white'}"
                        >
                          {#if active}
                            <span
                              class="absolute inset-y-0 left-0 w-[2px] bg-fdn-lime"
                              aria-hidden="true"
                            ></span>
                          {/if}
                          <span class="w-11 shrink-0 text-[11px] {active ? 'text-fdn-lime' : 'text-doc-dim'}">
                            {item.code}
                          </span>
                          <span class="min-w-0 flex-1 truncate">
                            {item.label[i18n.locale]}
                          </span>
                          <span class="shrink-0 text-[11px] {fdnModeActive ? 'text-fdn-lime' : 'text-muted-ink'}">
                            {item.tag[i18n.locale]}
                          </span>
                        </button>
                      </li>
                    {/each}
                  </ul>
                </TabsPanel>
              {/each}

              <div class="mt-4 flex items-end justify-between gap-4 pt-1">
                <div class="min-w-0">
                  <p class="font-mono text-[10px] tracking-[0.06em] text-muted-ink uppercase">
                    {status.isLive
                      ? i18n.t.morphStage.totalLabelLive
                      : i18n.t.morphStage.totalLabelOffline}
                  </p>
                  {#if status.isLive && status.viewers > 0}
                    <p class="fdn-tabular mt-1 font-mono text-[32px] leading-none font-medium text-fdn-lime">
                      {formattedViewers}
                    </p>
                  {:else}
                    <p class="mt-1 truncate font-mono text-lg leading-none font-medium text-fdn-lime" translate="no">
                      {i18n.t.morphStage.offlineValue}
                    </p>
                  {/if}
                </div>

                <div class="text-right font-mono text-[11px] leading-snug">
                  <p class="text-muted-ink">
                    {filteredLineup.length} {i18n.t.morphStage.lineItemsSuffix}
                  </p>
                  <button
                    type="button"
                    onclick={onCopyChannel}
                    class="mt-1 inline-flex cursor-pointer items-center gap-1.5 text-fdn-lime transition-colors duration-150 hover:text-off-white"
                  >
                    <span>{i18n.t.morphStage.copyLink}</span>
                    <SocialIcons name="copy" size={12} />
                  </button>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </div>

    <div class="hidden stack:block">
      <div class="sticky top-[var(--nav-height)] flex h-[calc(100svh-var(--nav-height))] flex-col items-center justify-center">
        <FeedenYoda3D
          progress={effectiveProgress}
          callouts={filteredLineup}
          activeCode={hoveredCode}
          showCallouts={true}
        />
        <p class="mt-2 font-mono text-[11px] tracking-[0.04em] text-muted-ink">
          {fdnModeActive
            ? i18n.t.morphStage.morphCaptionFdn
            : i18n.t.morphStage.morphCaptionStreamer}
        </p>
      </div>
    </div>
  </div>
</div>
