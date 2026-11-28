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

<section class="fdn-hairline-top pt-14 pb-0 stack:pt-24">
  <div class="fdn-container">
    <p class="fdn-eyebrow text-fdn-lime">{i18n.t.pillars.eyebrow}</p>
    <h2 class="mt-3 max-w-3xl font-display text-[clamp(32px,3.1vw,46px)] leading-[1.08] font-bold tracking-[-0.02em] text-off-white">
      {i18n.t.pillars.heading}
    </h2>
  </div>

  <div class="fdn-rail-frame mt-8 bg-fdn-lime text-obsidian stack:mt-10">
    <div class="grid grid-cols-1 divide-y divide-obsidian/25 stack:grid-cols-6 stack:divide-y-0">
      {#each i18n.t.pillars.items as pillar, index (pillar.id)}
        <article
          class="min-w-0 px-6 py-10 stack:px-11 stack:py-14 {index < 3
            ? 'stack:col-span-2 stack:border-b stack:border-obsidian/25'
            : 'stack:col-span-3'} {index === 1 || index === 2 || index === 4
            ? 'stack:border-l stack:border-obsidian/25'
            : ''}"
        >
          <div class="text-obsidian">
            <SocialIcons name={iconById[pillar.id] ?? "gamepad"} size={24} />
          </div>

          <h3 class="mt-5 font-display text-[24px] leading-[1.1] font-bold tracking-[-0.015em] text-obsidian">
            {pillar.title}
          </h3>

          <p class="mt-3 max-w-[355px] text-[14px] leading-[1.42] text-obsidian/80">
            {pillar.description}
          </p>
        </article>
      {/each}
    </div>
  </div>
</section>
