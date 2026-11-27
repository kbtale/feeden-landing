<script lang="ts">
  import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/svelte/tabs";
  import {
    COMMUNITY_ACCOUNTS,
    COMMUNITY_FILTERS,
    filterCommunityAccounts,
    type CommunityAccount,
    type CommunityFilter,
    type CommunityPlatform,
  } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import SocialIcons, { type IconName } from "./SocialIcons.svelte";
  import SubmitChannelDialog from "./SubmitChannelDialog.svelte";

  interface Props {
    accounts?: readonly CommunityAccount[];
    onCopyTemplate: (template: string) => void;
  }

  let { accounts = COMMUNITY_ACCOUNTS, onCopyTemplate }: Props = $props();
  const i18n = getI18n();

  let activeFilter = $state<CommunityFilter>("all");
  let dialogOpen = $state(false);

  const platformIcon: Record<CommunityPlatform, IconName> = {
    youtube: "youtube",
    tiktok: "tiktok",
    social: "instagram",
    discord: "discord",
  };

  function filterLabel(filter: CommunityFilter): string {
    return i18n.t.community.filters[filter];
  }

  function handleTabChange(next: string | null) {
    if (next && COMMUNITY_FILTERS.includes(next as CommunityFilter)) {
      activeFilter = next as CommunityFilter;
    }
  }
</script>

<section id="comunidad" class="fdn-hairline-top py-14 stack:py-20">
  <div class="fdn-container">
    <div class="grid grid-cols-1 gap-10 stack:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] stack:gap-12">
      <div class="min-w-0 stack:sticky stack:top-[calc(var(--nav-height)+32px)] stack:self-start">
        <p class="fdn-eyebrow text-fdn-lime">{i18n.t.community.eyebrow}</p>
        <h2 class="mt-2 font-display text-[clamp(36px,4.5vw,64px)] leading-[1.02] font-bold tracking-[-0.01em] text-off-white">
          {i18n.t.community.heading}
        </h2>
        <p class="mt-4 max-w-[44ch] text-base leading-relaxed text-body-ink">
          {i18n.t.community.description}
        </p>

        <div class="mt-6 flex items-center gap-3 border-y border-rule-strong py-3.5 font-mono text-xs tracking-[0.06em] uppercase">
          <span class="fdn-tabular text-lg font-medium text-fdn-lime">
            {String(accounts.length).padStart(2, "0")}
          </span>
          <span class="text-muted-ink">{i18n.t.community.countLabel}</span>
        </div>

        <div class="mt-6">
          <button
            type="button"
            onclick={() => {
              dialogOpen = true;
            }}
            class="fdn-btn-primary w-full panel:w-auto"
          >
            <span>{i18n.t.community.submitCta}</span>
            <SocialIcons name="arrow-up-right" size={15} />
          </button>
        </div>
      </div>

      <div class="min-w-0">
        <Tabs value={activeFilter} onValueChange={handleTabChange}>
          <TabsList
            aria-label={i18n.t.a11y.communityFilterTabs}
            class="fdn-no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-4"
          >
            {#each COMMUNITY_FILTERS as filter (filter)}
              <TabsTab
                value={filter}
                class="inline-flex min-h-11 shrink-0 cursor-pointer items-center border border-rule-strong bg-surface-900 px-3.5 font-mono text-xs font-medium tracking-[0.06em] text-muted-ink uppercase transition-colors duration-150 data-selected:border-fdn-lime data-selected:bg-fdn-lime data-selected:text-obsidian"
              >
                {filterLabel(filter)}
              </TabsTab>
            {/each}
          </TabsList>

          {#each COMMUNITY_FILTERS as filter (filter)}
            {@const filtered = filterCommunityAccounts(accounts, filter)}
            <TabsPanel value={filter} class="min-w-0">
              {#if filtered.length > 0}
                <ul class="divide-y divide-rule-strong border-y border-rule-strong">
                  {#each filtered as account (account.id)}
                    <li>
                      <a
                        href={account.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="fdn-community-row group flex flex-col gap-4 py-5 text-off-white no-underline transition-colors duration-150 panel:flex-row panel:items-start panel:justify-between panel:px-4"
                      >
                        <div class="flex min-w-0 flex-1 items-start gap-3.5">
                          <span class="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-rule-strong bg-surface-900 text-fdn-lime">
                            <SocialIcons name={platformIcon[account.platform]} size={18} />
                          </span>

                          <div class="min-w-0 flex-1">
                            <div class="flex flex-wrap items-center gap-2">
                              <h3 class="font-display text-2xl leading-none font-bold text-off-white">
                                {account.name}
                              </h3>
                              <span
                                class="shrink-0 px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.08em] uppercase whitespace-nowrap {account.badge === 'official'
                                  ? 'bg-fdn-lime text-obsidian'
                                  : 'border border-rule-strong bg-surface-900 text-fdn-lime'}"
                              >
                                {account.badge === "official"
                                  ? i18n.t.community.badgeOfficial
                                  : i18n.t.community.badgeFan}
                              </span>
                            </div>

                            <p class="mt-1.5 font-mono text-xs text-muted-ink" translate="no">
                              {account.platformLabel} · {account.handle}
                            </p>

                            <p class="mt-2.5 break-words text-sm leading-relaxed text-body-ink">
                              {account.description[i18n.locale]}
                            </p>
                          </div>
                        </div>

                        <span class="fdn-community-cta inline-flex shrink-0 items-center gap-1.5 self-start font-mono text-xs font-medium tracking-[0.06em] text-muted-ink uppercase transition-colors duration-150 panel:mt-1">
                          <span>{i18n.t.community.visitCta}</span>
                          <SocialIcons name="arrow-up-right" size={14} />
                        </span>
                      </a>
                    </li>
                  {/each}
                </ul>
              {:else}
                <div class="border border-rule-strong bg-surface-700 p-6 text-left panel:p-8">
                  <p class="font-mono text-xs tracking-[0.08em] text-fdn-lime uppercase">
                    {filterLabel(filter)}
                  </p>
                  <h3 class="mt-2 font-display text-2xl font-bold text-off-white">
                    {i18n.t.community.emptyTitle}
                  </h3>
                  <p class="mt-2 max-w-[46ch] text-sm leading-relaxed text-body-ink">
                    {i18n.t.community.emptyBody}
                  </p>
                  <button
                    type="button"
                    onclick={() => {
                      dialogOpen = true;
                    }}
                    class="fdn-btn-outline mt-5"
                  >
                    <span>{i18n.t.community.emptyCta}</span>
                    <SocialIcons name="arrow-up-right" size={14} />
                  </button>
                </div>
              {/if}
            </TabsPanel>
          {/each}
        </Tabs>
      </div>
    </div>
  </div>

  <SubmitChannelDialog bind:open={dialogOpen} {onCopyTemplate} />
</section>

<style>
  @media (hover: hover) and (pointer: fine) {
    .fdn-community-row:hover {
      background-color: rgba(244, 247, 242, 0.04);
    }

    .fdn-community-row:hover .fdn-community-cta {
      color: var(--color-fdn-lime);
    }
  }
</style>
