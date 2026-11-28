<script lang="ts">
  import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/svelte/tabs";
  import {
    COMMUNITY_ACCOUNTS,
    COMMUNITY_FILTERS,
    filterCommunityAccounts,
    type CommunityAccount,
    type CommunityFilter,
  } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import SocialIcons from "./SocialIcons.svelte";
  import SubmitChannelDialog from "./SubmitChannelDialog.svelte";

  interface Props {
    accounts?: readonly CommunityAccount[];
    onCopyTemplate: (template: string) => void;
  }

  let { accounts = COMMUNITY_ACCOUNTS, onCopyTemplate }: Props = $props();
  const i18n = getI18n();

  let activeFilter = $state<CommunityFilter>("all");
  let dialogOpen = $state(false);

  function filterLabel(filter: CommunityFilter): string {
    return i18n.t.community.filters[filter];
  }

  function handleTabChange(next: string | null) {
    if (next && COMMUNITY_FILTERS.includes(next as CommunityFilter)) {
      activeFilter = next as CommunityFilter;
    }
  }
</script>

<section id="comunidad" class="fdn-hairline-top border-b border-rule-strong">
  <div class="fdn-rail-frame">
    <div class="grid grid-cols-1 stack:grid-cols-2">
      <div class="min-w-0 px-5 py-12 stack:px-11 stack:py-16">
        <div class="stack:sticky stack:top-[calc(var(--nav-height)+40px)]">
          <p class="fdn-eyebrow text-fdn-lime">{i18n.t.community.eyebrow}</p>
          <h2 class="mt-3 max-w-[14ch] font-display text-[clamp(32px,3.1vw,46px)] leading-[1.08] font-bold tracking-[-0.02em] text-off-white">
            {i18n.t.community.heading}
          </h2>
          <p class="mt-4 max-w-[40ch] text-[15px] leading-[1.45] text-body-ink">
            {i18n.t.community.description}
          </p>

          <div class="mt-7">
            <button
              type="button"
              onclick={() => {
                dialogOpen = true;
              }}
              class="fdn-btn-primary w-full panel:w-[214px]"
            >
              <span>{i18n.t.community.submitCta}</span>
              <SocialIcons name="arrow-up-right" size={14} />
            </button>
          </div>
        </div>
      </div>

      <div class="min-w-0 border-t border-rule-strong stack:border-t-0 stack:border-l">
        <Tabs value={activeFilter} onValueChange={handleTabChange}>
          <TabsList
            aria-label={i18n.t.a11y.communityFilterTabs}
            class="fdn-no-scrollbar flex items-center gap-1 overflow-x-auto border-b border-rule-strong px-5 py-4 stack:px-11"
          >
            {#each COMMUNITY_FILTERS as filter (filter)}
              <TabsTab
                value={filter}
                class="inline-flex min-h-9 shrink-0 cursor-pointer items-center rounded-full px-3.5 font-mono text-[12px] text-muted-ink transition-colors duration-150 hover:text-off-white data-selected:bg-fdn-lime data-selected:font-medium data-selected:text-obsidian"
              >
                {filterLabel(filter)}
              </TabsTab>
            {/each}
          </TabsList>

          {#each COMMUNITY_FILTERS as filter (filter)}
            {@const filtered = filterCommunityAccounts(accounts, filter)}
            <TabsPanel value={filter} class="min-w-0">
              {#if filtered.length > 0}
                <ul class="divide-y divide-rule-strong">
                  {#each filtered as account (account.id)}
                    <li>
                      <a
                        href={account.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="fdn-community-row group block px-5 py-8 text-off-white no-underline transition-colors duration-300 stack:px-11 stack:py-10"
                      >
                        <p class="font-mono text-[13px] text-body-ink/80" translate="no">
                          {account.platformLabel} · {account.handle}
                          {#if account.badge === "official"}
                            <span class="text-fdn-lime"> · {i18n.t.community.badgeOfficial}</span>
                          {/if}
                        </p>

                        <h3 class="mt-3 max-w-[540px] font-display text-[24px] leading-[1.1] font-bold tracking-[-0.015em] text-off-white">
                          {account.name}
                        </h3>

                        <p class="mt-2.5 max-w-[52ch] break-words text-[14px] leading-[1.45] text-body-ink">
                          {account.description[i18n.locale]}
                        </p>

                        <span class="fdn-community-cta mt-4 inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.04em] text-fdn-lime uppercase transition-colors duration-150">
                          <span>{i18n.t.community.visitCta}</span>
                          <SocialIcons name="arrow-up-right" size={13} />
                        </span>
                      </a>
                    </li>
                  {/each}
                </ul>
              {:else}
                <div class="px-5 py-10 stack:px-11">
                  <h3 class="font-display text-2xl font-bold text-off-white">
                    {i18n.t.community.emptyTitle}
                  </h3>
                  <p class="mt-2 max-w-[44ch] text-sm text-body-ink">
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
      background-color: rgba(250, 252, 249, 0.04);
    }

    .fdn-community-row:hover .fdn-community-cta {
      color: var(--color-off-white);
    }
  }
</style>
