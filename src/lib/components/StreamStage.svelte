<script lang="ts">
  import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/svelte/tabs";
  import {
    DISCORD_INVITE_URL,
    KICK_EMBED_URL,
    KICK_URL,
    STREAM_GAMES,
  } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import { animateCountUp } from "../utils/countUp";
  import { formatViewerCount, type KickStreamStatus } from "../utils/kickStatus";
  import LazyEmbed from "./LazyEmbed.svelte";
  import SocialIcons from "./SocialIcons.svelte";

  interface Props {
    status: KickStreamStatus;
    onCopyChannel: () => void;
    forceEmbedFallback?: boolean;
  }

  let {
    status,
    onCopyChannel,
    forceEmbedFallback = false,
  }: Props = $props();

  const i18n = getI18n();
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

  const formattedViewers = $derived(
    formatViewerCount(displayedViewers, i18n.locale),
  );
  const viewerWord = $derived(
    displayedViewers === 1
      ? i18n.t.status.viewersSingular
      : i18n.t.status.viewersPlural,
  );
</script>

<section id="en-vivo" class="fdn-hairline-top py-14 stack:py-20">
  <div class="fdn-container">
    <div class="flex flex-col gap-3 stack:flex-row stack:items-end stack:justify-between">
      <div>
        <p class="fdn-eyebrow text-fdn-lime">{i18n.t.stage.eyebrow}</p>
        <h2 class="mt-2 font-display text-[clamp(36px,4.5vw,64px)] leading-[1.02] font-bold tracking-[-0.01em] text-off-white">
          {i18n.t.stage.heading}
        </h2>
      </div>
      <p class="max-w-[40ch] text-sm text-body-ink stack:text-right">
        {i18n.t.stage.subheading}
      </p>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-8 stack:grid-cols-[minmax(0,1.45fr)_minmax(0,0.85fr)] stack:items-start">
      <div class="min-w-0">
        <LazyEmbed
          src={KICK_EMBED_URL}
          title={i18n.t.stage.playerTitle}
          fallbackUrl={KICK_URL}
          forceFallback={forceEmbedFallback}
        />

        <div class="flex flex-wrap items-center justify-between gap-3 border-x border-b border-rule-strong bg-surface-700 px-4 py-3">
          <div class="flex min-w-0 items-center gap-2 font-mono text-xs text-body-ink">
            <SocialIcons name="kick" size={14} class="shrink-0 text-fdn-lime" />
            <span class="truncate" translate="no">player.kick.com/feeden</span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onclick={onCopyChannel}
              class="inline-flex min-h-10 cursor-pointer items-center gap-1.5 border border-rule-strong bg-surface-900 px-3 font-mono text-xs tracking-[0.06em] text-off-white uppercase transition-colors duration-150 hover:border-fdn-lime hover:text-fdn-lime active:scale-[0.97]"
            >
              <SocialIcons name="copy" size={13} />
              <span>{i18n.t.stage.desk.copyChannel}</span>
            </button>

            <a
              href={KICK_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-10 items-center gap-1.5 border border-fdn-lime bg-fdn-lime px-3 font-mono text-xs font-medium tracking-[0.06em] text-obsidian uppercase no-underline transition-colors duration-150 hover:bg-transparent hover:text-fdn-lime active:scale-[0.97]"
            >
              <span>{i18n.t.stage.desk.openKick}</span>
              <SocialIcons name="arrow-up-right" size={13} />
            </a>
          </div>
        </div>
      </div>

      <div class="min-w-0">
        <Tabs defaultValue="status" class="flex flex-col">
          <TabsList
            aria-label={i18n.t.a11y.streamDeskTabs}
            class="fdn-no-scrollbar flex items-end gap-1 overflow-x-auto"
          >
            <TabsTab
              value="status"
              class="fdn-folder-tab shrink-0 cursor-pointer border border-b-0 border-rule-strong bg-surface-900 px-2.5 py-3 font-mono text-[11px] font-medium tracking-[0.04em] text-muted-ink uppercase transition-colors duration-150 panel:px-4 panel:text-xs panel:tracking-[0.06em] data-selected:relative data-selected:z-10 data-selected:-mb-px data-selected:border-t-2 data-selected:border-t-fdn-lime data-selected:bg-surface-400 data-selected:text-off-white"
            >
              {i18n.t.stage.tabs.status}
            </TabsTab>
            <TabsTab
              value="games"
              class="fdn-folder-tab shrink-0 cursor-pointer border border-b-0 border-rule-strong bg-surface-900 px-2.5 py-3 font-mono text-[11px] font-medium tracking-[0.04em] text-muted-ink uppercase transition-colors duration-150 panel:px-4 panel:text-xs panel:tracking-[0.06em] data-selected:relative data-selected:z-10 data-selected:-mb-px data-selected:border-t-2 data-selected:border-t-fdn-lime data-selected:bg-surface-400 data-selected:text-off-white"
            >
              {i18n.t.stage.tabs.games}
            </TabsTab>
            <TabsTab
              value="info"
              class="fdn-folder-tab shrink-0 cursor-pointer border border-b-0 border-rule-strong bg-surface-900 px-2.5 py-3 font-mono text-[11px] font-medium tracking-[0.04em] text-muted-ink uppercase transition-colors duration-150 panel:px-4 panel:text-xs panel:tracking-[0.06em] data-selected:relative data-selected:z-10 data-selected:-mb-px data-selected:border-t-2 data-selected:border-t-fdn-lime data-selected:bg-surface-400 data-selected:text-off-white"
            >
              {i18n.t.stage.tabs.info}
            </TabsTab>
          </TabsList>

          <TabsPanel
            value="status"
            class="border border-rule-strong bg-surface-400 p-5"
          >
            {#if status.isLive}
              <div class="space-y-4">
                <div class="border-b border-rule-strong pb-4">
                  <p class="font-mono text-[11px] tracking-[0.08em] text-fdn-lime uppercase">
                    {i18n.t.stage.desk.nowPlaying}
                  </p>
                  <p class="mt-1.5 break-words font-display text-2xl leading-tight font-bold text-off-white">
                    {status.title ?? i18n.t.status.unknownTitle}
                  </p>
                </div>

                <dl class="grid grid-cols-2 gap-4 border-b border-rule-strong pb-4">
                  <div class="min-w-0">
                    <dt class="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                      {i18n.t.stage.desk.categoryLabel}
                    </dt>
                    <dd class="mt-1 break-words font-mono text-sm text-off-white">
                      {status.category ?? i18n.t.hero.telemetryDefaultCategory}
                    </dd>
                  </div>
                  <div class="min-w-0">
                    <dt class="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                      {i18n.t.stage.desk.viewersLabel}
                    </dt>
                    <dd class="fdn-tabular mt-1 font-mono text-sm font-medium text-fdn-lime">
                      {formattedViewers} {viewerWord}
                    </dd>
                  </div>
                </dl>
              </div>
            {:else}
              <div class="space-y-3 border-b border-rule-strong pb-5">
                <p class="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                  {i18n.t.stage.desk.channelLabel}
                </p>
                <h3 class="font-display text-2xl leading-tight font-bold text-off-white">
                  {i18n.t.stage.desk.offlineHeadline}
                </h3>
                <p class="text-sm leading-relaxed text-body-ink">
                  {i18n.t.stage.desk.offlineCopy}
                </p>
              </div>
            {/if}

            <div class="mt-5 flex flex-col gap-2.5">
              <a
                href={KICK_URL}
                target="_blank"
                rel="noopener noreferrer"
                class="fdn-btn-primary w-full"
              >
                <span>{i18n.t.stage.desk.openKick}</span>
                <SocialIcons name="arrow-up-right" size={15} />
              </a>
              <button
                type="button"
                onclick={onCopyChannel}
                class="fdn-btn-outline w-full"
              >
                <SocialIcons name="copy" size={15} />
                <span>{i18n.t.stage.desk.copyChannel}</span>
              </button>
            </div>
          </TabsPanel>

          <TabsPanel
            value="games"
            class="border border-rule-strong bg-surface-400 p-5"
          >
            <p class="font-mono text-[11px] tracking-[0.08em] text-fdn-lime uppercase">
              {i18n.t.stage.desk.gamesCaption}
            </p>
            <ol class="mt-3 divide-y divide-rule-strong border-y border-rule-strong">
              {#each STREAM_GAMES as game (game.code)}
                <li class="flex items-center justify-between gap-3 py-2.5 font-mono text-xs tracking-[0.06em]">
                  <span class="text-fdn-lime">{game.code}</span>
                  <span class="min-w-0 flex-1 text-off-white">
                    {game.label[i18n.locale]}
                  </span>
                </li>
              {/each}
            </ol>
          </TabsPanel>

          <TabsPanel
            value="info"
            class="border border-rule-strong bg-surface-400 p-5"
          >
            <dl class="divide-y divide-rule-strong border-b border-rule-strong">
              <div class="flex items-center justify-between gap-4 py-2.5">
                <dt class="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                  {i18n.t.stage.desk.languageLabel}
                </dt>
                <dd class="text-sm font-medium text-off-white">
                  {i18n.t.stage.desk.languageValue}
                </dd>
              </div>
              <div class="flex items-center justify-between gap-4 py-2.5">
                <dt class="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                  {i18n.t.stage.desk.handleLabel}
                </dt>
                <dd class="font-mono text-sm text-fdn-lime" translate="no">
                  @feeden
                </dd>
              </div>
            </dl>

            <div class="mt-4">
              <p class="font-mono text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                {i18n.t.stage.desk.rulesHeading}
              </p>
              <ul class="mt-2.5 space-y-2 text-sm text-body-ink">
                {#each i18n.t.stage.desk.rules as rule, index (index)}
                  <li class="flex items-start gap-2.5">
                    <span class="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 bg-fdn-lime" aria-hidden="true"></span>
                    <span>{rule}</span>
                  </li>
                {/each}
              </ul>
            </div>

            <div class="mt-5">
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                class="fdn-btn-outline w-full"
              >
                <SocialIcons name="discord" size={16} />
                <span>{i18n.t.stage.desk.discordCta}</span>
                <SocialIcons name="arrow-up-right" size={15} />
              </a>
            </div>
          </TabsPanel>
        </Tabs>
      </div>
    </div>
  </div>
</section>
