<script lang="ts">
  import { KICK_URL, TIKTOK_URL, YOUTUBE_CHANNEL_URL } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import SocialIcons, { type IconName } from "./SocialIcons.svelte";

  const i18n = getI18n();

  interface PillarAction {
    icon: IconName;
    href: string;
    external: boolean;
  }

  const actionById: Record<string, PillarAction> = {
    gaming: { icon: "gamepad", href: KICK_URL, external: true },
    reactions: { icon: "tv", href: YOUTUBE_CHANNEL_URL, external: true },
    "just-chatting": { icon: "message", href: "#reproductor", external: false },
    challenges: { icon: "trophy", href: TIKTOK_URL, external: true },
    "community-clips": { icon: "users", href: "#comunidad", external: false },
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
        {@const action = actionById[pillar.id] ?? { icon: "gamepad" as IconName, href: KICK_URL, external: true }}
        <a
          href={action.href}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noopener noreferrer" : undefined}
          class="fdn-pillar-cta group flex min-w-0 flex-col justify-between px-6 py-10 transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-obsidian stack:px-11 stack:py-14 {index < 3
            ? 'stack:col-span-2 stack:border-b stack:border-obsidian/25'
            : 'stack:col-span-3'} {index === 1 || index === 2 || index === 4
            ? 'stack:border-l stack:border-obsidian/25'
            : ''}"
        >
          <div>
            <div class="text-obsidian">
              <SocialIcons name={action.icon} size={24} />
            </div>

            <h3 class="mt-5 font-display text-[24px] leading-[1.1] font-bold tracking-[-0.015em] text-obsidian">
              {pillar.title}
            </h3>

            <p class="mt-3 max-w-[355px] text-[14px] leading-[1.42] text-obsidian/80">
              {pillar.description}
            </p>
          </div>

          <span class="mt-7 inline-flex items-center gap-1.5 font-mono text-[12px] font-medium tracking-[0.02em] text-obsidian">
            <span class="underline decoration-obsidian/35 underline-offset-4 transition-colors duration-150 group-hover:decoration-obsidian">
              {pillar.cta}
            </span>
            <SocialIcons
              name={action.external ? "arrow-up-right" : "arrow-right"}
              size={14}
              class="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </span>
        </a>
      {/each}
    </div>
  </div>
</section>
