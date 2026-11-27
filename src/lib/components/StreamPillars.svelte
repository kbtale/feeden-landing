<script lang="ts">
  import { getI18n } from "../i18n/store.svelte";
  import SocialIcons, { type IconName } from "./SocialIcons.svelte";

  const i18n = getI18n();

  const iconById: Record<string, IconName> = {
    gaming: "gamepad",
    reactions: "tv",
    "just-chatting": "message",
    events: "trophy",
    "community-clips": "users",
  };
</script>

<section id="stream" class="fdn-hairline-top pt-14 pb-0 stack:pt-20">
  <div class="fdn-container">
    <p class="fdn-eyebrow text-fdn-lime">{i18n.t.pillars.eyebrow}</p>
    <h2 class="mt-2 max-w-3xl font-display text-[clamp(36px,4.5vw,64px)] leading-[1.02] font-bold tracking-[-0.01em] text-off-white">
      {i18n.t.pillars.heading}
    </h2>
  </div>

  <div class="fdn-rail-frame mt-8 border-y border-obsidian/25 bg-fdn-lime text-obsidian stack:mt-10">
    <div class="grid grid-cols-1 divide-y divide-obsidian/20 stack:grid-cols-6 stack:divide-y-0">
      {#each i18n.t.pillars.items as pillar, index (pillar.id)}
        <article
          class="flex min-w-0 flex-col justify-between gap-6 p-6 stack:min-h-[260px] stack:p-8 {index < 3
            ? 'stack:col-span-2 stack:border-b stack:border-obsidian/20'
            : 'stack:col-span-3'} {index === 1 || index === 2
            ? 'stack:border-l stack:border-obsidian/20'
            : ''} {index === 4 ? 'stack:border-l stack:border-obsidian/20' : ''}"
        >
          <div>
            <div class="flex items-center justify-between gap-3">
              <span class="font-mono text-xs font-medium tracking-[0.08em] text-obsidian/70">
                {pillar.index}
              </span>
              <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-obsidian/25 bg-obsidian text-fdn-lime">
                <SocialIcons name={iconById[pillar.id] ?? "gamepad"} size={18} />
              </span>
            </div>

            <h3 class="mt-6 font-display text-[clamp(28px,2.5vw,38px)] leading-[1.04] font-bold tracking-[-0.01em] text-obsidian">
              {pillar.title}
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-obsidian/85 stack:text-[15px]">
              {pillar.description}
            </p>
          </div>

          <div class="border-t border-obsidian/15 pt-3">
            <span class="font-mono text-[11px] font-medium tracking-[0.08em] text-obsidian/80 uppercase">
              {pillar.tag}
            </span>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
