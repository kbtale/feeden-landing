<script lang="ts">
  import {
    DISCORD_INVITE_URL,
    KICK_EMBED_URL,
    KICK_URL,
  } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import LazyEmbed from "./LazyEmbed.svelte";
  import SocialIcons from "./SocialIcons.svelte";

  interface Props {
    onCopyChannel: () => void;
    forceEmbedFallback?: boolean;
  }

  let { onCopyChannel, forceEmbedFallback = false }: Props = $props();
  const i18n = getI18n();

  type SlabMode = "live" | "community";

  let activeMode = $state<SlabMode>("live");
  let openLiveIndex = $state(0);
  let openCommunityIndex = $state(0);

  const activeItems = $derived(
    activeMode === "live"
      ? i18n.t.splitSlab.liveItems
      : i18n.t.splitSlab.communityItems,
  );

  const openIndex = $derived(
    activeMode === "live" ? openLiveIndex : openCommunityIndex,
  );

  function setOpenIndex(index: number) {
    if (activeMode === "live") {
      openLiveIndex = index;
    } else {
      openCommunityIndex = index;
    }
  }
</script>

<section id="stream" class="fdn-hairline-top pt-14 pb-0 stack:pt-24">
  <div class="fdn-container flex flex-col gap-6 stack:flex-row stack:items-end stack:justify-between">
    <div>
      <p class="fdn-eyebrow text-fdn-lime">{i18n.t.splitSlab.eyebrow}</p>
      <h2 class="mt-3 font-display text-[clamp(32px,3.1vw,46px)] leading-[1.08] font-bold tracking-[-0.02em] text-off-white">
        {activeMode === "live"
          ? i18n.t.splitSlab.headingLive
          : i18n.t.splitSlab.headingCommunity}
      </h2>
    </div>

    <div
      role="group"
      aria-label={i18n.t.a11y.splitModeSwitcher}
      class="hidden items-center rounded-full border border-off-white/20 bg-obsidian p-1 stack:inline-flex"
    >
      <button
        type="button"
        aria-pressed={activeMode === "live"}
        onclick={() => {
          activeMode = "live";
        }}
        class="cursor-pointer rounded-full px-5 py-2 text-[15px] font-medium transition-colors duration-[var(--dur-state)] ease-[var(--ease-fdn)] {activeMode === 'live'
          ? 'bg-fdn-mint text-obsidian'
          : 'text-off-white hover:text-fdn-lime'}"
      >
        {i18n.t.splitSlab.tabLive}
      </button>
      <button
        type="button"
        aria-pressed={activeMode === "community"}
        onclick={() => {
          activeMode = "community";
        }}
        class="cursor-pointer rounded-full px-5 py-2 text-[15px] font-medium transition-colors duration-[var(--dur-state)] ease-[var(--ease-fdn)] {activeMode === 'community'
          ? 'bg-fdn-emerald text-off-white'
          : 'text-off-white hover:text-fdn-lime'}"
      >
        {i18n.t.splitSlab.tabCommunity}
      </button>
    </div>
  </div>

  <div
    class="fdn-rail-frame mt-8 hidden transition-colors duration-[var(--dur-cross)] ease-[var(--ease-fdn)] stack:mt-10 stack:grid stack:grid-cols-2 {activeMode === 'live'
      ? 'bg-fdn-mint text-obsidian'
      : 'bg-fdn-emerald text-off-white'}"
  >
    <div
      class="flex flex-col divide-y {activeMode === 'live'
        ? 'divide-obsidian/20 border-r border-obsidian/20'
        : 'divide-off-white/20 border-r border-off-white/20'}"
    >
      {#each activeItems as item, index (item.id)}
        {@const isOpen = openIndex === index}
        <div class="flex flex-col {isOpen ? 'flex-1' : ''}">
          <button
            type="button"
            aria-expanded={isOpen}
            onclick={() => setOpenIndex(index)}
            class="flex w-full cursor-pointer items-center justify-between gap-4 px-11 py-8 text-left font-display text-[24px] leading-[1.12] font-bold tracking-[-0.015em]"
          >
            <span>{item.title}</span>
          </button>

          {#if isOpen}
            <ul class="space-y-2.5 px-11 pb-9 text-[15px] leading-[1.45] {activeMode === 'live' ? 'text-obsidian/85' : 'text-off-white/90'}">
              {#each item.points as point, pIdx (pIdx)}
                <li class="flex items-start gap-2.5">
                  <span
                    class="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full {activeMode === 'live'
                      ? 'bg-obsidian'
                      : 'bg-fdn-lime'}"
                    aria-hidden="true"
                  ></span>
                  <span>{point}</span>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </div>

    <div class="flex flex-col justify-center p-10 wide:p-12">
      {#if activeMode === "live"}
        <div class="w-full overflow-hidden rounded-[4px] border border-obsidian/25 bg-obsidian">
          <LazyEmbed
            src={KICK_EMBED_URL}
            title={i18n.t.stage.playerTitle}
            fallbackUrl={KICK_URL}
            forceFallback={forceEmbedFallback}
          />
          <div class="flex flex-wrap items-center justify-between gap-3 border-t border-rule-strong bg-surface-900 px-4 py-3 text-off-white">
            <span class="font-mono text-xs text-body-ink" translate="no">
              kick.com/feeden
            </span>
            <div class="flex items-center gap-2">
              <button
                type="button"
                onclick={onCopyChannel}
                class="inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-[4px] border border-rule-strong px-2.5 font-mono text-xs text-off-white transition-colors duration-150 hover:border-fdn-lime hover:text-fdn-lime"
              >
                <SocialIcons name="copy" size={12} />
                <span>{i18n.t.stage.copyChannel}</span>
              </button>
              <a
                href={KICK_URL}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-8 items-center gap-1.5 rounded-[4px] bg-fdn-lime px-3 font-mono text-xs font-medium text-obsidian no-underline"
              >
                <span>{i18n.t.stage.openKick}</span>
                <SocialIcons name="arrow-up-right" size={12} />
              </a>
            </div>
          </div>
        </div>
      {:else}
        <div class="rounded-[4px] border border-off-white/25 bg-obsidian p-8 text-off-white">
          <p class="font-mono text-xs text-fdn-lime uppercase">
            {i18n.t.splitSlab.communityCardEyebrow}
          </p>
          <h3 class="mt-3 font-display text-[32px] leading-[1.08] font-bold">
            {i18n.t.splitSlab.communityCardTitle}
          </h3>
          <p class="mt-3 text-[15px] leading-relaxed text-body-ink">
            {i18n.t.splitSlab.communityCardBody}
          </p>
          <p class="mt-5 font-mono text-xs text-muted-ink" translate="no">
            {i18n.t.splitSlab.communityCardMeta}
          </p>
          <div class="mt-6">
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="fdn-btn-primary"
            >
              <SocialIcons name="discord" size={15} />
              <span>{i18n.t.splitSlab.communityCardCta}</span>
              <SocialIcons name="arrow-up-right" size={14} />
            </a>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="mt-8 stack:hidden">
    <div class="bg-fdn-mint px-5 py-8 text-obsidian">
      <p class="font-mono text-xs uppercase text-obsidian/70">
        {i18n.t.splitSlab.tabLive}
      </p>
      <div class="mt-4 overflow-hidden rounded-[4px] border border-obsidian/20 bg-obsidian">
        <LazyEmbed
          src={KICK_EMBED_URL}
          title={i18n.t.stage.playerTitle}
          fallbackUrl={KICK_URL}
          forceFallback={forceEmbedFallback}
        />
        <div class="flex flex-wrap items-center justify-between gap-2 border-t border-rule-strong bg-surface-900 px-3.5 py-2.5 text-off-white">
          <span class="font-mono text-xs text-body-ink" translate="no">
            kick.com/feeden
          </span>
          <div class="flex items-center gap-2">
            <button
              type="button"
              onclick={onCopyChannel}
              class="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-[4px] border border-rule-strong px-2.5 font-mono text-xs text-off-white"
            >
              <SocialIcons name="copy" size={12} />
              <span>{i18n.t.stage.copyChannel}</span>
            </button>
            <a
              href={KICK_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-9 items-center gap-1.5 rounded-[4px] bg-fdn-lime px-3 font-mono text-xs font-medium text-obsidian no-underline"
            >
              <span>{i18n.t.stage.openKick}</span>
              <SocialIcons name="arrow-up-right" size={12} />
            </a>
          </div>
        </div>
      </div>
      <div class="mt-5 divide-y divide-obsidian/20 border-t border-obsidian/20">
        {#each i18n.t.splitSlab.liveItems as item (item.id)}
          <div class="py-4">
            <h3 class="font-display text-xl font-bold">{item.title}</h3>
            <p class="mt-1.5 text-sm text-obsidian/80">{item.points[0]}</p>
          </div>
        {/each}
      </div>
    </div>

    <div class="bg-fdn-emerald px-5 py-8 text-off-white">
      <p class="font-mono text-xs uppercase text-off-white/85">
        {i18n.t.splitSlab.communityCardEyebrow}
      </p>
      <h3 class="mt-2 font-display text-2xl font-bold">
        {i18n.t.splitSlab.communityCardTitle}
      </h3>
      <p class="mt-2 text-sm leading-relaxed text-off-white/90">
        {i18n.t.splitSlab.communityCardBody}
      </p>
      <div class="mt-5">
        <a
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          class="fdn-btn-primary w-full"
        >
          <SocialIcons name="discord" size={15} />
          <span>{i18n.t.splitSlab.communityCardCta}</span>
          <SocialIcons name="arrow-up-right" size={14} />
        </a>
      </div>
    </div>
  </div>
</section>
